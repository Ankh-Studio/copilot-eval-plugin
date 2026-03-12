#!/usr/bin/env node

/**
 * Workspace Pack Application Script
 * 
 * Applies frontend starter packs to workspaces with safety checks,
 * dry-run mode, and proper file handling.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class PackApplier {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.overwritePolicy = options.overwritePolicy || 'if-unmodified';
    this.verbose = options.verbose || false;
    this.workspaceRoot = options.workspaceRoot || process.cwd();
    this.pluginRoot = path.resolve(__dirname, '..');
  }

  async applyPack(packName) {
    console.log(`🚀 Applying pack: ${packName}`);
    
    // Load pack metadata
    const packPath = path.join(this.pluginRoot, 'packs', packName);
    const packMetadata = await this.loadPackMetadata(packPath, packName);
    
    if (!packMetadata) {
      throw new Error(`Pack not found: ${packName}`);
    }

    // Validate dependencies
    await this.validateDependencies(packMetadata);
    
    // Check for conflicts
    const conflicts = await this.detectConflicts(packMetadata);
    if (conflicts.length > 0) {
      console.log('⚠️  Conflicts detected:');
      conflicts.forEach(conflict => console.log(`   - ${conflict}`));
      
      if (this.overwritePolicy === 'never') {
        throw new Error('Conflicts detected with overwrite policy set to "never"');
      }
    }

    // Preview changes
    const changes = await this.previewChanges(packMetadata);
    this.displayPreview(changes);

    // Apply changes
    if (!this.dryRun) {
      await this.applyChanges(packMetadata, changes);
      await this.writeManifest(packName, packMetadata);
      console.log('✅ Pack applied successfully!');
    } else {
      console.log('🔍 Dry run complete - no files modified');
    }
  }

  async loadPackMetadata(packPath, packName) {
    try {
      const yamlPath = path.join(packPath, 'pack.yaml');
      if (!fs.existsSync(yamlPath)) {
        return null;
      }
      
      const content = fs.readFileSync(yamlPath, 'utf8');
      const metadata = yaml.load(content);
      metadata.name = packName;
      metadata.path = packPath;
      return metadata;
    } catch (error) {
      console.error(`Error loading pack metadata: ${error.message}`);
      return null;
    }
  }

  async validateDependencies(metadata) {
    if (!metadata.required_dependencies || metadata.required_dependencies.length === 0) {
      return;
    }

    const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      if (metadata.required_dependencies.length > 0) {
        throw new Error('package.json not found but pack requires dependencies');
      }
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    const missing = metadata.required_dependencies.filter(dep => !allDeps[dep]);
    if (missing.length > 0) {
      console.log(`⚠️  Missing required dependencies: ${missing.join(', ')}`);
      console.log('   Install with: npm install ' + missing.join(' '));
    }
  }

  async detectConflicts(metadata) {
    const conflicts = [];
    
    for (const targetPath of metadata.target_paths || []) {
      const fullPath = path.join(this.workspaceRoot, targetPath);
      
      if (fs.existsSync(fullPath)) {
        const existingContent = fs.readFileSync(fullPath, 'utf8');
        const sourcePath = path.join(metadata.path, targetPath);
        
        if (fs.existsSync(sourcePath)) {
          const sourceContent = fs.readFileSync(sourcePath, 'utf8');
          
          if (existingContent !== sourceContent) {
            conflicts.push(`${targetPath} (different content)`);
          }
        } else {
          conflicts.push(`${targetPath} (no source in pack)`);
        }
      }
    }
    
    return conflicts;
  }

  async previewChanges(metadata) {
    const changes = {
      toCreate: [],
      toUpdate: [],
      toSkip: []
    };

    for (const targetPath of metadata.target_paths || []) {
      const fullPath = path.join(this.workspaceRoot, targetPath);
      const sourcePath = path.join(metadata.path, targetPath);
      
      if (!fs.existsSync(sourcePath)) {
        changes.toSkip.push({ path: targetPath, reason: 'Source file not found in pack' });
        continue;
      }

      if (fs.existsSync(fullPath)) {
        const existingContent = fs.readFileSync(fullPath, 'utf8');
        const sourceContent = fs.readFileSync(sourcePath, 'utf8');
        
        if (existingContent === sourceContent) {
          changes.toSkip.push({ path: targetPath, reason: 'Content identical' });
        } else {
          switch (this.overwritePolicy) {
            case 'never':
              changes.toSkip.push({ path: targetPath, reason: 'Overwrite policy: never' });
              break;
            case 'force':
              changes.toUpdate.push({ path: targetPath });
              break;
            case 'if-unmodified':
              // Simple check - could be enhanced with git status
              changes.toSkip.push({ path: targetPath, reason: 'File exists (if-unmodified policy)' });
              break;
            default:
              changes.toUpdate.push({ path: targetPath });
          }
        }
      } else {
        changes.toCreate.push({ path: targetPath });
      }
    }

    return changes;
  }

  displayPreview(changes) {
    console.log('\n📋 Preview of changes:');
    
    if (changes.toCreate.length > 0) {
      console.log('\n📁 Files to create:');
      changes.toCreate.forEach(change => console.log(`   + ${change.path}`));
    }
    
    if (changes.toUpdate.length > 0) {
      console.log('\n📝 Files to update:');
      changes.toUpdate.forEach(change => console.log(`   ~ ${change.path}`));
    }
    
    if (changes.toSkip.length > 0) {
      console.log('\n⏭️  Files to skip:');
      changes.toSkip.forEach(change => console.log(`   - ${change.path} (${change.reason})`));
    }
    
    console.log();
  }

  async applyChanges(metadata, changes) {
    // Ensure directories exist
    for (const change of [...changes.toCreate, ...changes.toUpdate]) {
      const fullPath = path.join(this.workspaceRoot, change.path);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    // Create files
    for (const change of changes.toCreate) {
      const sourcePath = path.join(metadata.path, change.path);
      const targetPath = path.join(this.workspaceRoot, change.path);
      
      const content = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(targetPath, content);
      
      if (this.verbose) {
        console.log(`✅ Created: ${change.path}`);
      }
    }

    // Update files
    for (const change of changes.toUpdate) {
      const sourcePath = path.join(metadata.path, change.path);
      const targetPath = path.join(this.workspaceRoot, change.path);
      
      // Backup existing file
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      fs.copyFileSync(targetPath, backupPath);
      
      const content = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(targetPath, content);
      
      if (this.verbose) {
        console.log(`🔄 Updated: ${change.path} (backup: ${path.basename(backupPath)})`);
      }
    }
  }

  async writeManifest(packName, metadata) {
    const manifestPath = path.join(this.workspaceRoot, '.github', 'copilot-packs.json');
    const manifestDir = path.dirname(manifestPath);
    
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }

    let manifest = {};
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }

    manifest[packName] = {
      applied_at: new Date().toISOString(),
      version: metadata.version || '1.0.0',
      files_applied: metadata.target_paths || []
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    if (this.verbose) {
      console.log(`📄 Updated manifest: ${manifestPath}`);
    }
  }

  async listPacks() {
    const packsDir = path.join(this.pluginRoot, 'packs');
    const packs = [];
    
    if (!fs.existsSync(packsDir)) {
      return packs;
    }

    const entries = fs.readdirSync(packsDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const metadata = await this.loadPackMetadata(path.join(packsDir, entry.name), entry.name);
        if (metadata) {
          packs.push({
            name: entry.name,
            description: metadata.description || metadata.tldr || 'No description',
            category: metadata.category || 'unknown'
          });
        }
      }
    }

    return packs.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose'),
    overwritePolicy: 'if-unmodified'
  };

  // Parse overwrite policy
  const overwriteIndex = args.findIndex(arg => arg.startsWith('--overwrite='));
  if (overwriteIndex !== -1) {
    options.overwritePolicy = args[overwriteIndex].split('=')[1];
  }

  const applier = new PackApplier(options);

  try {
    if (args.includes('--list') || args.includes('-l')) {
      const packs = await applier.listPacks();
      console.log('📦 Available packs:');
      packs.forEach(pack => {
        console.log(`   ${pack.name} - ${pack.description} (${pack.category})`);
      });
      return;
    }

    if (args.includes('--help') || args.includes('-h')) {
      console.log(`
Workspace Pack Application Script

Usage:
  node apply-pack.js <pack-name> [options]
  node apply-pack.js --list

Options:
  --dry-run          Preview changes without applying
  --verbose          Show detailed output
  --overwrite=<policy>  Overwrite policy: never, if-unmodified, force
  --list, -l         List available packs
  --help, -h         Show this help

Examples:
  node apply-pack.js frontend-react-ts-core
  node apply-pack.js frontend-ui-radix-tailwind --dry-run
  node apply-pack.js frontend-product-stack --overwrite=force --verbose
      `);
      return;
    }

    const packName = args.find(arg => !arg.startsWith('--'));
    if (!packName) {
      console.error('Error: Pack name required');
      console.error('Use --help for usage information');
      process.exit(1);
    }

    await applier.applyPack(packName);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = PackApplier;

/**
 * Repository Analysis Script for ADR Evidence Gathering
 *
 * Scans repository for architectural patterns, decisions, and evidence
 * to support ADR creation with real repository context.
 */

const fs = require('fs');
const path = require('path');

class RepoAnalyzer {
  constructor(repoPath = process.cwd()) {
    this.repoPath = repoPath;
    this.evidence = {
      patterns: [],
      technologies: [],
      decisions: [],
      issues: [],
      codeFiles: [],
      configFiles: [],
    };
  }

  /**
   * Analyze repository for ADR evidence
   */
  async analyze() {
    console.log('🔍 Analyzing repository for ADR evidence...');

    await this.scanFileStructure();
    await this.identifyTechnologies();
    await this.findArchitecturalPatterns();
    await this.detectDecisions();
    await this.findIssues();

    return this.evidence;
  }

  /**
   * Scan file structure for relevant files
   */
  async scanFileStructure() {
    const relevantExtensions = [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.md',
      '.yml',
      '.yaml',
    ];
    const relevantDirs = [
      'src',
      'components',
      'lib',
      'utils',
      'config',
      'docs',
    ];

    this.scanDirectory(this.repoPath, (filePath, stats) => {
      const ext = path.extname(filePath);
      const dir = path.dirname(filePath);

      if (
        relevantExtensions.includes(ext) &&
        relevantDirs.some(rDir => dir.includes(rDir))
      ) {
        this.evidence.codeFiles.push({
          path: path.relative(this.repoPath, filePath),
          type: ext,
          size: stats.size,
        });
      }
    });
  }

  /**
   * Identify technologies and frameworks
   */
  async identifyTechnologies() {
    const packageJsonPath = path.join(this.repoPath, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8')
        );
        const deps = {
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
        };

        this.evidence.technologies = Object.entries(deps)
          .filter(([name]) => this.isArchitecturalDependency(name))
          .map(([name, version]) => ({ name, version }));
      } catch (error) {
        console.warn('Could not parse package.json:', error.message);
      }
    }
  }

  /**
   * Find architectural patterns in code
   */
  async findArchitecturalPatterns() {
    const patterns = [
      {
        name: 'State Management',
        keywords: [
          'useState',
          'useReducer',
          'redux',
          'mobx',
          'zustand',
          'context',
        ],
        files: [],
      },
      {
        name: 'Data Fetching',
        keywords: ['fetch', 'axios', 'swr', 'react-query', 'apollo'],
        files: [],
      },
      {
        name: 'Routing',
        keywords: ['react-router', 'next/router', 'gatsby'],
        files: [],
      },
      {
        name: 'Styling',
        keywords: ['css', 'scss', 'styled-components', 'emotion', 'tailwind'],
        files: [],
      },
      {
        name: 'Testing',
        keywords: ['jest', 'test', 'spec', 'cypress', 'playwright'],
        files: [],
      },
    ];

    for (const pattern of patterns) {
      pattern.files = this.evidence.codeFiles
        .filter(file => this.fileMatchesPattern(file, pattern.keywords))
        .map(file => file.path);

      if (pattern.files.length > 0) {
        this.evidence.patterns.push(pattern);
      }
    }
  }

  /**
   * Detect existing architectural decisions
   */
  async detectDecisions() {
    const decisionIndicators = [
      'TODO: architecture',
      'TODO: refactor',
      'FIXME: design',
      'NOTE: temporary',
      'HACK:',
      'deprecated',
      'legacy',
    ];

    for (const file of this.evidence.codeFiles) {
      try {
        const content = fs.readFileSync(
          path.join(this.repoPath, file.path),
          'utf8'
        );
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (
            decisionIndicators.some(indicator =>
              line.toLowerCase().includes(indicator.toLowerCase())
            )
          ) {
            this.evidence.decisions.push({
              file: file.path,
              line: index + 1,
              content: line.trim(),
              type: this.classifyDecision(line),
            });
          }
        });
      } catch (error) {
        console.warn(`Cannot read file ${file.path}:`, error.message);
      }
    }
  }

  /**
   * Find related issues and PRs
   */
  async findIssues() {
    const gitDirs = ['.git', 'docs', '.github'];

    for (const dir of gitDirs) {
      const dirPath = path.join(this.repoPath, dir);
      if (fs.existsSync(dirPath)) {
        this.scanDirectory(dirPath, (filePath, stats) => {
          if (
            path.basename(filePath).includes('issue') ||
            path.basename(filePath).includes('pr') ||
            path.basename(filePath).includes('CHANGELOG')
          ) {
            this.evidence.issues.push({
              path: path.relative(this.repoPath, filePath),
              type: path.basename(filePath).includes('CHANGELOG')
                ? 'changelog'
                : 'issue/pr',
            });
          }
        });
      }
    }
  }

  /**
   * Generate ADR options based on analysis
   */
  generateOptions(decisionTopic) {
    const options = [];

    // Generate options based on detected technologies
    if (decisionTopic.toLowerCase().includes('state')) {
      const stateTech = this.evidence.patterns.find(
        p => p.name === 'State Management'
      );
      if (stateTech) {
        options.push({
          name: 'Continue with current state management',
          description: `Maintain existing ${stateTech.files.length} files using current patterns`,
          pros: [
            'No migration effort',
            'Team familiarity',
            'Existing patterns',
          ],
          cons: [
            'May not scale',
            'Potential technical debt',
            'Limited functionality',
          ],
        });
      }

      // Suggest alternatives based on ecosystem
      options.push({
        name: 'Implement Redux Toolkit',
        description: 'Modern Redux implementation with reduced boilerplate',
        pros: ['Strong ecosystem', 'DevTools support', 'Scalable architecture'],
        cons: ['Learning curve', 'Additional dependency', 'Boilerplate code'],
      });

      options.push({
        name: 'Adopt Zustand',
        description: 'Lightweight state management solution',
        pros: ['Minimal boilerplate', 'TypeScript friendly', 'Easy to learn'],
        cons: [
          'Smaller ecosystem',
          'Less established patterns',
          'Limited middleware',
        ],
      });
    }

    return options;
  }

  /**
   * Helper methods
   */
  scanDirectory(dir, callback) {
    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (
          stats.isDirectory() &&
          !item.startsWith('.') &&
          item !== 'node_modules'
        ) {
          this.scanDirectory(fullPath, callback);
        } else if (stats.isFile()) {
          callback(fullPath, stats);
        }
      }
    } catch (error) {
      console.warn(`Cannot read directory ${dir}:`, error.message);
    }
  }

  isArchitecturalDependency(name) {
    const architectural = [
      'react',
      'redux',
      'mobx',
      'zustand',
      'react-query',
      'swr',
      'axios',
      'react-router',
      'next',
      'gatsby',
      'styled-components',
      'emotion',
      'tailwind',
      'sass',
      'webpack',
      'vite',
      'babel',
      'typescript',
    ];

    return architectural.some(arch => name.includes(arch));
  }

  fileMatchesPattern(file, keywords) {
    try {
      const content = fs.readFileSync(
        path.join(this.repoPath, file.path),
        'utf8'
      );
      return keywords.some(keyword =>
        content.toLowerCase().includes(keyword.toLowerCase())
      );
    } catch (error) {
      console.warn(
        `Cannot read file ${file.path} for pattern matching:`,
        error.message
      );
      return false;
    }
  }

  classifyDecision(line) {
    if (line.toLowerCase().includes('deprecated')) return 'deprecation';
    if (line.toLowerCase().includes('legacy')) return 'legacy';
    if (line.toLowerCase().includes('temporary')) return 'temporary';
    if (line.toLowerCase().includes('refactor')) return 'refactor';
    return 'general';
  }

  /**
   * Format evidence for ADR template
   */
  formatEvidence() {
    return {
      technologies: this.evidence.technologies
        .map(t => `- ${t.name}@${t.version}`)
        .join('\n'),
      patterns: this.evidence.patterns
        .map(p => `- **${p.name}**: Found in ${p.files.length} files`)
        .join('\n'),
      decisions: this.evidence.decisions
        .slice(0, 5)
        .map(d => `- ${d.file}:${d.line} - ${d.content}`)
        .join('\n'),
      issues: this.evidence.issues
        .slice(0, 3)
        .map(i => `- ${i.path} (${i.type})`)
        .join('\n'),
    };
  }
}

// Export for use in skill
module.exports = { RepoAnalyzer };

// CLI usage for testing
if (require.main === module) {
  const analyzer = new RepoAnalyzer();
  analyzer
    .analyze()
    .then(evidence => {
      console.log('\n📊 Repository Analysis Results:');
      console.log('Technologies:', evidence.technologies.length);
      console.log('Patterns:', evidence.patterns.length);
      console.log('Decisions:', evidence.decisions.length);
      console.log('Issues:', evidence.issues.length);
      console.log('\nFormatted Evidence:');
      console.log(analyzer.formatEvidence());
    })
    .catch(error => {
      console.error('Analysis failed:', error);
      process.exit(1);
    });
}

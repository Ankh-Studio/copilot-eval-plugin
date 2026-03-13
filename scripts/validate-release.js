#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function validatePackageJson() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (!packageJson.version) {
    throw new Error('package.json missing version');
  }

  if (!packageJson.name) {
    throw new Error('package.json missing name');
  }

  console.log('✅ package.json validation passed');
  return packageJson.version;
}

function validatePluginJson() {
  const pluginJson = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));

  if (!pluginJson.version) {
    throw new Error('plugin.json missing version');
  }

  if (!pluginJson.name) {
    throw new Error('plugin.json missing name');
  }

  if (!pluginJson.skills || pluginJson.skills.length === 0) {
    throw new Error('plugin.json missing skills or skills array is empty');
  }

  console.log('✅ plugin.json validation passed');
  return pluginJson.version;
}

function validateVersionConsistency() {
  const packageVersion = validatePackageJson();
  const pluginVersion = validatePluginJson();

  if (packageVersion !== pluginVersion) {
    throw new Error(
      `Version mismatch: package.json (${packageVersion}) != plugin.json (${pluginVersion})`
    );
  }

  // Check marketplace.json if it exists
  const marketplacePath = '.github/plugin/marketplace.json';
  if (fs.existsSync(marketplacePath)) {
    const marketplaceJson = JSON.parse(
      fs.readFileSync(marketplacePath, 'utf8')
    );
    const marketplaceVersion = marketplaceJson.metadata.version;

    if (marketplaceVersion !== packageVersion) {
      throw new Error(
        `Version mismatch: marketplace.json (${marketplaceVersion}) != package.json (${packageVersion})`
      );
    }

    console.log('✅ marketplace.json validation passed');
  }

  console.log(`✅ Version consistency validated: ${packageVersion}`);
  return packageVersion;
}

function validateRequiredFiles() {
  const requiredFiles = [
    'package.json',
    'plugin.json',
    'README.md',
    'CHANGELOG.md',
    'INSTALL.md',
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }

  console.log('✅ Required files validation passed');
}

function validateSkills() {
  const pluginJson = JSON.parse(fs.readFileSync('plugin.json', 'utf8'));

  for (const skillPath of pluginJson.skills) {
    const skillMdPath = skillPath.replace(/\/$/, '') + '/SKILL.md';

    if (!fs.existsSync(skillMdPath)) {
      throw new Error(`Skill documentation missing: ${skillMdPath}`);
    }
  }

  console.log(`✅ ${pluginJson.skills.length} skills validated`);
}

function validateChangelog(version) {
  const changelogPath = 'CHANGELOG.md';

  if (!fs.existsSync(changelogPath)) {
    throw new Error('CHANGELOG.md missing');
  }

  const content = fs.readFileSync(changelogPath, 'utf8');
  const versionPattern = new RegExp(`## \\[${version}\\]`, 'i');

  if (!versionPattern.test(content)) {
    throw new Error(`CHANGELOG.md missing entry for version ${version}`);
  }

  console.log('✅ CHANGELOG.md validation passed');
}

function main() {
  try {
    console.log('🔍 Validating release...\n');

    validateRequiredFiles();
    const version = validateVersionConsistency();
    validateSkills();
    validateChangelog(version);

    console.log(`\n✅ Release validation passed for version ${version}`);
    console.log('🚀 Ready for release!');
  } catch (error) {
    console.error(`\n❌ Release validation failed: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateRelease: main };

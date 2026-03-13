# Maintainers Guide

This guide covers everything maintainers need to know about publishing and managing the Copilot
Enterprise Evaluation Plugin.

## 🏗️ Architecture Overview

### How the Copilot CLI Marketplace Works

The GitHub Copilot CLI marketplace is **Git-based**, not API-based:

- **Marketplace = Git Repository**: Your `.github/plugin/marketplace.json` file makes your repo a
  marketplace
- **No Upload Required**: Users add your marketplace via
  `copilot plugin marketplace add Ankh-Studio/copilot-enterprise-eval-plugin`
- **Automatic Updates**: When you push to main, users get updates automatically
- **Installation**: Users install via `copilot plugin install copilot-enterprise-eval`

### Key Files

```
.github/plugin/marketplace.json    # Marketplace definition
package.json                      # Node.js package metadata
plugin.json                       # Plugin manifest
CHANGELOG.md                      # Release notes
.github/workflows/main.yml        # Automated release pipeline
```

## 🚀 Automated Release Pipeline

### How It Works

1. **PR to main**: Only runs `npm run format:check` and comments status
2. **Push to main**: Full automated release pipeline
   - Quality checks (format, validation, security audit)
   - Semantic versioning based on commit messages
   - Version updates across all files
   - Git tag creation
   - GitHub release with auto-generated notes
   - Marketplace package preparation

### Semantic Versioning Rules

The pipeline analyzes commit messages to determine version bumps:

- **Major**: `BREAKING CHANGE:` or `!` in commit (e.g., `feat!: new API`)
- **Minor**: `feat:` commits (e.g., `feat: add new evaluation skill`)
- **Patch**: `fix:` commits (e.g., `fix: resolve validation bug`)
- **No changes**: If no versioning commits detected

### What Happens Automatically

✅ **Version bumping**: Updates `package.json`, `plugin.json`, `marketplace.json` ✅ **Git
operations**: Commits changes and creates annotated tags ✅ **GitHub releases**: Creates releases
with auto-generated notes ✅ **Package preparation**: Creates
`copilot-enterprise-eval-plugin-vX.Y.Z.tar.gz` ✅ **Documentation updates**: Updates version
references in README.md

## 🔧 Manual Publishing Guide

### When to Use Manual Publishing

- **Pipeline failures**: When GitHub Actions has issues
- **Emergency releases**: Quick fixes outside normal workflow
- **Testing**: Testing version changes before committing
- **Custom releases**: Non-standard versioning requirements

### Manual Version Bump

1. **Update version files**:

```bash
# Update package.json
npm version 2.1.0 --no-git-tag-version

# Update plugin.json
sed -i '' 's/"version": "[^"]*"/"version": "2.1.0"/' plugin.json

# Update marketplace.json
sed -i '' 's/"version": "[^"]*"/"version": "2.1.0"/g' .github/plugin/marketplace.json

# Update README.md version references
sed -i '' 's/v[0-9]\+\.[0-9]\+\.[0-9]\+/v2.1.0/g' README.md
```

2. **Update CHANGELOG.md**:

```markdown
## [2.1.0] - 2025-03-13

### Added

- New evaluation skill for performance testing
- Enhanced batch processing capabilities

### Fixed

- Fixed validation bug in rubric testing
- Resolved memory leak in large evaluations
```

3. **Commit and tag**:

```bash
git add package.json plugin.json .github/plugin/marketplace.json README.md CHANGELOG.md
git commit -m "chore: bump version to 2.1.0"
git tag -a v2.1.0 -m "Release v2.1.0"
git push
git push --tags
```

4. **Create GitHub Release**:
   - Go to https://github.com/Ankh-Studio/copilot-enterprise-eval-plugin/releases
   - Click "Create a new release"
   - Select the `v2.1.0` tag
   - Copy changelog content into release notes
   - Attach the release archive if desired

### Manual Package Preparation

```bash
# Create marketplace package
mkdir -p marketplace-package

# Copy essential files
cp package.json plugin.json README.md CHANGELOG.md INSTALL.md marketplace-package/

# Copy directories
cp -r skills agents rubrics marketplace-package/

# Copy marketplace config
mkdir -p marketplace-package/.github/plugin
cp -r .github/plugin/* marketplace-package/.github/plugin/

# Create archive
tar -czf copilot-enterprise-eval-plugin-v2.1.0.tar.gz -C marketplace-package .
```

## 🔍 Validation & Troubleshooting

### Pre-Release Validation

Run the validation script:

```bash
chmod +x scripts/validate-release.js
node scripts/validate-release.js
```

This checks:

- ✅ Required files exist
- ✅ Version consistency across files
- ✅ Skills documentation present
- ✅ CHANGELOG.md has current version entry

### Common Issues

#### Version Mismatch

```bash
Error: Version mismatch: package.json (2.1.0) != plugin.json (2.0.0)
```

**Solution**: Update all version files to match before tagging.

#### Missing Changelog Entry

```bash
Error: CHANGELOG.md missing entry for version 2.1.0
```

**Solution**: Add changelog entry for the new version.

#### Git Tag Conflicts

```bash
Error: tag 'v2.1.0' already exists
```

**Solution**: Delete existing tag or use different version:

```bash
git tag -d v2.1.0
git push --delete origin v2.1.0
```

### Rollback Procedures

If a release has issues:

1. **Delete the tag**:

```bash
git tag -d v2.1.0
git push --delete origin v2.1.0
```

2. **Create hotfix version**:

```bash
npm version 2.1.1 --no-git-tag-version
# Update other files...
git commit -m "fix: hotfix for v2.1.0 issues"
git tag -a v2.1.1 -m "Hotfix v2.1.1"
git push --tags
```

3. **Update GitHub Release**:
   - Edit or delete the problematic release
   - Create new release with hotfix version

## 👥 User Installation Guide

### Adding the Marketplace

Users add your marketplace once:

```bash
copilot plugin marketplace add Ankh-Studio/copilot-enterprise-eval-plugin
```

### Installing the Plugin

```bash
# Install latest version
copilot plugin install copilot-enterprise-eval

# Install specific version
copilot plugin install copilot-enterprise-eval@v2.1.0
```

### Updating the Plugin

```bash
# Reinstall to get latest version
copilot plugin install copilot-enterprise-eval

# Check current version
copilot plugin list
```

### Removing the Plugin

```bash
copilot plugin remove copilot-enterprise-eval
```

## 📚 Reference Materials

### File Locations & Purposes

| File                              | Purpose                | Updated by Pipeline |
| --------------------------------- | ---------------------- | ------------------- |
| `package.json`                    | Node.js metadata       | ✅                  |
| `plugin.json`                     | Plugin manifest        | ✅                  |
| `.github/plugin/marketplace.json` | Marketplace definition | ✅                  |
| `CHANGELOG.md`                    | Release notes          | Manual              |
| `README.md`                       | Documentation          | ✅ (version refs)   |
| `scripts/validate-release.js`     | Validation script      | N/A                 |

### Command Reference

```bash
# Development
npm run format:check          # Check code formatting
npm run format:write          # Fix formatting
npm version patch|minor|major  # Update version

# Validation
node scripts/validate-release.js  # Validate release readiness

# Git Operations
git tag -a v1.2.3 -m "Release v1.2.3"  # Create annotated tag
git push --tags                         # Push tags to remote

# Package Creation
tar -czf plugin-v1.2.3.tar.gz -C marketplace-package .  # Create archive
```

### Workflow Examples

#### Standard Feature Release

1. Make changes with `feat:` commit messages
2. Push to main
3. Pipeline automatically bumps minor version and creates release

#### Bug Fix Release

1. Make changes with `fix:` commit messages
2. Push to main
3. Pipeline automatically bumps patch version and creates release

#### Breaking Change Release

1. Make changes with `BREAKING CHANGE:` or `!` in commit
2. Push to main
3. Pipeline automatically bumps major version and creates release

#### Manual Emergency Release

1. Follow manual publishing steps above
2. Bypass automated pipeline
3. Communicate changes to team

## 🆘 Getting Help

### Resources

- [GitHub Copilot CLI Documentation](https://docs.github.com/en/copilot)
- [Plugin Reference](https://docs.github.com/en/copilot/reference/cli-plugin-reference)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Team Communication

- Create issues for release problems
- Use discussions for questions
- Tag maintainers for urgent issues

---

**Last Updated**: 2025-03-13  
**Maintainers**: Matthew Van Dusen (matt@ankhstudio.com)

# React Repository Assessment Plugin

**Assess React repositories and receive UI/UX improvement pack recommendations for frontend teams.**

This plugin helps teams, especially those with non-designer engineers, improve frontend consistency
and accessibility through systematic repository analysis and targeted pack recommendations.

## 🎯 What Makes This Different

**React-Focused Assessment**: Specialized analysis for React + TypeScript repositories with specific
UI/UX pattern recognition.

**Pack-Based Recommendations**: Suggests proven frontend packs that address common non-designer
challenges like accessibility and consistency.

**Team Enablement Focus**: Designed for teams inheriting frontend work, providing clear guidance for
engineers without UI/UX backgrounds.

## 🚀 Why Choose React Repository Assessment?

- **🎯 Focused Analysis**: React-specific insights instead of generic evaluation
- **🛡️ Proven Patterns**: Pack recommendations based on real-world React projects
- **👥 Team Enablement**: Helps non-designer engineers create better UI
- **⚡ Quick Setup**: Get actionable insights in under 30 seconds
- **📋 Clear Next Steps**: Specific pack recommendations with implementation guidance

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [React Repository Assessment](#react-repository-assessment)
- [Quick Start](#quick-start)
- [Plugin Structure](#plugin结构)
- [Development](#development)
  - [Local Testing](#local-testing)
- [License](#license)
- [Support](#support)

## 📊 Plugin Skills Overview

This plugin provides **3 focused skills** for React repository assessment and team enablement:

### 🔍 Core Skills (3)

- `artifact` - Universal evaluation for React components and patterns
- `repo-assessment` - Comprehensive React repository analysis and technology detection
- `recommend-workspace-pack` - Frontend pack recommendations for React teams

## Installation

### 🚀 Quick Install (Recommended)

Install directly from GitHub - this is the fastest way to get started:

```bash
copilot plugin install Ankh-Studio/copilot-enterprise-eval-plugin
```

### 📦 Alternative Installation Methods

#### From Local Path

```bash
copilot plugin install ./copilot-enterprise-eval-plugin
```

#### From Specific Version

```bash
# Install a specific version
copilot plugin install Ankh-Studio/copilot-enterprise-eval-plugin@v2.0.0
```

#### From Marketplace (if available)

```bash
# If added to a marketplace
copilot plugin install copilot-enterprise-eval@marketplace-name
```

### ✅ Verification

After installation, verify the plugin is working:

```bash
# Test basic evaluation
/artifact --help

# List all available skills
copilot plugin list
```

### 🔄 Updates

To update to the latest version:

```bash
# Reinstall from GitHub (gets latest version)
copilot plugin install Ankh-Studio/copilot-enterprise-eval-plugin

# Or install specific version
copilot plugin install Ankh-Studio/copilot-enterprise-eval-plugin@v2.0.0
```

## Usage

### React Repository Assessment

```bash
# Assess your React repository
/repo-assessment

# Get pack recommendations for your React setup
/recommend-workspace-pack

# Evaluate specific React components
/artifact src/components/Button.tsx
```

### Example Output

```bash
Repository Assessment Results:
✅ React + TypeScript detected
✅ UI components found in src/components/
⚠️  No accessibility testing detected
⚠️  Inconsistent styling patterns

Recommended Packs:
- frontend-a11y-ux: Accessibility testing and patterns
- frontend-ui-radix-tailwind: Consistent UI components
```

## Plugin Structure

```
copilot-eval-plugin/
├── plugin.json              # Plugin manifest
├── skills/
│   ├── artifact/            # Component evaluation
│   ├── repo-assessment/      # Repository analysis
│   └── recommend-workspace-pack/  # Pack recommendations
├── packs/                    # Frontend guidance packs
└── README.md                # This file
```

## Development

### Local Testing

```bash
# Test repository assessment
/repo-assessment

# Test pack recommendations
/recommend-workspace-pack

# Test component evaluation
/artifact src/components/Button.tsx
```

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:

- Create an issue on GitHub
- Check the Copilot CLI Plugin Docs

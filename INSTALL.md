# Quick Installation Guide

## Install the Plugin

````bash
# From GitHub repository
copilot plugin install yourusername/copilot-eval-plugin

# Or from local directory
copilot plugin install ./copilot-eval-plugin
```bash

## Verify Installation

```bash
# List installed plugins
copilot plugin list

# Check available skills
copilot skills list

# Check available agents
copilot agent list
```bash

## Start Using

```bash
# Start Copilot CLI interactive session
copilot

# Evaluate an artifact
/artifact .github/prompts/my-prompt.prompt.md

# Use the evaluator agent
/agent evaluator
```bash

## What's Included

- **Evaluation Skill**: `/artifact` - Universal artifact evaluation
- **Evaluator Agent**: `/agent evaluator` - Specialized evaluation assistant
- **Automated Hooks**: Quality checks during generation/editing
- **9 Rubrics**: Structured evaluation criteria for all artifact types

The plugin automatically detects artifact types and applies the appropriate evaluation rubric.
````

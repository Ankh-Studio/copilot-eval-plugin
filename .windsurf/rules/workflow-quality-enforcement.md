---
trigger: globs
globs: workflows/**/*.md
---

# Workflow Quality Enforcement

Ensures all workflow definitions meet quality standards and are properly structured.

## Rule Logic

When any file matching `workflows/**/*.md` is created or modified, this rule validates:

### Required Structure

- YAML frontmatter with description
- Clear step-by-step process (Inspect, Analyze, Execute, Verify, Summarize)
- Input/output specifications for each step
- Example usage and execution commands

### Quality Checks

- **Completeness**: All 5 workflow steps present
- **Clarity**: Each step has clear inputs, actions, and outputs
- **Usability**: Examples are practical and executable
- **Consistency**: Follows workflow definition standards

### Validation Process

1. Parse workflow structure and metadata
2. Check for required sections and formatting
3. Validate step-by-step logic
4. Test example usability
5. Identify missing or unclear elements

## Enforcement Actions

- **Pass**: Workflow meets all quality standards
- **Warning**: Minor issues found, suggestions provided
- **Block**: Critical quality issues that must be fixed

## Example Violations

❌ **Missing Step Structure**

```
# Code Review Workflow
Reviews code for issues.
```

✅ **Proper Format**

````
---
description: Comprehensive code quality analysis workflow
---

# Code Review Workflow

## Steps

### 1. Inspect
- **Input**: Code path and review type
- **Action**: Analyze code structure and requirements
- **Output**: Code analysis and scope

### 2. Analyze
- **Input**: Code analysis
- **Action**: Apply quality criteria and identify issues
- **Output**: Detailed findings and recommendations

[Continue with Execute, Verify, Summarize steps...]

## Example Usage
```bash
/code-review-workflow --code-path src/ --type security
````

## Execution Command

```bash
node scripts/apply-pack.js code-review --path <code-path>
```

This rule maintains workflow quality and ensures consistent, actionable process definitions.

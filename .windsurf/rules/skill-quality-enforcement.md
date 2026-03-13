---
trigger: globs
globs: skills/**/*.md
---

# Skill Quality Enforcement

Ensures all skill definitions meet quality standards and are properly structured.

## Rule Logic

When any file matching `skills/**/*.md` is created or modified, this rule validates:

### Required Structure

- YAML frontmatter with name and description
- Clear purpose and scope definition
- Input/output specifications
- Usage examples and best practices

### Quality Checks

- **Completeness**: All required sections present
- **Clarity**: Purpose and functionality clearly explained
- **Usability**: Examples are practical and executable
- **Consistency**: Follows skill definition standards

### Validation Process

1. Parse skill structure and metadata
2. Check for required sections and formatting
3. Validate input/output specifications
4. Test example usability
5. Identify missing or unclear elements

## Enforcement Actions

- **Pass**: Skill meets all quality standards
- **Warning**: Minor issues found, suggestions provided
- **Block**: Critical quality issues that must be fixed

## Example Violations

❌ **Missing Input Specification**

```
# Code Review Skill
Reviews code for quality issues.
```

✅ **Proper Format**

```
---
name: code-review
description: Comprehensive code quality analysis
---

# Code Review Skill
Analyzes code for maintainability, security, and performance.

## Inputs
- **code_path**: Path to code files
- **review_type**: Type of review (security/performance/style)

## Outputs
- **quality_score**: Overall code quality rating
- **issues**: Detailed findings and recommendations
```

This rule maintains skill quality and ensures consistent, usable skill definitions.

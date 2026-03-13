---
trigger: globs
globs: rubrics/**/*.md
---

# Rubric Quality Enforcement

Ensures all evaluation rubrics meet quality standards and are free from common issues.

## Rule Logic

When any file matching `rubrics/**/*.md` is created or modified, this rule validates:

### Required Structure

- YAML frontmatter with metadata
- Clear evaluation criteria
- Weighted scoring system (0-4 scale)
- Evidence requirements

### Quality Checks

- **Clarity**: Criteria must be unambiguous and specific
- **Completeness**: All necessary evaluation aspects covered
- **Consistency**: Scoring logic must be coherent
- **Fairness**: No biased or subjective measures

### Validation Process

1. Parse rubric structure and metadata
2. Check for required sections and formatting
3. Validate scoring logic and weights
4. Identify potential biases or ambiguities
5. Provide specific improvement suggestions

## Enforcement Actions

- **Pass**: Rubric meets all quality standards
- **Warning**: Minor issues found, suggestions provided
- **Block**: Critical quality issues that must be fixed

## Example Violations

❌ **Missing Evidence Requirements**

```
- Clarity (25%): Is the prompt clear?
```

✅ **Proper Format**

```
- Clarity (25%): Unambiguous, specific, easily understood
  - Evidence: Quote unclear sections
  - Score: 0-4 based on ambiguity level
```

This rule maintains rubric quality and evaluation consistency across the plugin.

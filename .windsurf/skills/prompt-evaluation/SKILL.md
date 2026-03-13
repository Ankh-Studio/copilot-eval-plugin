---
name: prompt-evaluation
description: Specialized evaluation of prompt quality, clarity, and effectiveness
---

# Prompt Evaluation

Specialized prompt quality assessment with Chain-of-Verification methodology.

## Evaluation Criteria

- **Clarity** (25%): Unambiguous, specific, easily understood
- **Specificity** (25%): Clear expectations and constraints
- **Context** (20%): Relevant background and environment
- **Constraints** (15%): Clear boundaries and limitations
- **Examples** (15%): Illustrative examples and use cases

## Process

1. **Analyze**: Apply prompt-specific rubric criteria
2. **Verify**: Self-critique with 3 potential issues and evidence
3. **Revise**: Incorporate verified corrections
4. **Score**: Calculate weighted scores (0-4 scale)

## Usage

```bash
node scripts/apply-pack.js prompt --path <prompt-file>
```

## Example

```bash
node scripts/apply-pack.js prompt --path .github/prompts/api-design.prompt.md
```

Provides actionable feedback for prompt improvement with evidence-based analysis.

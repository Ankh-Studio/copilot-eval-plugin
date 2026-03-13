---
name: artifact-evaluation
description:
  Evaluate any Copilot artifact against its structured rubric with Chain-of-Verification methodology
---

# Artifact Evaluation

Evaluate any Copilot artifact against its structured rubric with verification.

## Process

1. **Analyze**: Apply appropriate rubric criteria to the artifact
2. **Verify**: Self-critique with 3 potential issues and evidence
3. **Revise**: Incorporate verified corrections
4. **Score**: Calculate weighted scores and provide feedback

**Required**: Complete verification stage before final assessment.

## Usage

Specify artifact path:

- `.github/prompts/name.prompt.md`
- `.github/skills/name/SKILL.md`
- `.github/workflows/name/WORKFLOW.md`
- And other artifact types

## Execution

To execute this evaluation, run:

```bash
node scripts/apply-pack.js artifact --path <artifact-path>
```

Auto-detects artifact type, loads rubric, provides actionable feedback.

## Example

```bash
node scripts/apply-pack.js artifact --path .github/prompts/code-review.prompt.md
```

This will perform a complete Chain-of-Verification evaluation with self-critique and evidence-based
scoring.

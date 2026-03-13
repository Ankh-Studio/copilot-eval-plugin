---
name: artifact
description: Evaluate any Copilot artifact against its rubric
---

# Artifact

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

## Example

````bash
/artifact .github/prompts/code-review.prompt.md
```bash

Auto-detects artifact type, loads rubric, provides actionable feedback.
````

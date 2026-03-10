---
name: evaluate-artifact
description: Evaluate any Copilot artifact against its corresponding rubric
---

Evaluate any Copilot artifact (prompt, instruction, skill, template, workflow, agent, context provider, validation rule, or integration pattern) against its structured rubric.

## Process

1. **Initial Analysis**: Read the artifact content and apply the appropriate rubric criteria
2. **Verification Stage**: Complete these verification steps:
   - List three specific ways your analysis could be incomplete, misleading, or incorrect
   - For each potential issue, cite specific evidence from the artifact content that either confirms or refutes the concern
   - Provide a revised analysis that incorporates verified corrections
3. **Final Evaluation**: Calculate weighted scores and provide comprehensive feedback
4. **Quality Assurance**: Review the final evaluation for consistency and actionability

Do not skip the verification stage. The evaluation must include self-critique before the final assessment.

## Usage

Specify the artifact file path:
- `.github/prompts/name.prompt.md`
- `.github/instructions/name.md`
- `.github/skills/name/SKILL.md`
- `.github/templates/name.template.md`
- `.github/workflows/name/WORKFLOW.md`
- `.github/agents/name/AGENT.md`
- `.github/context/name.context.md`
- `.github/validation/name.validation.md`
- `.github/integration/name.integration.md`

## Example Commands

```
/evaluate-artifact .github/prompts/code-review.prompt.md
/evaluate-artifact .github/skills/deploy/SKILL.md
/evaluate-artifact .github/workflows/ci-cd/WORKFLOW.md
```

The skill automatically detects the artifact type, loads the appropriate rubric, and provides a detailed evaluation with actionable feedback for improvement.

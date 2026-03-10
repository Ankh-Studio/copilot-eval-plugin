---
name: validate-rubrics
description: Apply adversarial stress-testing to validate and harden evaluation rubrics
---

Apply adversarial stress-testing to identify and fix vulnerabilities in evaluation rubrics before production deployment.

## Process

1. **Generate Edge Cases**: Create challenging artifacts that could break scoring logic
2. **Adversarial Analysis**: Attack the rubric with these steps:
   - Identify five specific ways the rubric could produce wrong, incomplete, or biased results
   - For each vulnerability, rate severity (Critical/High/Medium/Low) and likelihood (Likely/Possible/Unlikely)
   - Propose specific rubric revisions to address each issue
   - Provide the hardened version incorporating all improvements
3. **Validation Testing**: Test the hardened rubric against the edge cases
4. **Final Assessment**: Confirm rubric reliability and document remaining limitations

Be aggressive in finding problems - this is stress-testing, not validation. Focus on scenarios where the rubric might fail under adversarial conditions.

## Usage

Specify the rubric to validate:
- `rubrics/prompt.md` - Prompt evaluation rubric
- `rubrics/instruction.md` - Instruction evaluation rubric  
- `rubrics/skill.md` - Skill evaluation rubric
- `rubrics/template.md` - Template evaluation rubric
- `rubrics/workflow.md` - Workflow evaluation rubric
- `rubrics/agent.md` - Agent evaluation rubric
- `rubrics/context.md` - Context provider evaluation rubric
- `rubrics/validation.md` - Validation rule evaluation rubric
- `rubrics/integration.md` - Integration pattern evaluation rubric

## Example Commands

```
/validate-rubrics rubrics/prompt.md
/validate-rubrics rubrics/agent.md
```

This skill ensures rubric robustness by systematically identifying and addressing scoring vulnerabilities before they impact production evaluations.

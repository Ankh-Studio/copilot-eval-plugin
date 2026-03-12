---
name: eval-validate-rubrics
description: Validate and test evaluation rubrics for completeness and accuracy
---

Apply adversarial stress-testing to identify and fix vulnerabilities in evaluation rubrics.

## Process

1. **Generate Edge Cases**: Create challenging artifacts that could break scoring logic
2. **Adversarial Analysis**: Attack the rubric:
   - Identify 5+ ways rubric could produce wrong/incomplete/biased results
   - Rate severity (Critical/High/Medium/Low) and likelihood (Likely/Possible/Unlikely)
   - Propose specific rubric revisions for each issue
   - Provide hardened version with all improvements
3. **Validate**: Test hardened rubric against edge cases
4. **Assess**: Confirm reliability and document limitations

Be aggressive - this is stress-testing, not validation.

## Usage

```
/eval-validate-rubrics rubrics/prompt.md
/eval-validate-rubrics rubrics/skill.md --thorough
```

Focus on scenarios where rubric might fail under adversarial conditions.
- `rubrics/validation.md` - Validation rule evaluation rubric
- `rubrics/integration.md` - Integration pattern evaluation rubric

## Example Commands

```
/validate-rubrics rubrics/prompt.md
/validate-rubrics rubrics/agent.md
```

This skill ensures rubric robustness by systematically identifying and addressing scoring vulnerabilities before they impact production evaluations.

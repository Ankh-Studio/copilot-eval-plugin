---
name: validate-rubrics
description:
  Apply adversarial stress-testing to identify and fix vulnerabilities in evaluation rubrics
---

# Validate Rubrics

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

## Usage

```bash
node scripts/apply-pack.js validate-rubrics --path <rubric-file>
```

## Example

```bash
node scripts/apply-pack.js validate-rubrics --path rubrics/prompt.md
```

Be aggressive - this is stress-testing, not validation. Focus on scenarios where rubric might fail
under adversarial conditions.

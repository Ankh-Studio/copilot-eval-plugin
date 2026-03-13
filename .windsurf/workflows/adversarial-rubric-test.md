---
description: Stress-test rubrics against edge cases and adversarial scenarios
---

# Adversarial Rubric Test

Stress-test rubrics against edge cases and adversarial scenarios to eliminate scoring
vulnerabilities.

## Steps

### 1. Inspect

- **Input**: Rubric file path
- **Action**: Analyze rubric structure, criteria, and scoring logic
- **Output**: Rubric analysis and potential weak points

### 2. Analyze

- **Input**: Rubric content and structure
- **Action**: Generate edge cases and attack vectors:
  - Create challenging artifacts that could break scoring
  - Identify ambiguous criteria or subjective measures
  - Find potential bias or inconsistency points
- **Output**: Edge case scenarios and vulnerability list

### 3. Execute (Adversarial Testing)

- **Input**: Edge cases and vulnerability analysis
- **Action**: Systematic stress testing:
  - Test rubric against 5+ adversarial scenarios
  - Rate each issue by severity and likelihood
  - Document specific failures or inconsistencies
- **Output**: Vulnerability assessment with evidence

### 4. Verify

- **Input**: Vulnerability assessment results
- **Action**: Validate findings:
  - Confirm identified issues are genuine vulnerabilities
  - Test proposed fixes against edge cases
  - Ensure hardened rubric survives stress testing
- **Output**: Validated vulnerability report

### 5. Summarize

- **Input**: Final vulnerability assessment
- **Action**: Generate comprehensive report:
  - List of all identified vulnerabilities
  - Severity ratings and likelihood assessments
  - Hardened rubric with all improvements
  - Recommendations for ongoing validation
- **Output**: Actionable rubric improvement plan

## Inputs

- **rubric_path**: Path to the rubric file to test
- **test_depth**: Optional depth of testing (standard/thorough)

## Expected Outputs

- **vulnerability_report**: Complete assessment of rubric weaknesses
- **hardened_rubric**: Improved version addressing all issues
- **test_cases**: Edge cases used for validation
- **recommendations**: Ongoing quality assurance practices

## Example Usage

```bash
/adversarial-rubric-test --rubric-path rubrics/prompt.md --test-depth thorough
```

## Execution Command

```bash
node scripts/apply-pack.js validate-rubrics --path <rubric-file>
```

This workflow ensures rubric reliability by systematically identifying and addressing scoring
vulnerabilities before production deployment.

---
description: Enforce automated quality policies and standards across the development lifecycle
---

# Quality Gate Enforcement

Enforce automated quality policies and standards across the development lifecycle.

## Steps

### 1. Inspect

- **Input**: Artifact or change set to validate
- **Action**: Identify applicable quality gates and policies
- **Output**: Gate configuration and validation requirements

### 2. Analyze

- **Input**: Artifact content and quality gate rules
- **Action**: Comprehensive quality assessment:
  - Apply all relevant quality criteria
  - Check compliance with standards
  - Identify policy violations
- **Output**: Detailed compliance report

### 3. Execute (Gate Enforcement)

- **Input**: Compliance report and gate policies
- **Action**: Apply quality gate logic:
  - Pass/Fail determination based on thresholds
  - Block non-compliant changes
  - Generate violation details
- **Output**: Gate enforcement decision

### 4. Verify

- **Input**: Gate decision and violation details
- **Action**: Validation of enforcement:
  - Confirm gate logic applied correctly
  - Verify threshold calculations
  - Check for false positives/negatives
- **Output**: Validated gate result

### 5. Summarize

- **Input**: Final gate enforcement result
- **Action**: Generate gate report:
  - Pass/Fail status with reasons
  - Violation details and remediation steps
  - Compliance metrics and trends
- **Output**: Actionable quality gate report

## Inputs

- **target**: Artifact, commit, or change set to validate
- **gate_profile**: Optional specific quality gate profile
- **strict_mode**: Optional enforcement strictness level

## Expected Outputs

- **gate_status**: Pass/Fail determination
- **violation_report**: Detailed policy violations
- **remediation_guide**: Steps to achieve compliance
- **compliance_metrics**: Quality measurements and trends

## Example Usage

```bash
/quality-gate-enforcement --target .github/prompts/ --gate-profile strict
```

## Execution Command

```bash
node scripts/apply-pack.js quality-gates --target <target> --profile <gate-profile>
```

This workflow ensures consistent quality enforcement through automated policy validation and
gatekeeping.

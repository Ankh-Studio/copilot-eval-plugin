---
name: quality-gates
description: Enforce quality standards with automated gating and policy compliance
---

# Eval Quality Gates

Implement automated quality gates that enforce standards and prevent low-quality artifacts from
progressing.

## Process

1. **Define**: Load quality gate policies and thresholds
2. **Evaluate**: Apply rubrics with strict scoring requirements
3. **Enforce**: Apply pass/fail criteria based on quality thresholds
4. **Handle**: Manage waivers and special cases with approval workflows
5. **Report**: Generate audit trails and compliance documentation

## Gate Types

### Entry Gates

- Prompt Quality: Minimum 3.0/4.0 for production use
- Instruction Completeness: All mandatory sections, 2.5+ score
- Skill Functionality: Core functionality must exceed 3.0/4.0

### Progression Gates

- Template Reusability: Minimum 2.5/4.0 for cross-project use
- Workflow Reliability: Error handling scored 3.0+/4.0
- Agent Performance: Task specialization 3.0+/4.0

### Release Gates

- Integration Compatibility: All criteria 3.0+/4.0
- Context Accuracy: Data quality and relevance 3.5+/4.0
- Validation Coverage: Comprehensive scenario handling 3.0+/4.0

## Usage

### Single Check

````bash
/quality-gates .github/prompts/api-design.prompt.md --gate production
/quality-gates .github/skills/deploy/SKILL.md --gate release
```bash

### Bulk Enforcement

```bash
/quality-gates .github/ --all-gates --strict
/quality-gates .github/prompts/ --gate entry --batch
```bash

### Policy Configuration

```bash
/quality-gates --configure-policy organization-standards.json
/quality-gates --set-threshold prompt-min-score:3.2
```bash

## Gate Actions

- **PASS**: Artifact meets all quality criteria
- **FAIL**: Artifact below threshold - blocked from progression
- **WARN**: Artifact meets minimum but below recommended - proceed with caution
- **WAIVER**: Exception granted with documented justification

## Integration Features

- **CI/CD Integration**: Automated gate checks in deployment pipelines
- **Policy Management**: Centralized quality policy configuration
- **Audit Trails**: Complete history of gate decisions and waivers
- **Exception Workflows**: Structured approval processes for special cases

## Compliance Reporting

- **Quality Metrics**: Organizational quality trends and KPIs
- **Gate Performance**: Effectiveness of quality enforcement
- **Exception Analysis**: Waiver patterns and policy optimization
- **Compliance Status**: Audit-ready documentation for standards compliance

This skill ensures consistent quality enforcement across enterprise Copilot deployments with automated gating and comprehensive compliance tracking.
````

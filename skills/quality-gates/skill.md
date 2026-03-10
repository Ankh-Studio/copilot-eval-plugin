---
name: quality-gates
description: Enforce quality standards with automated gating and policy compliance
---

# Quality Gates Skill

Implement automated quality gates that enforce organizational standards and prevent low-quality artifacts from progressing through development pipelines.

## Process

1. **Policy Definition**: Load quality gate policies and thresholds
2. **Automated Evaluation**: Apply evaluation rubrics with strict scoring requirements
3. **Gate Enforcement**: Apply pass/fail criteria based on quality thresholds
4. **Exception Handling**: Manage waivers and special cases with approval workflows
5. **Compliance Reporting**: Generate audit trails and compliance documentation

## Quality Gate Types

### Entry Gates
- **Prompt Quality Gate**: Minimum 3.0/4.0 score required for production use
- **Instruction Completeness Gate**: All mandatory sections present and scored 2.5+
- **Skill Functionality Gate**: Core functionality must exceed 3.0/4.0

### Progression Gates
- **Template Reusability Gate: Minimum 2.5/4.0 for cross-project use
- **Workflow Reliability Gate: Error handling scored 3.0+/4.0
- **Agent Performance Gate: Task specialization 3.0+/4.0

### Release Gates
- **Integration Compatibility Gate: All compatibility criteria 3.0+/4.0
- **Context Accuracy Gate: Data quality and relevance 3.5+/4.0
- **Validation Coverage Gate: Comprehensive scenario handling 3.0+/4.0

## Usage

### Single Artifact Gate Check
```
/quality-gates .github/prompts/api-design.prompt.md --gate production
/quality-gates .github/skills/deploy/SKILL.md --gate release
```

### Bulk Quality Enforcement
```
/quality-gates .github/ --all-gates --strict
/quality-gates .github/prompts/ --gate entry --batch
```

### Policy Configuration
```
/quality-gates --configure-policy organization-standards.json
/quality-gates --set-threshold prompt-min-score:3.2
```

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

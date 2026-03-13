---
description: Comprehensive quality assessment for multiple artifacts with comparative analysis
---

# Batch Quality Assessment

Comprehensive quality assessment for multiple artifacts with comparative analysis and trend
reporting.

## Steps

### 1. Inspect

- **Input**: Directory path or artifact list
- **Action**: Identify all artifacts and classify by type
- **Output**: Artifact inventory and classification

### 2. Analyze

- **Input**: Artifact inventory and assessment scope
- **Action**: Parallel quality evaluation:
  - Apply appropriate rubrics to each artifact type
  - Calculate individual scores and metrics
  - Gather evidence for each assessment
- **Output**: Individual evaluation results

### 3. Execute (Comparative Analysis)

- **Input**: Individual evaluation results
- **Action**: Cross-artifact analysis:
  - Identify patterns and trends across artifacts
  - Compare performance between similar artifacts
  - Calculate aggregate quality metrics
- **Output**: Comparative analysis report

### 4. Verify

- **Input**: Comparative analysis results
- **Action**: Quality assurance validation:
  - Ensure consistent scoring across artifacts
  - Validate trend analysis accuracy
  - Check for assessment completeness
- **Output**: Validated assessment results

### 5. Summarize

- **Input**: Final assessment results
- **Action**: Generate comprehensive report:
  - Overall quality dashboard
  - Individual artifact scores and feedback
  - Trend analysis and recommendations
  - Priority improvement areas
- **Output**: Actionable quality assessment report

## Inputs

- **target_path**: Directory path or list of artifacts to assess
- **assessment_depth**: Optional depth of analysis (standard/comprehensive)

## Expected Outputs

- **quality_dashboard**: Overall quality metrics and trends
- **individual_reports**: Detailed assessment for each artifact
- **comparative_analysis**: Cross-artifact performance comparison
- **improvement_plan**: Prioritized recommendations

## Example Usage

```bash
/batch-quality-assessment --target-path .github/prompts --assessment-depth comprehensive
```

## Execution Command

```bash
node scripts/apply-pack.js batch-evaluation --directory <target-path> --format detailed
```

This workflow enables enterprise-scale quality assurance with parallel processing and comprehensive
comparative analysis.

---
name: batch-evaluation
description: Evaluate multiple artifacts simultaneously with comparative analysis
---

# Batch Evaluation Skill

Evaluate multiple Copilot artifacts in a single operation with comparative analysis and trend identification.

## Process

1. **Artifact Discovery**: Scan specified directories for target artifact types
2. **Parallel Evaluation**: Evaluate all artifacts using appropriate rubrics
3. **Comparative Analysis**: Identify patterns, outliers, and quality trends
4. **Executive Summary**: Provide high-level insights and recommendations
5. **Detailed Reports**: Generate individual and aggregate evaluation reports

## Usage

### Directory Batch Evaluation
```
/batch-evaluation .github/prompts/ --type prompt
/batch-evaluation .github/skills/ --type skill
/batch-evaluation .github/ --all
```

### Custom Artifact Selection
```
/batch-evaluation artifact1.md artifact2.md artifact3.md
```

### Comparative Reports
```
/batch-evaluation .github/prompts/ --compare --trend
/batch-evaluation .github/ --baseline v1.0 --target v2.0
```

## Output Formats

- **Executive Dashboard**: High-level quality metrics and trends
- **Detailed Analysis**: Individual artifact evaluations with verification
- **Comparative Insights**: Cross-artifact pattern identification
- **Improvement Roadmap**: Prioritized enhancement recommendations

## Advanced Features

- **Quality Trends**: Track quality changes over time
- **Benchmarking**: Compare against industry standards
- **Risk Assessment**: Identify high-risk artifacts requiring attention
- **Compliance Reporting**: Generate audit-ready quality documentation

This skill enables enterprise-scale quality assurance with efficient batch processing and strategic quality management.

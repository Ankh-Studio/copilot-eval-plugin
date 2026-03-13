---
name: batch
description: Evaluate multiple artifacts with comparative analysis and parallel processing
---

# Batch

Evaluate multiple Copilot artifacts efficiently with parallel processing, comparative analysis, and
executive reporting.

## Core Process

1. **Discovery**: Scan directories and identify target artifacts
2. **Parallel Evaluation**: Apply appropriate rubrics simultaneously
3. **Comparative Analysis**: Identify patterns, outliers, and trends
4. **Executive Reporting**: Generate summaries and detailed results

## Usage Examples

### Directory Scanning

````bash
/batch .github/prompts/ --type prompt
/batch .github/skills/ --type skill
/batch .github/ --all --recursive
```bash

### Custom Artifact Selection

```bash
/batch artifact1.md artifact2.md artifact3.md
/batch --glob "*.prompt.md" --exclude "test_*"
```bash

### Comparative Analysis

```bash
/batch .github/prompts/ --compare --baseline v1.0
/batch .github/ --trend --timeframe "last-30-days"
/batch .github/ --baseline v1.0 --target v2.0 --delta
```bash

### Performance Options

```bash
/batch .github/ --parallel --workers 8
/batch .github/ --cache --incremental
/batch .github/ --timeout 300 --retry-failed
```bash

## Output Formats

### Executive Dashboard

- Quality metrics and KPIs
- Trend analysis and comparisons
- Risk assessment and priorities
- Resource utilization reports

### Detailed Results

- Individual artifact evaluations
- Comparative insights and patterns
- Improvement recommendations
- Compliance status tracking

### Export Options

```bash
/batch .github/ --export json --file results.json
/batch .github/ --export csv --file metrics.csv
/batch .github/ --export pdf --report executive-summary
```bash

## Performance Features

- **Parallel Processing**: Evaluate multiple artifacts simultaneously
- **Smart Caching**: Avoid redundant evaluations
- **Incremental Updates**: Process only changed artifacts
- **Resource Management**: Optimize memory and CPU usage

Enables enterprise-scale quality assurance with efficient batch processing and comprehensive reporting.
````

# Evaluation Framework Guide

## Overview

This evaluation framework implements evidence-based rubric validation following the repo-assessment
pattern and agentskills.io specifications.

## Structure

```text
rubrics/evaluation-framework/
├── validate-rubrics.js          # Core rubric validation
├── adversarial-validation.js    # Security stress testing
├── agentskills-eval.js          # AgentSkills.io evaluation format
├── references/                   # Documentation and examples
│   ├── evaluation-guide.md      # This guide
│   ├── test-cases.md            # Sample test cases
│   └── best-practices.md        # Evaluation best practices
├── assets/                      # Templates and resources
│   ├── eval-config-template.json # AgentSkills config template
│   ├── rubric-template.md       # Evidence-based rubric template
│   └── validation-checklist.md  # Pre-validation checklist
└── scripts/                     # Automation scripts
    ├── run-full-validation.js   # Complete validation pipeline
    └── generate-reports.js      # Report generation utilities
```

## Usage

### Basic Rubric Validation

```bash
# Validate all rubrics
node rubrics/evaluation-framework/validate-rubrics.js

# Validate specific rubric
node rubrics/evaluation-framework/validate-rubrics.js rubrics/skill.md
```

### Adversarial Testing

```bash
# Run security validation
node rubrics/evaluation-framework/adversarial-validation.js

# Test specific rubric for vulnerabilities
node rubrics/evaluation-framework/adversarial-validation.js rubrics/skill.md
```

### AgentSkills Evaluation

```bash
# Create evaluation config
cp rubrics/evaluation-framework/assets/config-template.json my-eval.json

# Run evaluation
node rubrics/evaluation-framework/agentskills-eval.js my-eval.json ./workspace
```

### Complete Validation Pipeline

```bash
# Run full validation suite
node rubrics/evaluation-framework/scripts/run-full-validation.js
```

## Evidence-Based Scoring

### Core Principles

1. **Concrete Evidence Required**: Every score above 2.0 must have specific, verifiable evidence
2. **Quantitative Metrics**: Use numbers, percentages, and counts where possible
3. **Cross-Reference Validation**: Evidence must map directly to scoring criteria
4. **Confidence Scoring**: Evaluate evidence strength (High/Medium/Low)

### Evidence Types

- **Direct Quotes**: Exact text from the artifact
- **Quantitative Metrics**: Numbers, percentages, counts
- **Structural Evidence**: File organization, naming conventions
- **Functional Evidence**: Working code, test results
- **Process Evidence**: Workflow steps, methodology

### Validation Requirements

For scores 3-4, evaluators must provide:

1. **Specific Evidence**: Exact quotes or references
2. **Quantitative Metrics**: Numbers where applicable
3. **Cross-Reference**: How evidence maps to criteria
4. **Confidence Level**: Evidence strength assessment

## Security Validation

### Adversarial Testing Categories

1. **Keyword Stuffing**: Testing against generic evidence manipulation
2. **Vague Evidence Gaming**: Ensuring evidence specificity
3. **Score Inflation**: Preventing artificial score enhancement
4. **Edge Case Exploitation**: Boundary condition testing
5. **Contradictory Evidence**: Consistency validation
6. **Missing Evidence Handling**: Robustness to incomplete data
7. **Automation Bypass**: Preventing validation circumvention
8. **Weight Manipulation**: Ensuring fair weight distribution

### Resilience Scoring

- **90-100%**: Highly resilient, minimal vulnerabilities
- **80-89%**: Good resilience, minor issues
- **70-79%**: Moderate resilience, some vulnerabilities
- **60-69%**: Low resilience, significant issues
- **<60%**: Poor resilience, major vulnerabilities

## AgentSkills Integration

### Evaluation Format

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "Test prompt for the skill",
      "expected_output": "Description of expected result",
      "files": ["test-input.txt"],
      "assertions": [
        "The output file is valid JSON",
        "The analysis includes at least 3 recommendations",
        "Processing time is under 30 seconds"
      ]
    }
  ]
}
```

### Statistical Analysis

- **Pass Rate**: Percentage of assertions passed
- **Time Analysis**: Execution time with/without skill
- **Token Efficiency**: Token usage comparison
- **Pattern Detection**: Identify always-pass/fail assertions
- **Delta Analysis**: Skill improvement measurement

## Best Practices

### Rubric Design

1. **Clear Criteria**: Each criterion should be distinct and measurable
2. **Progressive Scoring**: Clear progression between score levels
3. **Specific Evidence**: Evidence requirements should be unambiguous
4. **Weight Balance**: Distribute weights meaningfully across criteria
5. **Automation Support**: Design for automated validation

### Evidence Requirements

1. **Be Specific**: Avoid vague terms like "good" or "appropriate"
2. **Quantify When Possible**: Use numbers, percentages, counts
3. **Provide Examples**: Show what good evidence looks like
4. **Cross-Reference**: Link evidence to specific criteria
5. **Validate Consistency**: Ensure evidence doesn't contradict

### Security Considerations

1. **Prevent Manipulation**: Design against gaming the system
2. **Validate Quality**: Ensure evidence has substance
3. **Check Consistency**: Validate evidence coherence
4. **Handle Edge Cases**: Prepare for pathological inputs
5. **Maintain Fairness**: Ensure balanced evaluation

## Troubleshooting

### Common Issues

1. **Validation Failures**: Check evidence requirements and weight distribution
2. **Security Vulnerabilities**: Review evidence specificity and validation logic
3. **Performance Issues**: Optimize assertion complexity and evaluation scope
4. **Inconsistent Results**: Review assertion clarity and evaluation criteria

### Debugging Tools

- **Validation Reports**: Detailed issue identification and recommendations
- **Security Reports**: Vulnerability analysis and remediation suggestions
- **Pattern Analysis**: Assertion behavior and optimization opportunities
- **Performance Metrics**: Execution time and resource usage analysis

## Migration Guide

### From Legacy Rubrics

1. **Add Evidence-Based Scoring Section**: Include validation requirements
2. **Update Evidence Requirements**: Make them specific and quantifiable
3. **Add Automation Support**: Include validation-friendly language
4. **Test Validation**: Run validation scripts to identify issues
5. **Security Testing**: Run adversarial validation to check robustness

### Validation Checklist

- [ ] Evidence-based scoring section present
- [ ] All criteria have 5 score levels (0-4)
- [ ] Weight distribution sums to 1.0
- [ ] Scores 3-4 have specific evidence requirements
- [ ] Evidence requirements are quantifiable
- [ ] No vague or generic evidence requirements
- [ ] Validation requirements section present
- [ ] Automated validation section present
- [ ] Security validation passes (>70% resilience)
- [ ] All validation tests pass (>80% score)

## Support

For questions or issues with the evaluation framework:

1. Check this guide for common solutions
2. Review validation reports for specific issues
3. Run security validation to identify vulnerabilities
4. Consult best practices for design guidance
5. Use troubleshooting tools for debugging

## Updates

The evaluation framework is continuously improved based on:

- Real-world usage feedback
- Security vulnerability discoveries
- Performance optimization needs
- AgentSkills.io specification updates
- Community contributions and suggestions

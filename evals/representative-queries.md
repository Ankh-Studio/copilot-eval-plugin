# Representative Evaluation Queries

This file contains representative queries for testing the copilot-eval-plugin functionality across
different skill categories and use cases.

## Core Evaluation Skills

### Single Artifact Evaluation

````bash
/artifact .github/prompts/code-review.prompt.md
/prompt .github/prompts/feature-generation.prompt.md
/skill skills/artifact/SKILL.md
/instruction .github/instructions/coding-standards.instructions.md
/template .github/templates/issue-response.template.md
/workflow .github/workflows/evaluation.workflow.md
/agent .github/agents/code-reviewer.agent.md
/context .github/contexts/project-context.context.md
/validation .github/validation-rules/code-quality.validation.md
/integration .github/integrations/github-integration.integration.md
```bash

### Batch Evaluation

```bash
/batch .github/prompts/
/batch --parallel skills/
/batch --comparative .github/prompts/ --baseline v1.0
```bash

### Quality Gates

```bash
/quality-gates --pre-deploy .github/prompts/
/quality-gates --compliance --report detailed
/quality-gates --threshold strict skills/
```bash

### Performance Testing

```bash
/performance --benchmark .github/prompts/
/performance --optimize --cache-results
/performance --stress-test --concurrent 10
```bash

## Advanced Evaluation Skills

### Improvement Recommendations

```bash
/improve .github/prompts/code-review.prompt.md --focus=clarity
/improve skills/artifact/SKILL.md --comprehensive
/improve --batch .github/prompts/ --priority high
```bash

### Debate and Analysis

```bash
/debate .github/prompts/code-review.prompt.md vs .github/prompts/feature-generation.prompt.md
/debate --criteria effectiveness,clarity .github/prompts/
/debate --consensus --multiple-evaluators skills/
```bash

### Rubric Validation

```bash
/validate-rubrics rubrics/prompt-evaluation.md
/validate-rubrics --thorough rubrics/skill-evaluation.md
/validate-rubrics --stress-test rubrics/
```bash

## Security and Quality Assurance

### Adversarial Testing

```bash
/adversarial --full-suite --target rubrics/
/adversarial --attack-pattern scoring --rubric prompt.md
/adversarial --stress-test performance --skill eval-batch
/adversarial --smoke-test --critical-only
```bash

### Regression Testing

```bash
/regression --full --baseline v1.0
/regression --scoring-consistency --artifact-type prompt
/regression --performance --skill eval-batch
/regression --pre-release --threshold strict
```bash

### TL;DR Summaries

```bash
/tldr .github/prompts/code-review.prompt.md
/tldr --batch .github/prompts/
/tldr --detailed --findings evaluation-results.json
```bash

## Edge Cases and Stress Testing

### Empty/Invalid Inputs

```bash
/artifact non-existent-file.md
/batch empty-directory/
/quality-gates --threshold invalid
/performance --stress-test --concurrent 1000
```bash

### Large Scale Testing

```bash
/batch --parallel --recursive .github/
/adversarial --comprehensive --report detailed
/regression --full-suite --all-artifacts
```bash

### Concurrent Operations

```bash
/performance --benchmark --concurrent 5 &
/quality-gates --pre-deploy .github/prompts/ &
/adversarial --smoke-test &
```bash

## Integration Testing

### Cross-Skill Workflows

```bash
/artifact .github/prompts/code-review.prompt.md
/improve .github/prompts/code-review.prompt.md --focus=clarity
/quality-gates --pre-deploy .github/prompts/code-review.prompt.md
/tldr .github/prompts/code-review.prompt.md
```bash

### End-to-End Pipelines

```bash
/batch .github/prompts/ --comparative
/quality-gates --compliance --report detailed
/regression --pre-release --threshold strict
/adversarial --smoke-test --critical-only
```bash

## Expected Outcomes

### Successful Evaluations Should

- Return scores between 1.0-4.0
- Provide detailed feedback and recommendations
- Generate consistent results across multiple runs
- Complete within reasonable time limits
- Handle errors gracefully with informative messages

### Quality Gates Should

- Block deployments that don't meet thresholds
- Generate compliance reports
- Provide clear pass/fail criteria
- Include remediation recommendations

### Performance Tests Should

- Benchmark evaluation speed and resource usage
- Identify bottlenecks and optimization opportunities
- Support concurrent operations
- Maintain accuracy under load

### Security Tests Should

- Identify scoring manipulation vulnerabilities
- Test edge cases and boundary conditions
- Validate input sanitization
- Ensure consistent behavior under adversarial conditions

These queries serve as the foundation for comprehensive testing and validation of the copilot-eval-plugin functionality.
````

# Coexistence Tests for Overlapping Skills

This file defines tests to verify that overlapping skills can coexist without conflicts and provide
complementary value.

## Overlap Categories

### 1. General vs Specialized Evaluators

**Skills:**

- `evaluate-artifact` (general)
- `evaluate-prompt`, `evaluate-skill`, `evaluate-instruction`, etc. (specialized)

**Test Cases:**

````bash
# Test that both can evaluate the same file with different perspectives
/artifact .github/prompts/code-review.prompt.md
/prompt .github/prompts/code-review.prompt.md

# Verify complementary insights
/artifact skills/artifact/SKILL.md
/skill skills/artifact/SKILL.md

# Cross-type evaluation
/artifact .github/instructions/coding-standards.instructions.md
/instruction .github/instructions/coding-standards.instructions.md
```bash

**Expected Results:**

- General evaluator provides overall quality assessment
- Specialized evaluator provides domain-specific insights
- Scores should be in similar ranges but with different focus areas
- No conflicts or interference between skills

### 2. Batch vs Individual Processing

**Skills:**

- `eval-batch` (batch processing)
- Individual evaluation skills

**Test Cases:**

```bash
# Batch vs individual consistency
/batch .github/prompts/
/prompt .github/prompts/code-review.prompt.md
/prompt .github/prompts/feature-generation.prompt.md

# Performance comparison
/batch --parallel .github/prompts/
# Time individual evaluations for comparison

# Report consistency
/batch --comparative .github/prompts/ --baseline v1.0
# Compare with individual evaluation trends
```bash

**Expected Results:**

- Batch results should aggregate individual results accurately
- Performance should be better in batch mode
- No data loss or corruption in batch processing
- Consistent scoring between batch and individual modes

### 3. Quality Gates vs Evaluation Skills

**Skills:**

- `eval-quality-gates` (quality enforcement)
- All evaluation skills (quality assessment)

**Test Cases:**

```bash
# Quality gates after evaluation
/artifact .github/prompts/code-review.prompt.md
/quality-gates --pre-deploy .github/prompts/code-review.prompt.md

# Batch quality gates
/batch .github/prompts/
/quality-gates --compliance --report detailed

# Threshold enforcement
/quality-gates --threshold strict .github/prompts/
# Verify low-scoring items are blocked
```bash

**Expected Results:**

- Quality gates should use evaluation scores for decisions
- Clear pass/fail criteria based on evaluation results
- Consistent application of thresholds
- Detailed reporting of compliance status

### 4. Performance vs Functionality

**Skills:**

- `eval-performance` (performance optimization)
- All other skills (functionality)

**Test Cases:**

```bash
# Performance impact on other skills
/performance --benchmark .github/prompts/
/prompt .github/prompts/code-review.prompt.md

# Caching effects
/performance --optimize --cache-results
# Re-run evaluations to verify caching works

# Concurrent operations
/performance --stress-test --concurrent 5
/quality-gates --pre-deploy .github/prompts/ &
```bash

**Expected Results:**

- Performance optimization shouldn't affect accuracy
- Caching should improve speed without changing results
- Concurrent operations should maintain consistency
- No resource conflicts between skills

### 5. Improvement vs Evaluation

**Skills:**

- `eval-improve` (improvement recommendations)
- Evaluation skills (assessment)

**Test Cases:**

```bash
# Evaluation before and after improvement
/artifact .github/prompts/code-review.prompt.md
/improve .github/prompts/code-review.prompt.md --focus=clarity
/artifact .github/prompts/code-review.prompt.md

# Batch improvement cycles
/batch .github/prompts/
/improve --batch .github/prompts/ --priority high
/batch .github/prompts/ --comparative

# Improvement validation
/improve skills/artifact/SKILL.md
/skill skills/artifact/SKILL.md
```bash

**Expected Results:**

- Improvements should lead to better evaluation scores
- Recommendations should be actionable and specific
- No degradation in core functionality
- Clear before/after comparison metrics

### 6. Debate vs Consensus

**Skills:**

- `eval-debate` (comparative analysis)
- Individual evaluations (independent assessment)

**Test Cases:**

```bash
# Debate vs individual evaluations
/debate .github/prompts/code-review.prompt.md vs .github/prompts/feature-generation.prompt.md
/prompt .github/prompts/code-review.prompt.md
/prompt .github/prompts/feature-generation.prompt.md

# Multi-evaluator consensus
/debate --consensus --multiple-evaluators .github/prompts/
# Compare with individual evaluation results

# Criteria-specific debate
/debate --criteria effectiveness,clarity .github/prompts/
# Verify criteria alignment with individual evaluations
```bash

**Expected Results:**

- Debate should provide deeper insights than individual evaluations
- Consensus mechanisms should resolve conflicts
- Criteria analysis should align with evaluation rubrics
- Enhanced understanding through comparative analysis

### 7. Validation vs Application

**Skills:**

- `eval-validate-rubrics` (rubric validation)
- Evaluation skills (rubric application)

**Test Cases:**

```bash
# Rubric validation before use
/validate-rubrics rubrics/prompt-evaluation.md
/prompt .github/prompts/code-review.prompt.md --rubric rubrics/prompt-evaluation.md

# Validation feedback integration
/validate-rubrics --thorough rubrics/skill-evaluation.md
# Apply improved rubric to evaluations

# Stress testing validation
/validate-rubrics --stress-test rubrics/
# Verify robustness under edge cases
```bash

**Expected Results:**

- Validated rubrics should produce more consistent results
- Validation feedback should improve evaluation quality
- Stress testing should identify rubric weaknesses
- Clear link between validation findings and evaluation improvements

### 8. Security vs Functionality

**Skills:**

- `eval-adversarial` (security testing)
- All evaluation skills (core functionality)

**Test Cases:**

```bash
# Adversarial testing of evaluations
/adversarial --attack-pattern scoring --rubric prompt.md
/prompt .github/prompts/code-review.prompt.md

# Stress testing core skills
/adversarial --stress-test performance --skill eval-batch
/batch .github/prompts/

# Security validation
/adversarial --smoke-test --critical-only
# Verify all skills still function after security tests
```bash

**Expected Results:**

- Security tests shouldn't break core functionality
- Identified vulnerabilities should be addressable
- Performance under stress should remain acceptable
- No security-related regressions in evaluations

### 9. Regression vs Progress

**Skills:**

- `eval-regression` (regression testing)
- All evaluation skills (current functionality)

**Test Cases:**

```bash
# Baseline establishment
/regression --full --baseline v1.0
/artifact .github/prompts/code-review.prompt.md

# Regression detection
/regression --scoring-consistency --artifact-type prompt
# Verify score consistency across runs

# Performance regression
/regression --performance --skill eval-batch
# Monitor performance over time
```bash

**Expected Results:**

- Regression tests should catch quality degradation
- Performance metrics should remain stable
- Consistent scoring across evaluation runs
- Clear baseline for future comparisons

### 10. Summary vs Detail

**Skills:**

- `eval-tldr` (summary generation)
- Evaluation skills (detailed analysis)

**Test Cases:**

```bash
# TL;DR vs full evaluation
/artifact .github/prompts/code-review.prompt.md
/tldr .github/prompts/code-review.prompt.md

# Batch summaries
/batch .github/prompts/
/tldr --batch .github/prompts/

# Detailed summaries
/tldr --detailed --findings evaluation-results.json
# Verify summary captures key insights
```bash

**Expected Results:**

- Summaries should accurately reflect detailed evaluations
- Key scores and findings should be preserved
- Actionable insights should be maintained
- No loss of critical information in summarization

## Conflict Resolution Tests

### Priority Hierarchies

```bash
# Test that quality gates can override other skills
/quality-gates --threshold strict .github/prompts/
/improve .github/prompts/code-review.prompt.md
# Verify gates still enforce standards

# Test that security tests take precedence
/adversarial --critical-only
/performance --optimize
# Verify security isn't compromised for performance
```bash

### Resource Competition

```bash
# Concurrent skill execution
/batch --parallel .github/prompts/ &
/quality-gates --compliance &
/performance --benchmark &
# Verify no resource conflicts

# Memory stress testing
/adversarial --stress-test performance
/regression --full-suite
# Verify graceful handling of resource constraints
```bash

## Expected Coexistence Behaviors

### Positive Interactions

- Skills should enhance each other's capabilities
- Shared data and insights should improve overall quality
- Complementary perspectives should provide comprehensive analysis

### Neutral Interactions

- Skills should operate independently when appropriate
- No interference between unrelated functionalities
- Clean separation of concerns

### Controlled Conflicts

- Quality gates should override when standards aren't met
- Security tests should take precedence over performance
- Regression tests should block releases with quality issues

These tests ensure that the copilot-eval-plugin skills can work together harmoniously while maintaining their individual effectiveness and contributing to overall evaluation quality.
````

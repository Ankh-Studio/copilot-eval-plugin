


name: eval-regression
description: Automated regression testing for evaluation quality and consistency

---




Execute automated regression testing to ensure evaluation quality and consistency across versions and prevent performance degradation.

## Process

1. **Baseline Capture**: Establish evaluation baseline from previous stable version
2. **Regression Analysis**: Compare current evaluations against baseline metrics
3. **Consistency Check**: Verify scoring consistency across similar artifacts
4. **Performance Impact**: Measure evaluation speed and resource usage changes
5. **Quality Assurance**: Ensure no degradation in evaluation accuracy

## Test Categories

### Scoring Consistency

- Same artifact scoring within 0.1 points across runs
- Similar artifacts receiving comparable scores
- No scoring drift over time
- Consistent rubric application

### Performance Regression

- Evaluation time within 10% of baseline
- Memory usage within 15% of baseline
- No new timeout failures
- Stable throughput rates

### Quality Regression

- Evaluation accuracy maintained or improved
- No increase in false positives/negatives
- Consistent feedback quality
- Stable verification outcomes

## Usage

### Full Regression Suite

```bash
/eval-regression --full --baseline v1.0
/eval-regression --comprehensive --report detailed
```bash

### Targeted Testing

```bash
/eval-regression --scoring-consistency --artifact-type prompt
/eval-regression --performance --skill eval-batch
```bash

### Quick Validation

```bash
/eval-regression --smoke-test --critical-only
/eval-regression --pre-release --threshold strict
```bash

## Baselines

### Scoring Baselines

- Prompt evaluation: 3.2±0.2 average score
- Skill evaluation: 3.5±0.1 average score
- Template evaluation: 3.4±0.15 average score

### Performance Baselines

- Single artifact: <2 seconds
- Batch processing: 10x improvement over sequential
- Memory usage: <100MB per evaluation
- Parallel efficiency: >90% CPU utilization

## Thresholds

### Critical Failures

- Scoring variance >0.3 points
- Performance degradation >25%
- Quality score drop >0.5 points
- Timeout rate >5%

### Warning Thresholds

- Scoring variance >0.2 points
- Performance degradation >15%
- Quality score drop >0.3 points
- Timeout rate >2%

## Output

- Regression test results summary
- Performance impact analysis
- Quality consistency metrics
- Recommendations for fixes
- Release readiness status

## Integration

Automatically runs before releases and can be integrated into CI/CD pipelines for continuous quality assurance.

Failures block release progression and require remediation before deployment.

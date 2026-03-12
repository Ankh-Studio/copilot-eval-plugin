---
name: eval-adversarial
description: Run comprehensive adversarial evaluation suite with attack patterns and stress testing
---

Execute comprehensive adversarial evaluation suite with attack patterns, edge cases, and stress testing to identify vulnerabilities before production deployment.

## Process

1. **Attack Vector Generation**: Create malicious/edge-case artifacts targeting specific rubric weaknesses
2. **Pattern Analysis**: Identify systematic scoring biases and exploitation opportunities
3. **Stress Testing**: Apply extreme inputs, boundary conditions, and adversarial prompts
4. **Vulnerability Assessment**: Rate and categorize discovered weaknesses
5. **Hardening Recommendations**: Generate specific fixes and mitigations

## Attack Patterns

### Scoring Manipulation
- Score inflation through keyword stuffing
- Boundary exploitation for maximum/minimum scores
- Pattern matching to trigger specific scoring paths
- Context manipulation to bias evaluation

### Edge Case Generation
- Empty/minimal content testing
- Maximum length/complexity artifacts
- Ambiguous or contradictory instructions
- Cross-domain boundary testing

### Adversarial Prompts
- Jailbreak attempts and bypass techniques
- Role-playing to influence evaluation
- Prompt injection vulnerabilities
- Social engineering tactics

## Stress Testing

### Performance Stress
- Concurrent evaluation limits
- Memory usage thresholds
- Processing time boundaries
- Resource exhaustion scenarios

### Quality Stress
- Extreme quality variations
- Mixed signal artifacts
- Contradictory requirements
- Ambiguous evaluation criteria

## Usage

### Full Suite
```
/eval-adversarial --full-suite --target rubrics/
/eval-adversarial --comprehensive --report detailed
```

### Targeted Testing
```
/eval-adversarial --attack-pattern scoring --rubric prompt.md
/eval-adversarial --stress-test performance --skill eval-batch
```

### Quick Validation
```
/eval-adversarial --smoke-test --critical-only
/eval-adversarial --regression --baseline v1.0
```

## Output

- Vulnerability severity matrix
- Attack success rates by pattern
- Performance degradation metrics
- Hardening priority recommendations
- Release readiness assessment

## Release Gating

### Quality Gates
- Zero critical vulnerabilities
- <5% high-severity issues
- Performance degradation <10%
- Coverage >95% for attack patterns

### Thresholds
- Minimum adversarial score: 3.5/4.0
- Maximum false positive rate: 2%
- Minimum stress test pass rate: 90%
- Maximum regression impact: 5%

Failures trigger automatic remediation workflows and block release progression.

Execute before any production deployment to ensure robustness against adversarial attacks.

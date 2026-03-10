---
name: iterative-improvement
description: Automated workflow for evaluation and improvement chaining
---

Execute a complete iterative improvement workflow that evaluates artifacts, applies targeted improvements, and verifies results through multiple cycles until quality targets are met.

## Workflow Stages

### Stage 1: Baseline Evaluation
- Run comprehensive evaluation using appropriate rubric
- Document baseline scores and identify improvement areas
- Set quality targets based on artifact type and requirements

### Stage 2: Improvement Cycles
For each cycle (maximum 3 iterations by default):
1. **Targeted Improvements**: Apply focused enhancements to lowest-scoring areas
2. **Compatibility Check**: Ensure changes don't break existing functionality
3. **Progress Evaluation**: Re-assess scores and measure improvements
4. **Convergence Check**: Stop if targets met or improvements plateau

### Stage 3: Final Verification
- Comprehensive evaluation with Chain-of-Verification
- Comparison report showing before/after scores
- Recommendations for further improvements if needed

## Usage

```bash
# Basic iterative improvement
/iterative-improvement .github/prompts/api-design.prompt.md

# With custom targets and cycles
/iterative-improvement .github/skills/deploy/SKILL.md --target=3.5 --cycles=5

# Focus on specific criteria
/iterative-improvement .github/workflows/ci-cd/WORKFLOW.md --focus="functionality,error-handling"

# Batch improvement across multiple artifacts
/iterative-improvement --directory=.github/prompts --target=3.0 --cycles=2
```

## Configuration Options

- **target**: Minimum acceptable score (default: 3.0)
- **cycles**: Maximum improvement iterations (default: 3)
- **focus**: Specific criteria to prioritize (default: all low-scoring areas)
- **threshold**: Minimum improvement per cycle to continue (default: 0.2)
- **preserve**: Elements that must remain unchanged (default: core functionality)

## Quality Gates

The workflow automatically stops when:
- Target score achieved across all criteria
- No significant improvement in consecutive cycles
- Maximum cycle limit reached
- Critical compatibility issues detected

## Reporting

Provides comprehensive reports including:
- Baseline vs final score comparison
- Detailed improvement log per cycle
- Compatibility and impact assessment
- Recommendations for further enhancement

This workflow automates the complete evaluation-improvement-verification cycle, ensuring systematic quality enhancement while maintaining artifact integrity and functionality.

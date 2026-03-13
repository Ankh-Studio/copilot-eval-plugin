---
description: Continuous improvement workflow for artifact refinement through evaluation cycles
---

# Iterative Improvement Cycle

Continuous improvement workflow for artifact refinement through evaluation cycles.

## Steps

### 1. Inspect

- **Input**: Artifact path and improvement goals
- **Action**: Analyze current state and identify improvement opportunities
- **Output**: Baseline assessment and improvement targets

### 2. Analyze

- **Input**: Artifact content and improvement targets
- **Action**: Detailed evaluation with specific feedback:
  - Apply comprehensive rubric assessment
  - Identify specific areas needing improvement
  - Generate actionable recommendations
- **Output**: Detailed improvement roadmap

### 3. Execute (Improvement Implementation)

- **Input**: Improvement roadmap and artifact
- **Action**: Implement targeted improvements:
  - Apply specific recommendations
  - Refine content based on feedback
  - Maintain core functionality while enhancing quality
- **Output**: Improved artifact version

### 4. Verify

- **Input**: Improved artifact and original baseline
- **Action**: Comparative evaluation:
  - Re-evaluate improved artifact
  - Compare scores against baseline
  - Validate improvement effectiveness
- **Output**: Improvement validation report

### 5. Summarize

- **Input**: Complete improvement cycle results
- **Action**: Generate improvement summary:
  - Before/after quality comparison
  - Implemented changes and their impact
  - Recommendations for further cycles
- **Output**: Complete improvement documentation

## Inputs

- **artifact_path**: Path to artifact for improvement
- **improvement_goals**: Optional specific areas to focus on
- **max_cycles**: Optional maximum improvement iterations

## Expected Outputs

- **improvement_history**: Record of all improvement cycles
- **quality_progression**: Score improvements over time
- **final_artifact**: Optimized version of the artifact
- **cycle_recommendations**: Further improvement suggestions

## Example Usage

```bash
/iterative-improvement-cycle --artifact-path .github/prompts/code-review.prompt.md --max-cycles 3
```

## Execution Command

```bash
node scripts/apply-pack.js improve-artifact --path <artifact-path> --cycles <max-cycles>
```

This workflow enables systematic artifact improvement through iterative evaluation and refinement
cycles.

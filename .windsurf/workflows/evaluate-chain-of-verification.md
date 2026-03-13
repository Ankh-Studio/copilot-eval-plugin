---
description: Complete evaluation workflow with self-critique and evidence-based analysis
---

# Evaluate Chain-of-Verification

Complete evaluation workflow with self-critique and evidence-based analysis.

## Steps

### 1. Inspect

- **Input**: Artifact path (prompt, skill, workflow, agent, etc.)
- **Action**: Identify artifact type and load appropriate rubric
- **Output**: Artifact classification and selected evaluation criteria

### 2. Analyze

- **Input**: Artifact content and evaluation rubric
- **Action**: Apply rubric criteria systematically:
  - Assess each category (clarity, specificity, functionality, etc.)
  - Gather specific evidence from artifact content
  - Calculate initial scores (0-4 scale)
- **Output**: Initial evaluation with evidence and scores

### 3. Execute (Verification Stage)

- **Input**: Initial evaluation results
- **Action**: Perform mandatory self-critique:
  - Identify 3 potential issues with the analysis
  - Cite specific evidence for each concern
  - Revise scores based on verified corrections
- **Output**: Verified evaluation with corrections

### 4. Verify

- **Input**: Verified evaluation results
- **Action**: Quality assurance check:
  - Ensure all required categories are assessed
  - Verify evidence citations are accurate
  - Confirm scoring consistency
- **Output**: Final validated evaluation

### 5. Summarize

- **Input**: Final evaluation results
- **Action**: Generate comprehensive summary:
  - Overall score and performance level
  - Priority improvement recommendations
  - Specific examples and action items
- **Output**: Actionable evaluation report

## Inputs

- **artifact_path**: Path to the artifact to evaluate
- **rubric_type**: Optional specific rubric to use

## Expected Outputs

- **evaluation_report**: Comprehensive analysis with scores
- **improvement_recommendations**: Specific actionable feedback
- **quality_metrics**: Performance indicators and trends

## Example Usage

```bash
/evaluate-chain-of-verification --artifact-path .github/prompts/code-review.prompt.md
```

## Execution Command

```bash
node scripts/apply-pack.js artifact --path <artifact-path>
```

This workflow ensures systematic, evidence-based evaluation with mandatory self-critique for higher
accuracy.

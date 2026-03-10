---
name: improve-artifact
description: Improve Copilot artifacts based on rubric evaluation feedback
---

Improve any Copilot artifact by applying targeted enhancements based on rubric evaluation results. This skill reads previous evaluation feedback and generates specific improvements while preserving the original intent.

## Process

1. **Analysis Phase**:
   - Read the target artifact
   - Check for existing evaluation results (look for recent evaluation output)
   - Identify improvement opportunities based on rubric criteria scoring < 3.0

2. **Improvement Strategy**:
   - For each low-scoring area, generate specific, actionable improvements
   - Apply the same rubric criteria used in evaluation
   - Preserve original intent and core functionality
   - Ensure improvements don't break existing dependencies

3. **Enhancement Application**:
   - Rewrite the artifact with improvements
   - Maintain original structure and format
   - Add comments or annotations explaining key changes
   - Ensure backward compatibility where applicable

4. **Quality Verification**:
   - Review improvements against rubric criteria
   - Estimate expected score improvements
   - Identify any potential trade-offs or side effects

## Usage

Specify the artifact file path and optional focus areas:

```
/improve-artifact .github/prompts/code-review.prompt.md
/improve-artifact .github/skills/deploy/SKILL.md --focus="clarity,specificity"
/improve-artifact .github/workflows/ci-cd/WORKFLOW.md --focus="all"
```

## Focus Areas

- **clarity**: Enhance clarity and reduce ambiguity
- **specificity**: Add precise requirements and constraints  
- **context**: Improve contextual information and background
- **actionability**: Make outputs more actionable and implementable
- **reusability**: Enhance cross-scenario applicability
- **functionality**: Improve core functionality and effectiveness
- **documentation**: Enhance instructions and examples
- **error-handling**: Strengthen error management
- **testing**: Improve test coverage and validation
- **integration**: Enhance system compatibility
- **all**: Apply comprehensive improvements across all criteria

## Chaining Example

```
# 1. Evaluate current state
/evaluate-artifact .github/prompts/api-design.prompt.md

# 2. Apply targeted improvements
/improve-artifact .github/prompts/api-design.prompt.md --focus="clarity,specificity"

# 3. Verify improvements
/evaluate-artifact .github/prompts/api-design.prompt.md

# 4. Compare results and iterate if needed
```

## Improvement Guidelines

- **Preserve Core Intent**: Don't change the fundamental purpose of the artifact
- **Incremental Enhancement**: Apply focused improvements rather than complete rewrites
- **Evidence-Based**: Base improvements on specific rubric criteria and evaluation feedback
- **Maintain Compatibility**: Ensure changes don't break existing integrations or dependencies
- **Document Changes**: Clearly explain what was improved and why

The skill generates improved versions that should score higher on rubric evaluation while maintaining the artifact's original functionality and purpose.

---
name: eval-improve
description: Improve artifacts with targeted enhancement and optimization
---

Improve any Copilot artifact by applying targeted enhancements based on evaluation results.

## Process

1. **Analyze**: Read artifact, check evaluation results, identify low-scoring areas (<3.0)
2. **Strategize**: Generate specific improvements for each low-scoring area
3. **Apply**: Rewrite artifact with improvements, preserve intent and structure
4. **Verify**: Review improvements against rubric criteria, estimate score gains

## Usage

```
/eval-improve .github/prompts/code-review.prompt.md
/eval-improve .github/skills/deploy/SKILL.md --focus="clarity,specificity"
/eval-improve .github/workflows/ci-cd/WORKFLOW.md --focus="all"
```

Focus on specific improvement areas or overall enhancement.

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

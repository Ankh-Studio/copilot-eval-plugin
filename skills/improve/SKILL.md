name: improve description: Improve artifacts with evidence-based enhancement and comprehensive
validation

---

Improve any Copilot artifact by applying targeted enhancements based on evidence-based evaluation
results and comprehensive validation.

## Process

1. **Analyze**: Read artifact, check evaluation results, identify low-scoring areas (<3.0)
2. **Evidence Assessment**: Gather concrete evidence for improvement opportunities
3. **Strategize**: Generate specific improvements with measurable score gains
4. **Apply**: Rewrite artifact with improvements, preserve intent and structure
5. **Validate**: Evidence-based validation with score impact measurement
6. **Verify**: Compatibility testing and intent preservation confirmation

## Evidence-Based Improvement Framework

### Improvement Effectiveness (Weight: 0.30)

- Quantifiable score gains >0.5 points per targeted criterion
- Specific before/after evidence with measurable metrics
- Concrete examples of enhanced functionality

### Targeting Accuracy (Weight: 0.25)

- Precise identification of low-scoring areas (<3.0)
- Accurate focus on specified improvement areas
- Comprehensive coverage of identified issues

### Intent Preservation (Weight: 0.20)

- Complete maintenance of original artifact purpose
- No changes to core functionality or objectives
- Enhanced clarity without intent modification

### Enhancement Quality (Weight: 0.15)

- Professional-grade improvements with best practices
- Comprehensive additions that add significant value
- Exceptional clarity and specificity improvements

### Compatibility Maintenance (Weight: 0.10)

- Complete preservation of existing integrations
- No breaking changes to dependencies
- Full backward compatibility

## Usage

````bash
/improve .github/prompts/code-review.prompt.md
/improve .github/skills/deploy/SKILL.md --focus="clarity,specificity"
/improve .github/workflows/ci-cd/WORKFLOW.md --focus="all"
```bash

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

```bash

/artifact .github/prompts/api-design.prompt.md


/improve .github/prompts/api-design.prompt.md --focus="clarity,specificity"


/artifact .github/prompts/api-design.prompt.md


```bash

## Improvement Guidelines

- **Preserve Core Intent**: Don't change the fundamental purpose of the artifact
- **Incremental Enhancement**: Apply focused improvements rather than complete rewrites
- **Evidence-Based**: Base improvements on specific rubric criteria and evaluation feedback
- **Maintain Compatibility**: Ensure changes don't break existing integrations or dependencies
- **Document Changes**: Clearly explain what was improved and why

The skill generates improved versions that should score higher on rubric evaluation while maintaining the artifact's original functionality and purpose.
````

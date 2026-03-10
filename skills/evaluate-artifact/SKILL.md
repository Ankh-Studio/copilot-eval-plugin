---
name: evaluate-artifact
description: Evaluate any Copilot artifact against its corresponding rubric
---

Evaluate any Copilot artifact (prompt, instruction, skill, template, workflow, agent, context provider, validation rule, or integration pattern) against its structured rubric.

## Process

1. **Identify the artifact type** from the file path or user specification
2. **Load the appropriate rubric**:
   - Prompt: Clarity, Specificity, Context, Constraints, Examples
   - Instruction: Clarity, Completeness, Structure, Examples, Best Practices
   - Skill: Functionality, Documentation, Error Handling, Testing, Integration
   - Template: Structure, Flexibility, Documentation, Best Practices, Reusability
   - Workflow: Sequence Logic, Automation, Error Handling, Integration, Scalability
   - Agent: Persona Definition, Domain Expertise, Task Specialization, Interaction Quality, Reliability
   - Context Provider: Data Quality, Relevance, Coverage, Accessibility, Maintainability
   - Validation Rule: Coverage, Accuracy, Performance, Actionability, Integration
   - Integration Pattern: Compatibility, Reliability, Documentation, Performance, Maintainability

3. **Read and analyze the artifact content**
4. **Score each category** from 0-4:
   - **Score 4**: Exceeds expectations, exceptional quality
   - **Score 3**: Meets expectations, good quality
   - **Score 2**: Needs improvement, fair quality
   - **Score 1**: Poor quality, significant issues
   - **Score 0**: Not present or completely inadequate

5. **Calculate weighted total score**
6. **Provide comprehensive evaluation** with:
   - Overall assessment and total score
   - Category breakdown with scores and justification
   - Specific strengths and areas of excellence
   - Actionable improvement suggestions
   - Examples of enhancements where applicable

## Usage

Specify the artifact file path:
- `.github/prompts/name.prompt.md`
- `.github/instructions/name.md`
- `.github/skills/name/SKILL.md`
- `.github/templates/name.template.md`
- `.github/workflows/name/WORKFLOW.md`
- `.github/agents/name/AGENT.md`
- `.github/context/name.context.md`
- `.github/validation/name.validation.md`
- `.github/integration/name.integration.md`

## Example Commands

```
/evaluate-artifact .github/prompts/code-review.prompt.md
/evaluate-artifact .github/skills/deploy/SKILL.md
/evaluate-artifact .github/workflows/ci-cd/WORKFLOW.md
```

The skill automatically detects the artifact type, loads the appropriate rubric, and provides a detailed evaluation with actionable feedback for improvement.

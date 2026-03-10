---
name: evaluate-template
description: Evaluate template artifacts against the template rubric
---

Evaluate the provided template against the structured template rubric criteria.

## Process

1. **Read the template content** from the specified file
2. **Apply the template evaluation rubric** with these criteria:
   - **Structure** (Weight: 0.25): Clear organization and sections
   - **Flexibility** (Weight: 0.25): Customization and adaptability
   - **Documentation** (Weight: 0.20): Usage instructions and examples
   - **Best Practices** (Weight: 0.15): Industry standards and patterns
   - **Reusability** (Weight: 0.15): Cross-project applicability

3. **Score each category** from 0-4:
   - **Score 4**: Exceeds expectations, exceptional quality
   - **Score 3**: Meets expectations, good quality
   - **Score 2**: Needs improvement, fair quality
   - **Score 1**: Poor quality, significant issues
   - **Score 0**: Not present or completely inadequate

4. **Calculate weighted total score**

5. **Provide detailed feedback** including:
   - Strengths and areas of excellence
   - Specific improvement suggestions
   - Examples of how to enhance the template

## Usage

Provide the path to the template file you want evaluated:
- `.github/templates/template-name.template.md`
- Any custom template file path

The skill will automatically load the template rubric and provide a comprehensive evaluation with actionable feedback for improving structure, flexibility, and reusability.

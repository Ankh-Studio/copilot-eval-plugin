---
name: evaluate-prompt
description: Evaluate a prompt against the prompt rubric
---

Evaluate the provided prompt against the structured rubric criteria.

## Process

1. **Read the prompt content** from the specified file
2. **Apply the prompt evaluation rubric** with these criteria:
   - Clarity (Weight: 0.25)
   - Specificity (Weight: 0.25) 
   - Context (Weight: 0.20)
   - Constraints (Weight: 0.15)
   - Examples (Weight: 0.15)

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
   - Examples of how to enhance the prompt

## Usage

Provide the path to the prompt file you want evaluated:
- `.github/prompts/prompt-name.prompt.md`
- Any custom prompt file path

The skill will automatically load the prompt rubric and provide a comprehensive evaluation with actionable feedback.

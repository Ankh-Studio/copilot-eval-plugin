---
name: evaluate-workflow
description: Evaluate workflow artifacts against the workflow rubric
---

Evaluate the provided workflow against the structured workflow rubric criteria.

## Process

1. **Read the workflow content** from the specified WORKFLOW.md file
2. **Apply the workflow evaluation rubric** with these criteria:
   - **Sequence Logic** (Weight: 0.25): Logical step progression
   - **Automation** (Weight: 0.25): Minimized manual intervention
   - **Error Handling** (Weight: 0.20): Comprehensive error management
   - **Integration** (Weight: 0.15): System compatibility
   - **Scalability** (Weight: 0.15): Performance under load

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
   - Examples of how to enhance the workflow

## Usage

Provide the path to the workflow directory you want evaluated:
- `.github/workflows/workflow-name/WORKFLOW.md`
- Any custom workflow directory path

The skill will automatically load the workflow rubric and provide a comprehensive evaluation with actionable feedback for improving sequence logic, automation, and scalability.

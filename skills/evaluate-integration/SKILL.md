---
name: evaluate-integration
description: Evaluate integration pattern artifacts against the integration rubric
---

Evaluate the provided integration pattern against the structured integration rubric criteria.

## Process

1. **Read the integration content** from the specified file
2. **Apply the integration evaluation rubric** with these criteria:
   - **Compatibility** (Weight: 0.25): System and tool compatibility
   - **Documentation** (Weight: 0.25): Clear integration instructions
   - **Error Handling** (Weight: 0.20): Robust failure management
   - **Performance** (Weight: 0.15): Minimal resource usage
   - **Maintainability** (Weight: 0.15): Easy updates and debugging

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
   - Examples of how to enhance the integration

## Usage

Provide the path to the integration file you want evaluated:
- `.github/integration/integration-name.integration.md`
- Any custom integration file path

The skill will automatically load the integration rubric and provide a comprehensive evaluation with actionable feedback for improving compatibility, documentation, and performance.

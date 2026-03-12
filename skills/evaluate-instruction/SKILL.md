


name: evaluate-instruction
description: Evaluate instruction artifacts against the instruction rubric

---

# Evaluate Instruction


Evaluate the provided instruction against the structured instruction rubric criteria.

## Process

1. **Read the instruction content** from the specified file
2. **Apply the instruction evaluation rubric** with these criteria:
   - **Clarity** (Weight: 0.25): Clear and understandable guidance
   - **Completeness** (Weight: 0.25): Comprehensive coverage of topic
   - **Structure** (Weight: 0.20): Logical organization and flow
   - **Examples** (Weight: 0.15): Practical examples and demonstrations
   - **Best Practices** (Weight: 0.15): Industry standards and proven methods

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
   - Examples of how to enhance the instruction

## Usage

Provide the path to the instruction file you want evaluated:

- `.github/instructions/instruction-name.md`
- Any custom instruction file path

The skill will automatically load the instruction rubric and provide a comprehensive evaluation with actionable feedback for improving clarity, completeness, and instructional effectiveness.

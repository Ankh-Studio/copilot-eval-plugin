


name: evaluate-validation
description: Evaluate validation rule artifacts against the validation rubric

---

# Evaluate Validation


Evaluate the provided validation rule against the structured validation rubric criteria.

## Process

1. **Read the validation content** from the specified file
2. **Apply the validation evaluation rubric** with these criteria:
   - **Coverage** (Weight: 0.25): Comprehensive scenario handling
   - **Accuracy** (Weight: 0.25): Minimal false positives/negatives
   - **Performance** (Weight: 0.20): Minimal workflow impact
   - **Actionability** (Weight: 0.15): Clear and specific feedback
   - **Integration** (Weight: 0.15): Seamless tool compatibility

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
   - Examples of how to enhance the validation rule

## Usage

Provide the path to the validation file you want evaluated:

- `.github/validation/validation-name.validation.md`
- Any custom validation file path

The skill will automatically load the validation rubric and provide a comprehensive evaluation with actionable feedback for improving coverage, accuracy, and performance.

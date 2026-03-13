name: context description: Evaluate context provider artifacts against the context rubric

---

Evaluate the provided context provider against the structured context rubric criteria.

## Process

1. **Read the context content** from the specified file
2. **Apply the context evaluation rubric** with these criteria:
   - **Data Quality** (Weight: 0.25): Accurate and current information
   - **Relevance** (Weight: 0.25): Direct applicability to use cases
   - **Coverage** (Weight: 0.20): Comprehensive domain inclusion
   - **Accessibility** (Weight: 0.15): Efficient retrieval and formatting
   - **Maintainability** (Weight: 0.15): Easy updates and organization

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
   - Examples of how to enhance the context provider

## Usage

Provide the path to the context file you want evaluated:

- `.github/context/context-name.context.md`
- Any custom context file path

The skill will automatically load the context rubric and provide a comprehensive evaluation with
actionable feedback for improving data quality, relevance, and accessibility.

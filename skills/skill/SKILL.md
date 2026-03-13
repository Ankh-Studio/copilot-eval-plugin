name: skill description: Evaluate skill artifacts against the skill rubric

---

Evaluate the provided skill against the structured skill rubric criteria.

## Process

1. **Read the skill content** from the specified SKILL.md file
2. **Apply the skill evaluation rubric** with these criteria:
   - **Functionality** (Weight: 0.25): Core functionality and effectiveness
   - **Documentation** (Weight: 0.25): Clear instructions and examples
   - **Error Handling** (Weight: 0.20): Robust error management
   - **Testing** (Weight: 0.15): Test coverage and validation
   - **Integration** (Weight: 0.15): Compatibility with existing systems

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
   - Examples of how to enhance the skill

## Usage

Provide the path to the skill directory you want evaluated:

- `.github/skills/skill-name/SKILL.md`
- Any custom skill directory path

The skill will automatically load the skill rubric and provide a comprehensive evaluation with
actionable feedback for improving functionality, documentation, and integration capabilities.

name: agent description: Evaluate agent artifacts against the agent rubric

---

Evaluate the provided agent against the structured agent rubric criteria.

## Process

1. **Read the agent content** from the specified AGENT.md file
2. **Apply the agent evaluation rubric** with these criteria:
   - **Persona Definition** (Weight: 0.25): Clear identity and expertise
   - **Domain Expertise** (Weight: 0.25): Deep knowledge in specialization
   - **Task Specialization** (Weight: 0.20): Focused task capabilities
   - **Interaction Quality** (Weight: 0.15): Communication effectiveness
   - **Reliability** (Weight: 0.15): Consistent performance

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
   - Examples of how to enhance the agent

## Usage

Provide the path to the agent directory you want evaluated:

- `.github/agents/agent-name/AGENT.md`
- Any custom agent directory path

The skill will automatically load the agent rubric and provide a comprehensive evaluation with
actionable feedback for improving persona definition, domain expertise, and interaction quality.

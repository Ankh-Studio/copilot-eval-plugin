---
description: Structured debate for complex design decisions with multiple expert perspectives
---

# Multi-Persona Architecture Debate

Structured debate for complex design decisions with multiple expert perspectives.

## Steps

### 1. Inspect

- **Input**: Architecture question or decision to resolve
- **Action**: Analyze the scope and impact of the decision
- **Output**: Decision context and stakeholder identification

### 2. Analyze

- **Input**: Decision context and requirements
- **Action**: Persona-based analysis:
  - **Plugin Developer**: Maintainability, testing, extensibility concerns
  - **End User**: Usability, clarity, immediate value priorities
  - **System Admin**: Performance, resources, scalability requirements
- **Output**: Comprehensive perspective analysis

### 3. Execute (Structured Debate)

- **Input**: Perspective analysis and decision context
- **Action**: Facilitate structured debate:
  - Present each persona's position with evidence
  - Cross-examine conflicting viewpoints
  - Identify tradeoffs and compromise points
- **Output**: Debate transcript and key issues

### 4. Verify

- **Input**: Debate results and proposed solutions
- **Action**: Survivor synthesis testing:
  - Test solutions against each persona's concerns
  - Validate that critical requirements are met
  - Ensure solution survives all critiques
- **Output**: Validated architectural decision

### 5. Summarize

- **Input**: Final validated decision
- **Action**: Generate decision summary:
  - Recommended approach with rationale
  - Addressed concerns and tradeoffs
  - Implementation considerations and risks
- **Output**: Actionable architectural decision document

## Inputs

- **decision_question**: Architecture decision requiring resolution
- **personas**: Optional specific personas to include

## Expected Outputs

- **decision_analysis**: Multi-perspective evaluation of options
- **debate_transcript**: Structured discussion of tradeoffs
- **final_recommendation**: Survivor synthesis solution
- **implementation_guidance**: Practical next steps

## Example Usage

```bash
/multi-persona-architecture-debate --decision-question "Should we use universal or specialized skills?"
```

## Execution Command

```bash
node scripts/apply-pack.js architecture-debate --question "<decision-question>"
```

This workflow ensures robust architectural decisions by incorporating multiple expert perspectives
and survivor synthesis methodology.

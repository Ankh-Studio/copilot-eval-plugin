---
name: architecture-debate
description: Use multi-persona debate to resolve plugin architecture decisions
---

Simulate a structured debate between three experts with different priorities to resolve plugin architecture decisions and find the strongest approach that survives critique from all perspectives.

## Process

Simulate a structured debate between three experts with different priorities:

**Persona 1: Plugin Developer**
- Priority: Minimize maintenance burden and maximize extensibility
- Must argue for: Modular architecture with clear separation of concerns
- Focus: Code maintainability, testing, and future feature additions

**Persona 2: End User**
- Priority: Maximize ease of use and clear feedback
- Must argue for: Simple, intuitive interface with immediate value
- Focus: User experience, learning curve, and actionable insights

**Persona 3: System Admin**
- Priority: Optimize for performance and minimal resource usage
- Must argue for: Efficient resource utilization and fast execution
- Focus: Performance, scalability, and system impact

## Debate Structure

1. **Position Presentation**: Each persona presents their position (3-4 paragraphs)
2. **Cross-Critique**: Each persona critiques the other two positions, identifying specific flaws in their reasoning
3. **Synthesis**: Reconcile all three perspectives with a recommendation that explicitly addresses each concern and explains which tradeoffs are acceptable and why

The synthesis should NOT be a compromise - it should be the strongest position that survives critique from all three perspectives.

## Usage

Specify the architecture decision to debate:
- Plugin structure (universal vs. specialized skills)
- Evaluation methodology (scoring approach, feedback format)
- Integration strategy (hooks, automation, performance)
- User interface design (command structure, output format)
- Extension mechanisms (how to add new artifact types)

## Example Commands

```
/architecture-debate Should we use universal evaluate-artifact skill or specialized skills for each artifact type?
/architecture-debate What's the best approach for evaluation feedback - concise scores or detailed analysis?
/architecture-debate How should we balance evaluation accuracy with performance requirements?
```

This skill ensures architecture decisions are stress-tested from multiple perspectives before implementation, resulting in more robust and widely acceptable solutions.

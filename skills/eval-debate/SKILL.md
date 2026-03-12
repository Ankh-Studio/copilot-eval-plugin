---
name: eval-debate
description: Facilitate architecture debates and design decision evaluation
---

Simulate structured debate between three experts to resolve architecture decisions.

## Process

Three personas debate with different priorities:

**Developer**: Maintainability & extensibility
- Argues for modular architecture with clear separation
- Focus: Code maintainability, testing, future features

**User**: Ease of use & clear feedback  
- Argues for simple, intuitive interface with immediate value
- Focus: User experience, learning curve, actionable insights

**Admin**: Performance & minimal resources
- Argues for efficient resource utilization and fast execution
- Focus: Performance, scalability, system impact

## Debate Structure

1. **Present**: Each persona presents position (3-4 paragraphs)
2. **Critique**: Cross-critique identifying specific flaws
3. **Synthesize**: Reconcile perspectives with strongest approach

## Usage

```
/eval-debate --topic "plugin-structure"
/eval-debate --topic "evaluation-methodology" --focus="all"
```

Find strongest approach that survives critique from all perspectives.
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

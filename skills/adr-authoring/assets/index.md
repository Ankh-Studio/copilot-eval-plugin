# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) that document significant architectural
choices made during development.

## What are ADRs?

Architecture Decision Records capture important architectural decisions along with their context,
options considered, tradeoffs, and consequences. They help teams:

- Understand why architectural choices were made
- Onboard new team members quickly
- Make consistent decisions over time
- Avoid re-litigating settled decisions

## ADR Structure

Each ADR follows our [enhanced template](000-template.md) which includes:

- **Context**: Problem statement and business impact
- **Options Considered**: Multiple alternatives with pros/cons
- **Decision**: Clear choice with rationale
- **Tradeoffs & Consequences**: Honest assessment of impacts
- **Evidence**: Links to actual code and documentation
- **Follow-up Actions**: Next steps with owners and timelines

## Using ADRs

### Creating ADRs

Use the `/create-adr` prompt file to quickly generate ADRs:

```bash
/create-adr
Decision: Choose state management library for React application
Context: Current application uses local state only, experiencing prop drilling issues
Stakeholders: Frontend team, API team
```

### Evaluating ADRs

Use the ADR quality rubric to evaluate ADR completeness:

```bash
/artifact .github/rubrics/adr-quality.md
```

### Finding ADRs

- Browse this directory for all ADRs
- Check individual component documentation for relevant ADRs
- Search GitHub issues for ADR references

## ADR Index

| ADR          | Title                           | Status   | Date | Confidence |
| ------------ | ------------------------------- | -------- | ---- | ---------- |
| _[Template]_ | [ADR Template](000-template.md) | Template | -    | -          |

_This index will be automatically updated as ADRs are created._

## ADR Lifecycle

1. **Proposed**: Initial draft for review and discussion
2. **Accepted**: Decision made and approved
3. **Implemented**: Decision has been put into practice
4. **Superseded**: Replaced by a newer decision
5. **Deprecated**: No longer relevant or applicable

## Quality Standards

All ADRs must meet our quality standards:

- Minimum 2 options considered with analysis
- Evidence links to actual repository artifacts
- Honest tradeoff documentation
- Clear follow-up actions with ownership
- Confidence level with rationale

See the [ADR quality rubric](../.github/rubrics/adr-quality.md) for detailed evaluation criteria.

## Integration with Development

### Repository Assessment Integration

When running `/repo-assessment`, the system will:

- Identify undocumented architectural decisions
- Suggest ADRs for missing documentation
- Reference existing ADRs in assessment results

### Pack Recommendations Integration

When using `/recommend-workspace-pack`, the system will:

- Reference relevant ADRs in pack recommendations
- Ensure pack choices align with documented decisions
- Highlight conflicts between packs and existing ADRs

### Component Evaluation Integration

When evaluating components with `/artifact`, the system will:

- Check if component patterns align with relevant ADRs
- Identify architectural inconsistencies
- Suggest ADR updates for new patterns

## Best Practices

### Writing Good ADRs

- **Be specific**: Avoid vague language and generic benefits
- **Provide evidence**: Link to actual code, issues, or documentation
- **Be honest**: Document both positive and negative consequences
- **Stay focused**: Keep ADRs concise and decision-focused
- **Think ahead**: Consider future maintenance and onboarding needs

### Review Process

1. **Self-review**: Complete the quality checklist
2. **Peer review**: Have team member evaluate using rubric
3. **Integration**: Link from relevant code and documentation
4. **Follow-up**: Track action item completion

### Maintenance

- Review ADRs quarterly for relevance
- Update superseded ADRs with links to new decisions
- Archive deprecated ADRs with clear reasoning
- Keep index current with all active ADRs

## Getting Help

For questions about ADRs:

- Reference the [template](000-template.md) for structure
- Use the [quality rubric](../.github/rubrics/adr-quality.md) for evaluation
- Check existing ADRs for examples
- Ask in team discussions for clarification

ADRs are a living documentation of our architectural evolution. They help us build better systems by
learning from our decisions and maintaining consistency across the codebase.

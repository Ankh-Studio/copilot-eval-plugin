# Architecture Decision Records (ADRs) Usage Guide

This guide explains how to create, evaluate, and maintain Architecture Decision Records (ADRs) in
this repository.

## Quick Start

### Create an ADR

Use the prompt file for quick ADR creation:

```bash
/create-adr
Decision: Choose state management library for React application
Context: Current application uses local state only, experiencing prop drilling issues
Stakeholders: Frontend team, API team
```

### Evaluate an ADR

Check ADR quality using the evaluation rubric:

```bash
/artifact .github/rubrics/adr-quality.md
```

## What Makes a Good ADR?

### Essential Elements

Every ADR must include:

1. **Clear Problem Statement**: Specific issue with business impact
2. **Multiple Options**: At least 2 alternatives with pros/cons
3. **Evidence-Based Decision**: Links to actual code, issues, or docs
4. **Honest Tradeoffs**: Both positive and negative consequences
5. **Actionable Follow-up**: Next steps with owners and timelines

### Quality Standards

- **Specificity**: Avoid vague language like "better performance"
- **Evidence**: Ground decisions in repository reality
- **Honesty**: Document downsides and risks
- **Brevity**: Keep focused on the decision, not implementation details

## ADR Template Structure

Use the [enhanced template](000-template.md) which includes:

- **Status & Confidence**: Current state and certainty level
- **Context**: Problem statement with business impact
- **Options Considered**: Alternatives with detailed analysis
- **Decision**: Clear choice with rationale
- **Tradeoffs & Consequences**: Honest assessment of impacts
- **Evidence**: Links to supporting artifacts
- **Follow-up Actions**: Next steps with ownership

## Integration with Plugin Skills

### Repository Assessment

When running `/repo-assessment`, the system will:

- Identify architectural decisions needing documentation
- Suggest ADRs for undocumented patterns
- Reference existing ADRs in assessment results

### Pack Recommendations

When using `/recommend-workspace-pack`, the system will:

- Reference relevant ADRs in recommendations
- Ensure pack choices align with documented decisions
- Highlight conflicts between packs and ADRs

### Component Evaluation

When evaluating components with `/artifact`, the system will:

- Check alignment with relevant ADRs
- Identify architectural inconsistencies
- Suggest ADR updates for new patterns

## Best Practices

### Writing ADRs

1. **Start with the Problem**: Clearly define what you're solving
2. **Research Options**: Look for existing patterns and solutions
3. **Gather Evidence**: Find code, issues, or documentation that supports your analysis
4. **Be Honest**: Document both benefits and drawbacks
5. **Think Ahead**: Consider maintenance and onboarding implications

### Common Mistakes to Avoid

- **Confident Nonsense**: Strong claims without evidence
- **Design Guides**: ADRs should document decisions, not implementation details
- **Hidden Tradeoffs**: Only listing positive consequences
- **Missing Options**: Not considering alternatives
- **Theoretical Benefits**: Claims disconnected from repository reality

### Review Process

1. **Self-Review**: Complete the quality checklist
2. **Peer Review**: Have team member evaluate using rubric
3. **Integration**: Link from relevant code and documentation
4. **Follow-up**: Track action item completion

## Quality Evaluation

### Using the Rubric

The [ADR quality rubric](../.github/rubrics/adr-quality.md) evaluates:

- **Problem Clarity** (15%): Specific, contextual problem statement
- **Options Analysis** (20%): Multiple alternatives with detailed analysis
- **Decision Rationale** (20%): Clear reasoning linking to evidence
- **Tradeoff Honesty** (20%): Comprehensive consequence documentation
- **Evidence Grounding** (15%): Links to actual repository artifacts
- **Actionability** (10%): Clear follow-up actions with ownership

### Scoring

- **Pass**: 3.5+ overall, no section below 3.0
- **Conditional Pass**: 3.0-3.4 with improvement plan
- **Fail**: Below 3.0 or critical section below 2.0

## Maintenance

### Regular Reviews

- Review ADRs quarterly for relevance
- Update superseded ADRs with links to new decisions
- Archive deprecated ADRs with clear reasoning
- Keep index current with all active ADRs

### When to Update ADRs

- Decision changes due to new requirements
- Implementation reveals unexpected consequences
- New evidence emerges that affects the decision
- Related ADRs are created or updated

### Lifecycle Management

- **Proposed**: Initial draft for discussion
- **Accepted**: Decision approved and implemented
- **Superseded**: Replaced by newer decision
- **Deprecated**: No longer relevant

## Examples

### Good ADR Example

```
# ADR-001: Implement React Query for data fetching

**Status:** Accepted
**Date:** 2024-03-15
**Confidence:** High

## Context

Our React application currently uses useState and useEffect for API calls, resulting in:
- Duplicate API calls across components
- No caching mechanism
- Loading states scattered throughout components
- Difficult error handling patterns

## Options Considered

### Option 1: Continue with current pattern
**Pros:**
- No additional dependencies
- Team already familiar with the approach

**Cons:**
- Continued code duplication
- No built-in caching
- Manual error handling required

### Option 2: Implement React Query
**Pros:**
- Built-in caching and deduplication
- Standardized loading and error states
- Better developer experience
- Active community and documentation

**Cons:**
- Additional dependency to learn
- Initial migration effort

## Decision

We will implement React Query for data fetching throughout the application.

## Tradeoffs & Consequences

### Positive Impacts
- Reduced API calls through caching
- Consistent loading and error handling
- Improved developer experience
- Better performance for users

### Negative Impacts
- Learning curve for team members
- Initial migration effort (~2 weeks)
- Additional bundle size (~12KB)

### Risk Mitigation
- Team training sessions scheduled
- Gradual migration starting with non-critical components
- Performance monitoring to verify benefits

## Evidence

**Related Code:**
- `src/components/UserList.tsx` - Current API call pattern
- `src/services/api.ts` - Existing API client

**Issues/PRs:**
- #123 - Performance issues with duplicate API calls
- #124 - Request for better error handling

## Follow-up Actions

- [ ] Create React Query implementation guide - Frontend Lead - Week 1
- [ ] Migrate UserList component - Developer A - Week 2
- [ ] Add performance monitoring - DevOps - Week 2
- [ ] Team training session - Frontend Lead - Week 3
```

### Poor ADR Example

```
# ADR-001: Use better state management

**Status:** Proposed

## Context

Our app needs better state management.

## Decision

We will use Redux because it's popular and good.

## Benefits

- Better performance
- Easier development
- Industry standard
```

This poor example lacks:

- Specific problem statement
- Multiple options considered
- Evidence from actual code
- Honest tradeoffs
- Actionable follow-up

## Getting Help

For questions about ADRs:

- Reference the [template](000-template.md) for structure
- Use the [quality rubric](../.github/rubrics/adr-quality.md) for evaluation
- Check existing ADRs for examples
- Ask in team discussions for clarification

## Tools and Automation

The plugin provides several tools to help with ADR management:

- **Prompt File**: `/create-adr` for quick ADR creation
- **Quality Rubric**: Automated evaluation of ADR completeness
- **Repository Integration**: Automatic detection of undocumented decisions
- **Pack Integration**: ADR-aware recommendations and conflict detection

These tools help maintain high-quality ADRs while reducing the overhead of documentation.

ADRs are a valuable investment in your team's productivity and your codebase's maintainability. They
help new team members understand decisions, prevent re-litigation of settled issues, and provide
context for future architectural choices.

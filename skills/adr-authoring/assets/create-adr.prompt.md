# Create Architecture Decision Record

Create a comprehensive Architecture Decision Record (ADR) following the enhanced template. Focus on
making clear, evidence-based architectural decisions with proper tradeoff analysis.

## When to use this prompt

- Documenting significant architectural choices
- Recording framework or library decisions
- Capturing system design decisions
- Documenting decisions that affect multiple components or teams

## Required inputs

Provide the following information:

1. **Decision topic**: What architectural decision needs documentation?
2. **Context**: Brief description of the current situation and problem
3. **Stakeholders**: Who is affected by this decision? (optional)

## What I'll do

1. **Analyze repository context**: Scan for relevant code, configuration files, and existing
   patterns
2. **Identify options**: Generate 2-3 viable alternatives with pros and cons
3. **Gather evidence**: Link to actual code, issues, or documentation
4. **Create ADR**: Generate complete ADR following the enhanced template
5. **Validate quality**: Ensure all required sections are complete

## Output format

I'll create a new ADR file in `docs/adr/` with:

- Sequential numbering (ADR-001, ADR-002, etc.)
- Enhanced template structure
- Evidence links to repository artifacts
- Clear tradeoff analysis
- Actionable follow-up items

## Quality standards

- Include minimum 2 options considered
- Provide specific pros/cons for each option
- Link to actual code or documentation evidence
- Document both positive and negative consequences
- Assign confidence level with rationale
- Include concrete follow-up actions

## Example usage

```
/create-adr
Decision: Choose state management library for React application
Context: Current application uses local state only, experiencing prop drilling issues
Stakeholders: Frontend team, API team
```

## Repository integration

This prompt will automatically:

- Scan `package.json` for existing dependencies
- Check for existing state management patterns in `src/`
- Look for related GitHub issues or PRs
- Identify component architecture patterns
- Reference existing documentation in `docs/`

The resulting ADR will be grounded in your actual repository context and provide clear guidance for
implementation and onboarding.

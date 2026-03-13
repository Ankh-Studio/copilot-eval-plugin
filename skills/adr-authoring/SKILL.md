# ADR Authoring Skill

**Status**: Active **Version**: 1.0.0 **Author**: Matthew Van Dusen

## Overview

The ADR Authoring skill enables teams to create high-quality Architecture Decision Records (ADRs)
that are grounded in repository evidence, follow best practices, and integrate seamlessly with the
existing React repository assessment workflow.

## When to Use

Use this skill when you need to:

- Document significant architectural decisions
- Capture framework or library choices
- Record system design decisions
- Document decisions affecting multiple components or teams
- Evaluate existing ADR quality
- Ensure architectural consistency across the codebase

## Core Capabilities

### 1. ADR Creation

- Repository-aware ADR generation
- Automatic evidence gathering from code, issues, and documentation
- Multiple option analysis with pros/cons
- Tradeoff documentation and consequence analysis
- Follow-up action tracking

### 2. Repository Analysis

- **Automated Technology Detection**: Scans package.json and code for architectural dependencies
- **Pattern Recognition**: Identifies state management, data fetching, routing, styling, and testing
  patterns
- **Decision Detection**: Finds TODOs, FIXMEs, and architectural decision indicators in code
- **Evidence Mapping**: Links architectural decisions to actual code files and issues
- **Option Generation**: Suggests alternatives based on repository context and ecosystem

### 3. Quality Evaluation

- Structured rubric-based assessment
- 6 evaluation criteria with weighted scoring
- Pass/fail thresholds and improvement recommendations
- Common failure pattern detection
- Automated validation with actionable feedback

### 4. Integration Points

- Repository assessment integration
- Pack recommendation alignment
- Component evaluation consistency checks
- Conflict detection between ADRs and implementation

## Assets

### Template (`assets/000-template.md`)

Enhanced ADR template incorporating Microsoft Azure best practices:

```markdown
# ADR-000: Title

**Status:** Proposed | Accepted | Implemented | Superseded | Deprecated **Date:** YYYY-MM-DD
**Confidence:** High | Medium | Low

## Context

What problem are we solving? Provide specific context and business impact.

## Options Considered

### Option 1: [Description]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

### Option 2: [Description]

**Pros:**

- [Advantage 1]
- [Advantage 2]

**Cons:**

- [Disadvantage 1]
- [Disadvantage 2]

## Decision

What are we proposing and why this specific option was chosen?

## Tradeoffs & Consequences

### Positive Impacts

- [Expected benefit 1]
- [Expected benefit 2]

### Negative Impacts

- [Tradeoff or cost 1]
- [Tradeoff or cost 2]

### Risk Mitigation

- [How we'll address risk 1]
- [How we'll address risk 2]

## Evidence

**Related Code:**

- `path/to/file1.ext`
- `path/to/file2.ext`

**Issues/PRs:**

- #[issue-number] - [brief description]
- #[pr-number] - [brief description]

**Documentation:**

- [Link to relevant documentation]
- [Link to design specs]

## Follow-up Actions

- [ ] [Action item 1] - [Owner] - [Timeline]
- [ ] [Action item 2] - [Owner] - [Timeline]

## Open Questions

- [ ] Unresolved item 1
- [ ] Unresolved item 2]
```

### Creation Prompt (`assets/create-adr.prompt.md`)

Quick ADR creation with repository context scanning:

```markdown
# Create Architecture Decision Record

Create a comprehensive Architecture Decision Record (ADR) following the enhanced template.

## Required inputs

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

## Quality standards

- Include minimum 2 options considered
- Provide specific pros/cons for each option
- Link to actual code or documentation evidence
- Document both positive and negative consequences
- Assign confidence level with rationale
- Include concrete follow-up actions
```

### Quality Rubric (`assets/adr-quality.md`)

Comprehensive evaluation framework with 6 criteria:

1. **Problem Clarity (15%)**: Specific, contextual problem statement
2. **Options Analysis (20%)**: Multiple alternatives with detailed analysis
3. **Decision Rationale (20%)**: Clear reasoning linking to evidence
4. **Tradeoff Honesty (20%)**: Comprehensive consequence documentation
5. **Evidence Grounding (15%)**: Links to actual repository artifacts
6. **Actionability (10%)**: Clear follow-up actions with ownership

**Scoring:**

- Pass: 3.5+ overall, no section below 3.0
- Conditional Pass: 3.0-3.4 with improvement plan
- Fail: Below 3.0 or critical section below 2.0

### Documentation

- `assets/index.md` - ADR overview and integration guide
- `assets/README.md` - Comprehensive usage guide with examples

### Scripts (`scripts/`)

#### Repository Analyzer (`scripts/analyze-repo.js`)

Automated repository analysis for evidence gathering:

```javascript
const { RepoAnalyzer } = require('./scripts/analyze-repo.js');

// Analyze repository for ADR evidence
const analyzer = new RepoAnalyzer();
const evidence = await analyzer.analyze();

// Generate options for specific decision
const options = analyzer.generateOptions('state management');
```

**Capabilities:**

- Technology detection from package.json
- Pattern recognition (state, data fetching, routing, styling, testing)
- Decision detection (TODOs, FIXMEs, architectural indicators)
- Evidence mapping to actual code files
- Option generation based on repository context

#### ADR Validator (`scripts/validate-adr.js`)

Quality validation with actionable feedback:

```javascript
const { ADRValidator } = require('./scripts/validate-adr.js');

// Validate ADR content
const validator = new ADRValidator();
const results = validator.validateADR(adrContent);

// Get detailed feedback
console.log(`Score: ${results.overall.score}/5.0`);
console.log(`Status: ${results.overall.status}`);
results.feedback.forEach(item => {
  console.log(`${item.section}: ${item.issues.join(', ')}`);
});
```

**Validation Criteria:**

- Problem clarity (15%)
- Options analysis (20%)
- Decision rationale (20%)
- Tradeoff honesty (20%)
- Evidence grounding (15%)
- Actionability (10%)

## Usage

### Creating ADRs

```
/adr-authoring
Decision: Choose state management library for React application
Context: Current application uses local state only, experiencing prop drilling issues
Stakeholders: Frontend team, API team
```

### Evaluating ADRs

```
/adr-authoring
Action: evaluate
ADR: docs/adr/001-react-query.md
```

### Checking Consistency

```
/adr-authoring
Action: consistency-check
Scope: repository
```

## Integration with Existing Skills

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

## Quality Standards

All ADRs must meet these minimum standards:

- **Specificity**: Avoid vague language like "better performance"
- **Evidence**: Ground decisions in repository reality
- **Honesty**: Document downsides and risks
- **Brevity**: Keep focused on the decision, not implementation details
- **Options**: Minimum 2 alternatives considered
- **Consequences**: Both positive and negative impacts documented
- **Actions**: Clear follow-up items with ownership and timelines

## Common Failure Patterns

### Confident Nonsense

- High confidence without supporting evidence
- Strong claims with no repository backing
- **Fix**: Require evidence links and confidence rationale

### Design Guide ADR

- ADR reads like implementation guide
- Excessive technical detail beyond decision
- **Fix**: Link to design docs, focus on decision only

### Hidden Tradeoffs

- Only positive consequences listed
- Downside minimization or omission
- **Fix**: Require explicit negative impacts section

### Missing Options

- Decision without alternatives considered
- Single option presented as only choice
- **Fix**: Require minimum 2 options with analysis

## Best Practices

### Writing Good ADRs

1. **Start with the Problem**: Clearly define what you're solving
2. **Research Options**: Look for existing patterns and solutions
3. **Gather Evidence**: Find code, issues, or documentation that supports your analysis
4. **Be Honest**: Document both benefits and drawbacks
5. **Think Ahead**: Consider maintenance and onboarding implications

### Review Process

1. **Self-Review**: Complete the quality checklist
2. **Peer Review**: Have team member evaluate using rubric
3. **Integration**: Link from relevant code and documentation
4. **Follow-up**: Track action item completion

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

## Example Usage

### Good ADR Example

```markdown
# ADR-001: Implement React Query for data fetching

**Status:** Accepted **Date:** 2024-03-15 **Confidence:** High

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

## Implementation Notes

This skill is designed to integrate seamlessly with the existing React repository assessment
workflow while providing enterprise-grade ADR management capabilities. The assets are self-contained
within the skill folder for easy maintenance and deployment.

The skill follows the "Template + Prompt File + Rubric" approach recommended for Phase 1
implementation, with all resources centralized in the skills/adr-authoring/ directory structure.

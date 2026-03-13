# ADR Quality Evaluation Rubric

Evaluate Architecture Decision Records for completeness, clarity, and effectiveness using this
structured rubric.

## Evaluation Criteria

### Problem Clarity (15%)

**Score 5 (Excellent)**: Clear, specific problem statement with business context and impact

- Problem is well-defined and specific
- Business impact is clearly articulated
- Context provides sufficient background for decision-making

**Score 3 (Adequate)**: Adequate problem statement with some ambiguity

- Problem is identifiable but could be more specific
- Business impact mentioned but not detailed
- Context provided but may lack depth

**Score 1 (Poor)**: Vague or missing problem definition

- Problem statement is unclear or generic
- No business impact identified
- Insufficient context for decision-making

### Options Analysis (20%)

**Score 5 (Excellent)**: 3+ options with detailed pros/cons and evidence

- Multiple viable alternatives presented
- Each option has specific, evidence-based pros and cons
- Options are distinct and meaningful alternatives
- Analysis shows deep understanding of tradeoffs

**Score 3 (Adequate)**: 2 options with basic analysis

- Two reasonable alternatives presented
- Basic pros and cons listed
- Some evidence provided but may be limited
- Analysis covers main points but lacks depth

**Score 1 (Poor)**: Single option or no alternatives considered

- Only one option presented
- No meaningful alternatives considered
- Pros/cons missing or generic
- No evidence supporting analysis

### Decision Rationale (20%)

**Score 5 (Excellent)**: Clear reasoning linking decision to evidence

- Decision clearly stated and justified
- Rationale directly connects to problem context
- Evidence from repository supports the choice
- Reasoning is logical and compelling

**Score 3 (Adequate)**: Basic justification provided

- Decision stated with some justification
- Some connection to problem context
- Limited evidence support
- Reasoning is present but not fully developed

**Score 1 (Poor)**: Decision stated without rationale

- Decision announced without justification
- No connection to problem context
- No evidence supporting the choice
- Reasoning is missing or illogical

### Tradeoff Honesty (20%)

**Score 5 (Excellent)**: Comprehensive tradeoffs with negative consequences

- Both positive and negative impacts documented
- Tradeoffs are specific and realistic
- Risk mitigation strategies identified
- No attempt to hide or minimize downsides

**Score 3 (Adequate)**: Some tradeoffs mentioned

- Some tradeoffs acknowledged
- May focus more on positives than negatives
- Limited risk mitigation discussion
- Generally honest but incomplete

**Score 1 (Poor)**: No tradeoffs or only positive impacts listed

- Only positive consequences mentioned
- No acknowledgment of downsides
- No risk mitigation considered
- Appears to hide or ignore tradeoffs

### Evidence Grounding (15%)

**Score 5 (Excellent)**: Multiple links to code, issues, docs

- Strong evidence from actual repository
- Links to specific code files, issues, or PRs
- Documentation references support the decision
- Evidence is relevant and compelling

**Score 3 (Adequate)**: Some evidence references

- Some evidence from repository provided
- Limited links to code or documentation
- Evidence supports but doesn't strongly validate
- References may be generic

**Score 1 (Poor)**: No evidence or theoretical claims only

- No evidence from actual repository
- Claims are theoretical or unsubstantiated
- No links to supporting artifacts
- Decision appears disconnected from reality

### Actionability (10%)

**Score 5 (Excellent)**: Clear follow-up actions with owners and timelines

- Specific, actionable next steps identified
- Clear ownership assigned to each action
- Realistic timelines provided
- Actions directly support implementation

**Score 3 (Adequate)**: Basic next steps listed

- Some next steps identified
- Ownership may be unclear
- Timelines may be missing or vague
- Actions are somewhat actionable

**Score 1 (Poor)**: No action items or unclear responsibilities

- No follow-up actions identified
- No ownership assigned
- No timelines provided
- Actions are unclear or not actionable

## Scoring Guidelines

### Overall Score Calculation

- **Weighted average**: Apply percentage weights to each criterion
- **Final score**: Round to nearest 0.5

### Pass/Fail Thresholds

- **Pass**: 3.5+ overall score, no section below 3.0
- **Conditional Pass**: 3.0-3.4 with improvement plan
- **Fail**: Below 3.0 or critical section below 2.0

### Critical Sections

- **Options Analysis**: Must score at least 3.0 to pass
- **Decision Rationale**: Must score at least 3.0 to pass
- **Evidence Grounding**: Must score at least 2.0 to pass

## Common Failure Patterns

### Confident Nonsense

- High confidence without supporting evidence
- Strong claims with no repository backing
- Over-certain tone despite limited analysis
- **Fix**: Require evidence links and confidence rationale

### Design Guide ADR

- ADR reads like implementation guide
- Excessive technical detail beyond decision
- Step-by-step instructions instead of decision rationale
- **Fix**: Link to design docs, focus on decision only

### Hidden Tradeoffs

- Only positive consequences listed
- Downside minimization or omission
- No risk acknowledgment
- **Fix**: Require explicit negative impacts section

### Missing Options

- Decision without alternatives considered
- Single option presented as only choice
- No comparative analysis
- **Fix**: Require minimum 2 options with analysis

### Theoretical Benefits

- Claims not grounded in repository reality
- Generic benefits without specific application
- No connection to actual code or patterns
- **Fix**: Require evidence links for all claims

## Quality Improvement Checklist

### Before Submitting ADR

- [ ] Problem statement is specific and contextual
- [ ] At least 2 distinct options analyzed
- [ ] Decision clearly justified with evidence
- [ ] Both positive and negative consequences listed
- [ ] Confidence level with rationale provided
- [ ] Evidence links to actual repository artifacts
- [ ] Follow-up actions with owners and timelines
- [ ] ADR stands alone without external documents

### Review Process

1. **Self-assessment**: Author completes checklist
2. **Peer review**: Team member evaluates using rubric
3. **Integration**: ADR linked from relevant code/docs
4. **Follow-up**: Track action items completion

This rubric ensures ADRs maintain high quality standards while remaining practical and actionable
for development teams.

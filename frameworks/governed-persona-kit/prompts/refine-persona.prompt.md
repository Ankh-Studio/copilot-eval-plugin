# Persona Refinement Prompt

Improve an existing persona to better align with evidence-based reasoning and bounded operating principles.

## Context
You have an existing persona definition that needs refinement to improve its effectiveness, evidence requirements, or operational boundaries.

## Task
Analyze and refine the provided persona to ensure it meets the Governed Persona Framework standards.

## Input Requirements
Provide the current persona definition and identify specific issues:
- **Current Persona**: The existing persona JSON
- **Issues Identified**: What problems need to be addressed?
- **Usage Context**: How is this persona being used?
- **Performance Issues**: Where is the persona falling short?

## Analysis Framework

### 1. Mission and Scope Review
- Is the mission single and focused?
- Are scope boundaries clear and appropriate?
- Do anti-goals prevent scope creep?
- Is there overlap with other personas?

### 2. Evidence Requirements Assessment
- Are required sources appropriate and verifiable?
- Is confidence threshold realistic?
- Are prohibited sources well-justified?
- Do evidence rules support the mission?

### 3. Profile Validation
- Are expertise domains relevant to role?
- Are decision criteria measurable?
- Are anti-patterns specific and actionable?
- Does profile support evidence-based reasoning?

### 4. Output Contract Evaluation
- Does format match role expectations?
- Are required fields comprehensive?
- Are evidence citation rules appropriate?
- Is confidence scoring necessary?

### 5. Small Model Optimization
- Are descriptions concise and specific?
- Is structured output enabled?
- Are evidence limits reasonable?
- Is token budget appropriate?

## Refinement Process

### Phase 1: Issue Identification
1. **Mission Clarity**: Ensure single, focused mission
2. **Scope Boundaries**: Define clear evaluation limits
3. **Evidence Alignment**: Match evidence to mission needs
4. **Profile Consistency**: Align profile with role requirements

### Phase 2: Evidence Enhancement
1. **Source Quality**: Improve evidence source selection
2. **Confidence Calibration**: Set appropriate thresholds
3. **Citation Requirements**: Strengthen evidence demands
4. **Prohibited Sources**: Justify exclusions

### Phase 3: Output Optimization
1. **Format Alignment**: Match output to role needs
2. **Field Requirements**: Ensure comprehensive coverage
3. **Evidence Integration**: Improve citation integration
4. **Confidence Scoring**: Add where valuable

### Phase 4: Small Model Readiness
1. **Token Optimization**: Reduce verbose descriptions
2. **Structure Emphasis**: Enable JSON output
3. **Evidence Limiting**: Prioritize high-value sources
4. **Context Management**: Optimize for <2k tokens

## Output Requirements

### Refined Persona Definition
Provide the complete updated persona JSON with all improvements.

### Refinement Summary
Document specific changes made and rationale:

```markdown
## Changes Made

### Mission and Scope
- **Before**: [Original mission/scope]
- **After**: [Refined mission/scope]
- **Rationale**: [Why changes were needed]

### Evidence Requirements
- **Before**: [Original evidence setup]
- **After**: [Refined evidence setup]
- **Rationale**: [Why evidence rules were improved]

### Profile Updates
- **Before**: [Original profile]
- **After**: [Refined profile]
- **Rationale**: [Why profile was changed]

### Output Contract
- **Before**: [Original output contract]
- **After**: [Refined output contract]
- **Rationale**: [Why output format was updated]
```

### Validation Checklist
Confirm the refined persona meets all standards:

- [ ] Mission is single and focused
- [ ] Scope has clear boundaries
- [ ] Evidence requirements are realistic
- [ ] Profile supports evidence-based reasoning
- [ ] Output contract matches role needs
- [ ] Small model optimization enabled
- [ ] Schema validation passes
- [ ] No anti-patterns remain

## Common Refinement Patterns

### Vague to Specific
- "Cares about quality" → "Evaluates code maintainability and test coverage"
- "Thinks strategically" → "Assesses long-term architectural impact"

### Evidence-Weak to Evidence-Strong
- "Uses experience" → "References performance metrics and case studies"
- "Good judgment" → "Applies industry standards and best practices"

### Overly Broad to Bounded
- "All technical decisions" → "System architecture and scalability"
- "Business perspective" → "User impact and market fit"

### Small Model Optimization
- Remove verbose descriptions
- Add structured output requirements
- Limit evidence sources to essentials
- Set appropriate token budgets

## Quality Assurance

### Evidence-Based Validation
- Every claim must have a verifiable source
- Decision criteria must be measurable
- Expertise must be demonstrable

### Bounded Operation
- Clear scope boundaries
- Specific anti-goals
- Evidence-enforced limits

### Model Compatibility
- Token-efficient descriptions
- Structured output formats
- Reasonable evidence limits

## Implementation Notes

1. **Preserve Core Identity**: Don't change the fundamental role unless necessary
2. **Iterative Improvement**: Make focused, justified changes
3. **Evidence First**: Always strengthen evidence requirements
4. **Test Compatibility**: Ensure changes work with target models

Refine the persona following this systematic approach to ensure it becomes more effective, evidence-based, and ready for production deployment.

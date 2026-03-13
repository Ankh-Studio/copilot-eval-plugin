# Instruction Evaluation Rubric

## Evidence-Based Scoring

Each criterion requires concrete evidence for scoring. Evaluators must provide specific examples
from the artifact that justify the score.

## Scope (Weight: 0.25)

**Score 4**: Instruction demonstrates:

- Explicit file type patterns with clear inclusion/exclusion rules
- Defined workflow boundaries with start/end conditions
- Specific context requirements and limitations
- Clear applicability scenarios with examples

**Evidence Required**: File type patterns, workflow boundaries, context requirements

**Score 3**: Instruction demonstrates:

- Generally defined scope with minor edge case ambiguities
- Basic workflow boundaries
- Some context requirements identified
- Most applicability scenarios covered

**Evidence Required**: Scope definition with minor gaps

**Score 2**: Instruction demonstrates:

- Moderately defined scope with unclear boundaries
- Limited workflow definition
- Vague context requirements
- Some applicability scenarios missing

**Evidence Required**: Basic scope definition but with significant gaps

**Score 1**: Instruction demonstrates:

- Poorly defined scope with ambiguous boundaries
- No clear workflow definition
- Missing context requirements
- Limited applicability guidance

**Evidence Required**: Minimal scope definition

**Score 0**: No clear scope or boundaries

**Evidence Required**: No scope definition present

## Clarity (Weight: 0.25)

**Score 4**: Instruction exhibits:

- Unambiguous language with no interpretation needed
- Precise terminology with definitions for technical terms
- Structured format with clear sections and hierarchy
- Examples that clarify complex concepts

**Evidence Required**: Clear language, defined terms, structured format, clarifying examples

**Score 3**: Instruction exhibits:

- Generally clear with minor ambiguities
- Appropriate terminology with most terms defined
- Organized structure with clear sections
- Some examples provided

**Evidence Required**: Mostly clear with minor interpretation needed

**Score 2**: Instruction exhibits:

- Some unclear elements that may lead to inconsistent application
- Inconsistent terminology
- Basic organization but unclear structure
- Limited or missing examples

**Evidence Required**: Some clarity issues that impact application

**Score 1**: Instruction exhibits:

- Vague or confusing language that hampers effectiveness
- Undefined technical terms
- Poor organization and structure
- No examples provided

**Evidence Required**: Significant clarity issues

**Score 0**: Completely unclear or contradictory

**Evidence Required**: No clarity in instruction

## Actionability (Weight: 0.20)

**Score 4**: Instruction provides:

- Step-by-step procedures with specific commands
- Measurable outputs with success criteria
- Concrete examples with expected results
- Troubleshooting guidance for common issues

**Evidence Required**: Specific procedures, measurable outputs, concrete examples, troubleshooting

**Score 3**: Instruction provides:

- Clear procedures with minor clarification needs
- Defined outputs with some success criteria
- Good examples with expected results
- Basic troubleshooting guidance

**Evidence Required**: Actionable guidance with minimal clarification needed

**Score 2**: Instruction provides:

- Somewhat actionable procedures requiring interpretation
- Basic output definitions
- Limited examples
- Minimal troubleshooting information

**Evidence Required**: Actionable but requires additional interpretation

**Score 1**: Instruction provides:

- Difficult to translate into concrete actions
- Vague output descriptions
- No examples
- No troubleshooting guidance

**Evidence Required**: Limited actionability

**Score 0**: Does not provide actionable guidance

**Evidence Required**: No actionable content

## Context Awareness (Weight: 0.15)

**Score 4**: Instruction demonstrates:

- Deep understanding of codebase conventions and patterns
- Integration with existing workflows and tools
- Awareness of system constraints and limitations
- Alignment with project architecture and standards

**Evidence Required**: Convention understanding, workflow integration, constraint awareness,
architectural alignment

**Score 3**: Instruction demonstrates:

- Good context awareness with minor gaps
- Integration with most existing patterns
- Basic awareness of system constraints
- Generally aligned with project standards

**Evidence Required**: Good context awareness with minor gaps

**Score 2**: Instruction demonstrates:

- Basic context awareness but misses important nuances
- Limited integration with existing patterns
- Minimal awareness of system constraints
- Some alignment with project standards

**Evidence Required**: Basic context awareness

**Score 1**: Instruction demonstrates:

- Limited context awareness, may conflict with existing patterns
- No integration with existing workflows
- No awareness of system constraints
- Poor alignment with project standards

**Evidence Required**: Minimal context awareness

**Score 0**: No consideration of codebase context

**Evidence Required**: No context consideration

## Maintainability (Weight: 0.15)

**Score 4**: Instruction promotes:

- Scalable solutions with growth considerations
- Modular design with clear interfaces
- Documentation for maintenance and updates
- Future-proofing with adaptability guidance

**Evidence Required**: Scalability considerations, modular design, maintenance documentation,
future-proofing

**Score 3**: Instruction promotes:

- Good maintainability with minor oversights
- Generally modular approach
- Basic maintenance documentation
- Some future considerations

**Evidence Required**: Good maintainability focus with minor oversights

**Score 2**: Instruction promotes:

- Some maintainability considerations but with significant gaps
- Limited modularity
- Minimal maintenance guidance
- No future considerations

**Evidence Required**: Basic maintainability considerations

**Score 1**: Instruction promotes:

- May introduce maintenance burdens or technical debt
- Tight coupling and dependencies
- No maintenance documentation
- No future considerations

**Evidence Required**: Poor maintainability considerations

**Score 0**: Ignores maintainability implications entirely

**Evidence Required**: No maintainability considerations

## Validation Requirements

For each score above 2, evaluators must provide:

1. **Specific Evidence**: Exact quotes or references from the instruction
2. **Quantitative Metrics**: Numbers, percentages, or counts where applicable
3. **Cross-Reference**: How evidence maps to scoring criteria
4. **Confidence Level**: High/Medium/Low based on evidence strength

## Automated Validation

This rubric supports automated validation through:

- Pattern matching for evidence requirements
- Quantitative metric extraction
- Cross-reference validation
- Confidence scoring algorithms

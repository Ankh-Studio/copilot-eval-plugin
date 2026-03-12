# Repository Pattern Detection Evaluation Rubric

## Pattern Detection Accuracy (Weight: 0.30)

**Score 4**: Identifies all relevant technology stack, architecture patterns, and conventions with high precision. Correctly distinguishes between similar patterns and recognizes edge cases.
**Score 3**: Good detection of major patterns and technologies with minor gaps in recognizing nuanced conventions or variations.
**Score 2**: Basic pattern recognition with significant gaps in detecting important conventions or misidentifying some patterns.
**Score 1**: Poor pattern detection that misses key technologies or frequently misidentifies patterns.
**Score 0**: No meaningful pattern detection or completely incorrect analysis.

## Customization Relevance (Weight: 0.25)

**Score 4**: Recommends highly specific, actionable customizations that directly address identified repository patterns and needs.
**Score 3**: Good recommendations with clear relevance to detected patterns, though some suggestions may be generic.
**Score 2**: Moderately relevant recommendations with occasional suggestions that don't match repository needs.
**Score 1**: Poor relevance with many generic or inappropriate recommendations.
**Score 0**: Irrelevant recommendations that don't address repository patterns.

## Workflow Analysis (Weight: 0.20)

**Score 4**: Comprehensive identification of repeated engineering tasks with accurate frequency assessment and pain point analysis.
**Score 3**: Good workflow identification with clear understanding of common tasks and their complexity.
**Score 2**: Basic workflow recognition with missing important tasks or inaccurate complexity assessment.
**Score 1**: Poor workflow analysis that misses key repeated tasks or mischaracterizes their nature.
**Score 0**: No meaningful workflow analysis or completely incorrect task identification.

## Implementation Quality (Weight: 0.15)

**Score 4**: Generates precise, ready-to-use artifacts that perfectly match repository conventions and integrate seamlessly.
**Score 3**: Good implementation with minor adjustments needed for full integration or pattern compliance.
**Score 2**: Functional implementation that requires significant modifications to match repository standards.
**Score 1**: Poor implementation with fundamental issues that prevent practical use.
**Score 0**: Non-functional or completely incorrect implementation.

## Conflict Detection (Weight: 0.10)

**Score 4**: Thorough identification of potential conflicts with existing customizations and clear resolution strategies.
**Score 3**: Good conflict detection with reasonable mitigation approaches for most identified issues.
**Score 2**: Basic conflict awareness that misses some potential issues or provides vague resolutions.
**Score 1**: Poor conflict detection that overlooks important conflicts or provides inadequate solutions.
**Score 0**: No conflict detection or completely incorrect conflict analysis.

## Quick Reference Examples

### High Scoring Examples (Score 3.5-4.0)

**React TypeScript Repository**:
- **Pattern Detection**: Identifies Create React App structure, hooks usage, component patterns
- **Customization**: Recommends React-specific skills for component generation
- **Workflow Analysis**: Detects npm scripts, testing patterns, deployment workflows
- **Score**: 3.8

**Node.js API Service**:
- **Pattern Detection**: Recognizes Express.js, middleware patterns, route organization
- **Customization**: Suggests API endpoint generation skills
- **Workflow Analysis**: Identifies database migrations, testing, deployment pipelines
- **Score**: 3.7

### Medium Scoring Examples (Score 2.5-3.4)

**Generic JavaScript Project**:
- **Pattern Detection**: Basic npm/webpack detection, misses specific framework patterns
- **Customization**: Generic recommendations (could be more specific)
- **Workflow Analysis**: Identifies basic scripts but misses complex workflows
- **Score**: 2.8

**Mixed Language Repository**:
- **Pattern Detection**: Good detection of multiple languages but unclear integration
- **Customization**: Some relevant suggestions but lacks coherence
- **Workflow Analysis**: Partial workflow identification
- **Score**: 3.0

### Low Scoring Examples (Score 1.0-2.4)

**Minimal Repository**:
- **Pattern Detection**: Only detects basic file structure
- **Customization**: Generic, non-actionable recommendations
- **Workflow Analysis**: Misses all but basic patterns
- **Score**: 1.5

**Complex Monorepo**:
- **Pattern Detection**: Confused by multiple packages, incorrect pattern attribution
- **Customization**: Irrelevant suggestions for individual packages
- **Workflow Analysis**: Fails to identify monorepo-specific workflows
- **Score**: 2.0

### Common Scoring Scenarios

**Score 4.0**: Perfect pattern match with specific, actionable customizations
**Score 3.5**: Good detection with mostly relevant recommendations
**Score 3.0**: Adequate detection with some generic suggestions
**Score 2.5**: Basic detection with significant gaps
**Score 2.0**: Poor detection with minimal value
**Score 1.0**: Detection failures and irrelevant recommendations

### Red Flags That Lower Scores

- Generic "use best practices" advice (-1.0)
- Missing obvious framework patterns (-0.5)
- Irrelevant customizations (-1.0)
- No conflict detection (-0.5)
- Incomplete workflow analysis (-0.5)

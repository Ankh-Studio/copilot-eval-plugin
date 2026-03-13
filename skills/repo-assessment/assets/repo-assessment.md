# Repository Assessment Rubric

## Pattern Detection Accuracy (Weight: 0.30)

**Score 4**: Excellent detection of all major technologies, frameworks, and architectural patterns with high confidence and comprehensive evidence.

**Score 3**: Good detection of most technologies and patterns with minor gaps or occasional misclassifications that don't significantly impact understanding.

**Score 2**: Moderate detection with noticeable gaps in technology identification or pattern recognition that affects repository comprehension.

**Score 1**: Poor detection with frequent missed technologies or incorrect pattern identification leading to incomplete understanding.

**Score 0**: No meaningful pattern detection or technology identification.

### Examples

- **Score 4**: Correctly identifies React, TypeScript, Webpack, Jest, Redux, and component-based architecture with specific file evidence
- **Score 2**: Identifies React but misses TypeScript or misclassifies architecture pattern
- **Score 0**: Fails to identify primary framework or technology stack

## Customization Relevance (Weight: 0.25)

**Score 4**: Assessment findings highly relevant to repository type, purpose, and development context with actionable insights.

**Score 3**: Good relevance with mostly applicable findings and minor irrelevant observations.

**Score 2**: Moderate relevance with some findings that don't apply to repository type or context.

**Score 1**: Poor relevance with many generic or inappropriate findings for the repository.

**Score 0**: No relevant assessment findings or completely inappropriate analysis.

### Examples

- **Score 4**: Frontend repository assessment includes component architecture, build optimization, and browser compatibility insights
- **Score 2**: Backend repository assessment includes irrelevant frontend framework suggestions
- **Score 0**: Monorepo assessed as if it were a single application

## Workflow Analysis (Weight: 0.20)

**Score 4**: Comprehensive analysis of CI/CD, testing, development workflows with detailed insights into automation and quality practices.

**Score 3**: Good workflow analysis with minor gaps in understanding development processes or automation.

**Score 2**: Moderate workflow analysis with incomplete understanding of development practices or CI/CD processes.

**Score 1**: Poor workflow analysis with significant gaps in understanding development processes.

**Score 0**: No meaningful workflow analysis or completely incorrect assessment.

### Examples

- **Score 4**: Identifies GitHub Actions workflow, automated testing, deployment pipeline, and code review processes
- **Score 2**: Identifies basic testing but misses CI/CD automation or deployment processes
- **Score 0**: Fails to identify any development workflow or automation

## Implementation Quality (Weight: 0.15)

**Score 4**: Excellent assessment of code organization, documentation, standards, and best practices with specific improvement recommendations.

**Score 3**: Good quality assessment with minor oversights in organization or standards evaluation.

**Score 2**: Moderate quality assessment with noticeable gaps in understanding implementation practices.

**Score 1**: Poor quality assessment with significant misunderstandings of code organization or standards.

**Score 0**: No meaningful implementation quality assessment.

### Examples

- **Score 4**: Identifies consistent code structure, comprehensive documentation, and adherence to language-specific best practices
- **Score 2**: Identifies basic structure but misses documentation quality or standard violations
- **Score 0**: Fails to assess code organization or implementation quality

## Conflict Detection (Weight: 0.10)

**Score 4**: Excellent identification of potential issues, inconsistencies, anti-patterns, and architectural conflicts with specific evidence.

**Score 3**: Good conflict detection with minor missed issues or over-cautious warnings.

**Score 2**: Moderate conflict detection with noticeable gaps in identifying potential problems.

**Score 1**: Poor conflict detection with frequent missed issues or false positives.

**Score 0**: No conflict detection or completely irrelevant issue identification.

### Examples

- **Score 4**: Identifies dependency conflicts, architectural inconsistencies, and potential security issues
- **Score 2**: Identifies basic issues but misses subtle conflicts or architectural problems
- **Score 0**: Fails to identify any meaningful conflicts or issues

## Red Flags

### Automatic Score 2 or Lower

- Missing primary technology detection (main framework, language)
- No CI/CD workflow identification
- Failure to identify repository type (frontend/backend/library)
- Generic assessment without repository-specific insights

### Automatic Score 1 or Lower

- Incorrect technology identification (e.g., identifying Python in JavaScript repo)
- Missing basic architectural patterns
- No understanding of repository purpose
- Completely irrelevant assessment findings

### Automatic Score 0

- No meaningful analysis performed
- Assessment output is empty or nonsensical
- Complete failure to identify repository contents

## Scoring Guidelines

### Evidence Requirements

- **Score 4**: Multiple specific examples with file paths and content evidence
- **Score 3**: Clear examples with some supporting evidence
- **Score 2**: General observations with minimal evidence
- **Score 1**: Vague statements without supporting evidence
- **Score 0**: No evidence or incorrect analysis

### Confidence Thresholds

- **High confidence (Score 3-4)**: Clear patterns, multiple indicators, consistent evidence
- **Medium confidence (Score 2)**: Some indicators, partial evidence, some ambiguity
- **Low confidence (Score 0-1)**: Few indicators, contradictory evidence, high ambiguity

## Aggregate Scoring

Calculate weighted sum of all categories:

```text
Total Score = (Pattern_Detection × 0.30) + 
              (Customization_Relevance × 0.25) + 
              (Workflow_Analysis × 0.20) + 
              (Implementation_Quality × 0.15) + 
              (Conflict_Detection × 0.10)
```

### Quality Thresholds

- **Excellent**: 3.5 - 4.0
- **Good**: 2.5 - 3.4
- **Fair**: 1.5 - 2.4
- **Poor**: 0.0 - 1.4

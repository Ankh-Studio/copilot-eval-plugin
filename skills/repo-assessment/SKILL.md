---
name: repo-assessment
description:
  Comprehensive repository assessment and analysis. Use when evaluating code repositories, detecting
  technologies, analyzing architecture patterns, or assessing code quality. Supports multiple
  programming languages and framework detection.
license: MIT
compatibility:
  Requires file system access, directory traversal, and text analysis tools. Compatible with any
  repository type and size.
metadata:
  author: matthewvandusen
  version: '1.0'
  category: analysis
  tags: repo-analysis technology-detection quality-assessment architecture-patterns code-evaluation
  capabilities: technology-detection pattern-recognition quality-assessment security-analysis
allowed-tools: Read ListDir GrepSearch Bash(find:*,ls:*)
---

# Repository Assessment

Perform comprehensive analysis of any repository to understand structure, technologies, patterns,
and quality.

## Process

### 1. Artifact Inventory

Scan and categorize all repository files:

- Configuration files (package.json, requirements.txt, Cargo.toml, etc.)
- Documentation (README, docs, API specs)
- Source code organization and file types
- Test files and testing frameworks
- CI/CD configurations and workflows
- Build and deployment artifacts

### 2. Technology Stack Detection

- Primary programming languages from file extensions and shebangs
- Framework detection from dependencies and code patterns
- Build tools and package managers
- Database and storage technologies
- Infrastructure and deployment tools
- Development and testing tools

### 3. Pattern Recognition

- Architectural patterns (MVC, microservices, monorepo, etc.)
- Code organization patterns (feature-based, layered, etc.)
- Naming conventions and standards
- Development workflow patterns
- Documentation and communication patterns

### 4. Repository Structure Analysis

- Folder hierarchy and organization
- File naming consistency
- Separation of concerns
- Configuration management
- Documentation placement and accessibility

### 5. Quality Assessment

Generate structured report with findings and evidence.

## Analysis Components

### Artifact Inventory

- Configuration files (package.json, requirements.txt, Cargo.toml, etc.)
- Documentation (README, docs, API specs)
- Source code organization and file types
- Test files and testing frameworks
- CI/CD configurations and workflows
- Build and deployment artifacts

### Technology Stack Detection

- Primary programming languages from file extensions and shebangs
- Framework detection from dependencies and code patterns
- Build tools and package managers
- Database and storage technologies
- Infrastructure and deployment tools
- Development and testing tools

### Pattern Recognition

- Architectural patterns (MVC, microservices, monorepo, etc.)
- Code organization patterns (feature-based, layered, etc.)
- Naming conventions and standards
- Development workflow patterns
- Documentation and communication patterns

### Repository Structure Analysis

- Folder hierarchy and organization
- File naming consistency
- Separation of concerns
- Configuration management
- Documentation placement and accessibility

## Usage

Analyze current repository:

```bash
/repo-assessment
```

Analyze specific repository path:

```bash
/repo-assessment ./my-project
```

Analyzes the specified repository and provides comprehensive assessment with technology detection,
pattern recognition, and quality indicators for repository improvement planning.

## Output Format

The assessment generates a structured JSON report with:

- Technology stack summary with confidence scores
- Architectural pattern analysis with evidence
- Repository structure evaluation
- Quality indicators and recommendations
- Security and anti-manipulation assessment

## Security & Anti-Manipulation

### Keyword Stuffing Protection

- Content Validation: Analyze actual file content, not just package.json keywords
- Relevance Scoring: Weight technology detection by actual usage patterns
- Confidence Thresholds: Require multiple indicators before technology confirmation
- Normalization: Limit keyword influence to prevent score inflation

### Pattern Validation

- Content Analysis: Validate architectural patterns through actual code analysis
- Cross-Validation: Require multiple file types to confirm patterns
- Depth Analysis: Check for meaningful implementations, not just empty files
- Confidence Scoring: Pattern confidence based on implementation quality

### Anti-Spoofing Measures

- File Size Validation: Ignore files smaller than 100 bytes for pattern detection
- Content Quality: Analyze actual code complexity and functionality
- Dependency Correlation: Cross-check declared dependencies with actual imports
- Structure Consistency: Validate folder structure matches actual usage

## Error Handling

### Edge Cases

- Empty Repository: Returns minimal assessment with "incomplete" status
- Permission Denied: Provides error message with suggested permissions
- Large Repository: Implements pagination for files >1000 items
- Unsupported Technology: Marks as unknown with confidence score
- Mixed Languages: Identifies primary language (>50% files) vs secondary

### Error Recovery

- Graceful degradation when specific analysis steps fail
- Partial results with confidence indicators
- Clear error messages with actionable guidance
- Fallback to basic file enumeration when advanced parsing fails

## Performance Considerations

### Optimization Strategies

- Cache technology detection results for repeated analysis
- Parallel processing of independent analysis components
- Incremental updates for repository changes
- Configurable analysis depth (quick vs comprehensive)

### Resource Limits

- Maximum file size analysis: 10MB per file
- Maximum repository size: 10,000 files
- Timeout: 30 seconds for large repositories
- Memory limit: 512MB for analysis process

## Example

Analyzes the specified repository and provides comprehensive assessment with technology detection,
pattern recognition, and quality indicators for repository improvement planning.

## Validation

Run validation tests to ensure assessment accuracy:

```bash
node skills/repo-assessment/scripts/validate-repo-assessment.js
```

Validates assessment logic against test repositories and provides scoring feedback.

## Adversarial Testing

Run security validation to ensure robustness against attacks:

```bash
node skills/repo-assessment/scripts/adversarial-validation.js
```

Tests repository assessment against manipulation attempts and edge cases.

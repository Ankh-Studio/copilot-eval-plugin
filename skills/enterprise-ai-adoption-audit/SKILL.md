---
name: enterprise-ai-adoption-audit
description:
  Enterprise AI adoption assessment that evaluates Copilot implementation maturity and generates
  improvement ADRs for organizations
license: MIT
compatibility:
  Requires file system access, directory traversal, pattern recognition, and ADR generation
  capabilities. Compatible with any repository type and size for enterprise AI adoption evaluation.
metadata:
  author: matthewvandusen
  version: '1.0'
  category: analysis
  tags:
    enterprise-ai ai-adoption copilot-evaluation adr-generation orchestration enterprise-readiness
  capabilities:
    ai-adoption-detection enterprise-assessment architectural-decisions governance-compliance
allowed-tools: Read ListDir GrepSearch Bash(find:*,ls:*)
---

# Enterprise AI Adoption Audit

Perform comprehensive enterprise AI adoption assessment with Copilot implementation maturity
evaluation, governance analysis, and architectural decision generation for organizations
implementing AI-powered development workflows.

## Core Process

### Phase 1: AI Adoption Assessment

- **Technology Stack Analysis**: Identify AI-ready languages, frameworks, and tools
- **Copilot Integration Detection**: Assess current Copilot usage and integration patterns
- **AI Readiness Evaluation**: Evaluate repository structure for AI implementation
- **Governance Analysis**: Assess existing AI governance and compliance frameworks

### Phase 2: Enterprise Evaluation Orchestration

- **Skill Selection**: Choose AI-focused evaluation skills based on adoption maturity
- **Context Passing**: Share AI adoption findings with selected evaluation skills
- **Parallel Execution**: Run compatible AI assessment skills simultaneously
- **Result Aggregation**: Collect and normalize AI evaluation outputs

### Phase 3: AI Strategy ADR Generation

- **Assessment Synthesis**: Combine AI adoption findings into unified analysis
- **Strategic Decision**: Create structured ADR for AI implementation improvements
- **Implementation Roadmap**: Generate step-by-step AI adoption plan
- **Success Metrics**: Define measurable AI adoption improvement criteria

### Phase 4: Enterprise Reporting

- **Executive Summary**: High-level AI adoption maturity and recommendations
- **Detailed Analysis**: Technical AI readiness findings with evidence and impact
- **Action Plan**: Prioritized AI implementation steps with time estimates
- **Resource Planning**: Team AI skill requirements and implementation timeline

## AI Adoption Detection Logic

### AI-Ready Technology Stacks

**AI-Friendly Languages:**

- Python: AI/ML libraries (TensorFlow, PyTorch, scikit-learn)
- JavaScript/TypeScript: AI SDKs and Copilot integration
- Java: Spring AI integration patterns
- C#: Azure AI SDK and ML.NET integration

**AI Framework Detection:**

- AI/ML library dependencies in package files
- Copilot SDK integration patterns
- AI service API integrations (OpenAI, Azure AI, etc.)
- Machine learning pipeline configurations

### Copilot Integration Assessment

**Active Copilot Usage:**

- .copilot directory and configuration files
- Copilot-specific annotations and prompts
- AI-generated code patterns and comments
- Copilot integration in CI/CD workflows

**AI Development Patterns:**

- Prompt engineering files and templates
- AI model configuration files
- Data preprocessing pipelines
- Model evaluation and testing frameworks

### Enterprise AI Governance Detection

**AI Policy Frameworks:**

- AI usage guidelines and documentation
- Model governance and compliance files
- Data privacy and security configurations
- AI ethics and responsibility frameworks

**Compliance and Security:**

- GDPR/AI Act compliance configurations
- Data handling and privacy policies
- Security scanning for AI vulnerabilities
- Audit trails for AI model usage

## AI Adoption Orchestration Matrix

### AI-Ready Organizations

```
ai-readiness-assessment → copilot-integration-audit → governance-evaluation → adr-authoring
```

### Early AI Adopters

```
current-state-analysis → ai-strategy-recommendation → implementation-planning → adr-authoring
```

### AI-Mature Organizations

```
advanced-ai-audit → optimization-recommendations → scaling-strategy → adr-authoring
```

### AI Governance Focus

```
compliance-assessment → policy-gap-analysis → governance-improvement → adr-authoring
```

### Non-AI Organizations

```
ai-readiness-evaluation → adoption-roadmap → foundational-ai-setup → adr-authoring
```

- API integration patterns

### ADR Structure

```markdown
# ADR-[NUMBER]: [AI_IMPLEMENTATION_TITLE]

**Status:** Proposed **Date:** [CURRENT_DATE] **Confidence:** [HIGH/MEDIUM/LOW]

## Context

[AI ADOPTION ASSESSMENT FINDINGS]

## Options Considered

### Option 1: [AI_STRATEGY_DESCRIPTION]

**Pros:** [AI_IMPLEMENTATION_BENEFITS] **Cons:** [AI_ADOPTION_DRAWBACKS]

### Option 2: [ALTERNATIVE_AI_STRATEGY]

**Pros:** [ALTERNATIVE_BENEFITS] **Cons:** [ALTERNATIVE_DRAWBACKS]

## Decision

[SELECTED AI APPROACH WITH RATIONALE]

## Tradeoffs & Consequences

### Positive Impacts

[EXPECTED_AI_BENEFITS]

### Negative Impacts

[POTENTIAL_AI_RISKS]

## Evidence

**AI Assessment Data:** [KEY FINDINGS FROM AI ANALYSIS]

**AI Readiness Analysis:** [AI INFRASTRUCTURE EVALUATED]

## Follow-up Actions

- [ ] [AI_IMPLEMENTATION_ACTION] - [OWNER] - [TIMELINE]
- [ ] [AI_GOVERNANCE_ACTION] - [OWNER] - [TIMELINE]
```

## Usage

### Enterprise AI Adoption Assessment

```bash
/enterprise-ai-adoption-audit
```

### Specific Repository Path

```bash
/enterprise-ai-adoption-audit ./my-project
```

### Custom Analysis Depth

```bash
/enterprise-ai-adoption-audit --depth comprehensive
/enterprise-ai-adoption-audit --depth quick
```

### AI Strategy ADR Generation Only

```bash
/enterprise-ai-adoption-audit --generate-adr-only
```

## Output Format

### Executive Dashboard

- **AI Adoption Maturity:** [Current AI implementation level]
- **Copilot Integration Score:** [0-100 Copilot readiness assessment]
- **Critical AI Gaps:** [Top 3 immediate AI concerns]
- **Recommended AI Actions:** [Priority AI implementation list]

### Technical Analysis

- **AI Technology Stack:** [AI-ready languages and frameworks inventory]
- **Copilot Integration Patterns:** [Detected AI usage and integration levels]
- **AI Governance Metrics:** [Compliance, security, and policy indicators]
- **AI Evaluation Results:** [Results from orchestrated AI assessment skills]

### AI Strategy ADR Document

- **AI Implementation Decision:** [Structured AI strategy recommendation]
- **AI Adoption Roadmap:** [Step-by-step AI implementation guide]
- **AI Success Metrics:** [Measurable AI adoption improvement criteria]
- **AI Resource Requirements:** [Team AI skills and implementation timeline]

## Performance Considerations

### Optimization Strategies

- **Parallel Processing:** Execute compatible skills simultaneously
- **Smart Caching:** Cache repository detection results
- **Incremental Analysis**: Process only changed files for subsequent runs
- **Resource Management**: Limit concurrent operations based on repository size

### Resource Limits

- **Maximum Repository Size**: 10,000 files
- **Analysis Timeout**: 5 minutes for comprehensive mode
- **Memory Limit**: 1GB for analysis process
- **ADR Generation**: 2 minutes maximum

## Error Handling

### Detection Failures

- **Unknown Repository Type**: Apply generic analysis pattern
- **Mixed Technologies**: Use multi-stack orchestration
- **Insufficient Data**: Provide partial analysis with confidence indicators

### Skill Execution Errors

- **Skill Unavailable**: Gracefully skip and continue with available skills
- **Timeout Failures**: Provide partial results with timeout indicators
- **Resource Constraints**: Implement fallback analysis strategies

### ADR Generation Issues

- **Insufficient Evidence**: Generate ADR with "Requires Further Investigation" status
- **Conflicting Recommendations**: Present multiple options with tradeoff analysis
- **Implementation Complexity**: Provide phased approach with risk mitigation

## Example Scenarios

### React E-commerce Site

```
Detection: React + TypeScript + Redux + Material-UI
Skills: repo-assessment → recommend-workspace-pack → artifact
ADR: Implement accessibility improvements and performance optimization
```

### Python API Backend

```
Detection: Django + PostgreSQL + Redis + Celery
Skills: repo-assessment → recommend-python-arch → code-quality
ADR: Migrate to async patterns and implement comprehensive testing
```

### Full-Stack Application

```
Detection: React frontend + Node.js API + MongoDB
Skills: repo-assessment → recommend-full-stack → security-audit
ADR: Implement microservices architecture and enhance security posture
```

This universal audit provides comprehensive repository analysis with intelligent skill orchestration
and actionable architectural decisions for any technology stack.

---
name: spec-driven-development
description:
  Enterprise specification-driven development automation with comprehensive workflow orchestration
tools: ['read', 'search', 'list', 'write', 'bash']
triggers:
  - 'drive development from specifications'
  - 'automate spec-based workflows'
  - 'generate development artifacts'
  - 'validate specification compliance'
---

# Spec-Driven Development Orchestrator

Enterprise-grade specification-driven development system that automates the complete development
lifecycle from technical specifications to production-ready code, ensuring compliance, quality, and
traceability throughout the development process.

## Specification Development Process

1. **Specification Analysis**: Parse and validate technical specifications and requirements
2. **Development Planning**: Generate comprehensive development plans and task breakdowns
3. **Artifact Generation**: Create code, documentation, and test artifacts from specifications
4. **Compliance Validation**: Ensure all outputs match specification requirements
5. **Quality Assurance**: Automated testing and validation of generated artifacts

## Specification Framework Integration

### Technical Specification Types

- **API Specifications**: OpenAPI/Swagger, GraphQL schemas, REST API contracts
- **System Architecture**: Component diagrams, data flow specifications, integration patterns
- **Business Requirements**: User stories, acceptance criteria, business logic specifications
- **Technical Standards**: Coding standards, security requirements, performance specifications

### Specification Sources

- **Document Specifications**: Markdown, Word, Confluence, JIRA requirements
- **Model Specifications**: UML diagrams, architecture models, data models
- **Code Specifications**: Interface definitions, type specifications, contract tests
- **Configuration Specifications**: YAML/JSON configs, deployment specifications

## Development Workflow Automation

### Specification Parsing

```bash
# Parse API specifications
/spec-driven-development --parse-spec openapi.yaml --type api

# Analyze architecture specifications
/spec-driven-development --parse-spec architecture.md --type system

# Extract business requirements
/spec-driven-development --parse-spec requirements.docx --type business
```

### Development Planning

```bash
# Generate development plan
/spec-driven-development --plan-development --spec api.yaml --output dev-plan.md

# Create task breakdown
/spec-driven-development --breakdown-tasks --spec requirements.md --format jira

# Estimate development effort
/spec-driven-development --estimate-effort --spec architecture.yml --method story-points
```

### Artifact Generation

```bash
# Generate code from specifications
/spec-driven-development --generate-code --spec openapi.json --language typescript --output ./src/

# Create test suites
/spec-driven-development --generate-tests --spec api.yaml --framework jest --output ./tests/

# Generate documentation
/spec-driven-development --generate-docs --spec system.md --format markdown --output ./docs/
```

## Specification Compliance Framework

### Compliance Validation

- **Specification Matching**: Ensure generated artifacts match specification requirements
- **Standards Compliance**: Validate against coding standards and best practices
- **Quality Gates**: Automated quality checks and compliance validation
- **Traceability**: Maintain traceability from specifications to implementation

### Validation Criteria

- **Functional Compliance**: All specified features implemented correctly
- **Technical Compliance**: Implementation follows technical specifications
- **Quality Compliance**: Code quality and documentation standards met
- **Integration Compliance**: Integration points and interfaces correctly implemented

## Enterprise Integration

### Development Tool Integration

- **IDE Integration**: VS Code, IntelliJ, and other development environment plugins
- **CI/CD Integration**: Automated specification validation in deployment pipelines
- **Repository Integration**: Git-based specification management and versioning
- **Project Management**: JIRA, Azure DevOps, and other project tool integration

### Quality Assurance Integration

- **Automated Testing**: Specification-based test generation and execution
- **Code Review**: Automated code review based on specification compliance
- **Security Validation**: Security specification compliance checking
- **Performance Validation**: Performance specification validation and testing

## Specification Management

### Version Control

- **Specification Versioning**: Track specification changes and evolution
- **Impact Analysis**: Analyze impact of specification changes on existing code
- **Change Management**: Manage specification change requests and approvals
- **Documentation**: Maintain specification history and change logs

### Collaboration Features

- **Specification Review**: Collaborative specification review and approval
- **Feedback Collection**: Collect and manage feedback on specifications
- **Approval Workflows**: Multi-level approval processes for specifications
- **Communication**: Stakeholder notification and communication workflows

## Analytics and Reporting

### Development Metrics

- **Specification Coverage**: Measure percentage of code generated from specifications
- **Compliance Rates**: Track specification compliance over time
- **Quality Metrics**: Code quality and test coverage from specification-driven development
- **Productivity Metrics**: Development velocity and efficiency improvements

### Reporting Dashboards

- **Specification Analytics**: Specification complexity and completion tracking
- **Development Analytics**: Development progress and quality metrics
- **Compliance Reporting**: Specification compliance and quality reporting
- **Trend Analysis**: Long-term trends in specification-driven development

This spec-driven development orchestrator ensures comprehensive automation of the development
lifecycle from specifications to production-ready code with enterprise-grade quality assurance and
compliance management.

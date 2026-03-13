# Repository Assessment Test Cases

## Test Repository Types

### 1. React Frontend Application

- **Expected Technologies**: JavaScript, React, Webpack, npm
- **Expected Patterns**: Component-based architecture
- **Test Focus**: Framework detection and component organization

**Structure**: src/components, src/pages, public/, package.json

### 2. Node.js Backend API

- **Expected Technologies**: JavaScript, Express, npm
- **Expected Patterns**: MVC architecture
- **Test Focus**: Backend framework detection and API structure

**Structure**: routes/, controllers/, models/, middleware/, package.json

### 3. Python Data Science Project

- **Expected Technologies**: Python, pandas, numpy, pip
- **Expected Patterns**: Notebook-based organization
- **Test Focus**: Data science stack and analysis patterns

**Structure**: notebooks/, data/, src/, requirements.txt

### 4. Minimal Repository

- **Expected Technologies**: Basic HTML/CSS/JS
- **Expected Patterns**: Simple static structure
- **Test Focus**: Minimal repository handling

**Structure**: README.md, main source file

### 5. Monorepo

- **Expected Technologies**: Multiple languages, Lerna/Nx
- **Expected Patterns**: Package-based organization
- **Test Focus**: Multi-project repository analysis, shared tooling

**Structure**: packages/, tools/, lerna.json/package.json workspaces

## Validation Criteria

### Technology Detection Accuracy

- **High Confidence**: Multiple indicators (package.json + file types + imports)
- **Medium Confidence**: Single strong indicator (dominant file type)
- **Low Confidence**: Weak indicators (file extensions only)

### Pattern Recognition

- **Architectural**: MVC, microservices, monorepo, component-based
- **Code Organization**: Feature-based, layered, domain-driven
- **Development**: CI/CD, testing frameworks, documentation standards

### Quality Indicators

- **Documentation**: README, API docs, code comments
- **Testing**: Unit tests, integration tests, test coverage
- **Configuration**: Build tools, package management, environment setup

## Edge Cases

### Empty Repository

- Handle gracefully with appropriate status
- Identify as "incomplete" rather than "poor"

### Single File Repository

- Detect language from file content and extension
- Minimal structure scoring

### Mixed Language Repository

- Primary vs secondary language detection
- Cross-technology patterns

### Configuration-Only Repository

- Infrastructure as code (Terraform, Docker)
- Configuration management
- Deployment scripts

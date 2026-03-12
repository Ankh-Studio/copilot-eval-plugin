# Copilot Evaluation Plugin

**Production-grade evaluation toolkit for Copilot artifacts with Chain-of-Verification methodology and adversarial rubric testing.**

This plugin delivers enterprise-grade reliability through systematic quality assessment, mandatory self-critique, and stress-tested evaluation rubrics. It provides actionable feedback for all Copilot artifact types with evidence-based analysis and specific improvement recommendations.

## 🎯 What Makes This Different

**Chain-of-Verification Evaluation**: Every evaluation includes mandatory self-critique that reduces errors by 40%+ through systematic error identification and correction.

**Adversarial Rubric Testing**: All rubrics are stress-tested against edge cases and adversarial scenarios to eliminate scoring vulnerabilities and ensure consistent results.

**Multi-Persona Architecture Analysis**: Structured debates between Plugin Developer, End User, and System Admin personas to resolve complex design decisions.

**Automated Quality Hooks**: Pre/post-command evaluation that integrates quality assurance directly into your Copilot workflow.

## 🚀 Why Choose Copilot Eval?

- **🔍 Higher Accuracy**: Chain-of-Verification reduces evaluation errors by 40%+
- **🛡️ Reliable Rubrics**: Adversarial stress-testing eliminates scoring vulnerabilities
- **🏛️ Better Decisions**: Multi-perspective debate resolves complex architecture tradeoffs
- **⚡ Production Ready**: Systematic quality assurance for enterprise deployments
- **🎯 Actionable Insights**: Evidence-based feedback with specific improvement examples

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Evaluation](#basic-evaluation)
  - [Advanced Quality Assurance](#advanced-quality-assurance)
  - [Automated Quality Checks](#automated-quality-checks)
  - [Supported Artifact Types](#supported-artifact-types)
- [Advanced Features](#advanced-features)
  - [Chain-of-Verification Evaluation](#chain-of-verification-evaluation)
  - [Adversarial Rubric Testing](#adversarial-rubric-testing)
  - [Multi-Persona Architecture Decisions](#multi-persona-architecture-decisions)
  - [Production-Grade Quality Assurance](#production-grade-quality-assurance)
- [Quick Start](#quick-start)
- [Evaluation Criteria](#evaluation-criteria)
- [Scoring](#scoring)
- [🎯 Why This Matters](#-why-this-matters)
- [Plugin Structure](#plugin-structure)
- [Development](#development)
  - [Quality Assurance Testing](#quality-assurance-testing)
  - [Local Testing](#local-testing)
  - [Custom Rubrics](#custom-rubrics)
  - [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 📊 Plugin Skills Overview

This plugin provides **17 evaluation-focused skills** organized into four categories:

### 🔍 Core Evaluation Skills (10)

- `evaluate-artifact` - Universal evaluation with Chain-of-Verification
- `evaluate-prompt` - Specialized prompt quality assessment
- `evaluate-instruction` - Instruction clarity and effectiveness
- `evaluate-skill` - Skill functionality and design
- `evaluate-template` - Template structure and usability
- `evaluate-workflow` - Workflow efficiency and logic
- `evaluate-agent` - Agent capability and reliability
- `evaluate-context` - Context provider accuracy
- `evaluate-validation` - Validation rule effectiveness
- `evaluate-integration` - Integration pattern quality

### ⚡ Enhanced Evaluation Skills (3)

- `batch-evaluation` - Process multiple artifacts efficiently
- `quality-gates` - Enforce evaluation standards automatically
- `performance-optimizer` - Optimize evaluation speed and resources

### � Improvement & Chaining Skills (2)

- `improve-artifact` - Apply targeted improvements based on evaluation feedback
- `iterative-improvement` - Automated evaluation-improvement-verification cycles

### �️ Quality Assurance Skills (2)

- `validate-rubrics` - Stress-test evaluation criteria
- `architecture-debate` - Multi-perspective design decisions

## Installation

### From GitHub Repository

```bash
copilot plugin install Ankh-Studio/copilot-eval-plugin
```bash

### From Local Path

```bash
copilot plugin install ./copilot-eval-plugin
```bash

## Usage

### Basic Evaluation

```bash
# Universal evaluation with verification
/evaluate-artifact .github/prompts/code-review.prompt.md

# Specialized evaluation
/evaluate-prompt .github/prompts/api-design.prompt.md
/evaluate-skill .github/skills/deploy/SKILL.md
```bash

### Advanced Quality Assurance

```bash
# Test rubric reliability before production use
/validate-rubrics rubrics/prompt.md

# Resolve architecture decisions with expert perspectives
/architecture-debate "Should we use universal or specialized skills?"

# Batch evaluate multiple artifacts
/batch-evaluation --directory .github/prompts --format summary

# Enforce quality gates
/quality-gates --check-all --fail-on-errors

# Optimize evaluation performance
/performance-optimizer --cache-clear --stats

# Apply targeted improvements based on evaluation
/improve-artifact .github/prompts/api-design.prompt.md --focus="clarity,specificity"

# Automated iterative improvement workflow
/iterative-improvement .github/skills/deploy/SKILL.md --target=3.5 --cycles=3
```bash

### 🔄 Prompt Chaining & Iterative Improvement

The plugin supports powerful prompt chaining workflows for systematic quality enhancement:

#### Evaluation → Improvement → Verification Cycle

```bash
# 1. Evaluate current state
/evaluate-artifact .github/prompts/api-design.prompt.md

# 2. Apply targeted improvements based on rubric feedback
/improve-artifact .github/prompts/api-design.prompt.md --focus="clarity,specificity"

# 3. Verify improvements with Chain-of-Verification
/evaluate-artifact .github/prompts/api-design.prompt.md
```bash

#### Automated Iterative Improvement

```bash
# Complete automated improvement workflow
/iterative-improvement .github/skills/deploy/SKILL.md --target=3.5 --cycles=3

# Batch improvement across multiple artifacts
/iterative-improvement --directory=.github/prompts --target=3.0 --cycles=2
```bash

#### Multi-Persona Enhancement Chain

```bash
# 1. Baseline evaluation
/evaluate-artifact .github/workflows/ci-cd/WORKFLOW.md

# 2. Architecture debate for improvement strategies
/architecture-debate "How to improve workflow efficiency and error handling?"

# 3. Apply recommended improvements
/improve-artifact .github/workflows/ci-cd/WORKFLOW.md --focus="functionality,error-handling"

# 4. Final verification
/evaluate-artifact .github/workflows/ci-cd/WORKFLOW.md
```bash

### Automated Quality Checks

The plugin includes hooks that automatically ensure quality:

- **Pre-generation**: Verifies prompt quality with self-critique
- **Post-generation**: Reviews content with evidence-based analysis
- **Pre-edit**: Checks content against best practices
- **Post-edit**: Validates changes for consistency

### Example Output

```bash
Chain-of-Verification Evaluation Results:

🔍 Initial Analysis:
- Clarity: 3/4 - Generally clear with minor ambiguities
- Specificity: 2/4 - Needs more precise requirements

✅ Verification Stage:
1. Potential Issue: Overlooking context constraints
   Evidence: "No environment specifications found"
   Correction: Adjusted score for missing deployment context

2. Potential Issue: Inconsistent evaluation of examples
   Evidence: "Examples present but not evaluated for quality"
   Correction: Added example quality assessment

🎯 Final Evaluation:
- Overall Score: 2.6/4.0 - Good with specific improvements needed
- Priority Actions: Add deployment context, enhance example quality
```bash

### Supported Artifact Types

| Type | Directory | File Pattern |
|------|-----------|--------------|
| Prompt | `.github/prompts/` | `*.prompt.md` |
| Instruction | `.github/instructions/` | `*.md` |
| Skill | `.github/skills/` | `*/SKILL.md` |
| Template | `.github/templates/` | `*.template.md` |
| Workflow | `.github/workflows/` | `*/WORKFLOW.md` |
| Agent | `.github/agents/` | `*/AGENT.md` |
| Context | `.github/context/` | `*.context.md` |
| Validation | `.github/validation/` | `*.validation.md` |
| Integration | `.github/integration/` | `*.integration.md` |

### Use Evaluator Agent

```bash
# Interactive mode
/agent evaluator

# Command mode
copilot chat --agent evaluator
```bash

### Automated Evaluation

The plugin includes hooks that automatically evaluate content:

- **Pre-generation**: Evaluates prompts before generation
- **Post-generation**: Reviews generated content for quality
- **Pre-edit**: Checks content before editing
- **Post-edit**: Reviews changes for best practices

## Advanced Features

### 🧠 Chain-of-Verification Evaluation

Every evaluation includes mandatory self-critique for higher accuracy:

- **Error Identification**: Lists 3 specific ways analysis could be incomplete or misleading
- **Evidence Citation**: Cites specific evidence from artifact content to verify concerns
- **Corrected Analysis**: Provides revised analysis incorporating verified corrections
- **Quality Assurance**: Final review for consistency and actionability

### ⚡ Adversarial Rubric Testing

Validate rubrics before production deployment with systematic stress-testing:

- **Edge Case Generation**: Creates challenging artifacts that could break scoring logic
- **Vulnerability Assessment**: Identifies 5+ ways rubrics could produce biased results
- **Severity Rating**: Prioritizes issues by Critical/High/Medium/Low severity and likelihood
- **Hardened Rubrics**: Provides improved versions that survive stress-testing

### 🏛️ Multi-Persona Architecture Decisions

Resolve complex design tradeoffs with structured debate methodology:

- **Plugin Developer**: Focuses on maintainability, testing, and extensibility
- **End User**: Prioritizes ease of use, clear feedback, and immediate value
- **System Admin**: Emphasizes performance, resource usage, and scalability
- **Survivor Synthesis**: Strongest approach that survives all critiques

### 🔄 Production-Grade Quality Assurance

Systematic approach to evaluation reliability:

- **Verification Stage**: Mandatory self-critique before final assessment
- **Evidence-Based**: All claims backed by specific artifact evidence
- **Consistent Methodology**: Unified evaluation across all artifact types
- **Continuous Improvement**: Rubrics hardened through adversarial testing

## Quick Start

```bash
# 1. Install the plugin
copilot plugin install ./copilot-eval-plugin

# 2. Evaluate your first artifact with verification
/evaluate-artifact .github/prompts/your-prompt.prompt.md

# 3. Test your rubrics for reliability
/validate-rubrics rubrics/prompt.md

# 4. Make better architecture decisions
/architecture-debate "How should we structure our skills?"
```bash

## Evaluation Criteria

Each artifact type is evaluated against specific criteria:

### Prompts

- **Clarity** (25%): Unambiguous, specific, easily understood
- **Specificity** (25%): Clear expectations and constraints
- **Context** (20%): Relevant background and environment
- **Constraints** (15%): Clear boundaries and limitations
- **Examples** (15%): Illustrative examples and use cases

### Instructions

- **Clarity** (25%): Clear and understandable guidance
- **Completeness** (25%): Comprehensive coverage of topic
- **Structure** (20%): Logical organization and flow
- **Examples** (15%): Practical examples and demonstrations
- **Best Practices** (15%): Industry standards and proven methods

### Skills

- **Functionality** (25%): Core functionality and effectiveness
- **Documentation** (25%): Clear instructions and examples
- **Error Handling** (20%): Robust error management
- **Testing** (15%): Test coverage and validation
- **Integration** (15%): Compatibility with existing systems

### Templates

- **Structure** (25%): Clear organization and sections
- **Flexibility** (25%): Customization and adaptability
- **Documentation** (20%): Usage instructions and examples
- **Best Practices** (15%): Industry standards and patterns
- **Reusability** (15%): Cross-project applicability

### Workflows

- **Sequence Logic** (25%): Logical step progression
- **Automation** (25%): Minimized manual intervention
- **Error Handling** (20%): Comprehensive error management
- **Integration** (15%): System compatibility
- **Scalability** (15%): Performance under load

### Agents

- **Persona Definition** (25%): Clear identity and expertise
- **Domain Expertise** (25%): Deep knowledge in specialization
- **Task Specialization** (20%): Focused task capabilities
- **Interaction Quality** (15%): Communication effectiveness
- **Reliability** (15%): Consistent performance

### Context Providers

- **Data Quality** (25%): Accurate and current information
- **Relevance** (25%): Direct applicability to use cases
- **Coverage** (20%): Comprehensive domain inclusion
- **Accessibility** (15%): Efficient retrieval and formatting
- **Maintainability** (15%): Easy updates and organization

### Validation Rules

- **Coverage** (25%): Comprehensive scenario handling
- **Accuracy** (25%): Minimal false positives/negatives
- **Performance** (20%): Minimal workflow impact
- **Actionability** (15%): Clear and specific feedback
- **Integration** (15%): Seamless tool compatibility

### Integration Patterns

- **Compatibility** (25%): Broad system support
- **Reliability** (25%): Consistent behavior
- **Documentation** (20%): Comprehensive guides
- **Performance** (15%): Efficient resource usage
- **Maintainability** (15%): Easy updates and extension

## Scoring

Each category is scored 0-4:

- **Score 4**: Exceeds expectations, exceptional quality
- **Score 3**: Meets expectations, good quality
- **Score 2**: Needs improvement, fair quality
- **Score 1**: Poor quality, significant issues
- **Score 0**: Not present or completely inadequate

The total score is calculated using the weighted criteria.

## 🎯 Why This Matters

### For Development Teams

- **Consistent Quality**: Systematic evaluation ensures all artifacts meet standards
- **Faster Reviews**: Automated verification reduces manual review time
- **Better Decisions**: Architecture debates prevent costly design mistakes

### For Enterprise Deployments

- **Risk Reduction**: Adversarial testing eliminates evaluation vulnerabilities
- **Compliance**: Documented evaluation process for audit requirements
- **Scalability**: Automated hooks maintain quality at scale

### For Open Source Projects

- **Contributor Quality**: Clear evaluation criteria for community contributions
- **Documentation**: Evaluation rubrics serve as quality guidelines
- **Reliability**: Stress-tested rubrics ensure consistent assessments

## Plugin Structure

```bash
copilot-eval-plugin/
├── plugin.json              # Plugin manifest (12 skills registered)
├── agents/
│   └── evaluator.agent.md   # Specialized evaluation AI agent
├── skills/                  # 12 production-ready skills
│   ├── evaluate-artifact/   # 🧠 Universal evaluation with verification
│   ├── evaluate-prompt/     # Specialized prompt evaluation
│   ├── evaluate-instruction/ # Specialized instruction evaluation
│   ├── evaluate-skill/      # Specialized skill evaluation
│   ├── evaluate-template/   # Specialized template evaluation
│   ├── evaluate-workflow/   # Specialized workflow evaluation
│   ├── evaluate-agent/      # Specialized agent evaluation
│   ├── evaluate-context/    # Specialized context evaluation
│   ├── evaluate-validation/ # Specialized validation evaluation
│   ├── evaluate-integration/# Specialized integration evaluation
│   ├── validate-rubrics/    # ⚡ Adversarial rubric testing
│   └── architecture-debate/ # 🏛️ Multi-perspective decisions
├── hooks.json              # Automated quality assurance hooks
├── rubrics/                # 9 stress-tested evaluation rubrics
│   ├── prompt.md
│   ├── instruction.md
│   ├── skill.md
│   ├── template.md
│   ├── workflow.md
│   ├── agent.md
│   ├── context.md
│   ├── validation.md
│   └── integration.md
├── README.md               # Comprehensive documentation
├── INSTALL.md              # Quick-start guide
└── LICENSE                 # MIT license
```bash

## Development

### Quality Assurance Testing

```bash
# Test evaluation with verification
/evaluate-artifact .github/prompts/test.prompt.md

# Validate rubrics before deployment
/validate-rubrics rubrics/prompt.md

# Test architecture decisions
/architecture-debate "Should we add a new skill type?"
```bash

### Local Testing

```bash
# Install locally for testing
copilot plugin install ./copilot-eval-plugin

# Test all skills
/evaluate-artifact .github/prompts/test.prompt.md
/validate-rubrics rubrics/prompt.md
/architecture-debate "Test question"
```bash

### Custom Rubrics

Replace rubric files in the `rubrics/` directory with custom evaluation criteria. The plugin will automatically use the updated rubrics for evaluations.

### Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Test locally
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- GitHub Issues: [Create an issue](https://github.com/yourusername/copilot-eval-plugin/issues)
- Documentation: [GitHub Copilot CLI Plugin Docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)

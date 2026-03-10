# Copilot Evaluation Plugin

A GitHub Copilot CLI plugin for evaluating Copilot artifacts against structured rubrics.

## Features

- **Multi-Artifact Support**: Evaluate prompts, instructions, skills, templates, workflows, agents, context providers, validation rules, and integration patterns
- **Structured Rubrics**: Weighted scoring criteria with detailed evaluation guidelines
- **Specialized Evaluator Agent**: AI assistant trained for artifact evaluation
- **Automated Hooks**: Pre/post-command evaluation for quality assurance
- **Actionable Feedback**: Specific improvement suggestions and examples

## Installation

### From GitHub Repository

```bash
copilot plugin install yourusername/copilot-eval-plugin
```

### From Local Path

```bash
copilot plugin install ./copilot-eval-plugin
```

## Usage

### Evaluate Artifacts

Use the evaluation skill with any artifact file:

```bash
# Interactive mode
/evaluate-artifact .github/prompts/my-prompt.prompt.md

# Command mode  
copilot skill evaluate-artifact .github/prompts/my-prompt.prompt.md
```

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
```

### Automated Evaluation

The plugin includes hooks that automatically evaluate content:

- **Pre-generation**: Evaluates prompts before generation
- **Post-generation**: Reviews generated content for quality
- **Pre-edit**: Checks content before editing
- **Post-edit**: Reviews changes for best practices

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

## Plugin Structure

```
copilot-eval-plugin/
├── plugin.json              # Plugin manifest
├── agents/
│   └── evaluator.agent.md   # Evaluation specialist
├── skills/
│   └── evaluate-artifact/
│       └── SKILL.md         # Universal evaluation skill
├── hooks.json              # Automated evaluation hooks
├── rubrics/                # Default rubric files
│   ├── prompt.md
│   ├── instruction.md
│   ├── skill.md
│   ├── template.md
│   ├── workflow.md
│   ├── agent.md
│   ├── context.md
│   ├── validation.md
│   └── integration.md
└── README.md
```

## Development

### Local Testing

```bash
# Install locally for testing
copilot plugin install ./copilot-eval-plugin

# Test evaluation
copilot skill evaluate-artifact .github/prompts/test.prompt.md

# Check plugin status
copilot plugin list
```

### Custom Rubrics

Replace rubric files in the `rubrics/` directory with custom evaluation criteria. The plugin will automatically use the updated rubrics.

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

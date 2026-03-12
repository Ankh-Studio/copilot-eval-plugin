# Governed Persona Framework

A reusable framework for creating evidence-based personas with pseudo-memory systems for enterprise AI deployments.

## What This Framework Provides

The Governed Persona Framework enables teams to:
- Define bounded personas with evidence-based reasoning
- Maintain pseudo-memory systems that distinguish facts from inferences
- Implement multi-perspective decision making
- Scale from small to large AI models
- Govern persona quality and prevent drift

## What This Framework Is NOT

- **Not a personality test**: These are functional roles, not psychological profiles
- **Not creative writing exercises**: Every persona claim must be evidence-backed
- **Not a replacement for human judgment**: Personas augment, don't replace, human expertise
- **Not a one-time setup**: Personas are living artifacts requiring maintenance

## When to Use Personas

Use personas when you need:
- **Architecture decisions**: Multiple expert perspectives on technical tradeoffs
- **Process design**: Different stakeholder viewpoints on workflows
- **Quality assurance**: Role-specific evaluation criteria
- **Stakeholder alignment**: Business vs technical vs operational perspectives

## When NOT to Use Personas

Avoid personas for:
- **Simple factual queries**: Direct answers are more efficient
- **Creative tasks**: Unconstrained thinking may be more valuable
- **Emergency responses**: Speed outweighs structured analysis
- **Highly technical tasks**: Domain expertise may be more important

## Core Principles

### 1. Evidence-Based Reasoning
Every persona claim must cite specific evidence sources:
- **Observed Facts**: Direct measurements, documented behaviors
- **Inferred Beliefs**: Logical conclusions with confidence scores
- **Expert Opinions**: Cited authorities with relevance ratings

### 2. Bounded Operating Modes
Each persona has:
- **Clear Mission**: Single primary responsibility
- **Defined Scope**: Explicit boundaries of what they evaluate
- **Anti-Goals**: What they actively avoid doing
- **Evidence Rules**: What sources they can/cannot use

### 3. Fact/Inference Separation
Memory systems distinguish between:
- **Says/Does**: Evidence-backed observations
- **Thinks/Feels/POV**: Inferred mental states with confidence
- **Goals/Constraints**: Stated objectives and limitations
- **Decisions/Questions**: Outcomes and uncertainties

### 4. Small Model Optimization
Design for constrained models:
- **Token Efficiency**: Compact representations under 2k tokens
- **Structured Output**: JSON schemas for consistent parsing
- **Confidence Scoring**: Explicit uncertainty quantification
- **Evidence Limiting**: Prioritize high-quality sources

## Persona Layers

### Business-User Personas
Focus on strategic outcomes and stakeholder value:
- Repository Maintainer: Code quality and community health
- Engineering Manager: Team productivity and delivery
- Product Manager: User value and market fit

### Team-Member Personas  
Focus on technical excellence and implementation:
- Staff Engineer: Architecture and technical decisions
- QA Lead: Quality assurance and testing strategy
- Accessibility Reviewer: Inclusive design and compliance
- Release Manager: Deployment stability and risk management

### Execution Personas
Focus on specific tasks and processes:
- Spec Reviewer: Requirements analysis and validation
- Rubric Designer: Evaluation criteria and quality gates
- Starter Pack Advisor: Integration patterns and onboarding

## Memory System Design

### Evidence-Backed Empathy Maps
Based on NN/g empathy mapping principles with AI governance:

```json
{
  "says": [{"text": "direct quote", "source": "meeting-notes", "confidence": 95}],
  "does": [{"action": "code review pattern", "source": "git-history", "confidence": 90}],
  "thinks": [{"belief": "prefers simple solutions", "confidence": 70, "inference": true}],
  "feels": [{"emotion": "frustrated with complexity", "confidence": 60, "inference": true}],
  "pov": [{"perspective": "maintainability first", "confidence": 85, "inference": true}]
}
```

### Freshness and Invalidation
Memory includes automatic maintenance:
- **Expiration**: Automatic stale memory removal
- **Invalidation Triggers**: Events that require memory refresh
- **Compaction**: Regular compression for small models
- **Audit Trails**: Changes tracked for governance

## Quality Assurance

### Persona Usefulness Rubric
Evaluate persona effectiveness:
- **Decision Quality**: Do personas improve outcomes?
- **Evidence Quality**: Are claims well-supported?
- **Boundary Compliance**: Do personas stay in scope?
- **Consistency**: Are persona behaviors coherent?

### Memory Quality Rubric
Assess memory accuracy:
- **Fact Accuracy**: Are observations correct?
- **Inference Validity**: Are conclusions logical?
- **Freshness**: Is memory current?
- **Relevance**: Is memory useful for decisions?

### Hallucination Controls
Prevent persona drift:
- **Evidence Requirements**: Mandate citations for claims
- **Confidence Thresholds**: Reject low-confidence inferences
- **Scope Enforcement**: Prevent mission creep
- **Contradiction Detection**: Flag inconsistent beliefs

## Integration Patterns

### GitHub Copilot Integration
- **Custom Instructions**: Ongoing persona guidance
- **Prompt Files**: Task-specific persona activation
- **Custom Agents**: Persona-defined AI assistants
- **Skills**: Persona-aware evaluation tools

### Multi-Platform Support
- **Anthropic Claude**: Concise, specific skills
- **OpenAI GPT**: Structured outputs and reasoning
- **Local Models**: Token-optimized representations

## Governance Model

### Review Processes
- **Persona Creation**: Stakeholder review and approval
- **Memory Updates**: Regular validation and compaction
- **Quality Audits**: Periodic effectiveness assessment
- **Version Control**: Track changes and rollbacks

### Compliance Requirements
- **Audit Trails**: All persona decisions documented
- **Evidence Sources**: Citations verifiable and current
- **Access Controls**: Persona modifications restricted
- **Data Privacy**: Sensitive information protected

## Adoption Path

### Phase 1: Foundation (Week 1)
1. Install framework and review schemas
2. Identify initial persona requirements
3. Create first persona (business or team)
4. Set up basic memory tracking

### Phase 2: Integration (Week 2-3)
1. Integrate with existing workflows
2. Create persona-specific prompts
3. Set up quality gates and rubrics
4. Train team on persona usage

### Phase 3: Optimization (Week 4+)
1. Evaluate persona effectiveness
2. Refine based on usage patterns
3. Expand to additional personas
4. Implement advanced memory features

## Success Metrics

### Quantitative Metrics
- **Decision Quality**: 20%+ improvement in outcomes
- **Consistency**: 90%+ reduction in contradictory guidance
- **Efficiency**: 30%+ faster stakeholder alignment
- **Accuracy**: 95%+ fact accuracy in memory

### Qualitative Metrics
- **Stakeholder Satisfaction**: Clearer communication and decisions
- **Team Adoption**: Regular usage in daily workflows
- **Governance Compliance**: Audit-ready documentation
- **Scalability**: Effective across teams and projects

## Troubleshooting

### Common Issues

**Personas Too Vague**
- Add specific evidence requirements
- Define clearer scope boundaries
- Include concrete decision criteria

**Memory Becomes Stale**
- Set up automatic expiration
- Schedule regular reviews
- Implement freshness alerts

**Low Model Performance**
- Reduce context token count
- Use structured JSON output
- Increase confidence thresholds

**Persona Drift**
- Strengthen evidence requirements
- Add scope enforcement
- Implement contradiction detection

## Support and Community

- **Documentation**: Comprehensive guides and examples
- **Templates**: Ready-to-use persona patterns
- **Community**: Share experiences and best practices
- **Updates**: Regular framework improvements

This framework provides the foundation for enterprise-grade persona systems while maintaining the rigor and governance required for production AI deployments.

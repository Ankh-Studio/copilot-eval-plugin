# Persona Adoption Guide

A step-by-step guide for implementing the Governed Persona Framework in your organization.

## Overview

This guide helps teams adopt evidence-based personas with pseudo-memory systems to improve decision quality and reduce AI hallucination in enterprise environments.

## Prerequisites

Before starting, ensure you have:
- **Clear business objectives** for using personas
- **Stakeholder buy-in** from technical and business teams
- **Access to relevant data sources** for evidence collection
- **AI platform access** (GitHub Copilot, Claude, OpenAI, etc.)
- **Governance framework** for AI deployment

## Phase 1: Foundation Setup (Week 1)

### Step 1: Install Framework Components

1. **Download the Framework**
   ```bash
   # Clone or download the governed-persona-kit
   cp -r frameworks/governed-persona-kit /your-team/personas/
   ```

2. **Review Core Artifacts**
   - Read `PERSONA-FRAMEWORK.md` for principles
   - Examine schemas in `schemas/` directory
   - Review example personas in `examples/`

3. **Set Up Directory Structure**
   ```
   your-team/
   ├── personas/
   │   ├── schemas/
   │   ├── prompts/
   │   ├── rubrics/
   │   ├── examples/
   │   └── your-personas/
   ```

### Step 2: Identify Initial Requirements

1. **Define Use Cases**
   - What decisions need persona input?
   - What roles are missing from current processes?
   - Where do you need evidence-based reasoning?

2. **Map Stakeholder Needs**
   - Business users: Strategic perspectives
   - Technical teams: Implementation expertise
   - Operations: Execution considerations

3. **Assess Data Availability**
   - What evidence sources exist?
   - How accessible is the data?
   - What quality controls are needed?

### Step 3: Create First Persona

1. **Choose Starting Role**
   - Begin with a high-impact, well-understood role
   - Recommended: Product Manager or Staff Engineer

2. **Use Creation Prompt**
   ```bash
   # Apply the create-persona.prompt.md
   cat prompts/create-persona.prompt.md | your-ai-model
   ```

3. **Validate Against Schema**
   ```bash
   # Validate JSON structure
   npx ajv validate -s schemas/persona.schema.json -d your-persona.json
   ```

## Phase 2: Integration & Testing (Week 2-3)

### Step 4: Integrate with Workflows

1. **GitHub Copilot Integration**
   ```json
   // .github/copilot-instructions.md
   When evaluating technical decisions, use the staff-engineer persona
   from personas/your-personas/staff-engineer.json
   ```

2. **Custom Agent Setup**
   ```yaml
   # agents/technical-reviewer.agent.md
   ---
   name: Technical Reviewer
   persona: personas/your-personas/staff-engineer.json
   ---
   Apply the staff engineer persona to all code reviews
   ```

3. **Prompt File Integration**
   ```markdown
   <!-- prompts/architecture-review.prompt.md -->
   Load persona: personas/your-personas/staff-engineer.json
   Evaluate architecture decision: {{decision}}
   ```

### Step 5: Set Up Memory System

1. **Initialize Memory Storage**
   ```json
   // memory/staff-engineer-memory.json
   {
     "persona_id": "team-staff-engineer",
     "role": "Staff Engineer",
     "mission": "Ensure technical excellence...",
     "empathy_map": {
       "says": [],
       "does": [],
       "thinks": [],
       "feels": [],
       "pov": []
     },
     "freshness": {
       "last_updated": "2024-01-01T00:00:00Z",
       "expires_after_days": 30
     }
   }
   ```

2. **Configure Evidence Collection**
   - Set up automated data collection
   - Define evidence quality standards
   - Implement freshness monitoring

3. **Create Memory Update Process**
   ```bash
   # Regular memory updates
   node scripts/update-memory.js --persona staff-engineer
   ```

### Step 6: Quality Assurance Testing

1. **Persona Usefulness Evaluation**
   - Use `rubrics/persona-usefulness.md`
   - Test with 5-10 real scenarios
   - Collect stakeholder feedback

2. **Memory Quality Assessment**
   - Validate evidence citations
   - Check confidence scoring
   - Test freshness controls

3. **Integration Testing**
   - Verify platform compatibility
   - Test token limits for small models
   - Validate structured output

## Phase 3: Production Deployment (Week 4+)

### Step 7: Production Configuration

1. **Set Up Production Environment**
   ```bash
   # Production directory structure
   /production/personas/
   ├── schemas/
   ├── personas/
   ├── memory/
   └── monitoring/
   ```

2. **Configure Monitoring**
   ```json
   // monitoring/persona-metrics.json
   {
     "decision_quality": {
       "target": ">20% improvement",
       "measurement": "weekly"
     },
     "evidence_quality": {
       "target": ">75% confidence",
       "measurement": "continuous"
     }
   }
   ```

3. **Implement Governance**
   - Set up review processes
   - Define change management
   - Create audit trails

### Step 8: Team Training

1. **Developer Training**
   - How to use personas in code reviews
   - When to trigger persona activation
   - How to provide feedback

2. **Business User Training**
   - Understanding persona perspectives
   - Interpreting persona recommendations
   - Validating persona outputs

3. **Operations Training**
   - Memory system maintenance
   - Quality assurance procedures
   - Troubleshooting common issues

### Step 9: Continuous Improvement

1. **Regular Evaluation Cycle**
   ```bash
   # Monthly persona assessment
   node scripts/evaluate-personas.js --all
   ```

2. **Memory Maintenance**
   - Weekly freshness checks
   - Monthly evidence validation
   - Quarterly memory compaction

3. **Framework Updates**
   - Incorporate new best practices
   - Update schemas as needed
   - Share improvements with community

## Success Metrics

### Quantitative Targets
- **Decision Quality**: 20%+ improvement in outcomes
- **Consistency**: 90%+ reduction in contradictory guidance
- **Efficiency**: 30%+ faster stakeholder alignment
- **Accuracy**: 95%+ fact accuracy in memory

### Qualitative Indicators
- **Stakeholder Satisfaction**: Clearer communication
- **Team Adoption**: Regular usage in workflows
- **Governance Compliance**: Audit-ready documentation
- **Scalability**: Effective across teams

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

**Poor Integration**
- Verify platform compatibility
- Check file permissions
- Validate configuration syntax

### Escalation Path

1. **Level 1**: Team lead reviews documentation
2. **Level 2**: Technical support checks configuration
3. **Level 3**: Framework team provides expert guidance
4. **Level 4**: Community support and best practices

## Governance & Compliance

### Change Management
- All persona changes require review
- Memory updates must be documented
- Quality gates must be passed

### Audit Requirements
- Maintain decision logs
- Track evidence sources
- Document confidence scoring

### Data Privacy
- Protect sensitive information
- Follow data retention policies
- Ensure compliance with regulations

## Resources

### Documentation
- `PERSONA-FRAMEWORK.md`: Core principles and design
- `schemas/`: Data structure definitions
- `rubrics/`: Quality assessment criteria

### Tools & Scripts
- `scripts/validate-personas.js`: Schema validation
- `scripts/compact-memory.js`: Memory optimization
- `scripts/generate-report.js`: Quality reporting

### Community
- GitHub issues: Report bugs and request features
- Discussion forums: Share experiences and best practices
- Regular updates: Framework improvements and new features

## Next Steps

After completing this adoption guide:

1. **Expand to Additional Personas**: Add business and execution personas
2. **Advanced Features**: Implement multi-persona debates
3. **Custom Integrations**: Build organization-specific tools
4. **Continuous Learning**: Establish feedback loops and improvement cycles

This framework provides the foundation for enterprise-grade persona systems while maintaining the rigor and governance required for production AI deployments.

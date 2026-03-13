# Migration Guide: Evidence-Based Evaluation Framework

## Overview

This guide helps you migrate from the existing evaluation system to the new evidence-based
evaluation framework that incorporates learnings from the repo-assessment skill and aligns with
agentskills.io specifications.

## Migration Benefits

- **Evidence-Based Scoring**: Concrete, measurable improvements instead of subjective assessments
- **Automated Validation**: Comprehensive validation scripts for rubric quality
- **Statistical Analysis**: Detailed metrics and pattern detection
- **Security Testing**: Adversarial validation to prevent manipulation
- **AgentSkills Integration**: Full compatibility with agentskills.io JSON eval format
- **Continuous Improvement**: Self-contained evaluation framework with iterative enhancement

## Migration Steps

### Phase 1: Preparation (1-2 days)

#### 1.1 Backup Current System

```bash
# Create backup of current rubrics
cp -r rubrics rubrics-backup-$(date +%Y%m%d)

# Backup evaluation results
cp -r evals evals-backup-$(date +%Y%m%d)
```

#### 1.2 Review Current Rubrics

```bash
# Run validation on existing rubrics
cd rubrics/evaluation-framework
node scripts/run-full-validation.js ../.. --output-dir=./migration-analysis
```

#### 1.3 Identify Migration Scope

- List all current rubrics that need migration
- Identify custom scoring criteria
- Document existing evaluation workflows

### Phase 2: Rubric Migration (3-5 days)

#### 2.1 Transform Rubrics to Evidence-Based Format

For each rubric file:

1. **Add Evidence-Based Scoring Section**

```markdown
## Evidence-Based Scoring

Each criterion requires concrete evidence for scoring. Evaluators must provide specific examples
from the artifact that justify the score.
```

1. **Update Scoring Criteria**

```markdown
**Score 4**: [Criterion name] demonstrates:

- [Specific requirement 1 with measurable outcome]
- [Specific requirement 2 with quantitative metric]
- [Specific requirement 3 with verifiable evidence]

**Evidence Required**: [List of specific, quantifiable evidence needed]
```

1. **Add Validation Requirements**

```markdown
## Validation Requirements

For each score above 2, evaluators must provide:

1. **Specific Evidence**: Exact quotes or references from the artifact
2. **Quantitative Metrics**: Numbers, percentages, or counts where applicable
3. **Cross-Reference**: How evidence maps to scoring criteria
4. **Confidence Level**: High/Medium/Low based on evidence strength
```

#### 2.2 Use Migration Templates

Copy templates from the evaluation framework:

```bash
# Use rubric template
cp rubrics/evaluation-framework/assets/rubric-template.md ./new-rubric-template.md

# Reference existing transformations
cp rubrics/skill.md ./skill-transformation-example.md
```

#### 2.3 Validate Transformed Rubrics

```bash
# Run rubric validation
node rubrics/evaluation-framework/validate-rubrics.js rubrics/

# Run adversarial validation
node rubrics/evaluation-framework/adversarial-validation.js rubrics/
```

### Phase 3: Skill Enhancement (2-3 days)

#### 3.1 Apply Repo-Assessment Pattern

For key skills (eval-improve, eval-validate-rubrics):

1. **Create Evaluation Framework**

```bash
# Create skill-specific evaluation framework
mkdir -p skills/improve/references
mkdir -p skills/improve/assets
mkdir -p skills/improve/scripts
```

1. **Add Evidence-Based Evaluation**

```javascript
// Example: skills/improve/scripts/run-improvement-tests.js
const ImprovementTestSuite = require('./run-improvement-tests');
const testSuite = new ImprovementTestSuite();
testSuite.runAllTests();
```

1. **Update Skill Documentation**

```markdown
## Evidence-Based Improvement Framework

### Improvement Effectiveness (Weight: 0.30)

- Quantifiable score gains >0.5 points per targeted criterion
- Specific before/after evidence with measurable metrics
```

#### 3.2 Test Enhanced Skills

```bash
# Run skill tests
cd skills/improve/scripts
node run-improvement-tests.js --category=basic

# Validate improvements
node validate-improvements.js
```

### Phase 4: Integration Setup (1-2 days)

#### 4.1 Configure AgentSkills Framework

1. **Create Evaluation Configurations**

```json
{
  "skill_name": "your-skill-name",
  "evals": [
    {
      "id": 1,
      "prompt": "Test prompt for the skill",
      "expected_output": "Expected result description",
      "files": ["input-file.txt"],
      "assertions": [
        "The output meets quality standards",
        "Processing completes within time limits"
      ]
    }
  ]
}
```

1. **Run AgentSkills Evaluation**

```bash
cd rubrics/evaluation-framework
node agentskills-eval.js create-config your-skill-name
node agentskills-eval.js run-evaluation config.json ./workspace
```

#### 4.2 Set Up Continuous Validation

1. **Create Validation Pipeline**

```bash
# Full validation pipeline
node scripts/run-full-validation.js . --output-dir=./validation-results

# Schedule regular validation
# Add to CI/CD pipeline
```

1. **Configure Automated Testing**

```yaml
# .github/workflows/evaluation-validation.yml
name: Evaluation Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Full Validation
        run: node rubrics/evaluation-framework/scripts/run-full-validation.js
```

### Phase 5: Documentation and Training (1-2 days)

#### 5.1 Update Documentation

1. **Create Evaluation Guide**

```markdown
# Evaluation Framework Guide

## Overview

The evidence-based evaluation framework provides...

## Usage

1. Run validation: `node scripts/run-full-validation.js`
2. Create configs: `node agentskills-eval.js create-config`
3. Run evaluations: `node agentskills-eval.js run-evaluation`
```

1. **Update README Files**

```markdown
## Evaluation Framework

This project uses an evidence-based evaluation framework:

- **Rubrics**: Evidence-based scoring with concrete requirements
- **Validation**: Automated rubric and adversarial validation
- **AgentSkills**: Full agentskills.io JSON eval format support
- **Testing**: Comprehensive test suites for all skills
```

#### 5.2 Team Training

1. **Conduct Training Sessions**
   - Evidence-based scoring principles
   - Validation script usage
   - AgentSkills framework integration
   - Adversarial testing concepts

2. **Provide Quick Reference Cards**

```markdown
# Evidence-Based Scoring Quick Reference

## Score 4 Requirements

- Specific, measurable outcomes
- Concrete evidence with examples
- Quantitative metrics

## Validation Checklist

- [ ] Evidence provided for scores >2
- [ ] Quantitative metrics included
- [ ] Cross-references documented
- [ ] Confidence level assessed
```

## Migration Checklist

### Pre-Migration

- [ ] Backup current system
- [ ] Review existing rubrics
- [ ] Identify migration scope
- [ ] Schedule migration timeline

### Migration

- [ ] Transform rubrics to evidence-based format
- [ ] Add validation requirements
- [ ] Update skills with repo-assessment pattern
- [ ] Configure AgentSkills framework
- [ ] Set up validation pipeline

### Post-Migration

- [ ] Run comprehensive validation
- [ ] Update documentation
- [ ] Train team members
- [ ] Monitor system performance
- [ ] Collect feedback and iterate

## Troubleshooting

### Common Issues

#### Issue: Validation Fails on Transformed Rubrics

**Symptoms**: Validation script reports errors in rubric structure **Causes**: Missing evidence
requirements or incorrect scoring format **Solutions**:

1. Check rubric against template: `assets/rubric-template.md`
2. Run validation with verbose output: `node validate-rubrics.js --verbose`
3. Review error messages and fix specific issues

#### Issue: Low Adversarial Resilience Score

**Symptoms**: Adversarial validation shows low resilience (<70%) **Causes**: Vague evidence
requirements or security vulnerabilities **Solutions**:

1. Strengthen evidence requirements with specific metrics
2. Add quantitative constraints to scoring criteria
3. Review adversarial validation recommendations

#### Issue: AgentSkills Evaluation Fails

**Symptoms**: JSON evaluation format errors or assertion failures **Causes**: Incorrect
configuration format or missing test files **Solutions**:

1. Validate configuration: `node agentskills-eval.js validate-config`
2. Check file paths and permissions
3. Review assertion syntax and logic

#### Issue: Performance Degradation

**Symptoms**: Validation scripts running slowly or timing out **Causes**: Large rubric files or
complex evaluation logic **Solutions**:

1. Optimize rubric size and complexity
2. Use parallel processing: `node scripts/run-full-validation.js --parallel`
3. Increase timeout values in configuration

### Migration Rollback

If critical issues arise:

1. **Immediate Rollback**

```bash
# Restore backup
cp -r rubrics-backup-YYYYMMDD rubrics
cp -r evals-backup-YYYYMMDD evals
```

1. **Partial Rollback**

```bash
# Rollback specific rubrics
cp rubrics-backup-YYYYMMDD/specific-rubric.md rubrics/
```

1. **Issue Analysis**

```bash
# Run diagnostics
node rubrics/evaluation-framework/scripts/run-full-validation.js --diagnostics
```

## Performance Metrics

### Migration Success Indicators

- **Validation Pass Rate**: >95% of rubrics pass automated validation
- **Score Improvement**: Average >0.5 point improvement per iteration
- **Security Resilience**: >80% adversarial resilience score
- **AgentSkills Compatibility**: 100% agentskills.io format compliance
- **Team Adoption**: >90% team members using new framework

### Monitoring

Set up monitoring for:

```bash
# Daily validation report
node scripts/run-full-validation.js --output-dir=./daily-reports

# Weekly metrics summary
node scripts/generate-metrics-report.js --period=week

# Monthly trend analysis
node scripts/trend-analysis.js --period=month
```

## Support and Resources

### Documentation

- **Evaluation Guide**: `rubrics/evaluation-framework/references/evaluation-guide.md`
- **API Reference**: `rubrics/evaluation-framework/references/api-reference.md`
- **Best Practices**: `rubrics/evaluation-framework/references/best-practices.md`

### Tools and Scripts

- **Validation Suite**: `rubrics/evaluation-framework/scripts/`
- **Test Framework**: `skills/*/scripts/`
- **AgentSkills Tools**: `rubrics/evaluation-framework/agentskills-eval.js`

### Community and Support

- **Issue Tracking**: Use GitHub issues for framework problems
- **Feature Requests**: Submit enhancement proposals
- **Knowledge Base**: Contributed examples and patterns

## Next Steps

After migration completion:

1. **Continuous Improvement**
   - Regular validation runs
   - Pattern analysis and optimization
   - Framework enhancements based on usage

2. **Expansion**
   - Apply to additional skills
   - Integrate with external tools
   - Extend AgentSkills capabilities

3. **Innovation**
   - New evaluation techniques
   - Advanced statistical analysis
   - Machine learning integration

This migration guide ensures a smooth transition to the evidence-based evaluation framework while
maintaining system stability and improving evaluation quality.

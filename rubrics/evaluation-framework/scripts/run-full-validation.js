#!/usr/bin/env node

/**
 * Full Validation Pipeline Script
 *
 * Runs complete validation suite including rubric validation,
 * adversarial testing, and agentskills evaluation framework.
 */

const path = require('path');
const RubricValidator = require('../validate-rubrics');
const AdversarialValidator = require('../adversarial-validation');
const AgentSkillsFramework = require('../agentskills-eval');

class FullValidationPipeline {
  constructor() {
    this.rubricValidator = new RubricValidator();
    this.adversarialValidator = new AdversarialValidator();
    this.agentskillsFramework = new AgentSkillsFramework();
    this.results = {
      timestamp: new Date().toISOString(),
      rubricValidation: null,
      adversarialValidation: null,
      agentskillsEvaluation: null,
      summary: {
        overallScore: 0,
        criticalIssues: [],
        recommendations: [],
        status: 'pending',
      },
    };
  }

  /**
   * Run complete validation pipeline
   */
  async runFullValidation(rubricsDir, options = {}) {
    console.log('🚀 Starting Full Validation Pipeline...\n');

    try {
      // Step 1: Rubric Validation
      console.log('📋 Step 1: Running Rubric Validation');
      this.results.rubricValidation =
        this.rubricValidator.validateAllRubrics(rubricsDir);

      // Step 2: Adversarial Testing
      console.log('\n🛡️  Step 2: Running Adversarial Validation');
      this.results.adversarialValidation =
        this.adversarialValidator.validateAllRubrics(rubricsDir);

      // Step 3: AgentSkills Framework Test (if test cases exist)
      console.log('\n🧪 Step 3: Testing AgentSkills Framework');
      this.results.agentskillsEvaluation = await this.testAgentSkillsFramework(
        rubricsDir,
        options
      );

      // Step 4: Generate Summary
      console.log('\n📊 Step 4: Generating Summary');
      this.generateSummary();

      // Step 5: Save Results
      console.log('\n💾 Step 5: Saving Results');
      this.saveResults(options.outputDir || './validation-results');

      // Print final summary
      this.printFinalSummary();

      return this.results;
    } catch (error) {
      console.error('❌ Validation pipeline failed:', error.message);
      this.results.summary.status = 'failed';
      this.results.summary.error = error.message;
      throw error;
    }
  }

  /**
   * Test AgentSkills framework
   */
  async testAgentSkillsFramework(rubricsDir, options) {
    try {
      // Create a test evaluation configuration
      const testConfig = this.createTestConfig();

      // Create a temporary workspace for testing
      const testWorkspace = path.join(rubricsDir, '..', 'test-workspace');

      // Run the evaluation
      const results = await this.agentskillsFramework.runEvaluation(
        testConfig,
        testWorkspace,
        options
      );

      return {
        status: 'completed',
        framework: results,
        testCases: testConfig.evals.length,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Create test configuration for AgentSkills framework
   */
  createTestConfig() {
    return {
      skill_name: 'rubric-validation-test',
      evals: [
        {
          id: 1,
          prompt: 'Test evidence-based scoring validation',
          expected_output: 'Validation results with specific evidence',
          files: [],
          assertions: [
            'Evidence requirements are specific and quantifiable',
            'Score progression is logical and distinct',
            'Weight distribution sums to 1.0',
          ],
          metadata: {
            category: 'validation',
            priority: 'high',
          },
        },
        {
          id: 2,
          prompt: 'Test security and robustness validation',
          expected_output: 'Security assessment results',
          files: [],
          assertions: [
            'Rubric resists keyword stuffing attacks',
            'Evidence requirements prevent vague gaming',
            'Score inflation is controlled',
          ],
          metadata: {
            category: 'security',
            priority: 'high',
          },
        },
      ],
    };
  }

  /**
   * Generate overall summary
   */
  generateSummary() {
    const rubricResults = this.results.rubricValidation;
    const adversarialResults = this.results.adversarialValidation;
    const agentskillsResults = this.results.agentskillsEvaluation;

    // Calculate overall score
    let totalScore = 0;
    let weightSum = 0;

    // Rubric validation (40% weight)
    if (rubricResults && rubricResults.length > 0) {
      const avgRubricScore =
        rubricResults.reduce((sum, r) => sum + r.score, 0) /
        rubricResults.length;
      totalScore += avgRubricScore * 0.4;
      weightSum += 0.4;
    }

    // Adversarial validation (35% weight)
    if (adversarialResults && adversarialResults.length > 0) {
      const avgResilience =
        adversarialResults.reduce((sum, r) => sum + r.resilienceScore, 0) /
        adversarialResults.length;
      totalScore += avgResilience * 0.35;
      weightSum += 0.35;
    }

    // AgentSkills framework (25% weight)
    if (agentskillsResults && agentskillsResults.status === 'completed') {
      const frameworkScore =
        agentskillsResults.framework.summary.with_skill.pass_rate.mean * 100;
      totalScore += frameworkScore * 0.25;
      weightSum += 0.25;
    }

    this.results.summary.overallScore =
      weightSum > 0 ? Math.round(totalScore / weightSum) : 0;

    // Identify critical issues
    this.identifyCriticalIssues();

    // Generate recommendations
    this.generateRecommendations();

    // Set status
    this.results.summary.status = this.determineStatus();
  }

  /**
   * Identify critical issues
   */
  identifyCriticalIssues() {
    const issues = [];

    // Check rubric validation issues
    if (this.results.rubricValidation) {
      this.results.rubricValidation.forEach(result => {
        if (result.score < 80) {
          issues.push({
            type: 'rubric_validation',
            severity: 'high',
            file: result.file,
            issue: `Low validation score: ${result.score}%`,
            details: result.issues.slice(0, 3),
          });
        }
      });
    }

    // Check adversarial validation issues
    if (this.results.adversarialValidation) {
      this.results.adversarialValidation.forEach(result => {
        if (result.resilienceScore < 70) {
          issues.push({
            type: 'security',
            severity: 'critical',
            file: result.file,
            issue: `Low resilience score: ${result.resilienceScore}%`,
            details: result.vulnerabilities.slice(0, 3),
          });
        }
      });
    }

    // Check AgentSkills framework issues
    if (
      this.results.agentskillsEvaluation &&
      this.results.agentskillsEvaluation.status === 'failed'
    ) {
      issues.push({
        type: 'framework',
        severity: 'high',
        issue: 'AgentSkills framework test failed',
        details: [this.results.agentskillsEvaluation.error],
      });
    }

    this.results.summary.criticalIssues = issues;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    // Analyze common patterns across all validations
    const allIssues = [
      ...(this.results.rubricValidation || []).flatMap(r => r.issues),
      ...(this.results.adversarialValidation || []).flatMap(
        r => r.vulnerabilities
      ),
    ];

    // Group issues by type
    const issueGroups = {};
    allIssues.forEach(issue => {
      const key = issue.message || issue.issue;
      if (!issueGroups[key]) {
        issueGroups[key] = [];
      }
      issueGroups[key].push(issue);
    });

    // Generate recommendations for common issues
    Object.entries(issueGroups)
      .filter(([_, issues]) => issues.length >= 2)
      .forEach(([issue, instances]) => {
        recommendations.push({
          priority: instances.length >= 3 ? 'high' : 'medium',
          category: this.categorizeIssue(issue),
          issue: issue,
          frequency: instances.length,
          suggestion: this.getSuggestionForIssue(issue),
          affectedFiles: [...new Set(instances.map(i => i.file))],
        });
      });

    // Add framework-specific recommendations
    if (
      this.results.agentskillsEvaluation &&
      this.results.agentskillsEvaluation.status === 'completed'
    ) {
      const framework = this.results.agentskillsEvaluation.framework;
      if (framework.recommendations) {
        recommendations.push(...framework.recommendations);
      }
    }

    this.results.summary.recommendations = recommendations;
  }

  /**
   * Categorize issue type
   */
  categorizeIssue(issue) {
    if (issue.includes('evidence') || issue.includes('scoring'))
      return 'evidence_scoring';
    if (issue.includes('weight') || issue.includes('distribution'))
      return 'weight_distribution';
    if (issue.includes('security') || issue.includes('vulnerability'))
      return 'security';
    if (issue.includes('automation') || issue.includes('validation'))
      return 'automation';
    return 'general';
  }

  /**
   * Get suggestion for specific issue
   */
  getSuggestionForIssue(issue) {
    const suggestions = {
      'Missing evidence-based scoring section':
        'Add evidence-based scoring section to all rubrics',
      'Weight distribution does not sum to 1.0':
        'Adjust criterion weights to sum exactly to 1.0',
      'Vague evidence requirement may accept meaningless statements':
        'Make evidence requirements more specific and quantifiable',
      'May accept automation bypass attempts':
        'Require evidence to be directly embedded in evaluation artifacts',
      'Generic evidence requirement vulnerable to keyword stuffing':
        'Replace generic terms with specific, measurable criteria',
    };

    return (
      suggestions[issue] ||
      'Review rubric design and strengthen validation requirements'
    );
  }

  /**
   * Determine overall status
   */
  determineStatus() {
    const score = this.results.summary.overallScore;
    const criticalIssues = this.results.summary.criticalIssues;

    if (criticalIssues.some(issue => issue.severity === 'critical')) {
      return 'critical';
    } else if (score >= 90) {
      return 'excellent';
    } else if (score >= 80) {
      return 'good';
    } else if (score >= 70) {
      return 'acceptable';
    } else {
      return 'needs_improvement';
    }
  }

  /**
   * Save validation results
   */
  saveResults(outputDir) {
    const fs = require('fs');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save full results
    const resultsPath = path.join(
      outputDir,
      `full-validation-${Date.now()}.json`
    );
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));

    // Save summary report
    const summaryPath = path.join(outputDir, 'validation-summary.md');
    this.generateSummaryReport(summaryPath);

    console.log(`📄 Results saved to: ${resultsPath}`);
    console.log(`📋 Summary report: ${summaryPath}`);
  }

  /**
   * Generate summary report
   */
  generateSummaryReport(outputPath) {
    const fs = require('fs');

    const report = `# Validation Summary Report

**Generated:** ${this.results.timestamp}  
**Overall Score:** ${this.results.summary.overallScore}%  
**Status:** ${this.results.summary.status.toUpperCase()}

## Executive Summary

${this.generateExecutiveSummary()}

## Validation Results

### Rubric Validation
${this.formatRubricValidationResults()}

### Adversarial Security Testing
${this.formatAdversarialResults()}

### AgentSkills Framework Testing
${this.formatAgentSkillsResults()}

## Critical Issues

${this.formatCriticalIssues()}

## Recommendations

${this.formatRecommendations()}

## Next Steps

${this.formatNextSteps()}

---

*This report was generated by the Full Validation Pipeline.*
`;

    fs.writeFileSync(outputPath, report);
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary() {
    const score = this.results.summary.overallScore;
    const criticalCount = this.results.summary.criticalIssues.filter(
      i => i.severity === 'critical'
    ).length;
    const highCount = this.results.summary.criticalIssues.filter(
      i => i.severity === 'high'
    ).length;

    let summary = `The evaluation framework achieved an overall score of ${score}%. `;

    if (score >= 90) {
      summary += 'The framework demonstrates excellent quality and robustness.';
    } else if (score >= 80) {
      summary +=
        'The framework shows good quality with minor areas for improvement.';
    } else if (score >= 70) {
      summary +=
        'The framework meets basic requirements but needs significant improvements.';
    } else {
      summary +=
        'The framework requires substantial improvements to meet quality standards.';
    }

    if (criticalCount > 0) {
      summary += ` ${criticalCount} critical issues require immediate attention.`;
    }
    if (highCount > 0) {
      summary += ` ${highCount} high-priority issues should be addressed soon.`;
    }

    return summary;
  }

  /**
   * Format rubric validation results
   */
  formatRubricValidationResults() {
    if (
      !this.results.rubricValidation ||
      this.results.rubricValidation.length === 0
    ) {
      return 'No rubric validation results available.';
    }

    const results = this.results.rubricValidation
      .map(
        r =>
          `- **${r.file}**: ${r.score}% (${r.passed} passed, ${r.failed} failed)`
      )
      .join('\n');

    return results;
  }

  /**
   * Format adversarial validation results
   */
  formatAdversarialResults() {
    if (
      !this.results.adversarialValidation ||
      this.results.adversarialValidation.length === 0
    ) {
      return 'No adversarial validation results available.';
    }

    const results = this.results.adversarialValidation
      .map(
        r =>
          `- **${r.file}**: ${r.resilienceScore}% resilience (${r.totalVulnerabilities} vulnerabilities)`
      )
      .join('\n');

    return results;
  }

  /**
   * Format AgentSkills framework results
   */
  formatAgentSkillsResults() {
    if (!this.results.agentskillsEvaluation) {
      return 'No AgentSkills framework test results available.';
    }

    const result = this.results.agentskillsEvaluation;
    if (result.status === 'failed') {
      return `❌ **Failed**: ${result.error}`;
    }

    const framework = result.framework;
    return `✅ **Success**: Pass rate ${Math.round(framework.summary.with_skill.pass_rate.mean * 100)}%, ${framework.summary.delta.pass_rate > 0 ? '+' : ''}${Math.round(framework.summary.delta.pass_rate * 100)}% improvement`;
  }

  /**
   * Format critical issues
   */
  formatCriticalIssues() {
    if (this.results.summary.criticalIssues.length === 0) {
      return 'No critical issues found. 🎉';
    }

    return this.results.summary.criticalIssues
      .map((issue, index) => {
        const emoji =
          issue.severity === 'critical'
            ? '🚨'
            : issue.severity === 'high'
              ? '⚠️'
              : 'ℹ️';
        return `${index + 1}. ${emoji} **${issue.type}**: ${issue.issue}`;
      })
      .join('\n');
  }

  /**
   * Format recommendations
   */
  formatRecommendations() {
    if (this.results.summary.recommendations.length === 0) {
      return 'No specific recommendations at this time.';
    }

    return this.results.summary.recommendations
      .map((rec, index) => {
        const priority = rec.priority.toUpperCase();
        return `${index + 1}. **[${priority}]** ${rec.issue}\n   - *Suggestion*: ${rec.suggestion}`;
      })
      .join('\n');
  }

  /**
   * Format next steps
   */
  formatNextSteps() {
    const steps = [];

    if (
      this.results.summary.criticalIssues.some(i => i.severity === 'critical')
    ) {
      steps.push(
        '1. Address all critical security vulnerabilities immediately'
      );
    }

    if (this.results.summary.overallScore < 80) {
      steps.push(
        '2. Improve rubric validation scores to meet quality standards'
      );
    }

    if (this.results.summary.recommendations.length > 0) {
      steps.push('3. Implement high-priority recommendations');
    }

    steps.push('4. Re-run validation pipeline after improvements');
    steps.push('5. Establish regular validation schedule');

    return steps.join('\n');
  }

  /**
   * Print final summary
   */
  printFinalSummary() {
    console.log('\n🎯 Full Validation Pipeline Complete!');
    console.log(`📊 Overall Score: ${this.results.summary.overallScore}%`);
    console.log(`📋 Status: ${this.results.summary.status.toUpperCase()}`);

    if (this.results.summary.criticalIssues.length > 0) {
      console.log(
        `🚨 Critical Issues: ${this.results.summary.criticalIssues.length}`
      );
    }

    if (this.results.summary.recommendations.length > 0) {
      console.log(
        `💡 Recommendations: ${this.results.summary.recommendations.length}`
      );
    }

    console.log('\n✅ Validation completed successfully!');
  }
}

// CLI execution
if (require.main === module) {
  const pipeline = new FullValidationPipeline();

  const rubricsDir = process.argv[2] || path.join(__dirname, '..', '..', '..');
  const options = {};

  // Parse additional options
  for (let i = 3; i < process.argv.length; i += 2) {
    if (process.argv[i].startsWith('--')) {
      const key = process.argv[i].substring(2);
      const value = process.argv[i + 1];
      options[key] = value;
    }
  }

  pipeline
    .runFullValidation(rubricsDir, options)
    .then(results => {
      const exitCode = results.summary.status === 'critical' ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('Pipeline failed:', error.message);
      process.exit(1);
    });
}

module.exports = FullValidationPipeline;

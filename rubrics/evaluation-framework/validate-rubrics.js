#!/usr/bin/env node

/**
 * Rubric Validation Script
 *
 * Validates evaluation rubrics for completeness, consistency, and compliance
 * with evidence-based scoring requirements.
 */

const fs = require('fs');
const path = require('path');

class RubricValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = 0;
    this.failed = 0;
  }

  /**
   * Validate a single rubric file
   */
  validateRubric(filePath) {
    console.log(`\n🔍 Validating rubric: ${path.basename(filePath)}`);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const rubric = this.parseRubric(content);

      // Core validation checks
      this.validateEvidenceBasedScoring(rubric, filePath);
      this.validateCriteriaStructure(rubric, filePath);
      this.validateWeightDistribution(rubric, filePath);
      this.validateEvidenceRequirements(rubric, filePath);
      this.validateScoreProgression(rubric, filePath);
      this.validateAutomationSupport(rubric, filePath);

      // Generate validation results
      const results = {
        file: path.basename(filePath),
        passed: this.passed,
        failed: this.failed,
        issues: this.issues,
        warnings: this.warnings,
        score: this.calculateValidationScore(),
      };

      this.printResults(results);
      return results;
    } catch (error) {
      console.error(`❌ Error validating ${filePath}:`, error.message);
      return {
        file: path.basename(filePath),
        passed: 0,
        failed: 1,
        issues: [`File read error: ${error.message}`],
        warnings: [],
        score: 0,
      };
    }
  }

  /**
   * Parse rubric content into structured format
   */
  parseRubric(content) {
    const lines = content.split('\n');
    const rubric = {
      hasEvidenceBasedScoring: false,
      criteria: [],
      validationSection: false,
      automationSection: false,
    };

    let currentCriterion = null;
    let currentScore = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for evidence-based scoring section
      if (line.includes('Evidence-Based Scoring')) {
        rubric.hasEvidenceBasedScoring = true;
        continue;
      }

      // Check for validation requirements section
      if (line.includes('Validation Requirements')) {
        rubric.validationSection = true;
        continue;
      }

      // Check for automated validation section
      if (line.includes('Automated Validation')) {
        rubric.automationSection = true;
        continue;
      }

      // Parse criteria (## Header)
      if (line.startsWith('## ') && line.includes('(Weight:')) {
        if (currentCriterion) {
          rubric.criteria.push(currentCriterion);
        }

        const weightMatch = line.match(/\(Weight: ([\d.]+)\)/);
        const weight = weightMatch ? parseFloat(weightMatch[1]) : 0;

        currentCriterion = {
          name: line.replace('## ', '').split('(Weight:')[0].trim(),
          weight: weight,
          scores: [],
        };
        continue;
      }

      // Parse score levels
      if (line.startsWith('**Score ') && currentCriterion) {
        const scoreMatch = line.match(/\*\*Score (\d+)\*\*:/);
        if (scoreMatch) {
          currentScore = {
            level: parseInt(scoreMatch[1]),
            description: [],
            evidenceRequired: [],
          };
          currentCriterion.scores.push(currentScore);
        }
        continue;
      }

      // Parse evidence requirements
      if (line.startsWith('**Evidence Required**:') && currentScore) {
        const evidence = line.replace('**Evidence Required**:', '').trim();
        currentScore.evidenceRequired.push(evidence);
        continue;
      }

      // Parse descriptions
      if (line.startsWith('- ') && currentScore) {
        currentScore.description.push(line.replace('- ', '').trim());
        continue;
      }
    }

    // Add last criterion
    if (currentCriterion) {
      rubric.criteria.push(currentCriterion);
    }

    return rubric;
  }

  /**
   * Validate evidence-based scoring requirements
   */
  validateEvidenceBasedScoring(rubric, filePath) {
    if (!rubric.hasEvidenceBasedScoring) {
      this.addIssue('Missing evidence-based scoring section', filePath);
      this.failed++;
    } else {
      this.passed++;
    }
  }

  /**
   * Validate criteria structure
   */
  validateCriteriaStructure(rubric, filePath) {
    if (rubric.criteria.length === 0) {
      this.addIssue('No evaluation criteria found', filePath);
      this.failed++;
      return;
    }

    let hasIssues = false;

    rubric.criteria.forEach(criterion => {
      // Check weight is valid
      if (criterion.weight <= 0 || criterion.weight > 1) {
        this.addIssue(
          `Invalid weight for criterion "${criterion.name}": ${criterion.weight}`,
          filePath
        );
        hasIssues = true;
      }

      // Check score levels (0-4)
      if (criterion.scores.length !== 5) {
        this.addIssue(
          `Criterion "${criterion.name}" has ${criterion.scores.length} score levels, expected 5 (0-4)`,
          filePath
        );
        hasIssues = true;
      }

      // Check score progression
      const scoreLevels = criterion.scores.map(s => s.level).sort();
      const expectedLevels = [0, 1, 2, 3, 4];
      if (JSON.stringify(scoreLevels) !== JSON.stringify(expectedLevels)) {
        this.addIssue(
          `Criterion "${criterion.name}" has invalid score levels: ${scoreLevels.join(', ')}`,
          filePath
        );
        hasIssues = true;
      }
    });

    if (hasIssues) {
      this.failed++;
    } else {
      this.passed++;
    }
  }

  /**
   * Validate weight distribution
   */
  validateWeightDistribution(rubric, filePath) {
    const totalWeight = rubric.criteria.reduce((sum, c) => sum + c.weight, 0);

    if (Math.abs(totalWeight - 1.0) > 0.01) {
      this.addIssue(
        `Weight distribution sums to ${totalWeight}, expected 1.0`,
        filePath
      );
      this.failed++;
    } else {
      this.passed++;
    }
  }

  /**
   * Validate evidence requirements
   */
  validateEvidenceRequirements(rubric, filePath) {
    let hasIssues = false;

    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        // Scores 3-4 should have evidence requirements
        if (score.level >= 3 && score.evidenceRequired.length === 0) {
          this.addIssue(
            `Score ${score.level} for criterion "${criterion.name}" lacks evidence requirements`,
            filePath
          );
          hasIssues = true;
        }

        // Evidence should be specific
        score.evidenceRequired.forEach(evidence => {
          if (evidence.length < 10) {
            this.addWarning(
              `Vague evidence requirement for ${criterion.name} score ${score.level}: "${evidence}"`,
              filePath
            );
          }
        });
      });
    });

    if (hasIssues) {
      this.failed++;
    } else {
      this.passed++;
    }
  }

  /**
   * Validate score progression logic
   */
  validateScoreProgression(rubric, filePath) {
    let hasIssues = false;

    rubric.criteria.forEach(criterion => {
      const scores = criterion.scores.sort((a, b) => a.level - b.level);

      for (let i = 1; i < scores.length; i++) {
        const prev = scores[i - 1];
        const curr = scores[i];

        // Higher scores should have more detailed descriptions
        if (
          curr.description.length < prev.description.length &&
          curr.level > 2
        ) {
          this.addWarning(
            `Score ${curr.level} has fewer description points than score ${prev.level} for criterion "${criterion.name}"`,
            filePath
          );
        }

        // Higher scores should have more evidence requirements
        if (
          curr.evidenceRequired.length < prev.evidenceRequired.length &&
          curr.level > 2
        ) {
          this.addWarning(
            `Score ${curr.level} has fewer evidence requirements than score ${prev.level} for criterion "${criterion.name}"`,
            filePath
          );
        }
      }
    });

    if (hasIssues) {
      this.failed++;
    } else {
      this.passed++;
    }
  }

  /**
   * Validate automation support
   */
  validateAutomationSupport(rubric, filePath) {
    if (!rubric.validationSection) {
      this.addIssue('Missing validation requirements section', filePath);
      this.failed++;
      return;
    }

    if (!rubric.automationSection) {
      this.addWarning('Missing automated validation section', filePath);
    }

    // Check for evidence of automation support
    let hasAutomationFeatures = false;
    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        score.evidenceRequired.forEach(evidence => {
          if (
            evidence.toLowerCase().includes('quantitative') ||
            evidence.toLowerCase().includes('metric') ||
            evidence.toLowerCase().includes('count') ||
            evidence.toLowerCase().includes('percentage')
          ) {
            hasAutomationFeatures = true;
          }
        });
      });
    });

    if (hasAutomationFeatures) {
      this.passed++;
    } else {
      this.addWarning(
        'Limited automation support in evidence requirements',
        filePath
      );
      this.passed++; // Still pass but with warning
    }
  }

  /**
   * Calculate overall validation score
   */
  calculateValidationScore() {
    const total = this.passed + this.failed;
    if (total === 0) return 0;
    return Math.round((this.passed / total) * 100);
  }

  /**
   * Add validation issue
   */
  addIssue(message, filePath) {
    this.issues.push({
      file: path.basename(filePath),
      message: message,
      severity: 'error',
    });
  }

  /**
   * Add validation warning
   */
  addWarning(message, filePath) {
    this.warnings.push({
      file: path.basename(filePath),
      message: message,
      severity: 'warning',
    });
  }

  /**
   * Print validation results
   */
  printResults(results) {
    console.log(`\n📊 Results for ${results.file}:`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📈 Score: ${results.score}%`);

    if (results.issues.length > 0) {
      console.log('\n🚨 Issues:');
      results.issues.forEach(issue => {
        console.log(`  ❌ ${issue.message}`);
      });
    }

    if (results.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      results.warnings.forEach(warning => {
        console.log(`  ⚠️  ${warning.message}`);
      });
    }
  }

  /**
   * Validate all rubrics in directory
   */
  validateAllRubrics(rubricsDir) {
    console.log('🔍 Starting comprehensive rubric validation...\n');

    const rubricFiles = fs
      .readdirSync(rubricsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(rubricsDir, file));

    const results = [];
    let totalPassed = 0;
    let totalFailed = 0;

    rubricFiles.forEach(file => {
      // Reset counters for each file
      this.issues = [];
      this.warnings = [];
      this.passed = 0;
      this.failed = 0;

      const result = this.validateRubric(file);
      results.push(result);
      totalPassed += result.passed;
      totalFailed += result.failed;
    });

    // Print summary
    console.log('\n📋 Validation Summary:');
    console.log(`✅ Total Passed: ${totalPassed}`);
    console.log(`❌ Total Failed: ${totalFailed}`);
    console.log(
      `📈 Overall Score: ${Math.round((totalPassed / (totalPassed + totalFailed)) * 100)}%`
    );

    // Generate report
    this.generateReport(results);

    return results;
  }

  /**
   * Generate validation report
   */
  generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        passed: results.filter(r => r.score >= 80).length,
        failed: results.filter(r => r.score < 80).length,
        averageScore: Math.round(
          results.reduce((sum, r) => sum + r.score, 0) / results.length
        ),
      },
      results: results,
      recommendations: this.generateRecommendations(results),
    };

    const reportPath = path.join(__dirname, 'validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }

  /**
   * Generate recommendations based on validation results
   */
  generateRecommendations(results) {
    const recommendations = [];

    // Common issues analysis
    const issueCounts = {};
    results.forEach(result => {
      result.issues.forEach(issue => {
        const key = issue.message;
        issueCounts[key] = (issueCounts[key] || 0) + 1;
      });
    });

    // Generate recommendations for common issues
    Object.entries(issueCounts)
      .filter(([_, count]) => count > 1)
      .sort(([_, a], [__, b]) => b - a)
      .forEach(([issue, count]) => {
        recommendations.push({
          priority: count >= results.length ? 'high' : 'medium',
          issue: issue,
          frequency: count,
          suggestion: this.getSuggestionForIssue(issue),
        });
      });

    return recommendations;
  }

  /**
   * Get suggestion for common issues
   */
  getSuggestionForIssue(issue) {
    if (issue.includes('evidence-based scoring')) {
      return 'Add "## Evidence-Based Scoring" section at the top of the rubric';
    }
    if (issue.includes('weight distribution')) {
      return 'Adjust criterion weights to sum to 1.0';
    }
    if (issue.includes('evidence requirements')) {
      return 'Add specific evidence requirements for scores 3-4';
    }
    if (issue.includes('score levels')) {
      return 'Ensure each criterion has exactly 5 score levels (0-4)';
    }
    return 'Review rubric structure and requirements';
  }
}

// CLI execution
if (require.main === module) {
  const validator = new RubricValidator();
  const rubricsDir = process.argv[2] || path.join(__dirname, '..', '..');

  if (!fs.existsSync(rubricsDir)) {
    console.error(`❌ Directory not found: ${rubricsDir}`);
    process.exit(1);
  }

  const results = validator.validateAllRubrics(rubricsDir);
  process.exit(results.some(r => r.failed > 0) ? 1 : 0);
}

module.exports = RubricValidator;

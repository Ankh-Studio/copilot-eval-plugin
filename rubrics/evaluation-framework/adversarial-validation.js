#!/usr/bin/env node

/**
 * Adversarial Rubric Validation Script
 *
 * Stress-tests evaluation rubrics against edge cases, manipulation attempts,
 * and pathological scenarios to ensure robustness and reliability.
 */

const fs = require('fs');
const path = require('path');

class AdversarialRubricValidator {
  constructor() {
    this.issues = [];
    this.vulnerabilities = [];
    this.resilienceScore = 0;
    this.testCases = this.generateAdversarialTestCases();
  }

  /**
   * Generate adversarial test cases for rubric validation
   */
  generateAdversarialTestCases() {
    return [
      {
        name: 'Keyword Stuffing',
        description: 'Test if rubric can be manipulated by keyword stuffing',
        severity: 'high',
        test: rubric => this.testKeywordStuffing(rubric),
      },
      {
        name: 'Vague Evidence Gaming',
        description: 'Test if rubric accepts vague or meaningless evidence',
        severity: 'high',
        test: rubric => this.testVagueEvidence(rubric),
      },
      {
        name: 'Score Inflation',
        description: 'Test if rubric can be manipulated to inflate scores',
        severity: 'medium',
        test: rubric => this.testScoreInflation(rubric),
      },
      {
        name: 'Edge Case Exploitation',
        description:
          'Test rubric behavior with edge cases and boundary conditions',
        severity: 'medium',
        test: rubric => this.testEdgeCases(rubric),
      },
      {
        name: 'Contradictory Evidence',
        description:
          'Test how rubric handles contradictory or conflicting evidence',
        severity: 'medium',
        test: rubric => this.testContradictoryEvidence(rubric),
      },
      {
        name: 'Missing Evidence Handling',
        description: 'Test rubric behavior when required evidence is missing',
        severity: 'high',
        test: rubric => this.testMissingEvidence(rubric),
      },
      {
        name: 'Automation Bypass',
        description: 'Test if rubric can bypass automated validation',
        severity: 'medium',
        test: rubric => this.testAutomationBypass(rubric),
      },
      {
        name: 'Weight Manipulation',
        description: 'Test if weight distribution can be exploited',
        severity: 'low',
        test: rubric => this.testWeightManipulation(rubric),
      },
    ];
  }

  /**
   * Test keyword stuffing vulnerability
   */
  testKeywordStuffing(rubric) {
    const vulnerabilities = [];

    // Check if evidence requirements can be satisfied with keyword stuffing
    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        score.evidenceRequired.forEach(evidence => {
          // Check if evidence is too generic and can be keyword-stuffed
          const genericPatterns = [
            /good/i,
            /clear/i,
            /proper/i,
            /effective/i,
            /appropriate/i,
          ];

          if (genericPatterns.some(pattern => pattern.test(evidence))) {
            vulnerabilities.push({
              criterion: criterion.name,
              score: score.level,
              issue:
                'Generic evidence requirement vulnerable to keyword stuffing',
              evidence: evidence,
              suggestion:
                'Make evidence requirements more specific and quantifiable',
            });
          }
        });
      });
    });

    return vulnerabilities;
  }

  /**
   * Test vague evidence acceptance
   */
  testVagueEvidence(rubric) {
    const vulnerabilities = [];

    const vagueEvidenceExamples = [
      'The code looks good',
      'It seems to work properly',
      'Generally follows best practices',
      'Appears to be well-structured',
      'Seems to meet requirements',
    ];

    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        if (score.level >= 3) {
          // Only test high scores
          score.evidenceRequired.forEach(evidence => {
            // Check if evidence requirement is vague enough to accept meaningless statements
            if (
              evidence.length < 20 ||
              (!evidence.includes('specific') &&
                !evidence.includes('quantitative'))
            ) {
              vulnerabilities.push({
                criterion: criterion.name,
                score: score.level,
                issue:
                  'Vague evidence requirement may accept meaningless statements',
                evidence: evidence,
                examples: vagueEvidenceExamples,
                suggestion:
                  'Require specific, measurable evidence with examples',
              });
            }
          });
        }
      });
    });

    return vulnerabilities;
  }

  /**
   * Test score inflation vulnerabilities
   */
  testScoreInflation(rubric) {
    const vulnerabilities = [];

    // Check if score progression is too gradual
    rubric.criteria.forEach(criterion => {
      const scores = criterion.scores.sort((a, b) => a.level - b.level);

      for (let i = 1; i < scores.length; i++) {
        const prev = scores[i - 1];
        const curr = scores[i];

        // Check if difference between scores is minimal
        const prevDescLength = prev.description.join('').length;
        const currDescLength = curr.description.join('').length;
        const diffRatio =
          Math.abs(currDescLength - prevDescLength) /
          Math.max(prevDescLength, currDescLength);

        if (diffRatio < 0.1 && curr.level >= 3) {
          vulnerabilities.push({
            criterion: criterion.name,
            issue: `Minimal difference between score ${prev.level} and ${curr.level}`,
            prevScore: prev.level,
            currScore: curr.level,
            suggestion: 'Make score differences more distinct and meaningful',
          });
        }
      }
    });

    return vulnerabilities;
  }

  /**
   * Test edge case handling
   */
  testEdgeCases(rubric) {
    const vulnerabilities = [];

    // Test boundary conditions
    const edgeCases = [
      { name: 'Empty evidence', evidence: '' },
      { name: 'Single word evidence', evidence: 'good' },
      { name: 'Extremely long evidence', evidence: 'a'.repeat(1000) },
      { name: 'Special characters only', evidence: '!@#$%^&*()' },
      { name: 'Numbers only', evidence: '123456789' },
      { name: 'Mixed language evidence', evidence: 'The code es muy bueno' },
    ];

    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        if (score.level >= 3) {
          edgeCases.forEach(edgeCase => {
            // Check if rubric would accept pathological evidence
            if (
              score.evidenceRequired.some(
                req => req.length < 10 || !req.includes('specific')
              )
            ) {
              vulnerabilities.push({
                criterion: criterion.name,
                score: score.level,
                issue: `May accept edge case: ${edgeCase.name}`,
                edgeCase: edgeCase.name,
                suggestion: 'Add validation for evidence quality and format',
              });
            }
          });
        }
      });
    });

    return vulnerabilities;
  }

  /**
   * Test contradictory evidence handling
   */
  testContradictoryEvidence(rubric) {
    const vulnerabilities = [];

    const contradictoryPairs = [
      ['The code is well-documented', 'The code has no documentation'],
      ['Performance is optimized', 'Performance has serious issues'],
      ['Follows all best practices', 'Violates multiple best practices'],
      ['Comprehensive test coverage', 'No tests provided'],
    ];

    rubric.criteria.forEach(criterion => {
      contradictoryPairs.forEach(pair => {
        // Check if rubric could accept contradictory evidence
        const couldAcceptBoth = criterion.scores.some(
          score =>
            score.level >= 3 &&
            score.evidenceRequired.some(
              req => req.length < 15 || !req.includes('consistent')
            )
        );

        if (couldAcceptBoth) {
          vulnerabilities.push({
            criterion: criterion.name,
            issue: 'May accept contradictory evidence',
            example: pair,
            suggestion: 'Add consistency checks for evidence',
          });
        }
      });
    });

    return vulnerabilities;
  }

  /**
   * Test missing evidence handling
   */
  testMissingEvidence(rubric) {
    const vulnerabilities = [];

    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        if (score.level >= 3) {
          // Check if rubric clearly handles missing evidence
          const hasMissingEvidenceHandling = score.evidenceRequired.some(
            evidence =>
              evidence.toLowerCase().includes('missing') ||
              evidence.toLowerCase().includes('absent') ||
              evidence.toLowerCase().includes('not present')
          );

          if (!hasMissingEvidenceHandling) {
            vulnerabilities.push({
              criterion: criterion.name,
              score: score.level,
              issue: 'No clear handling for missing evidence',
              suggestion:
                'Add explicit requirements for handling missing evidence',
            });
          }
        }
      });
    });

    return vulnerabilities;
  }

  /**
   * Test automation bypass attempts
   */
  testAutomationBypass(rubric) {
    const vulnerabilities = [];

    const bypassAttempts = [
      'See attached file for evidence',
      'Evidence available in external document',
      'Refer to project documentation',
      'As discussed in the meeting',
      'Evidence provided separately',
    ];

    rubric.criteria.forEach(criterion => {
      criterion.scores.forEach(score => {
        if (score.level >= 3) {
          score.evidenceRequired.forEach(evidence => {
            // Check if evidence could be satisfied with bypass attempts
            if (
              evidence.length < 20 ||
              (!evidence.includes('direct') && !evidence.includes('explicit'))
            ) {
              vulnerabilities.push({
                criterion: criterion.name,
                score: score.level,
                issue: 'May accept automation bypass attempts',
                evidence: evidence,
                bypassExamples: bypassAttempts,
                suggestion:
                  'Require direct, explicit evidence within the artifact',
              });
            }
          });
        }
      });
    });

    return vulnerabilities;
  }

  /**
   * Test weight manipulation vulnerabilities
   */
  testWeightManipulation(rubric) {
    const vulnerabilities = [];

    // Check for weight distribution issues
    const totalWeight = rubric.criteria.reduce((sum, c) => sum + c.weight, 0);

    if (Math.abs(totalWeight - 1.0) > 0.01) {
      vulnerabilities.push({
        issue: 'Weight distribution does not sum to 1.0',
        totalWeight: totalWeight,
        suggestion: 'Adjust weights to sum exactly to 1.0',
      });
    }

    // Check for weight concentration
    const maxWeight = Math.max(...rubric.criteria.map(c => c.weight));
    if (maxWeight > 0.5) {
      vulnerabilities.push({
        issue: 'Excessive weight concentration in single criterion',
        maxWeight: maxWeight,
        suggestion: 'Distribute weights more evenly across criteria',
      });
    }

    // Check for weight imbalance
    const weights = rubric.criteria.map(c => c.weight).sort();
    const minWeight = weights[0];
    if (minWeight < 0.05) {
      vulnerabilities.push({
        issue: 'Very low weight criterion may be ignored',
        minWeight: minWeight,
        suggestion: 'Ensure all criteria have meaningful weight (>= 0.05)',
      });
    }

    return vulnerabilities;
  }

  /**
   * Run adversarial validation on a rubric
   */
  validateRubric(filePath) {
    console.log(`\n🛡️  Adversarial validation: ${path.basename(filePath)}`);

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const rubric = this.parseRubric(content);

      let totalVulnerabilities = 0;
      const results = [];

      // Run all adversarial tests
      this.testCases.forEach(testCase => {
        console.log(`  🧪 Testing: ${testCase.name}`);
        const vulnerabilities = testCase.test(rubric);

        if (vulnerabilities.length > 0) {
          console.log(`    ❌ Found ${vulnerabilities.length} vulnerabilities`);
          totalVulnerabilities += vulnerabilities.length;

          vulnerabilities.forEach(vuln => {
            this.vulnerabilities.push({
              file: path.basename(filePath),
              test: testCase.name,
              severity: testCase.severity,
              ...vuln,
            });
          });
        } else {
          console.log(`    ✅ Passed`);
        }

        results.push({
          test: testCase.name,
          severity: testCase.severity,
          vulnerabilities: vulnerabilities.length,
          passed: vulnerabilities.length === 0,
        });
      });

      // Calculate resilience score
      const maxPossibleVulnerabilities = this.testCases.length;
      this.resilienceScore = Math.max(0, 100 - totalVulnerabilities * 10);

      const result = {
        file: path.basename(filePath),
        resilienceScore: this.resilienceScore,
        totalVulnerabilities: totalVulnerabilities,
        testResults: results,
        vulnerabilities: this.vulnerabilities.filter(
          v => v.file === path.basename(filePath)
        ),
      };

      this.printResults(result);
      return result;
    } catch (error) {
      console.error(`❌ Error in adversarial validation: ${error.message}`);
      return {
        file: path.basename(filePath),
        resilienceScore: 0,
        totalVulnerabilities: 999,
        testResults: [],
        vulnerabilities: [],
        error: error.message,
      };
    }
  }

  /**
   * Parse rubric content (simplified version)
   */
  parseRubric(content) {
    const lines = content.split('\n');
    const rubric = {
      hasEvidenceBasedScoring: false,
      criteria: [],
    };

    let currentCriterion = null;
    let currentScore = null;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.includes('Evidence-Based Scoring')) {
        rubric.hasEvidenceBasedScoring = true;
        continue;
      }

      if (trimmed.startsWith('## ') && trimmed.includes('(Weight:')) {
        if (currentCriterion) {
          rubric.criteria.push(currentCriterion);
        }

        const weightMatch = trimmed.match(/\(Weight: ([\d.]+)\)/);
        const weight = weightMatch ? parseFloat(weightMatch[1]) : 0;

        currentCriterion = {
          name: trimmed.replace('## ', '').split('(Weight:')[0].trim(),
          weight: weight,
          scores: [],
        };
        continue;
      }

      if (trimmed.startsWith('**Score ') && currentCriterion) {
        const scoreMatch = trimmed.match(/\*\*Score (\d+)\*\*:/);
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

      if (trimmed.startsWith('**Evidence Required**:') && currentScore) {
        const evidence = trimmed.replace('**Evidence Required**:', '').trim();
        currentScore.evidenceRequired.push(evidence);
        continue;
      }

      if (trimmed.startsWith('- ') && currentScore) {
        currentScore.description.push(trimmed.replace('- ', '').trim());
      }
    }

    if (currentCriterion) {
      rubric.criteria.push(currentCriterion);
    }

    return rubric;
  }

  /**
   * Print adversarial validation results
   */
  printResults(result) {
    console.log(`\n🛡️  Adversarial Results for ${result.file}:`);
    console.log(`📊 Resilience Score: ${result.resilienceScore}%`);
    console.log(`🚨 Total Vulnerabilities: ${result.totalVulnerabilities}`);

    if (result.vulnerabilities.length > 0) {
      console.log('\n🚨 Vulnerabilities Found:');
      result.vulnerabilities.forEach((vuln, index) => {
        console.log(
          `  ${index + 1}. [${vuln.severity.toUpperCase()}] ${vuln.test}`
        );
        console.log(`     Issue: ${vuln.issue}`);
        if (vuln.criterion) console.log(`     Criterion: ${vuln.criterion}`);
        if (vuln.suggestion) console.log(`     Suggestion: ${vuln.suggestion}`);
        console.log('');
      });
    }

    // Test summary
    console.log('\n📋 Test Summary:');
    result.testResults.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`  ${status} ${test.test} [${test.severity}]`);
    });
  }

  /**
   * Run adversarial validation on all rubrics
   */
  validateAllRubrics(rubricsDir) {
    console.log('🛡️  Starting adversarial rubric validation...\n');

    const rubricFiles = fs
      .readdirSync(rubricsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(rubricsDir, file));

    const results = [];
    let totalVulnerabilities = 0;
    let averageResilience = 0;

    rubricFiles.forEach(file => {
      // Reset for each file
      this.vulnerabilities = [];
      this.resilienceScore = 0;

      const result = this.validateRubric(file);
      results.push(result);
      totalVulnerabilities += result.totalVulnerabilities;
      averageResilience += result.resilienceScore;
    });

    // Print summary
    averageResilience = Math.round(averageResilience / results.length);
    console.log('\n🛡️  Adversarial Validation Summary:');
    console.log(`📊 Average Resilience: ${averageResilience}%`);
    console.log(`🚨 Total Vulnerabilities: ${totalVulnerabilities}`);
    console.log(`📁 Rubrics Tested: ${results.length}`);

    // Generate recommendations
    this.generateSecurityRecommendations(results);

    // Generate report
    this.generateAdversarialReport(results);

    return results;
  }

  /**
   * Generate security recommendations
   */
  generateSecurityRecommendations(results) {
    console.log('\n🔒 Security Recommendations:');

    // Analyze common vulnerabilities
    const vulnerabilityCounts = {};
    results.forEach(result => {
      result.vulnerabilities.forEach(vuln => {
        const key = vuln.test;
        vulnerabilityCounts[key] = (vulnerabilityCounts[key] || 0) + 1;
      });
    });

    // Generate recommendations for common issues
    Object.entries(vulnerabilityCounts)
      .filter(([_, count]) => count >= 2)
      .sort(([_, a], [__, b]) => b - a)
      .forEach(([test, count]) => {
        console.log(`  🔴 ${test} (${count} rubrics affected)`);
        console.log(`     Action: Review and strengthen evidence requirements`);
      });

    // General recommendations
    console.log('\n🔍 General Security Improvements:');
    console.log(
      '  1. Require specific, quantifiable evidence for all high scores'
    );
    console.log('  2. Add validation for evidence quality and consistency');
    console.log('  3. Implement automated checks for keyword stuffing');
    console.log(
      '  4. Add explicit handling for missing or contradictory evidence'
    );
    console.log('  5. Ensure weight distribution prevents manipulation');
  }

  /**
   * Generate adversarial validation report
   */
  generateAdversarialReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalRubrics: results.length,
        averageResilience: Math.round(
          results.reduce((sum, r) => sum + r.resilienceScore, 0) /
            results.length
        ),
        totalVulnerabilities: results.reduce(
          (sum, r) => sum + r.totalVulnerabilities,
          0
        ),
        highSeverityVulnerabilities: results.reduce(
          (sum, r) =>
            sum + r.vulnerabilities.filter(v => v.severity === 'high').length,
          0
        ),
      },
      results: results,
      recommendations: this.generateSecurityRecommendationsList(results),
      testCases: this.testCases.map(tc => ({
        name: tc.name,
        description: tc.description,
        severity: tc.severity,
      })),
    };

    const reportPath = path.join(__dirname, 'adversarial-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Adversarial report saved to: ${reportPath}`);
  }

  /**
   * Generate security recommendations list
   */
  generateSecurityRecommendationsList(results) {
    const recommendations = [];

    // Analyze patterns across all rubrics
    const allVulnerabilities = results.flatMap(r => r.vulnerabilities);
    const vulnerabilityTypes = {};

    allVulnerabilities.forEach(vuln => {
      const key = vuln.test;
      vulnerabilityTypes[key] = (vulnerabilityTypes[key] || 0) + 1;
    });

    // Generate prioritized recommendations
    Object.entries(vulnerabilityTypes)
      .filter(([_, count]) => count >= 2)
      .sort(([_, a], [__, b]) => b - a)
      .forEach(([test, count]) => {
        recommendations.push({
          priority: count >= results.length * 0.8 ? 'critical' : 'high',
          issue: test,
          affectedRubrics: count,
          recommendation: this.getRecommendationForTest(test),
        });
      });

    return recommendations;
  }

  /**
   * Get recommendation for specific test
   */
  getRecommendationForTest(testName) {
    const recommendations = {
      'Keyword Stuffing':
        'Implement specific evidence requirements that cannot be satisfied with generic keywords',
      'Vague Evidence Gaming':
        'Require quantifiable, specific evidence with minimum length and content requirements',
      'Score Inflation':
        'Make score differences more distinct with clear, non-overlapping criteria',
      'Edge Case Exploitation':
        'Add validation for evidence format, length, and content quality',
      'Contradictory Evidence':
        'Implement consistency checks across all evidence requirements',
      'Missing Evidence Handling':
        'Add explicit requirements for handling missing or insufficient evidence',
      'Automation Bypass':
        'Require evidence to be directly embedded in the evaluation artifact',
      'Weight Manipulation':
        'Ensure weight distribution prevents concentration and manipulation',
    };

    return (
      recommendations[testName] ||
      'Review and strengthen evidence validation requirements'
    );
  }
}

// CLI execution
if (require.main === module) {
  const validator = new AdversarialRubricValidator();
  const rubricsDir = process.argv[2] || path.join(__dirname, '..', '..');

  if (!fs.existsSync(rubricsDir)) {
    console.error(`❌ Directory not found: ${rubricsDir}`);
    process.exit(1);
  }

  const results = validator.validateAllRubrics(rubricsDir);
  const hasCriticalIssues = results.some(r => r.resilienceScore < 70);
  process.exit(hasCriticalIssues ? 1 : 0);
}

module.exports = AdversarialRubricValidator;

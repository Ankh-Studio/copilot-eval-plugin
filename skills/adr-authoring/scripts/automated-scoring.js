/**
 * Automated ADR Scoring System
 *
 * Provides automated scoring and quality metrics for ADRs
 * with detailed analysis and improvement recommendations.
 */

const fs = require('fs');
const path = require('path');
const { ADRValidator } = require('./validate-adr.js');

class AutomatedScoring {
  constructor() {
    this.validator = new ADRValidator();
    this.scoringHistory = [];
    this.trends = {
      averageScore: 0,
      improvementRate: 0,
      commonIssues: {},
      qualityDistribution: { excellent: 0, good: 0, acceptable: 0, poor: 0 },
    };
  }

  /**
   * Score multiple ADRs and generate comprehensive report
   */
  async scoreRepository(adrPath = 'docs/adr') {
    console.log('🔍 Scanning repository for ADRs...');

    const adrFiles = this.findADRFiles(adrPath);
    if (adrFiles.length === 0) {
      console.log('ℹ️  No ADRs found in repository');
      return this.generateEmptyReport();
    }

    console.log(`📊 Found ${adrFiles.length} ADR(s) to score...`);

    const results = [];
    for (const file of adrFiles) {
      try {
        const result = await this.scoreADR(file);
        results.push(result);
      } catch (error) {
        console.warn(`⚠️  Failed to score ${file}: ${error.message}`);
      }
    }

    return this.generateComprehensiveReport(results);
  }

  /**
   * Score a single ADR with detailed analysis
   */
  async scoreADR(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const validation = this.validator.validateADR(content);

    const score = {
      filePath: path.relative(process.cwd(), filePath),
      overall: validation.overall,
      sections: validation.sections,
      metadata: this.extractMetadata(content),
      analysis: this.performDetailedAnalysis(content, validation),
      recommendations: this.generateRecommendations(validation),
      timestamp: new Date().toISOString(),
    };

    this.scoringHistory.push(score);
    return score;
  }

  /**
   * Find all ADR files in repository
   */
  findADRFiles(adrPath) {
    const fullPath = path.resolve(process.cwd(), adrPath);

    if (!fs.existsSync(fullPath)) {
      return [];
    }

    const files = fs.readdirSync(fullPath);
    return files
      .filter(file => file.endsWith('.md') && file !== '000-template.md')
      .map(file => path.join(fullPath, file))
      .filter(file => fs.statSync(file).isFile());
  }

  /**
   * Extract metadata from ADR
   */
  extractMetadata(content) {
    const metadata = {
      title: '',
      status: '',
      date: '',
      confidence: '',
      wordCount: content.split(/\s+/).length,
      sectionCount: 0,
      hasEvidence: false,
      hasFollowup: false,
    };

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) metadata.title = titleMatch[1].trim();

    // Extract status, date, confidence
    const statusMatch = content.match(/\*\*Status:\*\*\s+(.+)/i);
    if (statusMatch) metadata.status = statusMatch[1].trim();

    const dateMatch = content.match(/\*\*Date:\*\*\s+(.+)/i);
    if (dateMatch) metadata.date = dateMatch[1].trim();

    const confidenceMatch = content.match(/\*\*Confidence:\*\*\s+(.+)/i);
    if (confidenceMatch) metadata.confidence = confidenceMatch[1].trim();

    // Count sections
    const sections = content.match(/^##\s+.+$/gm);
    if (sections) metadata.sectionCount = sections.length;

    // Check for evidence and follow-up
    metadata.hasEvidence = /##\s+Evidence/im.test(content);
    metadata.hasFollowup = /##\s+Follow-up/im.test(content);

    return metadata;
  }

  /**
   * Perform detailed analysis beyond basic validation
   */
  performDetailedAnalysis(content, validation) {
    const analysis = {
      complexity: this.assessComplexity(content),
      completeness: this.assessCompleteness(content),
      clarity: this.assessClarity(content),
      evidenceQuality: this.assessEvidenceQuality(content),
      actionability: this.assessActionability(content),
      patterns: this.identifyPatterns(content),
      risks: this.identifyRisks(content),
    };

    return analysis;
  }

  /**
   * Assess ADR complexity based on content analysis
   */
  assessComplexity(content) {
    let complexity = 'medium';
    const factors = [];

    // Word count factor
    const wordCount = content.split(/\s+/).length;
    if (wordCount > 1500) {
      complexity = 'high';
      factors.push('Long content (>1500 words)');
    } else if (wordCount < 300) {
      complexity = 'low';
      factors.push('Short content (<300 words)');
    }

    // Technical complexity
    const technicalTerms = [
      'architecture',
      'implementation',
      'integration',
      'migration',
      'performance',
      'security',
    ];
    const techTermCount = technicalTerms.filter(term =>
      content.toLowerCase().includes(term)
    ).length;

    if (techTermCount >= 4) {
      complexity = 'high';
      factors.push('High technical complexity');
    }

    // Options complexity
    const optionMatches = content.match(/### Option \d+:/g);
    if (optionMatches && optionMatches.length >= 3) {
      factors.push('Multiple options analyzed');
    }

    return {
      level: complexity,
      factors,
      wordCount,
      technicalTerms: techTermCount,
    };
  }

  /**
   * Assess completeness of ADR sections
   */
  assessCompleteness(content) {
    const requiredSections = [
      'Context',
      'Options Considered',
      'Decision',
      'Tradeoffs',
      'Evidence',
      'Follow-up',
    ];

    const presentSections = [];
    const missingSections = [];

    requiredSections.forEach(section => {
      const regex = new RegExp(`##\\s+${section}`, 'i');
      if (regex.test(content)) {
        presentSections.push(section);
      } else {
        missingSections.push(section);
      }
    });

    const completeness =
      (presentSections.length / requiredSections.length) * 100;

    return {
      score: completeness,
      present: presentSections,
      missing: missingSections,
      grade:
        completeness >= 90
          ? 'excellent'
          : completeness >= 70
            ? 'good'
            : completeness >= 50
              ? 'acceptable'
              : 'poor',
    };
  }

  /**
   * Assess clarity and readability
   */
  assessClarity(content) {
    const clarity = {
      score: 0,
      issues: [],
      strengths: [],
    };

    // Check for vague language
    const vagueTerms = [
      'better',
      'improve',
      'optimize',
      'enhance',
      'good',
      'bad',
    ];
    const vagueCount = vagueTerms.filter(term =>
      content.toLowerCase().split(/\s+/).includes(term)
    ).length;

    if (vagueCount > 5) {
      clarity.issues.push(
        `High use of vague language (${vagueCount} instances)`
      );
    } else {
      clarity.strengths.push('Minimal vague language');
    }

    // Check sentence length
    const sentences = content.split(/[.!?]+/);
    const avgSentenceLength =
      sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) /
      sentences.length;

    if (avgSentenceLength > 25) {
      clarity.issues.push('Long sentences (average >25 words)');
    } else if (avgSentenceLength < 10) {
      clarity.issues.push('Very short sentences (average <10 words)');
    } else {
      clarity.strengths.push('Good sentence length');
    }

    // Calculate overall score
    clarity.score = Math.max(
      0,
      100 - vagueCount * 10 - Math.abs(avgSentenceLength - 15) * 2
    );

    return clarity;
  }

  /**
   * Assess quality of evidence provided
   */
  assessEvidenceQuality(content) {
    const evidence = {
      score: 0,
      types: [],
      count: 0,
      quality: 'none',
    };

    // Code references
    const codeRefs = content.match(/`[^`]+\.(js|jsx|ts|tsx)`/g) || [];
    if (codeRefs.length > 0) {
      evidence.types.push('code');
      evidence.count += codeRefs.length;
    }

    // Issue/PR references
    const issueRefs = content.match(/#\d+/g) || [];
    if (issueRefs.length > 0) {
      evidence.types.push('issues');
      evidence.count += issueRefs.length;
    }

    // Documentation links
    const docLinks = content.match(/https?:\/\/[^\s]+/g) || [];
    if (docLinks.length > 0) {
      evidence.types.push('documentation');
      evidence.count += docLinks.length;
    }

    // Specific examples
    const examples = content.match(/example|instance|case|scenario/gi) || [];
    if (examples.length > 0) {
      evidence.types.push('examples');
    }

    // Calculate quality score
    if (evidence.count >= 5) {
      evidence.quality = 'excellent';
      evidence.score = 90;
    } else if (evidence.count >= 3) {
      evidence.quality = 'good';
      evidence.score = 75;
    } else if (evidence.count >= 1) {
      evidence.quality = 'acceptable';
      evidence.score = 60;
    } else {
      evidence.quality = 'poor';
      evidence.score = 30;
    }

    return evidence;
  }

  /**
   * Assess actionability of follow-up items
   */
  assessActionability(content) {
    const actionability = {
      score: 0,
      items: [],
      hasOwnership: false,
      hasTimeline: false,
    };

    // Find follow-up items
    const followupMatch = content.match(
      /##\s+Follow-up.*?\n\n([\s\S]*?)(?=##|$)/im
    );
    if (followupMatch) {
      const items = followupMatch[1]
        .split(/\n/)
        .filter(line => line.trim().startsWith('- [ ]'))
        .map(line => line.trim().substring(4));

      actionability.items = items;

      // Check for ownership
      actionability.hasOwnership = items.some(item =>
        /@|owner|responsible|assigned/i.test(item)
      );

      // Check for timeline
      actionability.hasTimeline = items.some(item =>
        /week|day|date|timeline|due/i.test(item)
      );

      // Calculate score
      let score = 0;
      if (items.length >= 2) score += 30;
      if (actionability.hasOwnership) score += 40;
      if (actionability.hasTimeline) score += 30;

      actionability.score = score;
    }

    return actionability;
  }

  /**
   * Identify writing patterns
   */
  identifyPatterns(content) {
    const patterns = [];

    // Confident language
    if (/\b(we will|we choose|selected|decided)\b/i.test(content)) {
      patterns.push('confident-decision');
    }

    // Risk awareness
    if (/\b(risk|mitigation|concern|challenge)\b/i.test(content)) {
      patterns.push('risk-aware');
    }

    // Evidence-based
    if (/\b(evidence|data|metric|result|test)\b/i.test(content)) {
      patterns.push('evidence-based');
    }

    // Collaborative
    if (/\b(team|stakeholder|consensus|discussion)\b/i.test(content)) {
      patterns.push('collaborative');
    }

    return patterns;
  }

  /**
   * Identify potential risks or issues
   */
  identifyRisks(content) {
    const risks = [];

    // Overconfidence without evidence
    if (
      /\b(definitely|certainly|obviously|clearly)\b/i.test(content) &&
      !/\b(evidence|data|proof|test)\b/i.test(content)
    ) {
      risks.push('overconfidence-without-evidence');
    }

    // Missing tradeoffs
    if (!/\b(con|drawback|downside|negative|tradeoff)\b/i.test(content)) {
      risks.push('missing-tradeoffs');
    }

    // Vague timeline
    if (/\b(soon|eventually|later|sometime)\b/i.test(content)) {
      risks.push('vague-timeline');
    }

    // Single option consideration
    const options = content.match(/### Option \d+:/g);
    if (!options || options.length < 2) {
      risks.push('insufficient-options');
    }

    return risks;
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(validation) {
    const recommendations = [];

    validation.feedback.forEach(item => {
      item.suggestions.forEach(suggestion => {
        recommendations.push({
          priority: item.priority,
          section: item.section,
          suggestion: suggestion,
          impact: this.estimateImpact(item.section, item.priority),
        });
      });
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Estimate impact of improvement
   */
  estimateImpact(section, priority) {
    const baseImpact = { High: 0.3, Medium: 0.2, Low: 0.1 };
    const sectionWeights = {
      problemClarity: 1.2,
      optionsAnalysis: 1.3,
      decisionRationale: 1.3,
      tradeoffHonesty: 1.2,
      evidenceGrounding: 1.0,
      actionability: 0.8,
    };

    return baseImpact[priority] * (sectionWeights[section] || 1.0);
  }

  /**
   * Generate comprehensive scoring report
   */
  generateComprehensiveReport(results) {
    const report = {
      summary: this.generateSummary(results),
      trends: this.calculateTrends(results),
      individualScores: results,
      recommendations: this.generateGlobalRecommendations(results),
      qualityMetrics: this.calculateQualityMetrics(results),
      generatedAt: new Date().toISOString(),
    };

    return report;
  }

  /**
   * Generate summary statistics
   */
  generateSummary(results) {
    if (results.length === 0) {
      return {
        totalADRs: 0,
        averageScore: 0,
        qualityDistribution: { excellent: 0, good: 0, acceptable: 0, poor: 0 },
        commonIssues: [],
        overallStatus: 'no-data',
      };
    }

    const scores = results.map(r => r.overall.score);
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const distribution = { excellent: 0, good: 0, acceptable: 0, poor: 0 };
    scores.forEach(score => {
      if (score >= 4.0) distribution.excellent++;
      else if (score >= 3.5) distribution.good++;
      else if (score >= 3.0) distribution.acceptable++;
      else distribution.poor++;
    });

    const allIssues = results.flatMap(r => r.recommendations);
    const commonIssues = this.aggregateIssues(allIssues);

    return {
      totalADRs: results.length,
      averageScore: averageScore.toFixed(2),
      qualityDistribution: distribution,
      commonIssues: commonIssues.slice(0, 5),
      overallStatus:
        averageScore >= 3.5
          ? 'healthy'
          : averageScore >= 3.0
            ? 'acceptable'
            : 'needs-improvement',
    };
  }

  /**
   * Calculate trends over time
   */
  calculateTrends(results) {
    if (results.length < 2) {
      return { trend: 'insufficient-data', improvement: 0 };
    }

    // Sort by date if available
    const sorted = results.sort((a, b) => {
      if (!a.metadata.date || !b.metadata.date) return 0;
      return new Date(a.metadata.date) - new Date(b.metadata.date);
    });

    const recent = sorted.slice(-3);
    const older = sorted.slice(0, -3);

    if (older.length === 0) {
      return { trend: 'insufficient-data', improvement: 0 };
    }

    const recentAvg =
      recent.reduce((sum, r) => sum + r.overall.score, 0) / recent.length;
    const olderAvg =
      older.reduce((sum, r) => sum + r.overall.score, 0) / older.length;

    const improvement = (((recentAvg - olderAvg) / olderAvg) * 100).toFixed(1);

    return {
      trend:
        improvement > 5
          ? 'improving'
          : improvement < -5
            ? 'declining'
            : 'stable',
      improvement: parseFloat(improvement),
      recentAverage: recentAvg.toFixed(2),
      olderAverage: olderAvg.toFixed(2),
    };
  }

  /**
   * Aggregate common issues across ADRs
   */
  aggregateIssues(recommendations) {
    const issueMap = new Map();

    recommendations.forEach(rec => {
      const key = `${rec.section}: ${rec.suggestion}`;
      if (issueMap.has(key)) {
        issueMap.set(key, issueMap.get(key) + 1);
      } else {
        issueMap.set(key, 1);
      }
    });

    return Array.from(issueMap.entries())
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Generate global recommendations for the repository
   */
  generateGlobalRecommendations(results) {
    const recommendations = [];
    const summary = this.generateSummary(results);

    if (summary.averageScore < 3.0) {
      recommendations.push({
        priority: 'High',
        area: 'Overall Quality',
        recommendation:
          'Repository ADRs need significant improvement. Consider establishing ADR review process.',
        impact: 'high',
      });
    }

    if (summary.commonIssues.length > 0) {
      const topIssue = summary.commonIssues[0];
      recommendations.push({
        priority: 'Medium',
        area: 'Common Pattern',
        recommendation: `Address recurring issue: ${topIssue.issue}`,
        impact: 'medium',
      });
    }

    return recommendations;
  }

  /**
   * Calculate quality metrics
   */
  calculateQualityMetrics(results) {
    if (results.length === 0) {
      return {
        completeness: 0,
        evidenceQuality: 0,
        actionability: 0,
        consistency: 0,
      };
    }

    const completeness =
      results.reduce((sum, r) => sum + r.analysis.completeness.score, 0) /
      results.length;
    const evidenceQuality =
      results.reduce((sum, r) => sum + r.analysis.evidenceQuality.score, 0) /
      results.length;
    const actionability =
      results.reduce((sum, r) => sum + r.analysis.actionability.score, 0) /
      results.length;

    // Calculate consistency (how similar scores are)
    const scores = results.map(r => r.overall.score);
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance =
      scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) /
      scores.length;
    const consistency = Math.max(0, 100 - variance * 20);

    return {
      completeness: completeness.toFixed(1),
      evidenceQuality: evidenceQuality.toFixed(1),
      actionability: actionability.toFixed(1),
      consistency: consistency.toFixed(1),
    };
  }

  /**
   * Generate empty report for repositories with no ADRs
   */
  generateEmptyReport() {
    return {
      summary: {
        totalADRs: 0,
        averageScore: 0,
        qualityDistribution: { excellent: 0, good: 0, acceptable: 0, poor: 0 },
        commonIssues: [],
        overallStatus: 'no-adrs',
      },
      trends: { trend: 'no-data', improvement: 0 },
      individualScores: [],
      recommendations: [
        {
          priority: 'High',
          area: 'Getting Started',
          recommendation:
            'Create your first ADR to document architectural decisions',
          impact: 'high',
        },
      ],
      qualityMetrics: {
        completeness: 0,
        evidenceQuality: 0,
        actionability: 0,
        consistency: 0,
      },
      generatedAt: new Date().toISOString(),
    };
  }
}

// Export for use in skill
module.exports = { AutomatedScoring };

// CLI usage for testing
if (require.main === module) {
  const scorer = new AutomatedScoring();

  scorer
    .scoreRepository()
    .then(report => {
      console.log('\n📊 Automated ADR Scoring Report');
      console.log('================================');

      console.log('\n📈 Summary:');
      console.log(`Total ADRs: ${report.summary.totalADRs}`);
      console.log(`Average Score: ${report.summary.averageScore}/5.0`);
      console.log(`Overall Status: ${report.summary.overallStatus}`);

      console.log('\n📊 Quality Distribution:');
      Object.entries(report.summary.qualityDistribution).forEach(
        ([quality, count]) => {
          console.log(`  ${quality}: ${count}`);
        }
      );

      if (report.trends.trend !== 'insufficient-data') {
        console.log('\n📈 Trends:');
        console.log(`Trend: ${report.trends.trend}`);
        console.log(`Improvement: ${report.trends.improvement}%`);
      }

      if (report.recommendations.length > 0) {
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach(rec => {
          console.log(`  [${rec.priority}] ${rec.recommendation}`);
        });
      }

      console.log('\n📋 Quality Metrics:');
      Object.entries(report.qualityMetrics).forEach(([metric, value]) => {
        console.log(`  ${metric}: ${value}%`);
      });
    })
    .catch(error => {
      console.error('Scoring failed:', error);
      process.exit(1);
    });
}

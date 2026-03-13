/**
 * ADR Quality Validation Script
 *
 * Validates ADR content against the quality rubric and provides
 * actionable feedback for improvement.
 */

const fs = require('fs');
const path = require('path');

class ADRValidator {
  constructor() {
    this.rubric = {
      problemClarity: { weight: 0.15, required: true },
      optionsAnalysis: { weight: 0.2, required: true },
      decisionRationale: { weight: 0.2, required: true },
      tradeoffHonesty: { weight: 0.2, required: true },
      evidenceGrounding: { weight: 0.15, required: false },
      actionability: { weight: 0.1, required: false },
    };
  }

  /**
   * Validate ADR content against quality rubric
   */
  validateADR(adrContent) {
    const results = {
      overall: { score: 0, status: 'Fail' },
      sections: {},
      feedback: [],
      pass: false,
    };

    // Parse ADR sections
    const sections = this.parseADRSections(adrContent);

    // Evaluate each section
    for (const [section, config] of Object.entries(this.rubric)) {
      const evaluation = this.evaluateSection(section, sections);
      results.sections[section] = evaluation;
    }

    // Calculate overall score
    results.overall.score = this.calculateOverallScore(results.sections);
    results.overall.status = this.determineStatus(
      results.overall.score,
      results.sections
    );
    results.pass =
      results.overall.status === 'Pass' ||
      results.overall.status === 'Conditional Pass';

    // Generate feedback
    results.feedback = this.generateFeedback(results.sections);

    return results;
  }

  /**
   * Parse ADR into sections
   */
  parseADRSections(content) {
    const sections = {
      context: '',
      options: '',
      decision: '',
      tradeoffs: '',
      evidence: '',
      followup: '',
    };

    const lines = content.split('\n');
    let currentSection = '';
    let sectionContent = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Detect section headers
      if (trimmedLine.startsWith('##')) {
        // Save previous section
        if (currentSection && sectionContent.length > 0) {
          sections[currentSection] = sectionContent.join('\n').trim();
        }

        // Start new section
        currentSection = this.mapHeaderToSection(trimmedLine);
        sectionContent = [];
      } else if (currentSection) {
        sectionContent.push(line);
      }
    }

    // Save last section
    if (currentSection && sectionContent.length > 0) {
      sections[currentSection] = sectionContent.join('\n').trim();
    }

    return sections;
  }

  /**
   * Map markdown headers to section names
   */
  mapHeaderToSection(header) {
    const mapping = {
      '## Context': 'context',
      '## Problem': 'context',
      '## Options Considered': 'options',
      '## Decision': 'decision',
      '## Tradeoffs': 'tradeoffs',
      '## Consequences': 'tradeoffs',
      '## Evidence': 'evidence',
      '## Follow-up': 'followup',
      '## Follow-up Actions': 'followup',
    };

    for (const [key, value] of Object.entries(mapping)) {
      if (header.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return '';
  }

  /**
   * Evaluate individual section
   */
  evaluateSection(sectionName, sections) {
    const content = sections[sectionName] || '';
    const evaluation = {
      score: 0,
      status: 'Fail',
      issues: [],
      strengths: [],
    };

    switch (sectionName) {
      case 'problemClarity':
        evaluation.score = this.evaluateProblemClarity(content);
        break;
      case 'optionsAnalysis':
        evaluation.score = this.evaluateOptionsAnalysis(content);
        break;
      case 'decisionRationale':
        evaluation.score = this.evaluateDecisionRationale(content);
        break;
      case 'tradeoffHonesty':
        evaluation.score = this.evaluateTradeoffHonesty(content);
        break;
      case 'evidenceGrounding':
        evaluation.score = this.evaluateEvidenceGrounding(content);
        break;
      case 'actionability':
        evaluation.score = this.evaluateActionability(content);
        break;
    }

    evaluation.status = this.getSectionStatus(
      evaluation.score,
      this.rubric[sectionName].required
    );
    evaluation.issues = this.getSectionIssues(
      sectionName,
      content,
      evaluation.score
    );
    evaluation.strengths = this.getSectionStrengths(
      sectionName,
      content,
      evaluation.score
    );

    return evaluation;
  }

  /**
   * Evaluate problem clarity (1-5 scale)
   */
  evaluateProblemClarity(content) {
    if (!content) return 1;

    let score = 1;

    // Specific problem statement (2 points)
    if (content.length > 50 && content.includes('problem')) {
      score += 1;
    }

    // Business context (1 point)
    if (content.match(/business|impact|user|stakeholder|cost|revenue/i)) {
      score += 1;
    }

    // Clear scope (1 point)
    if (content.match(/scope|boundary|specific|particular|certain/i)) {
      score += 1;
    }

    // No vague language (1 point)
    const vagueTerms = [
      'better',
      'improve',
      'optimize',
      'enhance',
      'good',
      'bad',
    ];
    const hasVagueTerms = vagueTerms.some(term =>
      content.toLowerCase().includes(term)
    );
    if (!hasVagueTerms) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Evaluate options analysis (1-5 scale)
   */
  evaluateOptionsAnalysis(content) {
    if (!content) return 1;

    let score = 1;

    // Multiple options (2 points)
    const optionMatches = content.match(/### Option \d+:/g);
    if (optionMatches && optionMatches.length >= 2) {
      score += 2;
    } else if (optionMatches && optionMatches.length === 1) {
      score += 1;
    }

    // Pros and cons (1 point)
    if (content.includes('**Pros:**') && content.includes('**Cons:**')) {
      score += 1;
    }

    // Detailed analysis (1 point)
    if (content.length > 200) {
      score += 1;
    }

    // Comparison (1 point)
    if (content.match(/compared|versus|alternative|instead|rather/i)) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Evaluate decision rationale (1-5 scale)
   */
  evaluateDecisionRationale(content) {
    if (!content) return 1;

    let score = 1;

    // Clear choice stated (1 point)
    if (content.match(/we will|we choose|selected|decided/i)) {
      score += 1;
    }

    // Reasoning provided (1 point)
    if (content.match(/because|due to|based on|reason|why/i)) {
      score += 1;
    }

    // Links to options (1 point)
    if (content.match(/option \d+|alternative|pros|cons/i)) {
      score += 1;
    }

    // Evidence referenced (1 point)
    if (content.match(/evidence|data|metric|result|test/i)) {
      score += 1;
    }

    // Confidence level (1 point)
    if (content.match(/confidence|certain|sure|risk/i)) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Evaluate tradeoff honesty (1-5 scale)
   */
  evaluateTradeoffHonesty(content) {
    if (!content) return 1;

    let score = 1;

    // Both positive and negative (2 points)
    const hasPositive = content.match(
      /positive|benefit|advantage|gain|improve/i
    );
    const hasNegative = content.match(
      /negative|drawback|disadvantage|cost|downside/i
    );
    if (hasPositive && hasNegative) {
      score += 2;
    } else if (hasPositive || hasNegative) {
      score += 1;
    }

    // Specific consequences (1 point)
    if (content.match(/will result|leads to|causes|affects/i)) {
      score += 1;
    }

    // Risk mitigation (1 point)
    if (content.match(/mitigate|address|handle|prevent|reduce/i)) {
      score += 1;
    }

    // Honest tone (1 point)
    if (content.match(/however|although|despite|admittedly/i)) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Evaluate evidence grounding (1-5 scale)
   */
  evaluateEvidenceGrounding(content) {
    if (!content) return 1;

    let score = 1;

    // Code references (2 points)
    const codeRefs = content.match(/`[^`]+\.tsx?`|src\/[^\\s]+|file:/g);
    if (codeRefs && codeRefs.length >= 2) {
      score += 2;
    } else if (codeRefs && codeRefs.length === 1) {
      score += 1;
    }

    // Issue/PR references (1 point)
    if (content.match(/#\d+|issue|pr|pull request/i)) {
      score += 1;
    }

    // Documentation links (1 point)
    if (content.match(/http|docs|documentation|spec/i)) {
      score += 1;
    }

    // Specific examples (1 point)
    if (content.match(/example|instance|case|scenario/i)) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Evaluate actionability (1-5 scale)
   */
  evaluateActionability(content) {
    if (!content) return 1;

    let score = 1;

    // Action items (2 points)
    const actionItems = content.match(/\[ \]/g);
    if (actionItems && actionItems.length >= 2) {
      score += 2;
    } else if (actionItems && actionItems.length === 1) {
      score += 1;
    }

    // Ownership assigned (1 point)
    if (content.match(/owner|assignee|responsible|@/i)) {
      score += 1;
    }

    // Timeline specified (1 point)
    if (content.match(/week|day|date|timeline|due/i)) {
      score += 1;
    }

    // Clear next steps (1 point)
    if (content.match(/next|step|follow|implement|execute/i)) {
      score += 1;
    }

    return Math.min(score, 5);
  }

  /**
   * Calculate overall weighted score
   */
  calculateOverallScore(sectionResults) {
    let totalScore = 0;
    let totalWeight = 0;

    for (const [section, result] of Object.entries(sectionResults)) {
      const weight = this.rubric[section].weight;
      totalScore += result.score * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * Determine overall status
   */
  determineStatus(overallScore, sectionResults) {
    const criticalSections = Object.entries(sectionResults)
      .filter(([section]) => this.rubric[section].required)
      .filter(([, result]) => result.score < 3.0);

    if (criticalSections.length > 0) {
      return 'Fail';
    }

    if (overallScore >= 3.5) {
      return 'Pass';
    } else if (overallScore >= 3.0) {
      return 'Conditional Pass';
    } else {
      return 'Fail';
    }
  }

  /**
   * Get section status
   */
  getSectionStatus(score, required) {
    if (required && score < 3.0) return 'Fail';
    if (score >= 4.0) return 'Excellent';
    if (score >= 3.5) return 'Good';
    if (score >= 3.0) return 'Acceptable';
    return 'Needs Improvement';
  }

  /**
   * Get section issues
   */
  getSectionIssues(sectionName, content, score) {
    const issues = [];

    if (score < 3.0) {
      switch (sectionName) {
        case 'problemClarity':
          issues.push('Problem statement is vague or missing business context');
          break;
        case 'optionsAnalysis':
          issues.push('Insufficient options analysis or missing alternatives');
          break;
        case 'decisionRationale':
          issues.push('Decision lacks clear reasoning or evidence');
          break;
        case 'tradeoffHonesty':
          issues.push('Tradeoffs not adequately documented or overly positive');
          break;
        case 'evidenceGrounding':
          issues.push(
            'Lacks sufficient evidence links to repository artifacts'
          );
          break;
        case 'actionability':
          issues.push('Missing clear follow-up actions or ownership');
          break;
      }
    }

    return issues;
  }

  /**
   * Get section strengths
   */
  getSectionStrengths(sectionName, content, score) {
    const strengths = [];

    if (score >= 4.0) {
      switch (sectionName) {
        case 'problemClarity':
          strengths.push('Clear, specific problem with good business context');
          break;
        case 'optionsAnalysis':
          strengths.push(
            'Comprehensive analysis with multiple well-considered options'
          );
          break;
        case 'decisionRationale':
          strengths.push('Strong reasoning with clear evidence links');
          break;
        case 'tradeoffHonesty':
          strengths.push(
            'Honest assessment of both positive and negative impacts'
          );
          break;
        case 'evidenceGrounding':
          strengths.push('Well-grounded in actual repository evidence');
          break;
        case 'actionability':
          strengths.push('Clear, actionable next steps with ownership');
          break;
      }
    }

    return strengths;
  }

  /**
   * Generate actionable feedback
   */
  generateFeedback(sectionResults) {
    const feedback = [];
    const priority = [
      'problemClarity',
      'optionsAnalysis',
      'decisionRationale',
      'tradeoffHonesty',
    ];

    for (const section of priority) {
      const result = sectionResults[section];
      if (result.issues.length > 0) {
        feedback.push({
          section: this.formatSectionName(section),
          priority: result.score < 3.0 ? 'High' : 'Medium',
          issues: result.issues,
          suggestions: this.getSuggestions(section, result.score),
        });
      }
    }

    return feedback;
  }

  /**
   * Format section name for display
   */
  formatSectionName(sectionName) {
    const names = {
      problemClarity: 'Problem Clarity',
      optionsAnalysis: 'Options Analysis',
      decisionRationale: 'Decision Rationale',
      tradeoffHonesty: 'Tradeoff Honesty',
      evidenceGrounding: 'Evidence Grounding',
      actionability: 'Actionability',
    };
    return names[sectionName] || sectionName;
  }

  /**
   * Get improvement suggestions
   */
  getSuggestions(sectionName, score) {
    const suggestions = {
      problemClarity: [
        'Add specific business impact or user context',
        'Include measurable metrics or concrete examples',
        'Define clear scope and boundaries',
      ],
      optionsAnalysis: [
        'Add at least one more alternative option',
        'Include detailed pros and cons for each option',
        'Add comparison between options',
      ],
      decisionRationale: [
        'Clearly state the chosen option',
        'Explain why this option was selected',
        'Reference evidence that supports the decision',
      ],
      tradeoffHonesty: [
        'Document negative consequences honestly',
        'Include specific risks and mitigation strategies',
        'Balance positive and negative impacts',
      ],
      evidenceGrounding: [
        'Add links to relevant code files',
        'Reference related issues or PRs',
        'Include specific examples from the repository',
      ],
      actionability: [
        'Add specific follow-up action items',
        'Assign ownership for each action',
        'Include realistic timelines',
      ],
    };

    return suggestions[sectionName] || [];
  }

  /**
   * Validate ADR file
   */
  async validateADRFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      const content = fs.readFileSync(filePath, 'utf8');
      return this.validateADR(content);
    } catch (error) {
      throw new Error(`Could not read ADR file ${filePath}: ${error.message}`);
    }
  }
}

// Export for use in skill
module.exports = { ADRValidator };

// CLI usage for testing and hooks
if (require.main === module) {
  const args = process.argv.slice(2);
  const validator = new ADRValidator();

  // Handle command line arguments for hooks
  if (args.includes('--file')) {
    // Pre-file-write hook: validate specific file
    const filePath =
      args[args.indexOf('--file') + 1] || args[args.indexOf('--file') + 2];
    if (!filePath) {
      console.error('Error: --file requires a file path');
      process.exit(1);
    }

    validator
      .validateADRFile(filePath)
      .then(results => {
        if (!results.pass) {
          console.error('❌ ADR Quality Gate Failed');
          console.error(`Score: ${results.overall.score.toFixed(1)}/5.0`);
          console.error(`Status: ${results.overall.status}`);

          // Show critical issues
          const criticalIssues = results.feedback.filter(
            f => f.priority === 'High'
          );
          if (criticalIssues.length > 0) {
            console.error('\nCritical Issues:');
            criticalIssues.forEach(issue => {
              console.error(`  ${issue.section}:`);
              issue.issues.forEach(i => console.error(`    - ${i}`));
            });
          }

          process.exit(1);
        } else {
          console.log('✅ ADR Quality Gate Passed');
          console.log(`Score: ${results.overall.score.toFixed(1)}/5.0`);
          process.exit(0);
        }
      })
      .catch(error => {
        console.error('Validation error:', error.message);
        process.exit(1);
      });
  } else if (args.includes('--summary')) {
    // Post-session hook: generate summary
    console.log('📋 ADR Quality Summary');
    console.log('ADR validation hooks are configured and ready.');
    console.log(
      'Quality gates will enforce minimum 3.0 score and required sections.'
    );
  } else if (args.includes('--check-adrs')) {
    // Session-start hook: check for existing ADRs
    console.log('🔍 Checking for existing ADRs...');

    const adrPath = path.join(process.cwd(), 'docs', 'adr');
    try {
      if (fs.existsSync(adrPath)) {
        const adrFiles = fs
          .readdirSync(adrPath)
          .filter(f => f.endsWith('.md') && f !== '000-template.md');
        if (adrFiles.length === 0) {
          console.log(
            'ℹ️  No ADRs found in repository. Consider documenting architectural decisions.'
          );
        } else {
          console.log(`✅ Found ${adrFiles.length} ADR(s) in repository.`);
        }
      } else {
        console.log(
          'ℹ️  No ADR directory found. Consider creating docs/adr/ for architectural decisions.'
        );
      }
    } catch (error) {
      console.warn(`Error checking ADR directory ${adrPath}:`, error.message);
    }
  } else {
    // Default: test with sample ADR content
    const validator = new ADRValidator();

    // Test with sample ADR content
    const sampleADR = `
# ADR-001: Implement React Query for data fetching

**Status:** Accepted
**Date:** 2024-03-15
**Confidence:** High

## Context

Our React application currently uses useState and useEffect for API calls, resulting in:
- Duplicate API calls across components
- No caching mechanism
- Loading states scattered throughout components

## Options Considered

### Option 1: Continue with current pattern
**Pros:**
- No additional dependencies
- Team already familiar with the approach

**Cons:**
- Continued code duplication
- No built-in caching

### Option 2: Implement React Query
**Pros:**
- Built-in caching and deduplication
- Better developer experience

**Cons:**
- Additional dependency to learn

## Decision

We will implement React Query for data fetching throughout the application.

## Tradeoffs & Consequences

### Positive Impacts
- Reduced API calls through caching
- Consistent loading and error handling

### Negative Impacts
- Learning curve for team members
- Initial migration effort

## Evidence

**Related Code:**
- \`src/components/UserList.tsx\` - Current API call pattern
- \`src/services/api.ts\` - Existing API client

**Issues/PRs:**
- #123 - Performance issues with duplicate API calls

## Follow-up Actions

- [ ] Create React Query implementation guide - Frontend Lead - Week 1
- [ ] Migrate UserList component - Developer A - Week 2
  `;

    const results = validator.validateADR(sampleADR);

    console.log('📋 ADR Validation Results:');
    console.log(`Overall Score: ${results.overall.score.toFixed(1)}/5.0`);
    console.log(`Status: ${results.overall.status}`);
    console.log(`Pass: ${results.pass ? '✅' : '❌'}`);

    console.log('\n📊 Section Scores:');
    for (const [section, result] of Object.entries(results.sections)) {
      console.log(
        `${validator.formatSectionName(section)}: ${result.score.toFixed(1)}/5.0 (${result.status})`
      );
    }

    if (results.feedback.length > 0) {
      console.log('\n💡 Feedback:');
      results.feedback.forEach(item => {
        console.log(`\n${item.section} (${item.priority} Priority):`);
        item.issues.forEach(issue => console.log(`  ❌ ${issue}`));
        item.suggestions.forEach(suggestion =>
          console.log(`  💡 ${suggestion}`)
        );
      });
    }
  }
}

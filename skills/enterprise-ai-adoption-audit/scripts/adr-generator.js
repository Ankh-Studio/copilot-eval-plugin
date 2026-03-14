#!/usr/bin/env node

/**
 * AI Strategy ADR Generator Script
 *
 * Generates Architecture Decision Records (ADRs) for AI adoption strategies
 * based on maturity assessment findings and recommendations.
 */

const fs = require('fs');
const path = require('path');

class ADRGenerator {
  constructor(repoPath = '.') {
    this.repoPath = repoPath;
    this.templatePath = path.join(
      __dirname,
      '..',
      'assets',
      'ai-adoption-template.md'
    );
    this.outputPath = path.join(repoPath, 'docs', 'adr');
  }

  /**
   * Core generation methods
   */
  async generateADR(maturityReport, options = {}) {
    console.log('📝 Generating AI Strategy ADR...');

    // Load template
    const template = await this.loadTemplate();

    // Generate ADR content
    const adrContent = this.populateTemplate(template, maturityReport, options);

    // Create output directory
    await this.ensureOutputDirectory();

    // Write ADR file
    const adrFilePath = await this.writeADR(adrContent, options);

    return {
      filePath: adrFilePath,
      content: adrContent,
      metadata: this.extractMetadata(adrContent),
    };
  }

  async loadTemplate() {
    try {
      return fs.readFileSync(this.templatePath, 'utf8');
    } catch (error) {
      console.error('Failed to load ADR template:', error.message);
      throw error;
    }
  }

  populateTemplate(template, maturityReport, options) {
    const replacements = this.generateReplacements(maturityReport, options);

    let content = template;

    // Replace all placeholders
    for (const [placeholder, value] of Object.entries(replacements)) {
      const regex = new RegExp(
        placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'g'
      );
      content = content.replace(regex, value);
    }

    return content;
  }

  generateReplacements(maturityReport, options) {
    const { maturity, componentScores, recommendations, roadmap } =
      maturityReport;
    const timestamp = new Date().toISOString().split('T')[0];

    return {
      '\\[ADR-\\[NUMBER\\]\\]': options.adrNumber || '0001',
      '\\[AI_IMPLEMENTATION_TITLE\\]':
        options.title || this.generateTitle(maturity),
      '\\[CURRENT_DATE\\]': timestamp,
      '\\[HIGH\\/MEDIUM\\/LOW\\]': this.assessConfidence(maturityReport),

      // Context section
      '\\[AI_ADOPTION_ASSESSMENT_FINDINGS\\]':
        this.generateAssessmentFindings(maturityReport),
      '\\[MATURITY_LEVEL\\]': maturity.level,
      '\\[GAP_ANALYSIS\\]': this.generateGapAnalysis(componentScores),
      '\\[BUSINESS_IMPACT\\]': this.generateBusinessImpact(maturityReport),

      // Options section
      '\\[AI_STRATEGY_DESCRIPTION\\]': this.generateStrategyDescription(
        maturityReport,
        'primary'
      ),
      '\\[AI_IMPLEMENTATION_BENEFIT_1\\]': this.generateBenefit(
        maturityReport,
        1
      ),
      '\\[AI_IMPLEMENTATION_BENEFIT_2\\]': this.generateBenefit(
        maturityReport,
        2
      ),
      '\\[AI_IMPLEMENTATION_BENEFIT_3\\]': this.generateBenefit(
        maturityReport,
        3
      ),
      '\\[AI_ADOPTION_DRAWBACK_1\\]': this.generateDrawback(maturityReport, 1),
      '\\[AI_ADOPTION_DRAWBACK_2\\]': this.generateDrawback(maturityReport, 2),
      '\\[RESOURCE_NEEDS\\]': this.assessResourceNeeds(maturityReport),

      '\\[ALTERNATIVE_AI_STRATEGY\\]': this.generateStrategyDescription(
        maturityReport,
        'alternative'
      ),
      '\\[ALTERNATIVE_BENEFIT_1\\]': this.generateAlternativeBenefit(
        maturityReport,
        1
      ),
      '\\[ALTERNATIVE_BENEFIT_2\\]': this.generateAlternativeBenefit(
        maturityReport,
        2
      ),
      '\\[COMPLEXITY_LEVEL\\]': this.assessComplexity(
        maturityReport,
        'alternative'
      ),
      '\\[ALTERNATIVE_DRAWBACK_1\\]': this.generateAlternativeDrawback(
        maturityReport,
        1
      ),
      '\\[ALTERNATIVE_DRAWBACK_2\\]': this.generateAlternativeDrawback(
        maturityReport,
        2
      ),
      '\\[TIME_TO_VALUE\\]': this.assessTimeToValue(
        maturityReport,
        'alternative'
      ),

      '\\[INCREMENTAL_AI_APPROACH\\]': this.generateStrategyDescription(
        maturityReport,
        'incremental'
      ),
      '\\[RISK_LEVEL\\]': this.assessRiskLevel(maturityReport),
      '\\[QUICK_WINS\\]': this.generateQuickWins(maturityReport),
      '\\[LEARNING_VALUE\\]': this.assessLearningValue(maturityReport),
      '\\[ARCHITECTURAL_DEBT\\]': this.assessArchitecturalDebt(maturityReport),
      '\\[MIGRATION_COMPLEXITY\\]':
        this.assessMigrationComplexity(maturityReport),

      // Decision section
      '\\[SELECTED_AI_APPROACH_WITH_RATIONALE\\]':
        this.generateSelectedApproach(maturityReport),
      '\\[BUSINESS_ALIGNMENT\\]': this.assessBusinessAlignment(maturityReport),
      '\\[FEASIBILITY_SCORE\\]': this.assessFeasibility(maturityReport),
      '\\[RISK_REWARD_RATIO\\]': this.assessRiskReward(maturityReport),
      '\\[TEAM_READINESS\\]': this.assessTeamReadiness(maturityReport),

      // Tradeoffs section
      '\\[EXPECTED_AI_BENEFIT_1\\]': this.generateExpectedBenefit(
        maturityReport,
        1
      ),
      '\\[MEASURABLE_OUTCOME\\]': this.generateMeasurableOutcome(
        maturityReport,
        1
      ),
      '\\[EXPECTED_AI_BENEFIT_2\\]': this.generateExpectedBenefit(
        maturityReport,
        2
      ),
      '\\[MEASURABLE_OUTCOME_2\\]': this.generateMeasurableOutcome(
        maturityReport,
        2
      ),
      '\\[EXPECTED_AI_BENEFIT_3\\]': this.generateExpectedBenefit(
        maturityReport,
        3
      ),
      '\\[MEASURABLE_OUTCOME_3\\]': this.generateMeasurableOutcome(
        maturityReport,
        3
      ),
      '\\[PRODUCTIVITY_GAIN\\]': this.assessProductivityGain(maturityReport),
      '\\[QUALITY_METRICS\\]': this.assessQualityMetrics(maturityReport),

      '\\[POTENTIAL_AI_RISK_1\\]': this.generatePotentialRisk(
        maturityReport,
        1
      ),
      '\\[MITIGATION_STRATEGY\\]': this.generateMitigationStrategy(
        maturityReport,
        1
      ),
      '\\[POTENTIAL_AI_RISK_2\\]': this.generatePotentialRisk(
        maturityReport,
        2
      ),
      '\\[MITIGATION_STRATEGY_2\\]': this.generateMitigationStrategy(
        maturityReport,
        2
      ),
      '\\[TRAINING_COSTS\\]': this.assessTrainingCosts(maturityReport),
      '\\[PRODUCTIVITY_IMPACT\\]':
        this.assessProductivityImpact(maturityReport),
      '\\[VENDOR_LOCK_IN_RISK\\]': this.assessVendorLockInRisk(maturityReport),

      '\\[HIGH_RISK_MITIGATION_PLAN\\]':
        this.generateHighRiskMitigation(maturityReport),
      '\\[MEDIUM_RISK_MITIGATION_PLAN\\]':
        this.generateMediumRiskMitigation(maturityReport),
      '\\[LOW_RISK_MITIGATION_PLAN\\]':
        this.generateLowRiskMitigation(maturityReport),

      // Evidence section
      '\\[READINESS_SCORE\\]': maturity.overallScore,
      '\\[COPILOT_MATURITY_LEVEL\\]': componentScores.copilot.details.maturity,
      '\\[TECH_STACK_COMPLETION\\]': componentScores.technology.score,
      '\\[TEAM_CAPABILITY_LEVEL\\]':
        componentScores.organization.details.skillLevel,

      '\\[LANGUAGE_LIST\\]': this.formatLanguageList(
        componentScores.technology.details.languages
      ),
      '\\[LIBRARY_LIST\\]': this.formatLibraryList(
        componentScores.technology.details.aiLibraries
      ),
      '\\[INTEGRATION_PATTERNS\\]': this.formatIntegrationPatterns(
        componentScores.copilot.details.integrations
      ),
      '\\[GOVERNANCE_STATUS\\]': this.formatGovernanceStatus(
        componentScores.governance.details
      ),

      '\\[AI_FILE_COUNT\\]': this.countAIFiles(maturityReport),
      '\\[COPILOT_CONFIG_COUNT\\]':
        componentScores.copilot.details.configurations,
      '\\[AI_SERVICE_COUNT\\]':
        componentScores.technology.details.aiServices.length,
      '\\[DOC_QUALITY_SCORE\\]':
        this.assessDocumentationQuality(maturityReport),

      // Follow-up actions
      '\\[OWNER\\]': options.owner || 'AI Strategy Team',
      '\\[TIMELINE\\]': options.timeline || this.generateDefaultTimeline(),
      '\\[SPECIFIC_ACTION_1\\]': this.generateSpecificAction(maturityReport, 1),
      '\\[SPECIFIC_ACTION_2\\]': this.generateSpecificAction(maturityReport, 2),
      '\\[SPECIFIC_ACTION_3\\]': this.generateSpecificAction(maturityReport, 3),

      // Success metrics
      '\\[TARGET_SCORE\\]': this.generateTargetScore(maturityReport),
      '\\[PRODUCTIVITY_TARGET\\]':
        this.generateProductivityTarget(maturityReport),
      '\\[QUALITY_TARGET\\]': this.generateQualityTarget(maturityReport),
      '\\[UTILIZATION_TARGET\\]':
        this.generateUtilizationTarget(maturityReport),

      '\\[SATISFACTION_TARGET\\]':
        this.generateSatisfactionTarget(maturityReport),
      '\\[ACCEPTANCE_TARGET\\]': this.generateAcceptanceTarget(maturityReport),
      '\\[SPEED_TARGET\\]': this.generateSpeedTarget(maturityReport),
      '\\[COST_TARGET\\]': this.generateCostTarget(maturityReport),

      '\\[WEEKLY_METRICS\\]': this.generateWeeklyMetrics(maturityReport),
      '\\[MONTHLY_METRICS\\]': this.generateMonthlyMetrics(maturityReport),
      '\\[QUARTERLY_METRICS\\]': this.generateQuarterlyMetrics(maturityReport),

      // Resource requirements
      '\\[EXPERTISE_LEVEL\\]': this.assessRequiredExpertise(maturityReport),
      '\\[TRAINING_HOURS\\]': this.assessTrainingHours(maturityReport),
      '\\[ROLE_LIST\\]': this.generateRoleList(maturityReport),

      '\\[AI_TOOL_LIST\\]': this.generateAIToolList(maturityReport),
      '\\[COMPUTE_REQUIREMENTS\\]':
        this.assessComputeRequirements(maturityReport),
      '\\[INTEGRATION_EFFORT\\]': this.assessIntegrationEffort(maturityReport),

      '\\[LICENSING_COST\\]': this.assessLicensingCosts(maturityReport),
      '\\[TRAINING_COST\\]': this.assessTrainingCosts(maturityReport),
      '\\[IMPLEMENTATION_COST\\]':
        this.assessImplementationCosts(maturityReport),
      '\\[TOTAL_COST\\]': this.assessTotalCosts(maturityReport),

      // Timeline
      '\\[TIMELINE_PHASE_1\\]': this.generatePhaseTimeline(roadmap, 1),
      '\\[WEEK_1_2_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        1,
        'weeks 1-2'
      ),
      '\\[WEEK_3_4_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        1,
        'weeks 3-4'
      ),

      '\\[TIMELINE_PHASE_2\\]': this.generatePhaseTimeline(roadmap, 2),
      '\\[MONTH_2_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        2,
        'month 2'
      ),
      '\\[MONTH_3_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        2,
        'month 3'
      ),

      '\\[TIMELINE_PHASE_3\\]': this.generatePhaseTimeline(roadmap, 3),
      '\\[MONTH_4_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        3,
        'month 4'
      ),
      '\\[MONTH_5_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        3,
        'month 5'
      ),

      '\\[TIMELINE_PHASE_4\\]': this.generatePhaseTimeline(roadmap, 4),
      '\\[MONTH_6_DELIVERABLES\\]': this.generatePhaseDeliverables(
        roadmap,
        4,
        'month 6'
      ),
      '\\[ONGOING_ACTIVITIES\\]':
        this.generateOngoingActivities(maturityReport),

      // Open questions
      '\\[UNRESOLVED_QUESTION_1\\]': this.generateOpenQuestion(
        maturityReport,
        1
      ),
      '\\[UNRESOLVED_QUESTION_2\\]': this.generateOpenQuestion(
        maturityReport,
        2
      ),
      '\\[UNRESOLVED_QUESTION_3\\]': this.generateOpenQuestion(
        maturityReport,
        3
      ),

      // Related decisions
      '\\[SUPERSEDED_ADR_LIST\\]': options.supersededADRs || 'None',
      '\\[DEPENDENCY_ADR_LIST\\]': options.dependencyADRs || 'None',
      '\\[CONFLICT_ADR_LIST\\]': options.conflictADRs || 'None',

      // Footer
      '\\[GENERATION_TIMESTAMP\\]': new Date().toISOString(),
      '\\[MATURITY_LEVEL\\]': maturity.level,
      '\\[REVIEW_DATE\\]': this.generateReviewDate(maturityReport),
    };
  }

  async ensureOutputDirectory() {
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
  }

  async writeADR(content, options) {
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = options.fileName || `ai-strategy-${timestamp}.md`;
    const filePath = path.join(this.outputPath, fileName);

    fs.writeFileSync(filePath, content, 'utf8');

    return filePath;
  }

  extractMetadata(content) {
    const metadata = {
      title: this.extractTitle(content),
      status: this.extractStatus(content),
      date: this.extractDate(content),
      confidence: this.extractConfidence(content),
    };

    return metadata;
  }

  /**
   * Content generation helpers
   */
  generateTitle(maturityReport) {
    const { level } = maturityReport.maturity;
    const strategies = {
      'AI-Novice': 'Foundation AI Strategy Implementation',
      'AI-Beginner': 'AI Capability Development Strategy',
      'AI-Developing': 'AI Integration and Scaling Strategy',
      'AI-Proficient': 'Advanced AI Optimization Strategy',
      'AI-Advanced': 'AI Innovation Leadership Strategy',
      'AI-Native': 'AI Excellence and Innovation Strategy',
    };

    return strategies[level] || 'AI Adoption Strategy';
  }

  assessConfidence(maturityReport) {
    const { overallScore } = maturityReport.maturity;

    if (overallScore >= 80) return 'HIGH';
    if (overallScore >= 60) return 'MEDIUM';
    return 'LOW';
  }

  generateAssessmentFindings(maturityReport) {
    const { maturity, componentScores } = maturityReport;

    const findings = [
      `Current AI maturity level: ${maturity.level}`,
      `Overall AI readiness score: ${maturity.overallScore}/100`,
      `Technology stack score: ${componentScores.technology.score}/100`,
      `Copilot integration score: ${componentScores.copilot.score}/100`,
      `Governance framework score: ${componentScores.governance.score}/100`,
    ];

    return findings.join('\n- ');
  }

  generateGapAnalysis(componentScores) {
    const gaps = [];

    for (const [component, score] of Object.entries(componentScores)) {
      if (
        component === 'overall' ||
        component === 'level' ||
        component === 'readiness'
      )
        continue;

      if (score.score < 60) {
        gaps.push(`${component}: ${score.score}/100 (needs improvement)`);
      }
    }

    return gaps.length > 0
      ? gaps.join('\n- ')
      : 'No significant gaps identified';
  }

  generateBusinessImpact(maturityReport) {
    const impacts = [
      'Improved developer productivity through AI assistance',
      'Enhanced code quality and consistency',
      'Accelerated development cycles',
      'Reduced technical debt through AI-guided refactoring',
      'Increased innovation capacity',
    ];

    return impacts.join('\n- ');
  }

  generateStrategyDescription(maturityReport, type) {
    const { level } = maturityReport.maturity;

    const strategies = {
      primary: this.generatePrimaryStrategy(level),
      alternative: this.generateAlternativeStrategy(level),
      incremental: this.generateIncrementalStrategy(level),
    };

    return strategies[type] || 'Comprehensive AI adoption strategy';
  }

  generatePrimaryStrategy(level) {
    const strategies = {
      'AI-Novice':
        'Establish foundational AI capabilities with basic Copilot integration and AI-friendly technology stack',
      'AI-Beginner':
        'Develop core AI competencies through expanded Copilot adoption and structured AI governance',
      'AI-Developing':
        'Scale AI integration across development workflows with advanced customization and automation',
      'AI-Proficient':
        'Optimize AI utilization with sophisticated customization, governance, and organizational alignment',
      'AI-Advanced':
        'Lead AI innovation with cutting-edge implementations and industry best practices',
      'AI-Native':
        'Drive AI excellence with continuous innovation, thought leadership, and ecosystem influence',
    };

    return strategies[level] || 'Comprehensive AI strategy implementation';
  }

  generateAlternativeStrategy(level) {
    const strategies = {
      'AI-Novice':
        'Focus on specific AI use cases with targeted pilot programs before broader adoption',
      'AI-Beginner':
        'Prioritize Copilot integration while maintaining existing development practices',
      'AI-Developing':
        'Emphasize AI governance and compliance before expanding technical capabilities',
      'AI-Proficient':
        'Concentrate on organizational AI maturity before advanced technical implementations',
      'AI-Advanced':
        'Balance AI innovation with operational stability and risk management',
      'AI-Native':
        'Maintain AI leadership while exploring emerging technologies and methodologies',
    };

    return strategies[level] || 'Alternative AI adoption approach';
  }

  generateIncrementalStrategy(level) {
    const strategies = {
      'AI-Novice':
        'Start with basic AI tools and gradually build capabilities through learning and experimentation',
      'AI-Beginner':
        'Incrementally expand AI usage from individual tools to team-wide adoption',
      'AI-Developing':
        'Progressively enhance AI integration through phased improvements and optimizations',
      'AI-Proficient':
        'Continuously refine AI practices through iterative improvements and feedback',
      'AI-Advanced':
        'Systematically advance AI capabilities through structured innovation programs',
      'AI-Native':
        'Evolve AI excellence through continuous learning and adaptation to new developments',
    };

    return strategies[level] || 'Incremental AI adoption approach';
  }

  generateBenefit(maturityReport, index) {
    const benefits = [
      'Improved developer productivity and code quality',
      'Accelerated development cycles and time-to-market',
      'Enhanced innovation capacity and competitive advantage',
      'Reduced technical debt and maintenance costs',
      'Better team collaboration and knowledge sharing',
    ];

    return benefits[index - 1] || 'Additional AI benefits';
  }

  generateDrawback(maturityReport, index) {
    const drawbacks = [
      'Initial learning curve and productivity dip',
      'Investment in training and tooling',
      'Potential dependency on AI vendors',
      'Need for governance and compliance frameworks',
      'Cultural change management requirements',
    ];

    return drawbacks[index - 1] || 'Potential AI adoption challenges';
  }

  assessResourceNeeds(maturityReport) {
    const { level } = maturityReport.maturity;

    const resources = {
      'AI-Novice': 'Basic training, Copilot licenses, and AI tool setup',
      'AI-Beginner':
        'Advanced training, custom prompt development, and governance framework',
      'AI-Developing':
        'Specialized expertise, custom skills development, and infrastructure optimization',
      'AI-Proficient':
        'AI specialists, advanced tooling, and organizational enablement programs',
      'AI-Advanced':
        'AI architects, innovation programs, and industry partnerships',
      'AI-Native':
        'AI research team, thought leadership initiatives, and ecosystem development',
    };

    return resources[level] || 'Comprehensive resource allocation';
  }

  generateAlternativeBenefit(maturityReport, index) {
    const benefits = [
      'Lower initial investment and risk exposure',
      'Faster time-to-value for specific use cases',
      'Easier change management and adoption',
      'Focused expertise development',
      'Measurable ROI demonstration',
    ];

    return benefits[index - 1] || 'Additional alternative benefits';
  }

  generateAlternativeDrawback(maturityReport, index) {
    const drawbacks = [
      'Limited scope and impact',
      'Longer overall transformation timeline',
      'Potential for fragmented AI adoption',
      'Reduced competitive advantage',
      'Multiple implementation phases required',
    ];

    return drawbacks[index - 1] || 'Potential alternative challenges';
  }

  assessComplexity(maturityReport, type) {
    const { level } = maturityReport.maturity;

    if (type === 'alternative') {
      const complexities = {
        'AI-Novice': 'Low',
        'AI-Beginner': 'Low-Medium',
        'AI-Developing': 'Medium',
        'AI-Proficient': 'Medium-High',
        'AI-Advanced': 'High',
        'AI-Native': 'Very High',
      };

      return complexities[level] || 'Medium';
    }

    return 'Medium';
  }

  assessTimeToValue(maturityReport, type) {
    const { level } = maturityReport.maturity;

    if (type === 'alternative') {
      const timeframes = {
        'AI-Novice': '2-3 months',
        'AI-Beginner': '3-4 months',
        'AI-Developing': '4-6 months',
        'AI-Proficient': '6-8 months',
        'AI-Advanced': '8-12 months',
        'AI-Native': '12-18 months',
      };

      return timeframes[level] || '6 months';
    }

    return '6 months';
  }

  assessRiskLevel(maturityReport) {
    const { overallScore } = maturityReport.maturity;

    if (overallScore >= 70) return 'Low';
    if (overallScore >= 50) return 'Medium';
    return 'High';
  }

  generateQuickWins(maturityReport) {
    const wins = [
      'Enable Copilot for immediate productivity gains',
      'Implement AI-friendly coding standards',
      'Establish basic AI usage guidelines',
      'Create shared prompt libraries',
      'Integrate AI tools in existing workflows',
    ];

    return wins.join('\n- ');
  }

  assessLearningValue(maturityReport) {
    return 'High - builds foundational AI capabilities and organizational learning';
  }

  assessArchitecturalDebt(maturityReport) {
    const { level } = maturityReport.maturity;

    const debtLevels = {
      'AI-Novice': 'Low - minimal architectural changes required',
      'AI-Beginner': 'Low-Medium - some refactoring for AI integration',
      'AI-Developing': 'Medium - moderate architectural evolution needed',
      'AI-Proficient': 'Medium-High - significant architectural optimization',
      'AI-Advanced': 'High - substantial architectural transformation',
      'AI-Native': 'Very High - complete architectural innovation',
    };

    return debtLevels[level] || 'Medium';
  }

  assessMigrationComplexity(maturityReport) {
    const { level } = maturityReport.maturity;

    const complexities = {
      'AI-Novice': 'Low - straightforward implementation',
      'AI-Beginner': 'Low-Medium - basic migration requirements',
      'AI-Developing': 'Medium - moderate complexity',
      'AI-Proficient': 'Medium-High - complex migration',
      'AI-Advanced': 'High - very complex transformation',
      'AI-Native': 'Very High - comprehensive overhaul',
    };

    return complexities[level] || 'Medium';
  }

  generateSelectedApproach(maturityReport) {
    const { level } = maturityReport.maturity;

    const approaches = {
      'AI-Novice':
        'Implement foundational AI strategy with focus on Copilot integration and basic AI governance',
      'AI-Beginner':
        'Adopt comprehensive AI approach with expanded Copilot usage and structured governance framework',
      'AI-Developing':
        'Execute scaling strategy with advanced AI integration and organizational alignment',
      'AI-Proficient':
        'Pursue optimization strategy with sophisticated AI utilization and continuous improvement',
      'AI-Advanced':
        'Lead innovation strategy with cutting-edge AI implementations and industry leadership',
      'AI-Native':
        'Drive excellence strategy with continuous innovation and ecosystem influence',
    };

    return approaches[level] || 'Comprehensive AI strategy implementation';
  }

  assessBusinessAlignment(maturityReport) {
    return 'Strong alignment with digital transformation goals and competitive positioning requirements';
  }

  assessFeasibility(maturityReport) {
    const { overallScore } = maturityReport.maturity;

    if (overallScore >= 80) return 'High - excellent readiness and capability';
    if (overallScore >= 60) return 'Medium - good foundation with some gaps';
    return 'Low - significant preparation needed';
  }

  assessRiskReward(maturityReport) {
    const { level } = maturityReport.maturity;

    const ratios = {
      'AI-Novice': 'Favorable - low risk, moderate reward',
      'AI-Beginner': 'Positive - manageable risk, good reward',
      'AI-Developing': 'Balanced - moderate risk, high reward',
      'AI-Proficient': 'Optimal - calculated risk, very high reward',
      'AI-Advanced': 'Strategic - higher risk, exceptional reward',
      'AI-Native': 'Transformative - bold risk, market-leading reward',
    };

    return ratios[level] || 'Balanced risk-reward profile';
  }

  assessTeamReadiness(maturityReport) {
    const { organization } = maturityReport.componentScores;

    if (organization.score >= 70)
      return 'High - team well-prepared for AI adoption';
    if (organization.score >= 50) return 'Medium - team needs some preparation';
    return 'Low - team requires significant training and preparation';
  }

  generateExpectedBenefit(maturityReport, index) {
    const benefits = [
      'Developer Productivity Improvement',
      'Code Quality Enhancement',
      'Development Velocity Acceleration',
      'Innovation Capacity Expansion',
      'Technical Debt Reduction',
    ];

    return benefits[index - 1] || 'Additional AI Benefits';
  }

  generateMeasurableOutcome(maturityReport, index) {
    const outcomes = [
      '25-40% increase in development productivity',
      '30-50% improvement in code quality metrics',
      '20-35% reduction in development cycle time',
      '40-60% increase in innovation initiatives',
      '25-35% reduction in technical debt',
    ];

    return outcomes[index - 1] || 'Measurable improvement targets';
  }

  assessProductivityGain(maturityReport) {
    const { level } = maturityReport.maturity;

    const gains = {
      'AI-Novice': '15-25% productivity improvement',
      'AI-Beginner': '25-35% productivity improvement',
      'AI-Developing': '35-45% productivity improvement',
      'AI-Proficient': '45-55% productivity improvement',
      'AI-Advanced': '55-65% productivity improvement',
      'AI-Native': '65-80% productivity improvement',
    };

    return gains[level] || '30-40% productivity improvement';
  }

  assessQualityMetrics(maturityReport) {
    return '30-50% improvement in code quality, test coverage, and maintainability metrics';
  }

  generatePotentialRisk(maturityReport, index) {
    const risks = [
      'Initial productivity dip during learning curve',
      'AI tool dependency and vendor lock-in',
      'Data privacy and security concerns',
      'Cultural resistance to AI adoption',
      'Quality control and consistency challenges',
    ];

    return risks[index - 1] || 'Potential AI adoption risks';
  }

  generateMitigationStrategy(maturityReport, index) {
    const strategies = [
      'Comprehensive training and gradual adoption approach',
      'Multi-vendor strategy and open-source alternatives',
      'Robust security framework and data governance',
      'Change management program and stakeholder engagement',
      'Quality gates and human oversight processes',
    ];

    return strategies[index - 1] || 'Risk mitigation strategies';
  }

  assessTrainingCosts(maturityReport) {
    const { level } = maturityReport.maturity;

    const costs = {
      'AI-Novice': '$5,000-10,000 for basic training',
      'AI-Beginner': '$10,000-25,000 for comprehensive training',
      'AI-Developing': '$25,000-50,000 for advanced training',
      'AI-Proficient': '$50,000-100,000 for specialized training',
      'AI-Advanced': '$100,000-250,000 for expert training',
      'AI-Native': '$250,000+ for continuous learning programs',
    };

    return costs[level] || '$25,000-50,000 training investment';
  }

  assessProductivityImpact(maturityReport) {
    return 'Temporary 10-20% productivity dip during initial learning phase';
  }

  assessVendorLockInRisk(maturityReport) {
    return 'Medium - mitigated through multi-vendor strategy and open-source alternatives';
  }

  generateHighRiskMitigation(maturityReport) {
    return 'Implement comprehensive security framework, data governance, and multi-vendor strategy';
  }

  generateMediumRiskMitigation(maturityReport) {
    return 'Establish quality gates, human oversight processes, and change management programs';
  }

  generateLowRiskMitigation(maturityReport) {
    return 'Provide ongoing training, support resources, and continuous improvement mechanisms';
  }

  formatLanguageList(languages) {
    return languages.length > 0
      ? languages.join(', ')
      : 'No AI-friendly languages detected';
  }

  formatLibraryList(libraries) {
    return libraries.length > 0
      ? libraries.join(', ')
      : 'No AI libraries detected';
  }

  formatIntegrationPatterns(integrations) {
    const patterns = Object.values(integrations);
    const totalIntegrations = patterns.reduce(
      (sum, int) => sum + int.integrations.length,
      0
    );
    return `${totalIntegrations} AI service integrations detected`;
  }

  formatGovernanceStatus(governanceDetails) {
    const { governanceFiles, policies, enforcement } = governanceDetails;
    const enforcementLevel = this.assessEnforcementLevel(enforcement);

    return `${governanceFiles} governance files, ${policies} policies, ${enforcementLevel} enforcement`;
  }

  assessEnforcementLevel(enforcement) {
    if (enforcement >= 3) return 'High';
    if (enforcement >= 2) return 'Medium';
    return 'Low';
  }

  countAIFiles(maturityReport) {
    const usagePatterns =
      maturityReport.detailedAnalysis?.copilot?.details?.usagePatterns;
    const files = usagePatterns?.files;
    return files?.aiRelatedFiles || 0;
  }

  assessDocumentationQuality(maturityReport) {
    const collaboration =
      maturityReport.detailedAnalysis?.copilot?.details?.teamCollaboration;
    const docFiles = Object.values(collaboration || {}).filter(
      c => c.type === 'documentation'
    );

    if (docFiles.length === 0) return 'No documentation';

    const avgQuality =
      docFiles.reduce((sum, doc) => sum + (doc.quality || 0), 0) /
      docFiles.length;

    if (avgQuality >= 80) return 'High quality';
    if (avgQuality >= 60) return 'Good quality';
    return 'Needs improvement';
  }

  generateDefaultTimeline() {
    return 'Q1 2024 - Q4 2024';
  }

  generateSpecificAction(maturityReport, index) {
    const actions = [
      'Establish AI governance framework and policies',
      'Implement comprehensive Copilot integration and customization',
      'Develop team training and enablement programs',
      'Create AI monitoring and measurement systems',
      'Establish continuous improvement and optimization processes',
    ];

    return actions[index - 1] || 'Additional implementation actions';
  }

  generateTargetScore(maturityReport) {
    const current = maturityReport.maturity.overallScore;
    const target = Math.min(current + 20, 95);
    return `${target}% improvement from current ${current}%`;
  }

  generateProductivityTarget(maturityReport) {
    const { level } = maturityReport.maturity;

    const targets = {
      'AI-Novice': '20-30% increase',
      'AI-Beginner': '30-40% increase',
      'AI-Developing': '40-50% increase',
      'AI-Proficient': '50-60% increase',
      'AI-Advanced': '60-70% increase',
      'AI-Native': '70-80% increase',
    };

    return targets[level] || '30-40% increase';
  }

  generateQualityTarget(maturityReport) {
    return '25-40% improvement in code quality metrics';
  }

  generateUtilizationTarget(maturityReport) {
    const { level } = maturityReport.maturity;

    const targets = {
      'AI-Novice': '50-60% team adoption',
      'AI-Beginner': '60-70% team adoption',
      'AI-Developing': '70-80% team adoption',
      'AI-Proficient': '80-90% team adoption',
      'AI-Advanced': '90-95% team adoption',
      'AI-Native': '95-100% team adoption',
    };

    return targets[level] || '70-80% team adoption';
  }

  generateSatisfactionTarget(maturityReport) {
    return '8/10 team satisfaction score';
  }

  generateAcceptanceTarget(maturityReport) {
    return '75-85% AI-generated code acceptance rate';
  }

  generateSpeedTarget(maturityReport) {
    return '25-35% reduction in time-to-market';
  }

  generateCostTarget(maturityReport) {
    return '20-30% reduction in development costs';
  }

  generateWeeklyMetrics(maturityReport) {
    return 'AI usage statistics, productivity metrics, quality indicators';
  }

  generateMonthlyMetrics(maturityReport) {
    return 'Comprehensive performance analysis, ROI calculations, team satisfaction surveys';
  }

  generateQuarterlyMetrics(maturityReport) {
    return 'Strategic assessment, competitive analysis, innovation pipeline evaluation';
  }

  assessRequiredExpertise(maturityReport) {
    const { level } = maturityReport.maturity;

    const expertise = {
      'AI-Novice': 'Basic AI knowledge and Copilot proficiency',
      'AI-Beginner': 'Intermediate AI skills and prompt engineering',
      'AI-Developing': 'Advanced AI expertise and custom development',
      'AI-Proficient': 'Specialized AI knowledge and architecture skills',
      'AI-Advanced': 'Expert AI capabilities and innovation leadership',
      'AI-Native': 'AI research expertise and thought leadership',
    };

    return expertise[level] || 'Intermediate AI expertise required';
  }

  assessTrainingHours(maturityReport) {
    const { level } = maturityReport.maturity;

    const hours = {
      'AI-Novice': '20-40 hours per team member',
      'AI-Beginner': '40-80 hours per team member',
      'AI-Developing': '80-120 hours per team member',
      'AI-Proficient': '120-200 hours per team member',
      'AI-Advanced': '200-300 hours per team member',
      'AI-Native': '300+ hours per team member',
    };

    return hours[level] || '80-120 hours per team member';
  }

  generateRoleList(maturityReport) {
    const { level } = maturityReport.maturity;

    const roles = {
      'AI-Novice': 'AI Champion, Technical Lead',
      'AI-Beginner': 'AI Architect, Prompt Engineer, Governance Lead',
      'AI-Developing':
        'AI Specialist, Custom Skill Developer, Quality Engineer',
      'AI-Proficient': 'AI Expert, Innovation Lead, Compliance Officer',
      'AI-Advanced': 'AI Researcher, Strategy Architect, Ecosystem Lead',
      'AI-Native': 'AI Scientist, Thought Leader, Ecosystem Architect',
    };

    return roles[level] || 'AI Architect, Prompt Engineer, Governance Lead';
  }

  generateAIToolList(maturityReport) {
    return 'GitHub Copilot, OpenAI/Anthropic APIs, AI development tools, monitoring platforms';
  }

  assessComputeRequirements(maturityReport) {
    const { level } = maturityReport.maturity;

    const requirements = {
      'AI-Novice': 'Standard development workstations',
      'AI-Beginner': 'Enhanced workstations with GPU support',
      'AI-Developing': 'Cloud compute resources for AI workloads',
      'AI-Proficient': 'Dedicated AI infrastructure and specialized hardware',
      'AI-Advanced': 'High-performance computing cluster and AI accelerators',
      'AI-Native': 'Enterprise-grade AI infrastructure and research facilities',
    };

    return requirements[level] || 'Cloud compute resources for AI workloads';
  }

  assessIntegrationEffort(maturityReport) {
    const { level } = maturityReport.maturity;

    const efforts = {
      'AI-Novice': 'Low - basic integration work',
      'AI-Beginner': 'Medium - moderate integration requirements',
      'AI-Developing': 'High - significant integration effort',
      'AI-Proficient': 'Very High - complex integration challenges',
      'AI-Advanced': 'Extensive - enterprise-level integration',
      'AI-Native': 'Comprehensive - ecosystem-wide integration',
    };

    return efforts[level] || 'High - significant integration effort';
  }

  assessLicensingCosts(maturityReport) {
    const { level } = maturityReport.maturity;

    const costs = {
      'AI-Novice': '$10,000-25,000 annually',
      'AI-Beginner': '$25,000-50,000 annually',
      'AI-Developing': '$50,000-100,000 annually',
      'AI-Proficient': '$100,000-250,000 annually',
      'AI-Advanced': '$250,000-500,000 annually',
      'AI-Native': '$500,000+ annually',
    };

    return costs[level] || '$50,000-100,000 annually';
  }

  assessImplementationCosts(maturityReport) {
    const { level } = maturityReport.maturity;

    const costs = {
      'AI-Novice': '$25,000-50,000 total implementation',
      'AI-Beginner': '$50,000-100,000 total implementation',
      'AI-Developing': '$100,000-250,000 total implementation',
      'AI-Proficient': '$250,000-500,000 total implementation',
      'AI-Advanced': '$500,000-1,000,000 total implementation',
      'AI-Native': '$1,000,000+ total implementation',
    };

    return costs[level] || '$100,000-250,000 total implementation';
  }

  assessTotalCosts(maturityReport) {
    const licensing = this.assessLicensingCosts(maturityReport);
    const training = this.assessTrainingCosts(maturityReport);
    const implementation = this.assessImplementationCosts(maturityReport);

    return `Total estimated cost: ${implementation} (including ${licensing} licensing and ${training} training)`;
  }

  generatePhaseTimeline(roadmap, phaseIndex) {
    if (!roadmap.phases || !roadmap.phases[phaseIndex - 1]) {
      return `Phase ${phaseIndex}`;
    }

    return roadmap.phases[phaseIndex - 1].phase;
  }

  generatePhaseDeliverables(roadmap, phaseIndex, period) {
    if (!roadmap.phases || !roadmap.phases[phaseIndex - 1]) {
      return `Phase ${phaseIndex} ${period} deliverables`;
    }

    const phase = roadmap.phases[phaseIndex - 1];
    return phase.keyMilestones.join(', ') || `${phase.phase} deliverables`;
  }

  generateOngoingActivities(maturityReport) {
    return 'Continuous monitoring, optimization, innovation, and improvement of AI capabilities';
  }

  generateOpenQuestion(maturityReport, index) {
    const questions = [
      'How will we measure and quantify AI ROI across different teams and projects?',
      'What strategies will we employ to maintain competitive advantage in AI capabilities?',
      'How will we balance AI automation with human creativity and oversight?',
    ];

    return questions[index - 1] || 'Additional strategic questions to address';
  }

  generateReviewDate(maturityReport) {
    const date = new Date();
    date.setMonth(date.getMonth() + 6); // 6 months from now
    return date.toISOString().split('T')[0];
  }

  extractTitle(content) {
    const match = content.match(/^#\s*ADR-\d+:\s*(.+)$/m);
    return match ? match[1] : 'Untitled ADR';
  }

  extractStatus(content) {
    const match = content.match(/\*\*Status:\*\*\s*(.+?)\s*\*\*Date:/);
    return match ? match[1] : 'Unknown';
  }

  extractDate(content) {
    const match = content.match(/\*\*Date:\*\*\s*(.+?)\s*\*\*Confidence:/);
    return match ? match[1] : 'Unknown';
  }

  extractConfidence(content) {
    const match = content.match(/\*\*Confidence:\*\*\s*(.+?)\s*$/m);
    return match ? match[1] : 'Unknown';
  }
}

// CLI execution
if (require.main === module) {
  const repoPath = process.argv[2] || '.';
  const maturityReportPath = process.argv[3];

  if (!maturityReportPath) {
    console.error(
      'Usage: node adr-generator.js <repo-path> <maturity-report-json>'
    );
    process.exit(1);
  }

  try {
    const maturityReport = JSON.parse(
      fs.readFileSync(maturityReportPath, 'utf8')
    );
    const generator = new ADRGenerator(repoPath);

    generator
      .generateADR(maturityReport)
      .then(result => {
        console.log('\n📝 AI Strategy ADR Generated Successfully');
        console.log('=====================================');
        console.log(`File: ${result.filePath}`);
        console.log(`Title: ${result.metadata.title}`);
        console.log(`Status: ${result.metadata.status}`);
        console.log(`Date: ${result.metadata.date}`);
        console.log(`Confidence: ${result.metadata.confidence}`);
      })
      .catch(error => {
        console.error('❌ ADR generation failed:', error);
        process.exit(1);
      });
  } catch (error) {
    console.error('❌ Failed to read maturity report:', error);
    process.exit(1);
  }
}

module.exports = ADRGenerator;

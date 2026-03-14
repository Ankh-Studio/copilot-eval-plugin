/**
 * AI Enablement ADR Generator
 *
 * Generates Architectural Decision Records focused on AI enablement,
 * team productivity acceleration, and constraint-aware implementation guidance.
 */

const fs = require('fs');
const path = require('path');

class AIEnablementADRGenerator {
  constructor(options = {}) {
    this.repositoryPath = options.repositoryPath || '.';
    this.outputPath = options.outputPath || './docs';
    this.templatePath = options.templatePath || path.join(__dirname, 'assets');
    this.analysisData = options.analysisData || {};
  }

  /**
   * Generate AI Enablement ADR
   */
  async generateADR(analysisResults) {
    console.log('📝 Generating AI Enablement ADR...');

    const adr = {
      metadata: this.generateMetadata(analysisResults),
      context: this.generateContext(analysisResults),
      decision: this.generateDecision(analysisResults),
      implementation: this.generateImplementation(analysisResults),
      consequences: this.generateConsequences(analysisResults),
      artifacts: this.generateArtifacts(analysisResults),
      nextSteps: this.generateNextSteps(analysisResults),
    };

    // Save ADR to file
    const adrPath = await this.saveADR(adr);

    console.log(`✅ ADR generated: ${adrPath}`);
    return { adr, path: adrPath };
  }

  /**
   * Generate ADR metadata
   */
  generateMetadata(analysisResults) {
    const timestamp = new Date().toISOString().split('T')[0];
    const sequence = this.getNextADRSequence();

    return {
      id: `ADR-${String(sequence).padStart(3, '0')}`,
      title: this.generateADRTitle(analysisResults),
      status: 'proposed',
      date: timestamp,
      authors: this.identifyAuthors(analysisResults),
      reviewers: this.identifyReviewers(analysisResults),
      tags: this.generateTags(analysisResults),
      category: 'ai-enablement',
      priority: this.determinePriority(analysisResults),
      impact: this.assessImpact(analysisResults),
    };
  }

  /**
   * Generate ADR context section
   */
  generateContext(analysisResults) {
    const { repositoryContext, constraints, opportunities } = analysisResults;

    return {
      repositoryProfile: {
        technology: repositoryContext.summary.primaryLanguage,
        framework: repositoryContext.summary.primaryFramework,
        teamSize: repositoryContext.summary.teamSize,
        maturity: repositoryContext.summary.repositoryAge,
        developmentVelocity: repositoryContext.summary.developmentVelocity,
      },
      aiReadiness: {
        score: repositoryContext.aiReadiness.score,
        level: repositoryContext.aiReadiness.readiness,
        strengths: repositoryContext.aiReadiness.factors,
        gaps: this.identifyReadinessGaps(repositoryContext),
      },
      constraintLandscape: {
        totalConstraints: constraints.summary.totalConstraints,
        highSeverityConstraints: constraints.summary.highSeverityConstraints,
        mostRestrictiveCategory: constraints.summary.mostRestrictiveCategory,
        feasibility: constraints.summary.aiAdoptionFeasibility,
        keyConstraints: this.identifyKeyConstraints(constraints),
      },
      opportunityAssessment: {
        totalOpportunities: opportunities.length,
        highImpactOpportunities: opportunities.filter(o => o.impact === 'high')
          .length,
        quickWins: opportunities.filter(o => o.effort === 'low').length,
        primaryOpportunities: this.identifyPrimaryOpportunities(opportunities),
      },
      businessContext: this.assessBusinessContext(analysisResults),
      teamContext: this.assessTeamContext(analysisResults),
    };
  }

  /**
   * Generate ADR decision section
   */
  generateDecision(analysisResults) {
    const { repositoryContext, constraints, opportunities, recommendations } =
      analysisResults;

    return {
      primaryDecision: this.formulatePrimaryDecision(analysisResults),
      rationale: this.developRationale(analysisResults),
      alternatives: this.evaluateAlternatives(analysisResults),
      decisionCriteria: this.defineDecisionCriteria(analysisResults),
      tradeoffs: this.analyzeTradeoffs(analysisResults),
      riskAssessment: this.assessRisks(analysisResults),
      successMetrics: this.defineSuccessMetrics(analysisResults),
    };
  }

  /**
   * Generate implementation section
   */
  generateImplementation(analysisResults) {
    const { recommendations, implementationArtifacts } = analysisResults;

    return {
      implementationStrategy:
        this.defineImplementationStrategy(analysisResults),
      phases: this.defineImplementationPhases(analysisResults),
      timeline: this.createTimeline(analysisResults),
      resources: this.identifyRequiredResources(analysisResults),
      dependencies: this.identifyDependencies(analysisResults),
      milestones: this.defineMilestones(analysisResults),
      checkpoints: this.defineCheckpoints(analysisResults),
    };
  }

  /**
   * Generate consequences section
   */
  generateConsequences(analysisResults) {
    return {
      positiveOutcomes: this.identifyPositiveOutcomes(analysisResults),
      negativeConsequences: this.identifyNegativeConsequences(analysisResults),
      neutralEffects: this.identifyNeutralEffects(analysisResults),
      mitigationStrategies: this.developMitigationStrategies(analysisResults),
      longTermImpact: this.assessLongTermImpact(analysisResults),
      scalability: this.assessScalability(analysisResults),
      maintainability: this.assessMaintainability(analysisResults),
    };
  }

  /**
   * Generate implementation artifacts
   */
  generateArtifacts(analysisResults) {
    const artifacts = analysisResults.implementationArtifacts || [];

    return {
      codeSnippets: this.extractCodeSnippets(artifacts),
      configurations: this.extractConfigurations(artifacts),
      workflows: this.extractWorkflows(artifacts),
      templates: this.extractTemplates(artifacts),
      documentation: this.extractDocumentation(artifacts),
      tools: this.extractTools(artifacts),
    };
  }

  /**
   * Generate next steps
   */
  generateNextSteps(analysisResults) {
    return {
      immediateActions: this.defineImmediateActions(analysisResults),
      shortTermGoals: this.defineShortTermGoals(analysisResults),
      longTermObjectives: this.defineLongTermObjectives(analysisResults),
      successIndicators: this.defineSuccessIndicators(analysisResults),
      reviewPoints: this.defineReviewPoints(analysisResults),
      adjustmentTriggers: this.defineAdjustmentTriggers(analysisResults),
    };
  }

  /**
   * Generate ADR title
   */
  generateADRTitle(analysisResults) {
    const { repositoryContext, opportunities } = analysisResults;
    const primaryTech = repositoryContext.summary.primaryLanguage;
    const primaryOpportunity = opportunities[0];

    if (primaryOpportunity) {
      return `AI Enablement Strategy for ${primaryTech.charAt(0).toUpperCase() + primaryTech.slice(1)} Development: ${primaryOpportunity.title}`;
    }

    return `AI Enablement Strategy for ${primaryTech.charAt(0).toUpperCase() + primaryTech.slice(1)} Development`;
  }

  /**
   * Get next ADR sequence number
   */
  getNextADRSequence() {
    const docsDir = path.join(this.repositoryPath, 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
      return 1;
    }

    const existingADRs = fs
      .readdirSync(docsDir)
      .filter(file => file.startsWith('ADR-') && file.endsWith('.md'))
      .map(file => parseInt(file.split('-')[1]))
      .filter(num => !isNaN(num))
      .sort((a, b) => b - a);

    return existingADRs.length > 0 ? existingADRs[0] + 1 : 1;
  }

  /**
   * Identify authors
   */
  identifyAuthors(analysisResults) {
    // Try to identify from git history
    try {
      const { execSync } = require('child_process');
      const authorEmail = execSync('git config user.email', {
        cwd: this.repositoryPath,
        encoding: 'utf8',
      }).trim();

      const authorName = execSync('git config user.name', {
        cwd: this.repositoryPath,
        encoding: 'utf8',
      }).trim();

      return [
        { name: authorName, email: authorEmail, role: 'AI Enablement Lead' },
      ];
    } catch (error) {
      return [
        {
          name: 'AI Enablement Intelligence',
          email: 'ai-enablement@team.com',
          role: 'AI Enablement Lead',
        },
      ];
    }
  }

  /**
   * Identify reviewers
   */
  identifyReviewers(analysisResults) {
    const { repositoryContext } = analysisResults;
    const teamSize = repositoryContext.summary.teamSize;

    const reviewers = [];

    // Add team lead
    reviewers.push({
      name: 'Team Lead',
      email: 'team-lead@company.com',
      role: 'Technical Reviewer',
    });

    // Add architecture reviewer for larger teams
    if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      reviewers.push({
        name: 'Architecture Reviewer',
        email: 'architect@company.com',
        role: 'Architecture Reviewer',
      });
    }

    // Add security reviewer for constrained environments
    if (analysisResults.constraints.summary.highSeverityConstraints > 0) {
      reviewers.push({
        name: 'Security Reviewer',
        email: 'security@company.com',
        role: 'Security Reviewer',
      });
    }

    return reviewers;
  }

  /**
   * Generate tags
   */
  generateTags(analysisResults) {
    const tags = ['ai-enablement', 'product-acceleration'];

    const { repositoryContext, opportunities } = analysisResults;

    // Add technology tags
    tags.push(repositoryContext.summary.primaryLanguage);
    if (repositoryContext.summary.primaryFramework !== 'none') {
      tags.push(repositoryContext.summary.primaryFramework);
    }

    // Add constraint tags
    if (analysisResults.constraints.summary.totalConstraints > 0) {
      tags.push('constraint-aware');
    }

    // Add opportunity tags
    opportunities.slice(0, 3).forEach(opportunity => {
      tags.push(opportunity.category);
    });

    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Determine priority
   */
  determinePriority(analysisResults) {
    const { repositoryContext, constraints, opportunities } = analysisResults;

    let score = 0;

    // High AI readiness increases priority
    if (repositoryContext.aiReadiness.readiness === 'high') score += 3;
    else if (repositoryContext.aiReadiness.readiness === 'medium') score += 2;
    else score += 1;

    // Low constraint count increases priority
    if (constraints.summary.totalConstraints <= 2) score += 3;
    else if (constraints.summary.totalConstraints <= 5) score += 2;
    else score += 1;

    // High impact opportunities increase priority
    const highImpactCount = opportunities.filter(
      o => o.impact === 'high'
    ).length;
    if (highImpactCount >= 3) score += 3;
    else if (highImpactCount >= 1) score += 2;
    else score += 1;

    if (score >= 7) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  }

  /**
   * Assess impact
   */
  assessImpact(analysisResults) {
    const { repositoryContext, opportunities } = analysisResults;

    let impact = 'team';

    // Large teams or enterprise environments have broader impact
    if (
      repositoryContext.summary.teamSize.includes('large') ||
      repositoryContext.summary.teamSize.includes('enterprise')
    ) {
      impact = 'organization';
    }

    // High-impact opportunities suggest broader impact
    const highImpactCount = opportunities.filter(
      o => o.impact === 'high'
    ).length;
    if (highImpactCount >= 2 && impact === 'team') {
      impact = 'department';
    }

    return impact;
  }

  /**
   * Identify readiness gaps
   */
  identifyReadinessGaps(repositoryContext) {
    const gaps = [];
    const { developmentMaturity } = repositoryContext;

    if (developmentMaturity.testing.maturity === 'none') {
      gaps.push('Testing infrastructure');
    }

    if (developmentMaturity.ciCd.maturity === 'none') {
      gaps.push('CI/CD automation');
    }

    if (developmentMaturity.codeQuality.maturity === 'none') {
      gaps.push('Code quality tools');
    }

    if (developmentMaturity.documentation.maturity === 'minimal') {
      gaps.push('Documentation practices');
    }

    return gaps;
  }

  /**
   * Identify key constraints
   */
  identifyKeyConstraints(constraints) {
    const keyConstraints = [];

    // External constraints
    Object.entries(constraints.externalConstraints).forEach(
      ([category, constraint]) => {
        if (constraint.severity === 'high') {
          keyConstraints.push({
            category: 'external',
            type: category,
            severity: constraint.severity,
            impact: constraint.impact.slice(0, 2), // Top 2 impacts
          });
        }
      }
    );

    // Technical constraints
    Object.entries(constraints.technicalConstraints).forEach(
      ([category, constraint]) => {
        if (constraint.severity === 'high') {
          keyConstraints.push({
            category: 'technical',
            type: category,
            severity: constraint.severity,
            impact: constraint.impact.slice(0, 2),
          });
        }
      }
    );

    return keyConstraints;
  }

  /**
   * Identify primary opportunities
   */
  identifyPrimaryOpportunities(opportunities) {
    return opportunities
      .filter(o => o.impact === 'high')
      .slice(0, 3)
      .map(opportunity => ({
        title: opportunity.title,
        category: opportunity.category,
        impact: opportunity.impact,
        effort: opportunity.effort,
        tools: opportunity.tools.slice(0, 3),
        benefits: opportunity.benefits.slice(0, 2),
      }));
  }

  /**
   * Assess business context
   */
  assessBusinessContext(analysisResults) {
    const { repositoryContext } = analysisResults;

    return {
      productStage: this.inferProductStage(repositoryContext),
      growthPhase: this.inferGrowthPhase(repositoryContext),
      marketPosition: this.inferMarketPosition(repositoryContext),
      businessGoals: this.inferBusinessGoals(repositoryContext),
      successFactors: this.identifySuccessFactors(repositoryContext),
    };
  }

  /**
   * Assess team context
   */
  assessTeamContext(analysisResults) {
    const { repositoryContext } = analysisResults;

    return {
      teamMaturity: this.assessTeamMaturity(repositoryContext),
      collaborationStyle: this.assessCollaborationStyle(repositoryContext),
      learningCulture: this.assessLearningCulture(repositoryContext),
      changeReadiness: this.assessChangeReadiness(repositoryContext),
      technicalDepth: this.assessTechnicalDepth(repositoryContext),
    };
  }

  /**
   * Formulate primary decision
   */
  formulatePrimaryDecision(analysisResults) {
    const { repositoryContext, opportunities } = analysisResults;
    const primaryOpportunity = opportunities[0];

    if (!primaryOpportunity) {
      return {
        statement: 'Establish foundational AI enablement infrastructure',
        approach: 'Gradual implementation starting with basic AI tools',
        scope:
          'Team-level AI adoption with focus on immediate productivity gains',
      };
    }

    return {
      statement: `Implement ${primaryOpportunity.title.toLowerCase()} to accelerate team productivity`,
      approach: this.determineApproach(primaryOpportunity, analysisResults),
      scope: this.determineScope(primaryOpportunity, analysisResults),
      timeline: this.estimateTimeline(primaryOpportunity, analysisResults),
    };
  }

  /**
   * Determine implementation approach
   */
  determineApproach(opportunity, analysisResults) {
    const { constraints } = analysisResults;

    if (constraints.summary.aiAdoptionFeasibility === 'low') {
      return 'Phased approach with constraint mitigation';
    }

    if (opportunity.effort === 'low') {
      return 'Rapid implementation with immediate value';
    }

    if (opportunity.effort === 'high') {
      return 'Strategic implementation with comprehensive planning';
    }

    return 'Balanced approach with incremental delivery';
  }

  /**
   * Determine implementation scope
   */
  determineScope(opportunity, analysisResults) {
    const { repositoryContext } = analysisResults;
    const teamSize = repositoryContext.summary.teamSize;

    if (teamSize.includes('small')) {
      return 'Team-wide implementation with full participation';
    }

    if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      return 'Pilot implementation with selected team members';
    }

    return 'Gradual rollout with team champions';
  }

  /**
   * Estimate timeline
   */
  estimateTimeline(opportunity, analysisResults) {
    const baseTimeline = {
      low: '2-4 weeks',
      medium: '1-3 months',
      high: '3-6 months',
    };

    const { constraints } = analysisResults;
    let multiplier = 1;

    // High constraints increase timeline
    if (constraints.summary.highSeverityConstraints >= 2) {
      multiplier = 1.5;
    }

    const weeks = parseInt(baseTimeline[opportunity.effort].split('-')[0]);
    const adjustedWeeks = Math.round(weeks * multiplier);

    return `${adjustedWeeks}-${Math.round(adjustedWeeks * 1.5)} weeks`;
  }

  /**
   * Develop rationale
   */
  developRationale(analysisResults) {
    const rationale = [];

    // AI readiness rationale
    const { repositoryContext } = analysisResults;
    rationale.push({
      factor: 'AI Readiness',
      reasoning: `Repository shows ${repositoryContext.aiReadiness.readiness} AI readiness with score of ${repositoryContext.aiReadiness.score}/100`,
      evidence: repositoryContext.aiReadiness.factors,
    });

    // Opportunity rationale
    const { opportunities } = analysisResults;
    const highImpactCount = opportunities.filter(
      o => o.impact === 'high'
    ).length;
    rationale.push({
      factor: 'Opportunity Potential',
      reasoning: `${highImpactCount} high-impact AI opportunities identified with potential for significant productivity gains`,
      evidence: opportunities.slice(0, 3).map(o => o.title),
    });

    // Constraint rationale
    const { constraints } = analysisResults;
    rationale.push({
      factor: 'Constraint Compatibility',
      reasoning: `AI adoption feasibility assessed as ${constraints.summary.aiAdoptionFeasibility} with ${constraints.summary.totalConstraints} identified constraints`,
      evidence: constraints.summary.mostRestrictiveCategory,
    });

    return rationale;
  }

  /**
   * Evaluate alternatives
   */
  evaluateAlternatives(analysisResults) {
    const alternatives = [];
    const { opportunities } = analysisResults;

    // Alternative 1: Status quo
    alternatives.push({
      option: 'Maintain Current Development Practices',
      pros: [
        'No disruption to existing workflows',
        'No additional costs',
        'No learning curve',
      ],
      cons: [
        'Missed productivity opportunities',
        'Competitive disadvantage',
        'Technical debt accumulation',
      ],
      feasibility: 'high',
      impact: 'negative',
    });

    // Alternative 2: Minimal AI adoption
    alternatives.push({
      option: 'Minimal AI Tool Adoption',
      pros: ['Low disruption', 'Quick implementation', 'Immediate value'],
      cons: [
        'Limited impact',
        'Partial benefits',
        'May not address key constraints',
      ],
      feasibility: 'high',
      impact: 'low',
    });

    // Alternative 3: Comprehensive AI enablement
    if (opportunities.length >= 3) {
      alternatives.push({
        option: 'Comprehensive AI Enablement Strategy',
        pros: [
          'Maximum productivity gains',
          'Strategic advantage',
          'Full constraint addressing',
        ],
        cons: [
          'Higher complexity',
          'Longer implementation',
          'Greater resource requirements',
        ],
        feasibility: this.assessComprehensiveFeasibility(analysisResults),
        impact: 'high',
      });
    }

    return alternatives;
  }

  /**
   * Define decision criteria
   */
  defineDecisionCriteria(analysisResults) {
    const { repositoryContext } = analysisResults;

    const criteria = [
      {
        criterion: 'Productivity Impact',
        weight: 0.3,
        description:
          'Potential to accelerate team productivity and product development',
        measurement: 'Development velocity metrics and team satisfaction',
      },
      {
        criterion: 'Implementation Feasibility',
        weight: 0.25,
        description:
          'Ability to implement within existing constraints and resources',
        measurement: 'Technical complexity and resource requirements',
      },
      {
        criterion: 'Team Adoption',
        weight: 0.2,
        description: 'Likelihood of successful team adoption and usage',
        measurement: 'Team readiness and change management factors',
      },
      {
        criterion: 'Scalability',
        weight: 0.15,
        description: 'Ability to scale with team and project growth',
        measurement: 'Growth accommodation and flexibility',
      },
      {
        criterion: 'Risk Profile',
        weight: 0.1,
        description: 'Level of risk associated with implementation',
        measurement: 'Security, compliance, and operational risks',
      },
    ];

    // Adjust weights based on team size
    if (repositoryContext.summary.teamSize.includes('small')) {
      criteria.find(c => c.criterion === 'Team Adoption').weight = 0.3;
      criteria.find(c => c.criterion === 'Scalability').weight = 0.1;
    }

    return criteria;
  }

  /**
   * Analyze tradeoffs
   */
  analyzeTradeoffs(analysisResults) {
    return {
      speedVsQuality: {
        tradeoff: 'Rapid AI adoption vs. Thorough implementation',
        balance: 'Prioritize quick wins while establishing quality foundations',
        recommendation: 'Start with low-effort, high-impact opportunities',
      },
      costVsBenefit: {
        tradeoff: 'AI tool costs vs. productivity benefits',
        balance: 'Focus on free and open-source tools initially',
        recommendation: 'Demonstrate value before investing in premium tools',
      },
      disruptionVsStability: {
        tradeoff: 'Workflow disruption vs. long-term stability',
        balance: 'Minimize disruption through gradual implementation',
        recommendation: 'Use pilot programs and team champions',
      },
      flexibilityVsStandardization: {
        tradeoff: 'Tool flexibility vs. process standardization',
        balance: 'Establish standards while allowing tool flexibility',
        recommendation: 'Standardize processes, allow tool experimentation',
      },
    };
  }

  /**
   * Assess risks
   */
  assessRisks(analysisResults) {
    const risks = [];
    const { constraints, repositoryContext } = analysisResults;

    // Implementation risks
    risks.push({
      category: 'implementation',
      risk: 'Low team adoption',
      probability: this.assessProbability(repositoryContext),
      impact: 'medium',
      mitigation: 'Comprehensive training and team involvement in selection',
    });

    // Technical risks
    risks.push({
      category: 'technical',
      risk: 'AI tool integration issues',
      probability: 'medium',
      impact: 'medium',
      mitigation: 'Thorough testing and gradual rollout',
    });

    // Constraint risks
    if (constraints.summary.highSeverityConstraints > 0) {
      risks.push({
        category: 'constraint',
        risk: 'Constraint violations',
        probability: 'medium',
        impact: 'high',
        mitigation: 'Early security and compliance review',
      });
    }

    // Productivity risks
    risks.push({
      category: 'productivity',
      risk: 'Initial productivity decrease',
      probability: 'high',
      impact: 'low',
      mitigation: 'Parallel operation during transition period',
    });

    return risks;
  }

  /**
   * Define success metrics
   */
  defineSuccessMetrics(analysisResults) {
    const { repositoryContext } = analysisResults;

    const metrics = [
      {
        category: 'productivity',
        metric: 'Development Velocity',
        target: '20% increase in commits per week',
        measurement: 'Git commit frequency and PR merge rate',
      },
      {
        category: 'quality',
        metric: 'Code Quality',
        target: '15% reduction in bug density',
        measurement: 'Bug reports and code review findings',
      },
      {
        category: 'adoption',
        metric: 'AI Tool Usage',
        target: '80% team adoption within 3 months',
        measurement: 'Tool usage analytics and team surveys',
      },
      {
        category: 'satisfaction',
        metric: 'Team Satisfaction',
        target: '4.0/5.0 satisfaction score',
        measurement: 'Regular team satisfaction surveys',
      },
    ];

    // Add team-specific metrics
    if (repositoryContext.summary.teamSize.includes('large')) {
      metrics.push({
        category: 'scaling',
        metric: 'Cross-team Impact',
        target: 'Adoption by 2+ additional teams',
        measurement: 'Inter-team collaboration and knowledge sharing',
      });
    }

    return metrics;
  }

  /**
   * Define implementation strategy
   */
  defineImplementationStrategy(analysisResults) {
    const { constraints, repositoryContext } = analysisResults;

    const strategy = {
      approach: this.determineStrategicApproach(analysisResults),
      methodology: this.determineMethodology(analysisResults),
      governance: this.defineGovernance(analysisResults),
      communication: this.defineCommunication(analysisResults),
      training: this.defineTraining(analysisResults),
      support: this.defineSupport(analysisResults),
    };

    return strategy;
  }

  /**
   * Define implementation phases
   */
  defineImplementationPhases(analysisResults) {
    const phases = [];

    // Phase 1: Foundation
    phases.push({
      phase: 1,
      name: 'Foundation Setup',
      duration: '2-4 weeks',
      objectives: [
        'Establish AI tool infrastructure',
        'Configure development environment',
        'Set up monitoring and metrics',
      ],
      deliverables: [
        'AI tool configurations',
        'Development environment setup',
        'Initial metrics dashboard',
      ],
      risks: ['Tool compatibility issues', 'Environment setup complexity'],
      successCriteria: ['Tools operational', 'Team access enabled'],
    });

    // Phase 2: Pilot Implementation
    phases.push({
      phase: 2,
      name: 'Pilot Implementation',
      duration: '4-6 weeks',
      objectives: [
        'Implement core AI workflows',
        'Train pilot team members',
        'Validate tool effectiveness',
      ],
      deliverables: [
        'Pilot team workflows',
        'Training materials',
        'Effectiveness validation report',
      ],
      risks: ['Low adoption', 'Tool effectiveness issues'],
      successCriteria: [
        'Pilot team adoption > 70%',
        'Productivity gains demonstrated',
      ],
    });

    // Phase 3: Team Rollout
    phases.push({
      phase: 3,
      name: 'Team Rollout',
      duration: '6-8 weeks',
      objectives: [
        'Roll out to entire team',
        'Optimize workflows',
        'Establish best practices',
      ],
      deliverables: [
        'Full team implementation',
        'Optimized workflows',
        'Best practices documentation',
      ],
      risks: ['Scaling issues', 'Workflow optimization challenges'],
      successCriteria: ['100% team adoption', 'Productivity targets met'],
    });

    // Phase 4: Optimization
    phases.push({
      phase: 4,
      name: 'Optimization and Scaling',
      duration: '4-6 weeks',
      objectives: [
        'Optimize AI tool usage',
        'Scale to other teams',
        'Establish continuous improvement',
      ],
      deliverables: [
        'Optimization recommendations',
        'Scaling plan',
        'Continuous improvement process',
      ],
      risks: ['Optimization diminishing returns', 'Scaling resistance'],
      successCriteria: ['Optimization metrics achieved', 'Scaling initiated'],
    });

    return phases;
  }

  /**
   * Create timeline
   */
  createTimeline(analysisResults) {
    const phases = this.defineImplementationPhases(analysisResults);
    const timeline = [];

    let currentDate = new Date();

    phases.forEach(phase => {
      const startDate = new Date(currentDate);
      const durationWeeks = parseInt(phase.duration.split('-')[1]);
      currentDate.setDate(currentDate.getDate() + durationWeeks * 7);
      const endDate = new Date(currentDate);

      timeline.push({
        phase: phase.phase,
        name: phase.name,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        duration: phase.duration,
        keyMilestones: phase.objectives,
      });
    });

    return timeline;
  }

  /**
   * Identify required resources
   */
  identifyRequiredResources(analysisResults) {
    const resources = {
      human: this.identifyHumanResources(analysisResults),
      technical: this.identifyTechnicalResources(analysisResults),
      financial: this.identifyFinancialResources(analysisResults),
      infrastructure: this.identifyInfrastructureResources(analysisResults),
    };

    return resources;
  }

  /**
   * Identify dependencies
   */
  identifyDependencies(analysisResults) {
    const dependencies = [];

    // Technical dependencies
    dependencies.push({
      type: 'technical',
      dependency: 'Development environment access',
      required: true,
      availability: 'high',
      mitigation: 'Ensure proper access permissions',
    });

    // Team dependencies
    dependencies.push({
      type: 'team',
      dependency: 'Team buy-in and participation',
      required: true,
      availability: 'medium',
      mitigation: 'Early involvement and benefit communication',
    });

    // Tool dependencies
    dependencies.push({
      type: 'tool',
      dependency: 'AI tool availability and licensing',
      required: true,
      availability: 'high',
      mitigation: 'Free tool alternatives and procurement planning',
    });

    return dependencies;
  }

  /**
   * Define milestones
   */
  defineMilestones(analysisResults) {
    return [
      {
        milestone: 'AI Tools Operational',
        date: 'Week 2',
        description: 'AI tools installed, configured, and accessible',
        success: 'Team can access and use AI tools',
        owner: 'Infrastructure Lead',
      },
      {
        milestone: 'Pilot Team Trained',
        date: 'Week 6',
        description: 'Pilot team members trained and using AI tools',
        success: 'Pilot team adoption > 70%',
        owner: 'Team Lead',
      },
      {
        milestone: 'Productivity Gains Demonstrated',
        date: 'Week 10',
        description: 'Measurable productivity improvements observed',
        success: '20% increase in development velocity',
        owner: 'AI Enablement Lead',
      },
      {
        milestone: 'Full Team Adoption',
        date: 'Week 16',
        description: 'Entire team using AI tools effectively',
        success: '100% team adoption',
        owner: 'Team Lead',
      },
    ];
  }

  /**
   * Define checkpoints
   */
  defineCheckpoints(analysisResults) {
    return [
      {
        checkpoint: 'Week 2 Review',
        focus: 'Infrastructure and tool setup',
        participants: ['Infrastructure Lead', 'AI Enablement Lead'],
        criteria: ['Tools operational', 'Access verified'],
        actions: ['Address setup issues', 'Adjust configuration'],
      },
      {
        checkpoint: 'Week 6 Review',
        focus: 'Pilot implementation progress',
        participants: ['Team Lead', 'Pilot Team Members'],
        criteria: ['Adoption rates', 'Initial feedback'],
        actions: ['Address adoption barriers', 'Optimize workflows'],
      },
      {
        checkpoint: 'Week 12 Review',
        focus: 'Team rollout effectiveness',
        participants: ['All Team Members', 'Management'],
        criteria: ['Productivity metrics', 'Satisfaction scores'],
        actions: ['Scale successful practices', 'Address issues'],
      },
    ];
  }

  /**
   * Identify positive outcomes
   */
  identifyPositiveOutcomes(analysisResults) {
    const outcomes = [];

    // Productivity outcomes
    outcomes.push({
      category: 'productivity',
      outcome: 'Increased Development Velocity',
      description: 'Faster feature development and code delivery',
      timeline: '3-6 months',
      measurement: 'Commits per week, PR merge rate',
    });

    // Quality outcomes
    outcomes.push({
      category: 'quality',
      outcome: 'Improved Code Quality',
      description: 'Better code consistency and fewer bugs',
      timeline: '2-4 months',
      measurement: 'Bug density, code review findings',
    });

    // Team outcomes
    outcomes.push({
      category: 'team',
      outcome: 'Enhanced Team Capabilities',
      description: 'Team develops AI-augmented development skills',
      timeline: '4-8 months',
      measurement: 'Skill assessments, satisfaction surveys',
    });

    return outcomes;
  }

  /**
   * Identify negative consequences
   */
  identifyNegativeConsequences(analysisResults) {
    const consequences = [];

    // Learning curve
    consequences.push({
      category: 'productivity',
      consequence: 'Initial Productivity Dip',
      description: 'Temporary decrease in productivity during learning phase',
      timeline: '2-4 weeks',
      severity: 'low',
      mitigation: 'Parallel operation and training support',
    });

    // Tool dependency
    consequences.push({
      category: 'dependency',
      consequence: 'AI Tool Dependency',
      description: 'Increased dependency on AI tools and services',
      timeline: '6-12 months',
      severity: 'medium',
      mitigation: 'Tool diversification and fallback processes',
    });

    return consequences;
  }

  /**
   * Identify neutral effects
   */
  identifyNeutralEffects(analysisResults) {
    return [
      {
        effect: 'Shift in Development Practices',
        description: 'Changes in how team approaches development tasks',
        impact: 'Process adaptation required',
        timeline: 'Ongoing',
      },
      {
        effect: 'Increased Tool Management',
        description: 'More tools to manage and maintain',
        impact: 'Additional overhead',
        timeline: 'Ongoing',
      },
    ];
  }

  /**
   * Develop mitigation strategies
   */
  developMitigationStrategies(analysisResults) {
    return [
      {
        risk: 'Low Team Adoption',
        strategy: 'Comprehensive Change Management',
        tactics: [
          'Early team involvement in tool selection',
          'Regular training and support sessions',
          'Champion program for peer support',
          'Clear benefit communication',
        ],
      },
      {
        risk: 'Technical Integration Issues',
        strategy: 'Gradual Implementation with Testing',
        tactics: [
          'Pilot testing before full rollout',
          'Parallel operation during transition',
          'Rollback plans and procedures',
          'Technical support and monitoring',
        ],
      },
      {
        risk: 'Productivity Loss',
        strategy: 'Phased Rollout with Support',
        tactics: [
          'Gradual feature introduction',
          'Extended training period',
          'Productivity monitoring and adjustment',
          'Success celebration and recognition',
        ],
      },
    ];
  }

  /**
   * Assess long-term impact
   */
  assessLongTermImpact(analysisResults) {
    return {
      strategic: {
        impact: 'Enhanced Development Capability',
        description:
          'Team becomes more effective and efficient through AI augmentation',
        timeframe: '12-24 months',
        confidence: 'high',
      },
      competitive: {
        impact: 'Competitive Advantage',
        description: 'AI-enabled development provides market differentiation',
        timeframe: '18-36 months',
        confidence: 'medium',
      },
      organizational: {
        impact: 'Cultural Transformation',
        description: 'Shift toward AI-augmented work culture',
        timeframe: '24-48 months',
        confidence: 'medium',
      },
    };
  }

  /**
   * Assess scalability
   */
  assessScalability(analysisResults) {
    const { repositoryContext } = analysisResults;
    const teamSize = repositoryContext.summary.teamSize;

    return {
      currentCapacity: teamSize,
      scalingPotential: this.assessScalingPotential(teamSize),
      scalingChallenges: this.identifyScalingChallenges(teamSize),
      scalingRequirements: this.identifyScalingRequirements(teamSize),
    };
  }

  /**
   * Assess maintainability
   */
  assessMaintainability(analysisResults) {
    return {
      complexity: 'medium',
      maintenanceRequirements: [
        'Regular tool updates and monitoring',
        'Continuous training and onboarding',
        'Process optimization and refinement',
        'Metrics tracking and adjustment',
      ],
      maintenanceEffort: 'low-to-medium',
      sustainability: 'high',
    };
  }

  /**
   * Extract code snippets from artifacts
   */
  extractCodeSnippets(artifacts) {
    const vscodeArtifacts = artifacts.find(a => a.type === 'vscode-snippets');
    return vscodeArtifacts ? vscodeArtifacts.content.snippets : {};
  }

  /**
   * Extract configurations from artifacts
   */
  extractConfigurations(artifacts) {
    const configArtifacts = artifacts.find(a => a.type === 'configuration');
    return configArtifacts ? configArtifacts.content : {};
  }

  /**
   * Extract workflows from artifacts
   */
  extractWorkflows(artifacts) {
    const githubArtifacts = artifacts.find(a => a.type === 'github-actions');
    return githubArtifacts ? githubArtifacts.content : {};
  }

  /**
   * Extract templates from artifacts
   */
  extractTemplates(artifacts) {
    const templateArtifacts = artifacts.find(
      a => a.type === 'prompt-templates'
    );
    return templateArtifacts ? templateArtifacts.content : {};
  }

  /**
   * Extract documentation from artifacts
   */
  extractDocumentation(artifacts) {
    const docArtifacts = artifacts.find(a => a.type === 'documentation');
    return docArtifacts ? docArtifacts.content : {};
  }

  /**
   * Extract tools from artifacts
   */
  extractTools(artifacts) {
    return artifacts.map(artifact => ({
      name: artifact.name,
      type: artifact.type,
      description: artifact.description,
    }));
  }

  /**
   * Save ADR to file
   */
  async saveADR(adr) {
    const docsDir = path.join(this.repositoryPath, 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const filename = `${adr.metadata.id}-${adr.metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    const filePath = path.join(docsDir, filename);

    const content = this.formatADRAsMarkdown(adr);
    fs.writeFileSync(filePath, content, 'utf8');

    return filePath;
  }

  /**
   * Format ADR as Markdown
   */
  formatADRAsMarkdown(adr) {
    const {
      metadata,
      context,
      decision,
      implementation,
      consequences,
      artifacts,
      nextSteps,
    } = adr;

    return `# ${metadata.id}: ${metadata.title}

**Status:** ${metadata.status}  
**Date:** ${metadata.date}  
**Authors:** ${metadata.authors.map(a => a.name).join(', ')}  
**Reviewers:** ${metadata.reviewers.map(r => r.name).join(', ')}  
**Priority:** ${metadata.priority}  
**Impact:** ${metadata.impact}  
**Tags:** ${metadata.tags.join(', ')}

## Context

### Repository Profile
- **Technology:** ${context.repositoryProfile.technology}
- **Framework:** ${context.repositoryProfile.framework}
- **Team Size:** ${context.repositoryProfile.teamSize}
- **Maturity:** ${context.repositoryProfile.maturity}
- **Development Velocity:** ${context.repositoryProfile.developmentVelocity}

### AI Readiness Assessment
- **Score:** ${context.aiReadiness.score}/100
- **Level:** ${context.aiReadiness.level}
- **Strengths:** ${(context.aiReadiness.strengths || []).join(', ')}
- **Gaps:** ${(context.aiReadiness.gaps || []).join(', ')}

### Constraint Landscape
- **Total Constraints:** ${context.constraintLandscape.totalConstraints}
- **High Severity:** ${context.constraintLandscape.highSeverityConstraints}
- **Most Restrictive:** ${context.constraintLandscape.mostRestrictiveCategory}
- **Feasibility:** ${context.constraintLandscape.aiAdoptionFeasibility}

### Key Constraints
${context.constraintLandscape.keyConstraints
  .map(
    constraint =>
      `- **${constraint.type}** (${constraint.severity}): ${constraint.impact.join(', ')}`
  )
  .join('\n')}

### Primary Opportunities
${context.opportunityAssessment.primaryOpportunities
  .map(
    (opportunity, index) =>
      `${index + 1}. **${opportunity.title}** - ${opportunity.impact} impact, ${opportunity.effort} effort`
  )
  .join('\n')}

### Business Context
- **Product Stage:** ${context.businessContext.productStage}
- **Growth Phase:** ${context.businessContext.growthPhase}
- **Market Position:** ${context.businessContext.marketPosition}
- **Business Goals:** ${(context.businessContext.businessGoals || []).join(', ')}

### Team Context
- **Team Maturity:** ${context.teamContext.teamMaturity}
- **Collaboration Style:** ${context.teamContext.collaborationStyle}
- **Learning Culture:** ${context.teamContext.learningCulture}
- **Change Readiness:** ${context.teamContext.changeReadiness}

## Decision

### Primary Decision
${decision.primaryDecision.statement}

**Approach:** ${decision.primaryDecision.approach}  
**Scope:** ${decision.primaryDecision.scope}  
**Timeline:** ${decision.primaryDecision.timeline}

### Rationale
${decision.rationale
  .map(
    item =>
      `**${item.factor}:** ${item.reasoning}\n- Evidence: ${Array.isArray(item.evidence) ? item.evidence.join(', ') : item.evidence}`
  )
  .join('\n\n')}

### Alternatives Considered
${decision.alternatives
  .map(
    alt =>
      `#### ${alt.option}
- **Pros:** ${(alt.props || []).join(', ')}
- **Cons:** ${(alt.cons || []).join(', ')}
- **Feasibility:** ${alt.feasibility}
- **Impact:** ${alt.impact}`
  )
  .join('\n\n')}

### Decision Criteria
${decision.decisionCriteria
  .map(
    criteria =>
      `- **${criteria.criterion}** (Weight: ${criteria.weight}): ${criteria.description}`
  )
  .join('\n')}

### Tradeoffs Analysis
${Object.entries(decision.tradeoffs)
  .map(
    ([key, tradeoff]) =>
      `#### ${tradeoff.tradeoff}
- **Balance:** ${tradeoff.balance}
- **Recommendation:** ${tradeoff.recommendation}`
  )
  .join('\n\n')}

### Risk Assessment
${decision.riskAssessment
  .map(
    risk =>
      `- **${risk.category.charAt(0).toUpperCase() + risk.category.slice(1)} Risk:** ${risk.risk} (Probability: ${risk.probability}, Impact: ${risk.impact})\n  - Mitigation: ${risk.mitigation}`
  )
  .join('\n')}

### Success Metrics
${decision.successMetrics
  .map(
    metric =>
      `- **${metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}:** ${metric.metric}\n  - Target: ${metric.target}\n  - Measurement: ${metric.measurement}`
  )
  .join('\n')}

## Implementation

### Implementation Strategy
- **Approach:** ${implementation.implementationStrategy.approach}
- **Methodology:** ${implementation.implementationStrategy.methodology}
- **Governance:** ${implementation.implementationStrategy.governance}

### Implementation Phases
${implementation.phases
  .map(
    phase =>
      `#### Phase ${phase.phase}: ${phase.name} (${phase.duration})
**Objectives:**
${phase.objectives.map(obj => `- ${obj}`).join('\n')}

**Deliverables:**
${phase.deliverables.map(deliverable => `- ${deliverable}`).join('\n')}

**Success Criteria:**
${phase.successCriteria.map(criteria => `- ${criteria}`).join('\n')}

**Risks:**
${phase.risks.map(risk => `- ${risk}`).join('\n')}
`
  )
  .join('\n')}

### Timeline
${implementation.timeline
  .map(
    item =>
      `**Phase ${item.phase}:** ${item.name} (${item.startDate} - ${item.endDate})`
  )
  .join('\n')}

### Required Resources
#### Human Resources
${implementation.resources.human.map(resource => `- **${resource.role}:** ${resource.description}`).join('\n')}

#### Technical Resources
${implementation.resources.technical.map(resource => `- **${resource.name}:** ${resource.description}`).join('\n')}

#### Financial Resources
${implementation.resources.financial.map(resource => `- **${resource.category}:** ${resource.amount}`).join('\n')}

### Dependencies
${implementation.dependencies
  .map(
    dep =>
      `- **${dep.type.charAt(0).toUpperCase() + dep.type.slice(1)}:** ${dep.dependency} (Required: ${dep.required}, Availability: ${dep.availability})`
  )
  .join('\n')}

### Milestones
${implementation.milestones
  .map(
    milestone =>
      `#### ${milestone.milestone}: ${milestone.date}
- **Description:** ${milestone.description}
- **Success:** ${milestone.success}
- **Owner:** ${milestone.owner}`
  )
  .join('\n')}

### Checkpoints
${implementation.checkpoints
  .map(
    checkpoint =>
      `#### ${checkpoint.checkpoint}
- **Focus:** ${checkpoint.focus}
- **Participants:** ${checkpoint.participants.join(', ')}
- **Criteria:** ${checkpoint.criteria.join(', ')}
- **Actions:** ${checkpoint.actions.join(', ')}`
  )
  .join('\n')}

## Consequences

### Positive Outcomes
${consequences.positiveOutcomes
  .map(
    outcome =>
      `#### ${outcome.category.charAt(0).toUpperCase() + outcome.category.slice(1)}: ${outcome.outcome}
- **Description:** ${outcome.description}
- **Timeline:** ${outcome.timeline}
- **Measurement:** ${outcome.measurement}`
  )
  .join('\n')}

### Negative Consequences
${consequences.negativeConsequences
  .map(
    consequence =>
      `#### ${consequence.category.charAt(0).toUpperCase() + consequence.category.slice(1)}: ${consequence.consequence}
- **Description:** ${consequence.description}
- **Timeline:** ${consequence.timeline}
- **Severity:** ${consequence.severity}
- **Mitigation:** ${consequence.mitigation}`
  )
  .join('\n')}

### Neutral Effects
${consequences.neutralEffects
  .map(
    effect =>
      `#### ${effect.effect}
- **Description:** ${effect.description}
- **Impact:** ${effect.impact}
- **Timeline:** ${effect.timeline}`
  )
  .join('\n')}

### Mitigation Strategies
${consequences.mitigationStrategies
  .map(
    strategy =>
      `#### ${strategy.risk}
- **Strategy:** ${strategy.strategy}
- **Tactics:** ${strategy.tactics.map(tactic => `- ${tactic}`).join('\n')}`
  )
  .join('\n')}

### Long-term Impact
${Object.entries(consequences.longTermImpact)
  .map(
    ([area, impact]) =>
      `#### ${area.charAt(0).toUpperCase() + area.slice(1)} Impact
- **Impact:** ${impact.impact}
- **Timeframe:** ${impact.timeframe}
- **Confidence:** ${impact.confidence}`
  )
  .join('\n')}

### Scalability Assessment
- **Current Capacity:** ${consequences.scalability.currentCapacity}
- **Scaling Potential:** ${consequences.scalability.scalingPotential}
- **Scaling Challenges:** ${(consequences.scalability.scalingChallenges || []).join(', ')}
- **Scaling Requirements:** ${(consequences.scalability.scalingRequirements || []).join(', ')}

### Maintainability Assessment
- **Complexity:** ${consequences.maintainability.complexity}
- **Maintenance Effort:** ${consequences.maintainability.maintenanceEffort}
- **Sustainability:** ${consequences.maintainability.sustainability}
- **Requirements:** ${(consequences.maintainability.maintenanceRequirements || []).join(', ')}

## Implementation Artifacts

### Code Snippets
${Object.entries(artifacts.codeSnippets)
  .map(
    ([name, snippet]) =>
      `#### ${name}
\`\`\`${snippet.language || 'javascript'}
${snippet.body || snippet}
\`\`\``
  )
  .join('\n')}

### Configurations
${Object.entries(artifacts.configurations)
  .map(
    ([name, config]) =>
      `#### ${name}
\`\`\`json
${JSON.stringify(config, null, 2)}
\`\`\``
  )
  .join('\n')}

### Workflows
${Object.entries(artifacts.workflows)
  .map(
    ([name, workflow]) =>
      `#### ${name}
\`\`\`yaml
${typeof workflow === 'string' ? workflow : JSON.stringify(workflow, null, 2)}
\`\`\``
  )
  .join('\n')}

### Templates
${Object.entries(artifacts.templates)
  .map(
    ([name, template]) =>
      `#### ${name}
\`\`\`
${template}
\`\`\``
  )
  .join('\n')}

### Documentation
${Object.entries(artifacts.documentation)
  .map(
    ([name, doc]) =>
      `#### ${name}
${doc.title || name}

${doc.sections ? doc.sections.map(section => `- ${section}`).join('\n') : doc.content || ''}`
  )
  .join('\n')}

## Next Steps

### Immediate Actions
${nextSteps.immediateActions
  .map(
    action =>
      `- **${action.action}:** ${action.description} (Owner: ${action.owner}, Due: ${action.dueDate})`
  )
  .join('\n')}

### Short-term Goals
${nextSteps.shortTermGoals
  .map(
    goal => `- **${goal.goal}:** ${goal.description} (Target: ${goal.target})`
  )
  .join('\n')}

### Long-term Objectives
${nextSteps.longTermObjectives
  .map(
    objective =>
      `- **${objective.objective}:** ${objective.description} (Timeframe: ${objective.timeframe})`
  )
  .join('\n')}

### Success Indicators
${nextSteps.successIndicators
  .map(
    indicator =>
      `- **${indicator.indicator}:** ${indicator.description} (Target: ${indicator.target})`
  )
  .join('\n')}

### Review Points
${nextSteps.reviewPoints
  .map(
    review =>
      `- **${review.review}:** ${review.description} (Date: ${review.date}, Participants: ${review.participants.join(', ')})`
  )
  .join('\n')}

### Adjustment Triggers
${nextSteps.adjustmentTriggers
  .map(
    trigger =>
      `- **${trigger.trigger}:** ${trigger.description} (Action: ${trigger.action})`
  )
  .join('\n')}

---

**Generated by:** AI Enablement Intelligence  
**Generated on:** ${new Date().toISOString()}  
**Version:** 1.0
`;
  }

  // Helper methods for context assessment
  inferProductStage(repositoryContext) {
    const age = repositoryContext.summary.repositoryAge;
    const velocity = repositoryContext.summary.developmentVelocity;

    if (age.includes('new') || age.includes('young')) {
      return 'early-stage';
    } else if (velocity === 'high') {
      return 'growth';
    } else if (age.includes('established')) {
      return 'mature';
    }

    return 'unknown';
  }

  inferGrowthPhase(repositoryContext) {
    const velocity = repositoryContext.summary.developmentVelocity;
    const teamSize = repositoryContext.summary.teamSize;

    if (velocity === 'high' && teamSize.includes('small')) {
      return 'rapid-growth';
    } else if (velocity === 'medium') {
      return 'steady-growth';
    } else if (velocity === 'low') {
      return 'maintenance';
    }

    return 'unknown';
  }

  inferMarketPosition(repositoryContext) {
    const techStack = repositoryContext.technologyStack;
    const modernTech = ['react', 'vue', 'angular', 'typescript', 'python'];

    const hasModernTech =
      techStack.languages.some(lang => modernTech.includes(lang)) ||
      techStack.frameworks.some(fw => modernTech.includes(fw));

    if (hasModernTech) {
      return 'modern';
    } else if (
      techStack.languages.includes('java') ||
      techStack.languages.includes('csharp')
    ) {
      return 'enterprise';
    }

    return 'traditional';
  }

  inferBusinessGoals(repositoryContext) {
    const goals = [];
    const velocity = repositoryContext.summary.developmentVelocity;

    if (velocity === 'high') {
      goals.push('rapid-innovation');
    }

    if (repositoryContext.developmentMaturity.testing.maturity !== 'none') {
      goals.push('quality-focus');
    }

    if (repositoryContext.developmentMaturity.ciCd.present) {
      goals.push('operational-excellence');
    }

    return goals.length > 0 ? goals : ['product-development'];
  }

  identifySuccessFactors(repositoryContext) {
    const factors = [];

    if (repositoryContext.aiReadiness.readiness === 'high') {
      factors.push('ai-readiness');
    }

    if (repositoryContext.developmentMaturity.ciCd.present) {
      factors.push('automation-capability');
    }

    if (repositoryContext.summary.teamSize.includes('small')) {
      factors.push('agility');
    }

    return factors;
  }

  assessTeamMaturity(repositoryContext) {
    const { developmentMaturity, teamPatterns } = repositoryContext;

    let score = 0;
    if (developmentMaturity.testing.maturity !== 'none') score++;
    if (developmentMaturity.ciCd.present) score++;
    if (developmentMaturity.codeQuality.maturity !== 'none') score++;
    if (teamPatterns.collaborationLevel === 'high') score++;

    if (score >= 3) return 'high';
    if (score >= 2) return 'medium';
    return 'developing';
  }

  assessCollaborationStyle(repositoryContext) {
    const { teamPatterns } = repositoryContext;

    if (teamPatterns.collaborationLevel === 'high') {
      return 'highly-collaborative';
    } else if (teamPatterns.collaborationLevel === 'medium') {
      return 'moderately-collaborative';
    }

    return 'individual-focused';
  }

  assessLearningCulture(repositoryContext) {
    const { developmentMaturity } = repositoryContext;

    if (developmentMaturity.documentation.maturity === 'comprehensive') {
      return 'learning-oriented';
    } else if (developmentMaturity.documentation.maturity === 'basic') {
      return 'learning-emerging';
    }

    return 'task-focused';
  }

  assessChangeReadiness(repositoryContext) {
    const { teamPatterns, aiReadiness } = repositoryContext;

    if (
      aiReadiness.readiness === 'high' &&
      teamPatterns.collaborationLevel === 'high'
    ) {
      return 'high';
    } else if (aiReadiness.readiness === 'medium') {
      return 'medium';
    }

    return 'cautious';
  }

  assessTechnicalDepth(repositoryContext) {
    const { technologyStack } = repositoryContext;

    const depth =
      technologyStack.languages.length +
      technologyStack.frameworks.length +
      technologyStack.testingFrameworks.length;

    if (depth >= 4) return 'deep';
    if (depth >= 2) return 'moderate';
    return 'basic';
  }

  determineStrategicApproach(analysisResults) {
    const { constraints } = analysisResults;

    if (constraints.summary.aiAdoptionFeasibility === 'low') {
      return 'constraint-mitigation-first';
    } else if (constraints.summary.totalConstraints <= 2) {
      return 'opportunity-first';
    }

    return 'balanced-approach';
  }

  determineMethodology(analysisResults) {
    const { repositoryContext } = analysisResults;
    const teamSize = repositoryContext.summary.teamSize;

    if (teamSize.includes('small')) {
      return 'agile-iteration';
    } else if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      return 'phased-rollout';
    }

    return 'incremental-adoption';
  }

  defineGovernance(analysisResults) {
    const { constraints } = analysisResults;

    const governance = {
      decisionMaking: 'team-consensus',
      reviewProcess: 'peer-review',
      approvalRequired: false,
    };

    if (constraints.summary.highSeverityConstraints > 0) {
      governance.approvalRequired = true;
      governance.reviewProcess = 'formal-review';
    }

    return governance;
  }

  defineCommunication(analysisResults) {
    return {
      frequency: 'weekly',
      format: 'standup-meeting',
      stakeholders: ['development-team', 'team-lead'],
      channels: ['team-meetings', 'slack', 'documentation'],
    };
  }

  defineTraining(analysisResults) {
    return {
      approach: 'hands-on-workshop',
      duration: '2-days',
      materials: ['user-guides', 'video-tutorials', 'best-practices'],
      followup: 'weekly-office-hours',
    };
  }

  defineSupport(analysisResults) {
    return {
      channels: ['slack', 'office-hours', 'documentation'],
      responseTime: '24-hours',
      escalation: 'team-lead',
      resources: ['knowledge-base', 'peer-support'],
    };
  }

  assessProbability(repositoryContext) {
    const { teamPatterns, aiReadiness } = repositoryContext;

    if (
      aiReadiness.readiness === 'high' &&
      teamPatterns.collaborationLevel === 'high'
    ) {
      return 'low';
    } else if (aiReadiness.readiness === 'medium') {
      return 'medium';
    }

    return 'high';
  }

  assessComprehensiveFeasibility(analysisResults) {
    const { constraints, repositoryContext } = analysisResults;

    let score = 3; // Base score

    // High constraints reduce feasibility
    if (constraints.summary.highSeverityConstraints >= 2) score -= 2;
    else if (constraints.summary.highSeverityConstraints >= 1) score -= 1;

    // High AI readiness increases feasibility
    if (repositoryContext.aiReadiness.readiness === 'high') score += 1;
    else if (repositoryContext.aiReadiness.readiness === 'low') score -= 1;

    if (score >= 3) return 'high';
    if (score >= 2) return 'medium';
    return 'low';
  }

  identifyHumanResources(analysisResults) {
    const { repositoryContext } = analysisResults;
    const teamSize = repositoryContext.summary.teamSize;

    const resources = [
      {
        role: 'AI Enablement Lead',
        description: 'Overall strategy and implementation coordination',
        commitment: '50%',
      },
      {
        role: 'Technical Lead',
        description: 'Technical implementation and tool integration',
        commitment: '25%',
      },
    ];

    if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      resources.push(
        {
          role: 'Training Coordinator',
          description: 'Team training and onboarding',
          commitment: '25%',
        },
        {
          role: 'Security Reviewer',
          description: 'Security and compliance oversight',
          commitment: '10%',
        }
      );
    }

    return resources;
  }

  identifyTechnicalResources(analysisResults) {
    return [
      {
        name: 'Development Environment',
        description: 'AI tool-compatible development setup',
      },
      {
        name: 'Testing Infrastructure',
        description: 'Environment for testing AI-generated code',
      },
      { name: 'Monitoring Tools', description: 'Metrics and usage tracking' },
    ];
  }

  identifyFinancialResources(analysisResults) {
    const { constraints } = analysisResults;

    const resources = [
      {
        category: 'AI Tools',
        amount: constraints.external?.budgetConstraints?.detected?.freeToolsOnly
          ? '$0'
          : '$500-2000/month',
      },
      { category: 'Training', amount: '$1000-3000' },
      { category: 'Infrastructure', amount: '$200-1000' },
    ];

    return resources;
  }

  identifyInfrastructureResources(analysisResults) {
    return [
      { type: 'compute', description: 'Development and testing environments' },
      { type: 'storage', description: 'Code and artifact storage' },
      { type: 'network', description: 'AI tool connectivity and access' },
    ];
  }

  assessScalingPotential(teamSize) {
    if (teamSize.includes('small')) return 'high';
    if (teamSize.includes('medium')) return 'medium';
    if (teamSize.includes('large') || teamSize.includes('enterprise'))
      return 'low';
    return 'unknown';
  }

  identifyScalingChallenges(teamSize) {
    const challenges = [];

    if (teamSize.includes('small')) {
      challenges.push('Resource constraints during growth');
    }

    if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      challenges.push('Coordination complexity');
      challenges.push('Standardization requirements');
    }

    return challenges;
  }

  identifyScalingRequirements(teamSize) {
    const requirements = [];

    if (teamSize.includes('large') || teamSize.includes('enterprise')) {
      requirements.push('Standardized processes');
      requirements.push('Governance framework');
      requirements.push('Scalable infrastructure');
    }

    return requirements;
  }

  defineImmediateActions(analysisResults) {
    return [
      {
        action: 'Secure stakeholder approval',
        description: 'Get approval for AI enablement initiative',
        owner: 'Team Lead',
        dueDate: 'Week 1',
      },
      {
        action: 'Set up development environment',
        description: 'Configure AI tools and infrastructure',
        owner: 'Infrastructure Lead',
        dueDate: 'Week 2',
      },
      {
        action: 'Begin team training',
        description: 'Start team education on AI tools',
        owner: 'AI Enablement Lead',
        dueDate: 'Week 2',
      },
    ];
  }

  defineShortTermGoals(analysisResults) {
    return [
      {
        goal: 'AI tools operational',
        description: 'All AI tools installed and functioning',
        target: 'Week 3',
      },
      {
        goal: 'Pilot team trained',
        description: 'Pilot team members using AI tools effectively',
        target: 'Week 6',
      },
      {
        goal: 'Initial productivity gains',
        description: 'Measurable improvements in development velocity',
        target: 'Week 8',
      },
    ];
  }

  defineLongTermObjectives(analysisResults) {
    return [
      {
        objective: 'Full team adoption',
        description: 'Entire team using AI tools as part of standard workflow',
        timeframe: '6 months',
      },
      {
        objective: 'Productivity transformation',
        description:
          'Significant improvement in development productivity and quality',
        timeframe: '12 months',
      },
      {
        objective: 'AI enablement culture',
        description: 'AI-augmented development becomes team culture',
        timeframe: '18 months',
      },
    ];
  }

  defineSuccessIndicators(analysisResults) {
    return [
      {
        indicator: 'Tool usage rate',
        description: 'Percentage of team actively using AI tools',
        target: '>80%',
      },
      {
        indicator: 'Productivity gain',
        description: 'Increase in development velocity',
        target: '>20%',
      },
      {
        indicator: 'Quality improvement',
        description: 'Reduction in bug density',
        target: '>15%',
      },
      {
        indicator: 'Team satisfaction',
        description: 'Team satisfaction with AI tools',
        target: '>4.0/5.0',
      },
    ];
  }

  defineReviewPoints(analysisResults) {
    return [
      {
        review: 'Infrastructure setup review',
        description: 'Review tool installation and configuration',
        date: 'Week 2',
        participants: ['Infrastructure Lead', 'AI Enablement Lead'],
      },
      {
        review: 'Pilot progress review',
        description: 'Review pilot team progress and feedback',
        date: 'Week 6',
        participants: ['Team Lead', 'Pilot Team Members'],
      },
      {
        review: 'Full rollout review',
        description: 'Review full team implementation',
        date: 'Week 12',
        participants: ['All Team Members', 'Management'],
      },
    ];
  }

  defineAdjustmentTriggers(analysisResults) {
    return [
      {
        trigger: 'Low adoption rate',
        description: 'Team adoption below 60% after 4 weeks',
        action: 'Intensive training and support',
      },
      {
        trigger: 'Productivity decline',
        description: 'Development velocity decreases by >10%',
        action: 'Workflow adjustment and additional training',
      },
      {
        trigger: 'Tool integration issues',
        description: 'Technical problems with AI tools',
        action: 'Technical troubleshooting and tool replacement',
      },
    ];
  }
}

module.exports = AIEnablementADRGenerator;

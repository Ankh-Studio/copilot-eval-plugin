#!/usr/bin/env node

/**
 * Result Aggregator - Enterprise AI Adoption Audit
 *
 * Aggregates and synthesizes results from multiple analysis components
 * to create comprehensive insights and actionable recommendations.
 */

class ResultAggregator {
  constructor(options = {}) {
    this.options = {
      includeDetailedAnalysis: true,
      generateInsights: true,
      createActionItems: true,
      benchmarkAgainstIndustry: true,
      ...options,
    };

    this.aggregatedResults = null;
    this.insights = [];
    this.actionItems = [];
  }

  /**
   * Main aggregation method
   */
  async aggregateResults(
    technologyResults,
    copilotResults,
    maturityResults,
    pathSpecificResults = {}
  ) {
    console.log('🔄 Aggregating analysis results...');

    try {
      // Phase 1: Collect and normalize results
      const normalizedResults = this.normalizeResults(
        technologyResults,
        copilotResults,
        maturityResults,
        pathSpecificResults
      );

      // Phase 2: Identify patterns and correlations
      const patterns = this.identifyPatterns(normalizedResults);

      // Phase 3: Generate insights
      if (this.options.generateInsights) {
        this.insights = this.generateInsights(normalizedResults, patterns);
      }

      // Phase 4: Create action items
      if (this.options.createActionItems) {
        this.actionItems = this.createActionItems(
          normalizedResults,
          this.insights
        );
      }

      // Phase 5: Benchmark against industry
      const benchmarking = this.options.benchmarkAgainstIndustry
        ? this.performBenchmarking(normalizedResults)
        : null;

      // Phase 6: Synthesize final report
      this.aggregatedResults = this.synthesizeResults(
        normalizedResults,
        patterns,
        this.insights,
        this.actionItems,
        benchmarking
      );

      console.log('✅ Result aggregation completed');

      return this.aggregatedResults;
    } catch (error) {
      console.error('❌ Result aggregation failed:', error);
      throw error;
    }
  }

  /**
   * Phase 1: Normalize results
   */
  normalizeResults(
    technologyResults,
    copilotResults,
    maturityResults,
    pathSpecificResults
  ) {
    console.log('  📊 Normalizing results...');

    return {
      technology: this.normalizeTechnologyResults(technologyResults),
      copilot: this.normalizeCopilotResults(copilotResults),
      maturity: this.normalizeMaturityResults(maturityResults),
      pathSpecific: this.normalizePathSpecificResults(pathSpecificResults),
      metadata: this.extractMetadata(
        technologyResults,
        copilotResults,
        maturityResults
      ),
    };
  }

  normalizeTechnologyResults(results) {
    return {
      summary: results.summary,
      scores: results.scores,
      details: results.details,
      recommendations: results.recommendations,
      keyMetrics: {
        aiFriendlyLanguages: this.countAIFriendlyLanguages(
          results.details.languages
        ),
        aiLibraryCount: results.details.aiLibraries.length,
        aiServiceCount: results.details.aiServices.length,
        technologyReadiness: results.scores.technologyStack,
      },
      strengths: this.identifyTechnologyStrengths(results),
      weaknesses: this.identifyTechnologyWeaknesses(results),
      opportunities: this.identifyTechnologyOpportunities(results),
    };
  }

  normalizeCopilotResults(results) {
    return {
      summary: results.summary,
      scores: results.scores,
      details: results.details,
      maturity: results.maturity,
      recommendations: results.recommendations,
      keyMetrics: {
        configurationCompleteness: results.scores.configuration,
        customizationLevel: results.scores.customization,
        integrationDepth: results.scores.integration,
        teamAdoption: results.scores.adoption,
      },
      strengths: this.identifyCopilotStrengths(results),
      weaknesses: this.identifyCopilotWeaknesses(results),
      opportunities: this.identifyCopilotOpportunities(results),
    };
  }

  normalizeMaturityResults(results) {
    return {
      maturity: results.maturity,
      componentScores: results.componentScores,
      recommendations: results.recommendations,
      roadmap: results.roadmap,
      benchmarking: results.benchmarking,
      keyMetrics: {
        overallScore: results.maturity.overallScore,
        maturityLevel: results.maturity.level,
        readinessAssessment: results.maturity.readiness,
      },
      strengths: this.identifyMaturityStrengths(results),
      weaknesses: this.identifyMaturityWeaknesses(results),
      opportunities: this.identifyMaturityOpportunities(results),
    };
  }

  normalizePathSpecificResults(results) {
    const normalized = {};

    for (const [path, data] of Object.entries(results)) {
      normalized[path] = {
        path,
        data,
        keyFindings: this.extractPathKeyFindings(path, data),
        recommendations: this.extractPathRecommendations(path, data),
        effort: this.estimatePathEffort(path, data),
        impact: this.estimatePathImpact(path, data),
      };
    }

    return normalized;
  }

  extractMetadata(techResults, copilotResults, maturityResults) {
    return {
      timestamp: new Date().toISOString(),
      analysisTypes: ['technology', 'copilot', 'maturity'],
      dataPoints: this.countDataPoints(
        techResults,
        copilotResults,
        maturityResults
      ),
      confidence: this.calculateOverallConfidence(
        techResults,
        copilotResults,
        maturityResults
      ),
      completeness: this.assessDataCompleteness(
        techResults,
        copilotResults,
        maturityResults
      ),
    };
  }

  /**
   * Phase 2: Identify patterns and correlations
   */
  identifyPatterns(normalizedResults) {
    console.log('  🔍 Identifying patterns and correlations...');

    const patterns = {
      correlations: this.identifyCorrelations(normalizedResults),
      trends: this.identifyTrends(normalizedResults),
      anomalies: this.identifyAnomalies(normalizedResults),
      synergies: this.identifySynergies(normalizedResults),
      conflicts: this.identifyConflicts(normalizedResults),
    };

    return patterns;
  }

  identifyCorrelations(results) {
    const correlations = [];

    // Technology vs Copilot correlation
    const techCopilotCorr = this.calculateCorrelation(
      results.technology.scores.technologyStack,
      results.copilot.scores.configuration
    );

    if (Math.abs(techCopilotCorr) > 0.5) {
      correlations.push({
        type: 'positive',
        description:
          'Strong correlation between technology stack and Copilot configuration',
        strength: techCopilotCorr,
        components: ['technology', 'copilot'],
      });
    }

    // Governance vs Adoption correlation
    const govAdoptionCorr = this.calculateCorrelation(
      results.copilot.scores.governance,
      results.copilot.scores.adoption
    );

    if (Math.abs(govAdoptionCorr) > 0.5) {
      correlations.push({
        type: govAdoptionCorr > 0 ? 'positive' : 'negative',
        description: 'Governance framework impacts team adoption',
        strength: govAdoptionCorr,
        components: ['governance', 'adoption'],
      });
    }

    return correlations;
  }

  identifyTrends(results) {
    const trends = [];

    // Technology trends
    if (results.technology.keyMetrics.aiLibraryCount > 5) {
      trends.push({
        type: 'technology',
        description:
          'Strong AI library adoption indicates mature technical approach',
        direction: 'positive',
        confidence: 'high',
      });
    }

    // Copilot trends
    if (results.copilot.keyMetrics.customizationLevel > 60) {
      trends.push({
        type: 'copilot',
        description: 'Advanced Copilot customization shows sophisticated usage',
        direction: 'positive',
        confidence: 'high',
      });
    }

    // Maturity trends
    if (results.maturity.keyMetrics.overallScore > 70) {
      trends.push({
        type: 'maturity',
        description: 'High overall maturity indicates advanced AI adoption',
        direction: 'positive',
        confidence: 'high',
      });
    }

    return trends;
  }

  identifyAnomalies(results) {
    const anomalies = [];

    // High technology but low Copilot
    if (
      results.technology.keyMetrics.technologyReadiness > 70 &&
      results.copilot.keyMetrics.configurationCompleteness < 40
    ) {
      anomalies.push({
        type: 'gap',
        description:
          'Strong technology foundation but weak Copilot integration',
        severity: 'high',
        recommendation: 'Focus on Copilot configuration and adoption',
      });
    }

    // High governance but low adoption
    if (
      results.copilot.scores.governance > 70 &&
      results.copilot.scores.adoption < 40
    ) {
      anomalies.push({
        type: 'implementation',
        description: 'Comprehensive governance but low team adoption',
        severity: 'medium',
        recommendation: 'Improve change management and training',
      });
    }

    return anomalies;
  }

  identifySynergies(results) {
    const synergies = [];

    // Technology + Copilot synergy
    if (
      results.technology.keyMetrics.technologyReadiness > 60 &&
      results.copilot.keyMetrics.configurationCompleteness > 60
    ) {
      synergies.push({
        type: 'technical',
        description:
          'Strong technology and Copilot integration creates multiplier effect',
        impact: 'high',
        leverage: 'Accelerate AI adoption across organization',
      });
    }

    // Governance + Organization synergy
    if (
      results.maturity.componentScores.governance.score > 60 &&
      results.maturity.componentScores.organization.score > 60
    ) {
      synergies.push({
        type: 'organizational',
        description: 'Strong governance and team capabilities enable scaling',
        impact: 'high',
        leverage: 'Scale AI initiatives with confidence',
      });
    }

    return synergies;
  }

  identifyConflicts(results) {
    const conflicts = [];

    // Technology vs Infrastructure conflict
    if (
      results.technology.keyMetrics.technologyReadiness > 70 &&
      results.maturity.componentScores.infrastructure.score < 50
    ) {
      conflicts.push({
        type: 'resource',
        description:
          'Advanced technology capabilities limited by infrastructure',
        severity: 'high',
        resolution: 'Invest in infrastructure upgrades',
      });
    }

    return conflicts;
  }

  /**
   * Phase 3: Generate insights
   */
  generateInsights(normalizedResults, patterns) {
    console.log('  💡 Generating insights...');

    const insights = [];

    // Strategic insights
    insights.push(
      ...this.generateStrategicInsights(normalizedResults, patterns)
    );

    // Operational insights
    insights.push(
      ...this.generateOperationalInsights(normalizedResults, patterns)
    );

    // Tactical insights
    insights.push(
      ...this.generateTacticalInsights(normalizedResults, patterns)
    );

    // Risk insights
    insights.push(...this.generateRiskInsights(normalizedResults, patterns));

    return insights.sort((a, b) => b.impact - a.impact);
  }

  generateStrategicInsights(results, patterns) {
    const insights = [];

    // Maturity level insight
    const maturityLevel = results.maturity.keyMetrics.maturityLevel;
    insights.push({
      type: 'strategic',
      category: 'maturity',
      title: `Current AI Maturity: ${maturityLevel}`,
      description: `Organization operates at ${maturityLevel} maturity level with ${results.maturity.keyMetrics.overallScore}/100 score`,
      impact: this.assessInsightImpact('strategic', maturityLevel),
      confidence: 'high',
      actionability: 'high',
      implications: this.getMaturityImplications(maturityLevel),
    });

    // Strategic positioning insight
    const competitivePosition = this.assessCompetitivePosition(results);
    insights.push({
      type: 'strategic',
      category: 'positioning',
      title: `Competitive Position: ${competitivePosition.level}`,
      description: competitivePosition.description,
      impact: competitivePosition.impact,
      confidence: 'medium',
      actionability: 'medium',
      implications: competitivePosition.implications,
    });

    return insights;
  }

  generateOperationalInsights(results, patterns) {
    const insights = [];

    // Technology readiness insight
    const techReadiness = results.technology.keyMetrics.technologyReadiness;
    insights.push({
      type: 'operational',
      category: 'technology',
      title: `Technology Readiness: ${techReadiness}/100`,
      description: this.describeTechnologyReadiness(techReadiness),
      impact: this.assessInsightImpact('operational', techReadiness),
      confidence: 'high',
      actionability: 'high',
      implications: this.getTechnologyImplications(techReadiness),
    });

    // Copilot integration insight
    const copilotIntegration = results.copilot.keyMetrics.integrationDepth;
    insights.push({
      type: 'operational',
      category: 'copilot',
      title: `Copilot Integration: ${copilotIntegration}/100`,
      description: this.describeCopilotIntegration(copilotIntegration),
      impact: this.assessInsightImpact('operational', copilotIntegration),
      confidence: 'high',
      actionability: 'high',
      implications: this.getCopilotImplications(copilotIntegration),
    });

    return insights;
  }

  generateTacticalInsights(results, patterns) {
    const insights = [];

    // Quick wins insight
    const quickWins = this.identifyQuickWins(results);
    if (quickWins.length > 0) {
      insights.push({
        type: 'tactical',
        category: 'opportunities',
        title: `${quickWins.length} Quick Win Opportunities Identified`,
        description: quickWins.map(win => win.description).join('; '),
        impact: 'high',
        confidence: 'high',
        actionability: 'very-high',
        implications: 'Can deliver immediate value with minimal effort',
      });
    }

    // Bottleneck insight
    const bottlenecks = this.identifyBottlenecks(results);
    if (bottlenecks.length > 0) {
      insights.push({
        type: 'tactical',
        category: 'constraints',
        title: `${bottlenecks.length} Critical Bottlenecks Identified`,
        description: bottlenecks
          .map(bottleneck => bottleneck.description)
          .join('; '),
        impact: 'high',
        confidence: 'medium',
        actionability: 'high',
        implications: 'Must address to enable progress',
      });
    }

    return insights;
  }

  generateRiskInsights(results, patterns) {
    const insights = [];

    // Risk assessment
    const risks = this.assessRisks(results);
    if (risks.length > 0) {
      insights.push({
        type: 'risk',
        category: 'mitigation',
        title: `${risks.length} Key Risks Identified`,
        description: risks.map(risk => risk.description).join('; '),
        impact: this.calculateRiskImpact(risks),
        confidence: 'medium',
        actionability: 'high',
        implications: 'Proactive risk management required',
      });
    }

    return insights;
  }

  /**
   * Phase 4: Create action items
   */
  createActionItems(normalizedResults, insights) {
    console.log('  📋 Creating action items...');

    const actionItems = [];

    // Strategic actions
    actionItems.push(
      ...this.createStrategicActions(normalizedResults, insights)
    );

    // Operational actions
    actionItems.push(
      ...this.createOperationalActions(normalizedResults, insights)
    );

    // Tactical actions
    actionItems.push(
      ...this.createTacticalActions(normalizedResults, insights)
    );

    // Risk mitigation actions
    actionItems.push(
      ...this.createRiskMitigationActions(normalizedResults, insights)
    );

    return this.prioritizeActionItems(actionItems);
  }

  createStrategicActions(results, insights) {
    const actions = [];

    // Maturity advancement
    const currentLevel = results.maturity.keyMetrics.maturityLevel;
    const nextLevel = this.getNextMaturityLevel(currentLevel);

    actions.push({
      id: 'strategic-001',
      title: `Advance to ${nextLevel} Maturity`,
      description: `Implement strategic initiatives to reach ${nextLevel} maturity level`,
      category: 'strategic',
      priority: 'high',
      effort: 'high',
      impact: 'very-high',
      timeline: '6-12 months',
      dependencies: this.getStrategicDependencies(currentLevel),
      successMetrics: this.getStrategicSuccessMetrics(nextLevel),
      owner: 'AI Strategy Team',
      resources: this.estimateStrategicResources(currentLevel, nextLevel),
    });

    return actions;
  }

  createOperationalActions(results, insights) {
    const actions = [];

    // Technology optimization
    if (results.technology.keyMetrics.technologyReadiness < 70) {
      actions.push({
        id: 'operational-001',
        title: 'Optimize AI Technology Stack',
        description: 'Enhance technology stack for better AI readiness',
        category: 'operational',
        priority: 'high',
        effort: 'medium',
        impact: 'high',
        timeline: '3-6 months',
        dependencies: ['Technology assessment', 'Architecture review'],
        successMetrics: [
          'Technology readiness > 70%',
          'AI library integration > 5',
        ],
        owner: 'Engineering Team',
        resources: '2-3 engineers, architecture review',
      });
    }

    // Copilot enhancement
    if (results.copilot.keyMetrics.configurationCompleteness < 70) {
      actions.push({
        id: 'operational-002',
        title: 'Enhance Copilot Integration',
        description: 'Improve Copilot configuration and adoption',
        category: 'operational',
        priority: 'high',
        effort: 'medium',
        impact: 'high',
        timeline: '2-4 months',
        dependencies: ['Copilot assessment', 'Team training'],
        successMetrics: [
          'Configuration completeness > 70%',
          'Team adoption > 60%',
        ],
        owner: 'Development Team',
        resources: '1-2 developers, training budget',
      });
    }

    return actions;
  }

  createTacticalActions(results, insights) {
    const actions = [];

    // Quick wins
    const quickWins = this.identifyQuickWins(results);
    quickWins.forEach((win, index) => {
      actions.push({
        id: `tactical-${String(index + 1).padStart(3, '0')}`,
        title: win.title,
        description: win.description,
        category: 'tactical',
        priority: win.priority,
        effort: win.effort,
        impact: win.impact,
        timeline: win.timeline,
        dependencies: win.dependencies || [],
        successMetrics: win.successMetrics || [],
        owner: win.owner || 'Development Team',
        resources: win.resources || 'Minimal',
      });
    });

    return actions;
  }

  createRiskMitigationActions(results, insights) {
    const actions = [];

    const risks = this.assessRisks(results);
    risks.forEach((risk, index) => {
      actions.push({
        id: `risk-${String(index + 1).padStart(3, '0')}`,
        title: `Mitigate: ${risk.title}`,
        description: risk.mitigation,
        category: 'risk-mitigation',
        priority: risk.severity === 'high' ? 'high' : 'medium',
        effort: risk.effort,
        impact: risk.impact,
        timeline: risk.timeline,
        dependencies: risk.dependencies || [],
        successMetrics: risk.successMetrics || [],
        owner: risk.owner || 'Risk Management Team',
        resources: risk.resources || 'Risk assessment team',
      });
    });

    return actions;
  }

  prioritizeActionItems(actions) {
    const priorityOrder = { 'very-high': 4, high: 3, medium: 2, low: 1 };

    return actions.sort((a, b) => {
      // First by priority
      const priorityDiff =
        priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by impact
      const impactOrder = { 'very-high': 4, high: 3, medium: 2, low: 1 };
      const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
      if (impactDiff !== 0) return impactDiff;

      // Finally by effort (lower effort first)
      const effortOrder = { low: 3, medium: 2, high: 1 };
      return effortOrder[a.effort] - effortOrder[b.effort];
    });
  }

  /**
   * Phase 5: Benchmarking
   */
  performBenchmarking(normalizedResults) {
    console.log('  📊 Performing industry benchmarking...');

    const benchmarks = {
      industry: this.getIndustryBenchmarks(),
      competitive: this.getCompetitiveBenchmarks(),
      historical: this.getHistoricalBenchmarks(),
    };

    const comparisons = {
      industry: this.compareWithBenchmarks(
        normalizedResults,
        benchmarks.industry
      ),
      competitive: this.compareWithBenchmarks(
        normalizedResults,
        benchmarks.competitive
      ),
      historical: this.compareWithBenchmarks(
        normalizedResults,
        benchmarks.historical
      ),
    };

    return {
      benchmarks,
      comparisons,
      gaps: this.identifyBenchmarkGaps(normalizedResults, benchmarks.industry),
      opportunities: this.identifyBenchmarkOpportunities(
        normalizedResults,
        benchmarks.industry
      ),
    };
  }

  getIndustryBenchmarks() {
    return {
      technology: 65,
      copilot: 55,
      governance: 45,
      organization: 50,
      infrastructure: 60,
      overall: 55,
    };
  }

  getCompetitiveBenchmarks() {
    return {
      technology: 75,
      copilot: 70,
      governance: 60,
      organization: 65,
      infrastructure: 70,
      overall: 68,
    };
  }

  getHistoricalBenchmarks() {
    return {
      technology: 40,
      copilot: 30,
      governance: 25,
      organization: 35,
      infrastructure: 45,
      overall: 35,
    };
  }

  compareWithBenchmarks(results, benchmarks) {
    const comparison = {};

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      let currentScore;

      switch (component) {
        case 'technology':
          currentScore = results.technology.keyMetrics.technologyReadiness;
          break;
        case 'copilot':
          currentScore = results.copilot.keyMetrics.integrationDepth;
          break;
        case 'governance':
          currentScore = results.maturity.componentScores.governance.score;
          break;
        case 'organization':
          currentScore = results.maturity.componentScores.organization.score;
          break;
        case 'infrastructure':
          currentScore = results.maturity.componentScores.infrastructure.score;
          break;
        case 'overall':
          currentScore = results.maturity.keyMetrics.overallScore;
          break;
        default:
          currentScore = 0;
      }

      comparison[component] = {
        current: currentScore,
        benchmark: benchmark,
        gap: currentScore - benchmark,
        percentile: this.calculatePercentile(currentScore, benchmark),
        trend: this.assessTrend(currentScore, benchmark),
      };
    }

    return comparison;
  }

  /**
   * Phase 6: Synthesize final results
   */
  synthesizeResults(
    normalizedResults,
    patterns,
    insights,
    actionItems,
    benchmarking
  ) {
    console.log('  🔄 Synthesizing final results...');

    return {
      executiveSummary: this.createExecutiveSummary(
        normalizedResults,
        insights,
        actionItems
      ),
      detailedAnalysis: this.createDetailedAnalysis(normalizedResults),
      insights: insights,
      patterns: patterns,
      actionItems: actionItems,
      benchmarking: benchmarking,
      recommendations: this.synthesizeRecommendations(actionItems),
      roadmap: this.createRoadmap(actionItems),
      metrics: this.defineSuccessMetrics(normalizedResults, actionItems),
      nextSteps: this.defineNextSteps(actionItems),
    };
  }

  createExecutiveSummary(results, insights, actions) {
    return {
      maturityLevel: results.maturity.keyMetrics.maturityLevel,
      overallScore: results.maturity.keyMetrics.overallScore,
      keyFindings: this.extractKeyFindings(results, insights),
      topRecommendations: this.extractTopRecommendations(actions),
      estimatedEffort: this.estimateTotalEffort(actions),
      expectedROI: this.estimateROI(results),
      timeline: this.estimateTimeline(actions),
      risks: this.summarizeKeyRisks(actions),
      successFactors: this.identifySuccessFactors(results),
    };
  }

  createDetailedAnalysis(results) {
    return {
      technology: results.technology,
      copilot: results.copilot,
      maturity: results.maturity,
      pathSpecific: results.pathSpecific,
      correlations: this.analyzeCorrelations(results),
      trends: this.analyzeTrends(results),
      gaps: this.analyzeGaps(results),
      opportunities: this.analyzeOpportunities(results),
    };
  }

  synthesizeRecommendations(actionItems) {
    const categories = {
      strategic: [],
      operational: [],
      tactical: [],
      'risk-mitigation': [],
    };

    actionItems.forEach(action => {
      if (categories[action.category]) {
        categories[action.category].push(action);
      }
    });

    return categories;
  }

  createRoadmap(actionItems) {
    const phases = {
      foundation: [],
      implementation: [],
      scaling: [],
      optimization: [],
    };

    actionItems.forEach(action => {
      const phase = this.determineActionPhase(action);
      if (phases[phase]) {
        phases[phase].push(action);
      }
    });

    return phases;
  }

  defineSuccessMetrics(results, actions) {
    return {
      leading: this.defineLeadingMetrics(results),
      lagging: this.defineLaggingMetrics(results),
      operational: this.defineOperationalMetrics(actions),
      strategic: this.defineStrategicMetrics(results),
    };
  }

  defineNextSteps(actions) {
    const immediateActions = actions.filter(
      action => action.priority === 'high' && action.effort === 'low'
    );

    return immediateActions.slice(0, 5).map(action => ({
      action: action.title,
      owner: action.owner,
      timeline: action.timeline,
      dependencies: action.dependencies,
    }));
  }

  /**
   * Helper methods
   */
  countAIFriendlyLanguages(languages) {
    const aiLanguages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#'];
    return languages.filter(lang => aiLanguages.includes(lang)).length;
  }

  identifyTechnologyStrengths(results) {
    const strengths = [];

    if (results.keyMetrics.aiLibraryCount > 5) {
      strengths.push('Strong AI library adoption');
    }

    if (results.keyMetrics.aiServiceCount > 2) {
      strengths.push('Multiple AI service integrations');
    }

    if (results.scores.technologyStack > 70) {
      strengths.push('AI-ready technology stack');
    }

    return strengths;
  }

  identifyTechnologyWeaknesses(results) {
    const weaknesses = [];

    if (results.keyMetrics.aiFriendlyLanguages < 2) {
      weaknesses.push('Limited AI-friendly languages');
    }

    if (results.keyMetrics.aiLibraryCount < 3) {
      weaknesses.push('Few AI libraries integrated');
    }

    if (results.scores.technologyStack < 50) {
      weaknesses.push('Technology stack not AI-ready');
    }

    return weaknesses;
  }

  identifyTechnologyOpportunities(results) {
    const opportunities = [];

    if (results.details.languages.includes('Python')) {
      opportunities.push('Leverage Python for ML/AI development');
    }

    if (results.details.frameworks.includes('React')) {
      opportunities.push('Integrate AI in React applications');
    }

    return opportunities;
  }

  identifyCopilotStrengths(results) {
    const strengths = [];

    if (results.scores.configuration > 70) {
      strengths.push('Comprehensive Copilot configuration');
    }

    if (results.scores.customization > 60) {
      strengths.push('Advanced Copilot customization');
    }

    if (results.scores.adoption > 60) {
      strengths.push('Strong team adoption');
    }

    return strengths;
  }

  identifyCopilotWeaknesses(results) {
    const weaknesses = [];

    if (results.summary.configurations === 0) {
      weaknesses.push('No Copilot configuration');
    }

    if (results.summary.customPrompts === 0) {
      weaknesses.push('No custom prompts developed');
    }

    if (results.scores.adoption < 40) {
      weaknesses.push('Low team adoption');
    }

    return weaknesses;
  }

  identifyCopilotOpportunities(results) {
    const opportunities = [];

    if (results.scores.customization < 50) {
      opportunities.push('Develop custom prompts and skills');
    }

    if (results.scores.integration < 50) {
      opportunities.push('Integrate Copilot with development workflows');
    }

    return opportunities;
  }

  identifyMaturityStrengths(results) {
    const strengths = [];

    if (results.maturity.overallScore > 70) {
      strengths.push('High overall AI maturity');
    }

    if (results.componentScores.governance.score > 60) {
      strengths.push('Strong governance framework');
    }

    if (results.componentScores.organization.score > 60) {
      strengths.push('Capable organization');
    }

    return strengths;
  }

  identifyMaturityWeaknesses(results) {
    const weaknesses = [];

    if (results.maturity.overallScore < 50) {
      weaknesses.push('Low overall AI maturity');
    }

    if (results.componentScores.governance.score < 40) {
      weaknesses.push('Weak governance framework');
    }

    if (results.componentScores.infrastructure.score < 50) {
      weaknesses.push('Limited infrastructure support');
    }

    return weaknesses;
  }

  identifyMaturityOpportunities(results) {
    const opportunities = [];

    if (
      results.maturity.level === 'AI-Novice' ||
      results.maturity.level === 'AI-Beginner'
    ) {
      opportunities.push('Rapid improvement potential');
    }

    if (results.componentScores.technology.score > 70) {
      opportunities.push('Leverage strong technology foundation');
    }

    return opportunities;
  }

  extractPathKeyFindings(path, data) {
    const findings = [];

    // Extract key findings based on path type
    switch (path) {
      case 'foundation':
        if (data.readiness) {
          findings.push(
            `Readiness assessment: ${data.readiness.technology.score}/100 technology`
          );
        }
        break;
      case 'capability':
        if (data.coreCapabilities) {
          findings.push(
            `Current capabilities: ${data.coreCapabilities.overall}/100`
          );
        }
        break;
      // Add more path-specific findings
    }

    return findings;
  }

  extractPathRecommendations(path, data) {
    // Extract recommendations based on path and data
    return [];
  }

  estimatePathEffort(path, data) {
    const efforts = {
      foundation: 'low-medium',
      capability: 'medium',
      scaling: 'medium-high',
      optimization: 'high',
      innovation: 'very-high',
      excellence: 'very-high',
    };

    return efforts[path] || 'medium';
  }

  estimatePathImpact(path, data) {
    const impacts = {
      foundation: 'medium',
      capability: 'high',
      scaling: 'high',
      optimization: 'medium',
      innovation: 'very-high',
      excellence: 'very-high',
    };

    return impacts[path] || 'medium';
  }

  countDataPoints(techResults, copilotResults, maturityResults) {
    let count = 0;

    count += Object.keys(techResults.details || {}).length;
    count += Object.keys(copilotResults.details || {}).length;
    count += Object.keys(maturityResults.componentScores || {}).length;

    return count;
  }

  calculateOverallConfidence(techResults, copilotResults, maturityResults) {
    const confidences = [
      this.assessDataConfidence(techResults),
      this.assessDataConfidence(copilotResults),
      this.assessDataConfidence(maturityResults),
    ];

    const avgConfidence =
      confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;

    if (avgConfidence >= 0.8) return 'high';
    if (avgConfidence >= 0.6) return 'medium';
    return 'low';
  }

  assessDataConfidence(results) {
    // Simple confidence assessment based on data completeness
    const dataPoints = Object.keys(results).length;
    return Math.min(dataPoints / 10, 1.0);
  }

  assessDataCompleteness(techResults, copilotResults, maturityResults) {
    const completeness = {
      technology: this.assessComponentCompleteness(techResults),
      copilot: this.assessComponentCompleteness(copilotResults),
      maturity: this.assessComponentCompleteness(maturityResults),
    };

    const avgCompleteness =
      Object.values(completeness).reduce((sum, comp) => sum + comp, 0) /
      Object.keys(completeness).length;

    return {
      components: completeness,
      overall: avgCompleteness,
      assessment:
        avgCompleteness >= 0.8
          ? 'complete'
          : avgCompleteness >= 0.6
            ? 'partial'
            : 'limited',
    };
  }

  assessComponentCompleteness(results) {
    const requiredFields = ['summary', 'scores', 'details'];
    const presentFields = requiredFields.filter(field => results[field]);

    return presentFields.length / requiredFields.length;
  }

  calculateCorrelation(x, y) {
    // Simple correlation calculation
    // In a real implementation, this would use proper statistical methods
    return Math.random() * 0.8 - 0.4; // Placeholder
  }

  assessInsightImpact(type, value) {
    if (type === 'strategic') {
      return value > 70 ? 'very-high' : value > 50 ? 'high' : 'medium';
    } else {
      return value > 60 ? 'high' : value > 40 ? 'medium' : 'low';
    }
  }

  getMaturityImplications(level) {
    const implications = {
      'AI-Novice': 'Requires foundational investment and education',
      'AI-Beginner': 'Ready for structured AI adoption programs',
      'AI-Developing': 'Can scale AI initiatives across organization',
      'AI-Proficient': 'Positioned for advanced AI optimization',
      'AI-Advanced': 'Ready for AI innovation leadership',
      'AI-Native': 'Can drive industry AI standards',
    };

    return implications[level] || 'Requires assessment';
  }

  assessCompetitivePosition(results) {
    const score = results.maturity.keyMetrics.overallScore;

    if (score >= 85) {
      return {
        level: 'Leader',
        description: 'Industry-leading AI capabilities',
        impact: 'very-high',
        implications: 'Can influence industry standards',
      };
    } else if (score >= 70) {
      return {
        level: 'Strong',
        description: 'Competitive AI capabilities',
        impact: 'high',
        implications: 'Well-positioned for market advantage',
      };
    } else if (score >= 50) {
      return {
        level: 'Developing',
        description: 'Growing AI capabilities',
        impact: 'medium',
        implications: 'Opportunity for differentiation',
      };
    } else {
      return {
        level: 'Emerging',
        description: 'Early AI capabilities',
        impact: 'low',
        implications: 'Significant improvement potential',
      };
    }
  }

  describeTechnologyReadiness(score) {
    if (score >= 80) return 'Excellent AI-ready technology foundation';
    if (score >= 60) return 'Good technology foundation with some gaps';
    if (score >= 40) return 'Adequate technology foundation needs improvement';
    return 'Technology foundation requires significant enhancement';
  }

  describeCopilotIntegration(score) {
    if (score >= 80) return 'Advanced Copilot integration and customization';
    if (score >= 60) return 'Good Copilot integration with room for growth';
    if (score >= 40) return 'Basic Copilot integration needs enhancement';
    return 'Limited Copilot integration requires development';
  }

  getTechnologyImplications(score) {
    if (score >= 70) return 'Can support advanced AI initiatives';
    if (score >= 50) return 'Can support moderate AI initiatives';
    return 'Requires technology upgrades for AI initiatives';
  }

  getCopilotImplications(score) {
    if (score >= 70) return 'Can leverage advanced AI assistance';
    if (score >= 50) return 'Can leverage basic AI assistance';
    return 'Limited AI assistance capability';
  }

  identifyQuickWins(results) {
    const quickWins = [];

    // Technology quick wins
    if (results.technology.details.aiLibraries.length === 0) {
      quickWins.push({
        title: 'Add Core AI Libraries',
        description:
          'Integrate essential AI libraries like TensorFlow or scikit-learn',
        priority: 'high',
        effort: 'low',
        impact: 'medium',
        timeline: '1-2 weeks',
      });
    }

    // Copilot quick wins
    if (results.copilot.summary.configurations === 0) {
      quickWins.push({
        title: 'Configure Copilot',
        description: 'Set up basic Copilot configuration for the team',
        priority: 'high',
        effort: 'low',
        impact: 'high',
        timeline: '1-3 days',
      });
    }

    return quickWins;
  }

  identifyBottlenecks(results) {
    const bottlenecks = [];

    if (results.maturity.componentScores.governance.score < 30) {
      bottlenecks.push({
        description: 'Lack of governance framework blocks scaling',
        severity: 'high',
      });
    }

    if (results.maturity.componentScores.infrastructure.score < 40) {
      bottlenecks.push({
        description: 'Infrastructure limitations constrain AI initiatives',
        severity: 'medium',
      });
    }

    return bottlenecks;
  }

  assessRisks(results) {
    const risks = [];

    if (results.maturity.componentScores.governance.score < 40) {
      risks.push({
        title: 'Compliance Risk',
        description: 'Insufficient governance may lead to compliance issues',
        severity: 'high',
        mitigation: 'Establish comprehensive AI governance framework',
        effort: 'medium',
        impact: 'high',
        timeline: '3-6 months',
        owner: 'Compliance Team',
      });
    }

    return risks;
  }

  calculateRiskImpact(risks) {
    const highRiskCount = risks.filter(risk => risk.severity === 'high').length;
    const mediumRiskCount = risks.filter(
      risk => risk.severity === 'medium'
    ).length;

    if (highRiskCount > 2) return 'very-high';
    if (highRiskCount > 0 || mediumRiskCount > 2) return 'high';
    if (mediumRiskCount > 0) return 'medium';
    return 'low';
  }

  getNextMaturityLevel(currentLevel) {
    const levels = [
      'AI-Novice',
      'AI-Beginner',
      'AI-Developing',
      'AI-Proficient',
      'AI-Advanced',
      'AI-Native',
    ];

    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex < levels.length - 1
      ? levels[currentIndex + 1]
      : 'AI-Native';
  }

  getStrategicDependencies(currentLevel) {
    const dependencies = {
      'AI-Novice': [
        'Technology assessment',
        'Team training',
        'Basic governance',
      ],
      'AI-Beginner': [
        'Copilot integration',
        'Process development',
        'Skill building',
      ],
      'AI-Developing': [
        'Scaling framework',
        'Advanced tools',
        'Organizational alignment',
      ],
      'AI-Proficient': [
        'Optimization programs',
        'Innovation initiatives',
        'Ecosystem engagement',
      ],
      'AI-Advanced': [
        'Research programs',
        'Thought leadership',
        'Industry influence',
      ],
      'AI-Native': [
        'Continuous innovation',
        'Ecosystem development',
        'Next-gen exploration',
      ],
    };

    return dependencies[currentLevel] || ['Assessment and planning'];
  }

  getStrategicSuccessMetrics(targetLevel) {
    const metrics = {
      'AI-Beginner': [
        'Overall score > 50%',
        'Basic Copilot integration',
        'Initial governance',
      ],
      'AI-Developing': [
        'Overall score > 65%',
        'Advanced Copilot usage',
        'Comprehensive governance',
      ],
      'AI-Proficient': [
        'Overall score > 75%',
        'Optimized workflows',
        'Strong team capabilities',
      ],
      'AI-Advanced': [
        'Overall score > 85%',
        'Innovation programs',
        'Industry recognition',
      ],
      'AI-Native': [
        'Overall score > 90%',
        'Thought leadership',
        'Ecosystem influence',
      ],
    };

    return metrics[targetLevel] || ['Improved maturity indicators'];
  }

  estimateStrategicResources(currentLevel, targetLevel) {
    const resourceMap = {
      'AI-Novice to AI-Beginner': '2-3 team members, $50K-100K budget',
      'AI-Beginner to AI-Developing': '3-5 team members, $100K-250K budget',
      'AI-Developing to AI-Proficient': '5-8 team members, $250K-500K budget',
      'AI-Proficient to AI-Advanced': '8-12 team members, $500K-1M budget',
      'AI-Advanced to AI-Native': '12+ team members, $1M+ budget',
    };

    const transition = `${currentLevel} to ${targetLevel}`;
    return resourceMap[transition] || 'Team and budget assessment required';
  }

  calculatePercentile(score, benchmark) {
    if (score >= benchmark + 20) return 'Top 10%';
    if (score >= benchmark + 10) return 'Top 25%';
    if (score >= benchmark - 5) return 'Top 50%';
    if (score >= benchmark - 15) return 'Bottom 50%';
    return 'Bottom 25%';
  }

  assessTrend(current, benchmark) {
    if (current > benchmark + 10) return 'above-benchmark';
    if (current > benchmark - 5) return 'at-benchmark';
    return 'below-benchmark';
  }

  identifyBenchmarkGaps(results, benchmarks) {
    const gaps = [];

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      let currentScore;

      switch (component) {
        case 'technology':
          currentScore = results.technology.keyMetrics.technologyReadiness;
          break;
        case 'copilot':
          currentScore = results.copilot.keyMetrics.integrationDepth;
          break;
        case 'overall':
          currentScore = results.maturity.keyMetrics.overallScore;
          break;
        default:
          continue;
      }

      const gap = benchmark - currentScore;
      if (gap > 10) {
        gaps.push({
          component,
          gap: Math.round(gap),
          priority: gap > 20 ? 'high' : 'medium',
        });
      }
    }

    return gaps.sort((a, b) => b.gap - a.gap);
  }

  identifyBenchmarkOpportunities(results, benchmarks) {
    const opportunities = [];

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      let currentScore;

      switch (component) {
        case 'technology':
          currentScore = results.technology.keyMetrics.technologyReadiness;
          break;
        case 'copilot':
          currentScore = results.copilot.keyMetrics.integrationDepth;
          break;
        case 'overall':
          currentScore = results.maturity.keyMetrics.overallScore;
          break;
        default:
          continue;
      }

      const advantage = currentScore - benchmark;
      if (advantage > 10) {
        opportunities.push({
          component,
          advantage: Math.round(advantage),
          strength: this.identifyStrength(component),
        });
      }
    }

    return opportunities.sort((a, b) => b.advantage - a.advantage);
  }

  identifyStrength(component) {
    const strengths = {
      technology: 'Advanced AI technology capabilities',
      copilot: 'Sophisticated Copilot integration',
      governance: 'Comprehensive governance framework',
      organization: 'Strong organizational capabilities',
      infrastructure: 'Robust infrastructure support',
    };

    return strengths[component] || 'Competitive advantage';
  }

  extractKeyFindings(results, insights) {
    const findings = [];

    findings.push(
      `AI Maturity: ${results.maturity.keyMetrics.maturityLevel} (${results.maturity.keyMetrics.overallScore}/100)`
    );
    findings.push(
      `Technology Readiness: ${results.technology.keyMetrics.technologyReadiness}/100`
    );
    findings.push(
      `Copilot Integration: ${results.copilot.keyMetrics.integrationDepth}/100`
    );

    // Add top insights
    insights.slice(0, 3).forEach(insight => {
      findings.push(insight.title);
    });

    return findings;
  }

  extractTopRecommendations(actions) {
    return actions
      .filter(action => action.priority === 'high')
      .slice(0, 3)
      .map(action => action.title);
  }

  estimateTotalEffort(actions) {
    const effortCounts = {
      low: 0,
      medium: 0,
      high: 0,
      'very-high': 0,
    };

    actions.forEach(action => {
      effortCounts[action.effort]++;
    });

    return {
      low: effortCounts.low,
      medium: effortCounts.medium,
      high: effortCounts.high,
      'very-high': effortCounts['very-high'],
      total: actions.length,
      assessment: this.assessOverallEffort(effortCounts),
    };
  }

  assessOverallEffort(effortCounts) {
    const total =
      effortCounts.low +
      effortCounts.medium +
      effortCounts.high +
      effortCounts['very-high'];
    const weightedSum =
      effortCounts.low * 1 +
      effortCounts.medium * 2 +
      effortCounts.high * 3 +
      effortCounts['very-high'] * 4;
    const avgWeight = weightedSum / total;

    if (avgWeight >= 3) return 'very-high';
    if (avgWeight >= 2.5) return 'high';
    if (avgWeight >= 1.5) return 'medium';
    return 'low';
  }

  estimateROI(results) {
    const score = results.maturity.keyMetrics.overallScore;

    if (score >= 80) return 'Very High (250-400% ROI)';
    if (score >= 60) return 'High (150-250% ROI)';
    if (score >= 40) return 'Moderate (100-150% ROI)';
    return 'Developing (50-100% ROI)';
  }

  estimateTimeline(actions) {
    const timelines = actions.map(action => {
      // Extract numeric timeline in months
      const match = action.timeline.match(/(\d+)-(\d+)/);
      return match ? parseInt(match[1]) : 6; // Default to 6 months
    });

    const maxTimeline = Math.max(...timelines);
    return `${maxTimeline}+ months`;
  }

  summarizeKeyRisks(actions) {
    const riskActions = actions.filter(
      action => action.category === 'risk-mitigation'
    );
    return riskActions.length > 0
      ? `${riskActions.length} key risks identified`
      : 'No critical risks';
  }

  identifySuccessFactors(results) {
    const factors = [];

    if (results.technology.keyMetrics.technologyReadiness > 60) {
      factors.push('Strong technology foundation');
    }

    if (results.copilot.keyMetrics.teamAdoption > 50) {
      factors.push('Team readiness for AI adoption');
    }

    if (results.maturity.componentScores.governance.score > 50) {
      factors.push('Established governance framework');
    }

    return factors;
  }

  analyzeCorrelations(results) {
    // Analyze correlations between different components
    return {
      'technology-copilot': this.calculateComponentCorrelation(
        results.technology.keyMetrics.technologyReadiness,
        results.copilot.keyMetrics.integrationDepth
      ),
      'governance-adoption': this.calculateComponentCorrelation(
        results.maturity.componentScores.governance.score,
        results.copilot.keyMetrics.teamAdoption
      ),
    };
  }

  analyzeTrends(results) {
    // Analyze trends across components
    return {
      technology: this.assessComponentTrend(
        results.technology.keyMetrics.technologyReadiness
      ),
      copilot: this.assessComponentTrend(
        results.copilot.keyMetrics.integrationDepth
      ),
      maturity: this.assessComponentTrend(
        results.maturity.keyMetrics.overallScore
      ),
    };
  }

  analyzeGaps(results) {
    // Analyze gaps between current and desired states
    return {
      technology: 70 - results.technology.keyMetrics.technologyReadiness,
      copilot: 70 - results.copilot.keyMetrics.integrationDepth,
      governance: 60 - results.maturity.componentScores.governance.score,
      organization: 60 - results.maturity.componentScores.organization.score,
      infrastructure:
        70 - results.maturity.componentScores.infrastructure.score,
    };
  }

  analyzeOpportunities(results) {
    // Analyze opportunities for improvement
    return {
      quickWins: this.identifyQuickWins(results).length,
      strategicInitiatives: this.identifyStrategicOpportunities(results),
      innovationPotential: this.assessInnovationPotential(results),
    };
  }

  calculateComponentCorrelation(x, y) {
    // Simple correlation calculation
    return Math.random() * 0.6 - 0.3; // Placeholder
  }

  assessComponentTrend(score) {
    if (score > 70) return 'strong-positive';
    if (score > 50) return 'moderate-positive';
    if (score > 30) return 'stable';
    return 'declining';
  }

  identifyStrategicOpportunities(results) {
    const opportunities = [];

    if (results.maturity.keyMetrics.overallScore < 60) {
      opportunities.push('Rapid improvement potential');
    }

    if (results.technology.keyMetrics.technologyReadiness > 70) {
      opportunities.push('Leverage technology advantage');
    }

    return opportunities;
  }

  assessInnovationPotential(results) {
    const score = results.maturity.keyMetrics.overallScore;

    if (score >= 80) return 'very-high';
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }

  determineActionPhase(action) {
    // Determine which phase an action belongs to
    if (action.category === 'strategic') return 'foundation';
    if (action.effort === 'low') return 'foundation';
    if (action.effort === 'medium') return 'implementation';
    if (action.effort === 'high') return 'scaling';
    return 'optimization';
  }

  defineLeadingMetrics(results) {
    return [
      'AI adoption rate',
      'Team engagement metrics',
      'Technology integration progress',
      'Governance compliance',
    ];
  }

  defineLaggingMetrics(results) {
    return [
      'Productivity improvements',
      'Quality metrics enhancement',
      'Time-to-market reduction',
      'Innovation outcomes',
    ];
  }

  defineOperationalMetrics(actions) {
    return actions
      .filter(action => action.successMetrics)
      .flatMap(action => action.successMetrics)
      .slice(0, 10);
  }

  defineStrategicMetrics(results) {
    return [
      'Overall maturity score improvement',
      'Competitive positioning',
      'ROI achievement',
      'Strategic objectives completion',
    ];
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error(
      'Usage: node result-aggregator.js <technology-results.json> <copilot-results.json> <maturity-results.json> [path-specific-results.json]'
    );
    process.exit(1);
  }

  try {
    const technologyResults = JSON.parse(
      require('fs').readFileSync(args[0], 'utf8')
    );
    const copilotResults = JSON.parse(
      require('fs').readFileSync(args[1], 'utf8')
    );
    const maturityResults = JSON.parse(
      require('fs').readFileSync(args[2], 'utf8')
    );
    const pathSpecificResults = args[3]
      ? JSON.parse(require('fs').readFileSync(args[3], 'utf8'))
      : {};

    const aggregator = new ResultAggregator();

    aggregator
      .aggregateResults(
        technologyResults,
        copilotResults,
        maturityResults,
        pathSpecificResults
      )
      .then(results => {
        console.log('\n🎉 Result Aggregation Completed Successfully');
        console.log('=====================================');
        console.log(`Insights: ${results.insights.length}`);
        console.log(`Action Items: ${results.actionItems.length}`);
        console.log(
          `Key Findings: ${results.executiveSummary.keyFindings.length}`
        );

        // Write aggregated results
        const outputPath = 'aggregated-results.json';
        require('fs').writeFileSync(
          outputPath,
          JSON.stringify(results, null, 2)
        );
        console.log(`\n📄 Aggregated results written to: ${outputPath}`);
      })
      .catch(error => {
        console.error('❌ Aggregation failed:', error);
        process.exit(1);
      });
  } catch (error) {
    console.error('❌ Failed to read input files:', error);
    process.exit(1);
  }
}

module.exports = ResultAggregator;

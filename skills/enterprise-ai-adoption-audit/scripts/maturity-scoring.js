#!/usr/bin/env node

/**
 * AI Maturity Scoring Script
 *
 * Calculates comprehensive AI adoption maturity scores based on
 * technology stack, Copilot integration, governance, and organizational readiness.
 */

const AITechnologyDetector = require('./ai-detector');
const CopilotAnalyzer = require('./copilot-analyzer');

class AIMaturityScorer {
  constructor(repoPath = '.') {
    this.repoPath = repoPath;
    this.technologyDetector = new AITechnologyDetector(repoPath);
    this.copilotAnalyzer = new CopilotAnalyzer(repoPath);
  }

  /**
   * Core scoring methods
   */
  async calculateMaturity() {
    console.log('📈 Calculating AI Maturity Score...');

    // Gather data from detectors
    const techReport = await this.technologyDetector.detect();
    const copilotReport = await this.copilotAnalyzer.analyze();

    // Calculate component scores
    const scores = {
      technology: this.calculateTechnologyScore(techReport),
      copilot: this.calculateCopilotScore(copilotReport),
      governance: this.calculateGovernanceScore(techReport, copilotReport),
      organization: this.calculateOrganizationScore(techReport, copilotReport),
      infrastructure: this.calculateInfrastructureScore(
        techReport,
        copilotReport
      ),
    };

    // Calculate overall maturity
    scores.overall = this.calculateOverallScore(scores);
    scores.level = this.determineMaturityLevel(scores.overall);
    scores.readiness = this.assessReadiness(scores);

    return this.generateMaturityReport(scores, techReport, copilotReport);
  }

  calculateTechnologyScore(techReport) {
    const scores = techReport.scores;
    const details = techReport.details;

    let score = 0;
    const factors = {};

    // AI-friendly languages (30%)
    const aiLanguages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#'];
    const compatibleLanguages = details.languages.filter(lang =>
      aiLanguages.includes(lang)
    );
    factors.languageCompatibility =
      (compatibleLanguages.length / Math.max(details.languages.length, 1)) *
      100;
    score += factors.languageCompatibility * 0.3;

    // AI/ML library integration (25%)
    factors.libraryIntegration = scores.aiLibraryIntegration;
    score += factors.libraryIntegration * 0.25;

    // AI service integration (20%)
    factors.serviceIntegration = scores.aiServiceIntegration;
    score += factors.serviceIntegration * 0.2;

    // Framework support (15%)
    const aiFrameworks = ['TensorFlow', 'PyTorch', 'scikit-learn', 'FastAPI'];
    const compatibleFrameworks = details.frameworks.filter(fw =>
      aiFrameworks.includes(fw)
    );
    factors.frameworkSupport =
      (compatibleFrameworks.length / Math.max(details.frameworks.length, 1)) *
      100;
    score += factors.frameworkSupport * 0.15;

    // AI-generated code patterns (10%)
    factors.aiGeneratedCode = Math.min(
      details.aiGeneratedPatterns.length * 10,
      100
    );
    score += factors.aiGeneratedCode * 0.1;

    return {
      score: Math.round(score),
      factors,
      details: {
        languages: details.languages,
        frameworks: details.frameworks,
        aiLibraries: details.aiLibraries,
        aiServices: details.aiServices,
        aiGeneratedPatterns: details.aiGeneratedPatterns,
      },
    };
  }

  calculateCopilotScore(copilotReport) {
    const scores = copilotReport.scores;
    const summary = copilotReport.summary;

    let score = 0;
    const factors = {};

    // Configuration completeness (25%)
    factors.configuration = scores.configuration;
    score += factors.configuration * 0.25;

    // Customization level (25%)
    factors.customization = scores.customization;
    score += factors.customization * 0.25;

    // Integration depth (20%)
    factors.integration = scores.integration;
    score += factors.integration * 0.2;

    // Team adoption (20%)
    factors.adoption = scores.adoption;
    score += factors.adoption * 0.2;

    // Usage patterns (10%)
    factors.usagePatterns = this.assessUsagePatterns(
      copilotReport.details.usagePatterns
    );
    score += factors.usagePatterns * 0.1;

    return {
      score: Math.round(score),
      factors,
      details: {
        configurations: summary.configurations,
        customPrompts: summary.customPrompts,
        skills: summary.skills,
        integrations: summary.integrations,
        maturity: copilotReport.maturity,
      },
    };
  }

  calculateGovernanceScore(techReport, copilotReport) {
    let score = 0;
    const factors = {};

    // AI policies and guidelines (30%)
    const governanceFiles = copilotReport.summary.governanceFiles;
    factors.policyFramework = Math.min(governanceFiles * 25, 100);
    score += factors.policyFramework * 0.3;

    // Code review processes (25%)
    factors.codeReview = this.assessCodeReviewGovernance(
      techReport,
      copilotReport
    );
    score += factors.codeReview * 0.25;

    // Security and compliance (25%)
    factors.securityCompliance = this.assessSecurityCompliance(
      techReport,
      copilotReport
    );
    score += factors.securityCompliance * 0.25;

    // Quality assurance (20%)
    factors.qualityAssurance = this.assessQualityGovernance(copilotReport);
    score += factors.qualityAssurance * 0.2;

    return {
      score: Math.round(score),
      factors,
      details: {
        governanceFiles,
        policies: Object.keys(copilotReport.details.governance).length,
        enforcement: this.assessEnforcementLevel(copilotReport),
      },
    };
  }

  calculateOrganizationScore(techReport, copilotReport) {
    let score = 0;
    const factors = {};

    // Team capabilities (30%)
    factors.teamCapabilities = this.assessTeamCapabilities(
      techReport,
      copilotReport
    );
    score += factors.teamCapabilities * 0.3;

    // Training and enablement (25%)
    factors.training = this.assessTrainingPrograms(copilotReport);
    score += factors.training * 0.25;

    // Knowledge sharing (25%)
    factors.knowledgeSharing = this.assessKnowledgeSharing(copilotReport);
    score += factors.knowledgeSharing * 0.25;

    // Collaboration practices (20%)
    factors.collaboration = this.assessCollaborationPractices(copilotReport);
    score += factors.collaboration * 0.2;

    return {
      score: Math.round(score),
      factors,
      details: {
        teamSize: this.estimateTeamSize(copilotReport),
        skillLevel: this.assessSkillLevel(copilotReport),
        collaborationTools: this.identifyCollaborationTools(copilotReport),
      },
    };
  }

  calculateInfrastructureScore(techReport, copilotReport) {
    let score = 0;
    const factors = {};

    // Cloud infrastructure (30%)
    factors.cloudInfrastructure = this.assessCloudInfrastructure(techReport);
    score += factors.cloudInfrastructure * 0.3;

    // Development environment (25%)
    factors.devEnvironment = this.assessDevEnvironment(
      techReport,
      copilotReport
    );
    score += factors.devEnvironment * 0.25;

    // CI/CD integration (25%)
    factors.cicdIntegration = this.assessCICDIntegration(copilotReport);
    score += factors.cicdIntegration * 0.25;

    // Monitoring and observability (20%)
    factors.monitoring = this.assessMonitoring(techReport, copilotReport);
    score += factors.monitoring * 0.2;

    return {
      score: Math.round(score),
      factors,
      details: {
        infrastructure: techReport.details.infrastructure,
        workflows: copilotReport.summary.workflowFiles,
        automation: this.assessAutomationLevel(copilotReport),
      },
    };
  }

  calculateOverallScore(componentScores) {
    const weights = {
      technology: 0.25,
      copilot: 0.25,
      governance: 0.2,
      organization: 0.15,
      infrastructure: 0.15,
    };

    let overallScore = 0;

    for (const [component, score] of Object.entries(componentScores)) {
      if (
        component === 'overall' ||
        component === 'level' ||
        component === 'readiness'
      )
        continue;

      overallScore += score.score * weights[component];
    }

    return Math.round(overallScore);
  }

  determineMaturityLevel(overallScore) {
    if (overallScore >= 90) return 'AI-Native';
    if (overallScore >= 75) return 'AI-Advanced';
    if (overallScore >= 60) return 'AI-Proficient';
    if (overallScore >= 45) return 'AI-Developing';
    if (overallScore >= 30) return 'AI-Beginner';
    return 'AI-Novice';
  }

  assessReadiness(scores) {
    const readiness = {
      forBasicAI: scores.technology.score >= 50,
      forAdvancedAI: scores.overall >= 70,
      forAIGovernance: scores.governance.score >= 60,
      forAIScaling:
        scores.infrastructure.score >= 70 && scores.organization.score >= 60,
      forAILeadership: scores.overall >= 85,
    };

    readiness.overall =
      Object.values(readiness).filter(Boolean).length /
      Object.keys(readiness).length;

    return readiness;
  }

  /**
   * Assessment helpers
   */
  assessUsagePatterns(usagePatterns) {
    let score = 0;

    // AI-related comments
    const comments = usagePatterns.comments || {};
    if (comments.aiCommentRatio > 0.1) score += 30;
    else if (comments.aiCommentRatio > 0.05) score += 15;

    // AI-related files
    const files = usagePatterns.files || {};
    if (files.aiFileRatio > 0.05) score += 30;
    else if (files.aiFileRatio > 0.02) score += 15;

    // AI-related commits
    const commits = usagePatterns.commits || {};
    if (commits.aiRelatedCommits > 10) score += 40;
    else if (commits.aiRelatedCommits > 5) score += 20;

    return Math.min(score, 100);
  }

  assessCodeReviewGovernance(techReport, copilotReport) {
    let score = 0;

    // AI code review guidelines
    const governance = copilotReport.details.governance;
    const hasAIGuidelines = Object.values(governance).some(g =>
      g.policies.some(p => p.name.toLowerCase().includes('ai'))
    );
    if (hasAIGuidelines) score += 40;

    // Quality gates
    const qualityScore = copilotReport.scores.quality;
    score += qualityScore * 0.3;

    // Automated checks
    const workflows = copilotReport.details.workflows;
    const hasAutomatedChecks = Object.values(workflows).some(
      w => w.automation > 0
    );
    if (hasAutomatedChecks) score += 30;

    return Math.min(score, 100);
  }

  assessSecurityCompliance(techReport, copilotReport) {
    let score = 0;

    // Security scanning in workflows
    const workflows = copilotReport.details.workflows;
    const hasSecurityScanning = Object.values(workflows).some(
      w =>
        w.aiIntegration && JSON.stringify(w).toLowerCase().includes('security')
    );
    if (hasSecurityScanning) score += 30;

    // AI service security
    const aiServices = techReport.details.aiServices;
    const hasSecureServices = aiServices.some(service =>
      ['Azure AI', 'Google AI', 'AWS AI'].includes(service)
    );
    if (hasSecureServices) score += 40;

    // Governance enforcement
    const governance = copilotReport.details.governance;
    const enforcementLevel =
      Object.values(governance).reduce(
        (sum, g) => sum + g.enforcement.level,
        0
      ) / Object.keys(governance).length;
    score += Math.min(enforcementLevel * 10, 30);

    return Math.min(score, 100);
  }

  assessQualityGovernance(copilotReport) {
    const scores = copilotReport.scores;

    let score = 0;

    // Quality score
    score += scores.quality * 0.4;

    // Configuration completeness
    score += scores.configuration * 0.3;

    // Integration with quality tools
    score += scores.integration * 0.3;

    return Math.min(score, 100);
  }

  assessTeamCapabilities(techReport, copilotReport) {
    let score = 0;

    // Technology diversity
    const languages = techReport.details.languages.length;
    score += Math.min(languages * 10, 30);

    // AI tool proficiency
    const aiLibraries = techReport.details.aiLibraries.length;
    score += Math.min(aiLibraries * 8, 30);

    // Copilot adoption
    const adoptionScore = copilotReport.scores.adoption;
    score += adoptionScore * 0.4;

    return Math.min(score, 100);
  }

  assessTrainingPrograms(copilotReport) {
    let score = 0;

    // Documentation quality
    const collaboration = copilotReport.details.teamCollaboration;
    const docFiles = Object.values(collaboration).filter(
      c => c.type === 'documentation'
    );
    const avgDocQuality =
      docFiles.reduce((sum, doc) => sum + doc.quality, 0) /
      Math.max(docFiles.length, 1);
    score += avgDocQuality * 0.4;

    // Contribution guidelines
    const contributing = collaboration.contributing;
    if (contributing && contributing.aiGuidelines) score += 30;

    // Shared configurations
    const sharedConfigs = Object.values(collaboration).filter(
      c => c.type === 'shared-config'
    );
    score += Math.min(sharedConfigs.length * 15, 30);

    return Math.min(score, 100);
  }

  assessKnowledgeSharing(copilotReport) {
    let score = 0;

    // Custom prompts library
    const promptCount = copilotReport.summary.customPrompts;
    score += Math.min(promptCount * 10, 40);

    // Skills development
    const skillCount = copilotReport.summary.skills;
    score += Math.min(skillCount * 15, 30);

    // Documentation
    const collaboration = copilotReport.details.teamCollaboration;
    const docCount = Object.values(collaboration).filter(
      c => c.type === 'documentation'
    ).length;
    score += Math.min(docCount * 20, 30);

    return Math.min(score, 100);
  }

  assessCollaborationPractices(copilotReport) {
    let score = 0;

    // Shared configurations
    const collaboration = copilotReport.details.teamCollaboration;
    const sharedConfigs = Object.values(collaboration).filter(
      c => c.type === 'shared-config'
    );
    score += Math.min(sharedConfigs.length * 20, 40);

    // Team adoption
    const adoptionScore = copilotReport.scores.adoption;
    score += adoptionScore * 0.3;

    // Integration with collaboration tools
    const integrations = copilotReport.details.integrations;
    const collabIntegrations = Object.values(integrations).filter(int =>
      int.integrations.some(
        i =>
          i.name.toLowerCase().includes('slack') ||
          i.name.toLowerCase().includes('teams')
      )
    );
    score += Math.min(collabIntegrations.length * 20, 30);

    return Math.min(score, 100);
  }

  assessCloudInfrastructure(techReport) {
    let score = 0;

    // Cloud services
    const aiServices = techReport.details.aiServices;
    const cloudServices = aiServices.filter(service =>
      ['Azure AI', 'Google AI', 'AWS AI'].includes(service)
    );
    score += Math.min(cloudServices.length * 25, 50);

    // Infrastructure components
    const infrastructure = techReport.details.infrastructure;
    const cloudInfra = infrastructure.filter(comp =>
      ['Docker', 'Kubernetes', 'Cloud AI'].includes(comp)
    );
    score += Math.min(cloudInfra.length * 15, 30);

    // Automation
    const hasAutomation = infrastructure.includes('CI/CD');
    if (hasAutomation) score += 20;

    return Math.min(score, 100);
  }

  assessDevEnvironment(techReport, copilotReport) {
    let score = 0;

    // Development tools
    const integrations = copilotReport.details.integrations;
    const devTools = Object.values(integrations).reduce(
      (sum, int) =>
        sum + int.integrations.filter(i => i.category === 'development').length,
      0
    );
    score += Math.min(devTools * 15, 40);

    // Copilot integration
    const copilotIntegrations = Object.values(integrations).reduce(
      (sum, int) => sum + int.copilotSpecific.length,
      0
    );
    score += Math.min(copilotIntegrations * 20, 30);

    // Configuration completeness
    const configScore = copilotReport.scores.configuration;
    score += configScore * 0.3;

    return Math.min(score, 100);
  }

  assessCICDIntegration(copilotReport) {
    const workflows = copilotReport.details.workflows;

    let score = 0;

    // Workflow count
    const workflowCount = Object.keys(workflows).length;
    score += Math.min(workflowCount * 15, 40);

    // AI integration in workflows
    const aiWorkflows = Object.values(workflows).filter(w => w.aiIntegration);
    score += Math.min(aiWorkflows.length * 20, 40);

    // Automation level
    const avgAutomation =
      Object.values(workflows).reduce((sum, w) => sum + w.automation, 0) /
      Math.max(Object.keys(workflows).length, 1);
    score += Math.min(avgAutomation * 4, 20);

    return Math.min(score, 100);
  }

  assessMonitoring(techReport, copilotReport) {
    let score = 0;

    // Infrastructure monitoring
    const infrastructure = techReport.details.infrastructure;
    if (infrastructure.includes('CI/CD')) score += 30;

    // Quality monitoring
    const qualityScore = copilotReport.scores.quality;
    score += qualityScore * 0.3;

    // Usage monitoring
    const usagePatterns = copilotReport.details.usagePatterns;
    const hasUsageTracking = Object.keys(usagePatterns).length > 0;
    if (hasUsageTracking) score += 40;

    return Math.min(score, 100);
  }

  estimateTeamSize(copilotReport) {
    // Rough estimation based on collaboration artifacts
    const collaboration = copilotReport.details.teamCollaboration;
    const artifacts = Object.keys(collaboration).length;

    if (artifacts > 10) return 'Large (10+)';
    if (artifacts > 5) return 'Medium (5-10)';
    if (artifacts > 2) return 'Small (3-5)';
    return 'Very Small (1-2)';
  }

  assessSkillLevel(copilotReport) {
    const scores = copilotReport.scores;
    const overall = scores.overall;

    if (overall >= 80) return 'Expert';
    if (overall >= 60) return 'Advanced';
    if (overall >= 40) return 'Intermediate';
    return 'Beginner';
  }

  identifyCollaborationTools(copilotReport) {
    const integrations = copilotReport.details.integrations;
    const tools = new Set();

    Object.values(integrations).forEach(int => {
      int.integrations.forEach(i => {
        if (i.name.toLowerCase().includes('slack')) tools.add('Slack');
        if (i.name.toLowerCase().includes('teams'))
          tools.add('Microsoft Teams');
        if (i.name.toLowerCase().includes('github')) tools.add('GitHub');
        if (i.name.toLowerCase().includes('gitlab')) tools.add('GitLab');
      });
    });

    return Array.from(tools);
  }

  assessEnforcementLevel(copilotReport) {
    const governance = copilotReport.details.governance;
    const enforcementLevels = Object.values(governance).map(
      g => g.enforcement.level
    );

    if (enforcementLevels.length === 0) return 'None';

    const avgLevel =
      enforcementLevels.reduce((sum, level) => sum + level, 0) /
      enforcementLevels.length;

    if (avgLevel >= 3) return 'High';
    if (avgLevel >= 2) return 'Medium';
    return 'Low';
  }

  assessAutomationLevel(copilotReport) {
    const workflows = copilotReport.details.workflows;
    const automationLevels = Object.values(workflows).map(w => w.automation);

    if (automationLevels.length === 0) return 'None';

    const avgLevel =
      automationLevels.reduce((sum, level) => sum + level, 0) /
      automationLevels.length;

    if (avgLevel >= 4) return 'High';
    if (avgLevel >= 2) return 'Medium';
    return 'Low';
  }

  /**
   * Report generation
   */
  generateMaturityReport(scores, techReport, copilotReport) {
    const report = {
      timestamp: new Date().toISOString(),
      maturity: {
        level: scores.level,
        overallScore: scores.overall,
        readiness: scores.readiness,
      },
      componentScores: scores,
      recommendations: this.generateMaturityRecommendations(scores),
      roadmap: this.generateRoadmap(scores),
      benchmarking: this.generateBenchmarking(scores),
      detailedAnalysis: {
        technology: techReport,
        copilot: copilotReport,
      },
    };

    return report;
  }

  generateMaturityRecommendations(scores) {
    const recommendations = [];

    // Technology recommendations
    if (scores.technology.score < 60) {
      recommendations.push({
        priority: 'high',
        category: 'technology',
        title: 'Enhance AI Technology Stack',
        description: 'Improve AI readiness through better technology choices',
        actions: [
          'Adopt AI-friendly languages (Python, TypeScript)',
          'Integrate core AI/ML libraries',
          'Establish AI service connections',
        ],
        impact: 'high',
        effort: 'medium',
        timeline: '3-6 months',
      });
    }

    // Copilot recommendations
    if (scores.copilot.score < 70) {
      recommendations.push({
        priority: 'high',
        category: 'copilot',
        title: 'Advance Copilot Integration',
        description: 'Deepen Copilot adoption and customization',
        actions: [
          'Develop custom prompts and skills',
          'Integrate Copilot with development workflows',
          'Establish team-wide adoption practices',
        ],
        impact: 'high',
        effort: 'medium',
        timeline: '2-4 months',
      });
    }

    // Governance recommendations
    if (scores.governance.score < 50) {
      recommendations.push({
        priority: 'medium',
        category: 'governance',
        title: 'Establish AI Governance Framework',
        description: 'Create policies and guidelines for AI usage',
        actions: [
          'Develop AI usage policies',
          'Implement code review guidelines for AI-generated code',
          'Establish security and compliance measures',
        ],
        impact: 'medium',
        effort: 'high',
        timeline: '4-6 months',
      });
    }

    // Organization recommendations
    if (scores.organization.score < 60) {
      recommendations.push({
        priority: 'medium',
        category: 'organization',
        title: 'Build Organizational AI Capabilities',
        description: 'Develop team skills and collaboration practices',
        actions: [
          'Implement AI training programs',
          'Establish knowledge sharing practices',
          'Create AI collaboration frameworks',
        ],
        impact: 'medium',
        effort: 'medium',
        timeline: '3-5 months',
      });
    }

    // Infrastructure recommendations
    if (scores.infrastructure.score < 70) {
      recommendations.push({
        priority: 'low',
        category: 'infrastructure',
        title: 'Optimize Infrastructure for AI',
        description: 'Enhance infrastructure to support AI workloads',
        actions: [
          'Implement cloud AI services',
          'Optimize CI/CD for AI pipelines',
          'Add monitoring and observability',
        ],
        impact: 'medium',
        effort: 'high',
        timeline: '6-9 months',
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  generateRoadmap(scores) {
    const level = scores.level;
    const roadmap = {
      currentLevel: level,
      nextLevel: this.getNextLevel(level),
      phases: [],
    };

    // Define phases based on current maturity
    if (level === 'AI-Novice' || level === 'AI-Beginner') {
      roadmap.phases = [
        {
          phase: 'Foundation Building',
          duration: '3-6 months',
          objectives: [
            'Establish basic AI technology stack',
            'Implement initial Copilot configuration',
            'Create basic AI guidelines',
          ],
          keyMilestones: [
            'AI technology score > 50',
            'Copilot configuration complete',
            'Basic governance framework',
          ],
        },
        {
          phase: 'Capability Development',
          duration: '6-9 months',
          objectives: [
            'Develop custom AI solutions',
            'Expand Copilot adoption',
            'Implement comprehensive governance',
          ],
          keyMilestones: [
            'AI technology score > 70',
            'Copilot score > 60',
            'Governance score > 60',
          ],
        },
      ];
    } else if (level === 'AI-Developing' || level === 'AI-Proficient') {
      roadmap.phases = [
        {
          phase: 'Advanced Integration',
          duration: '6-12 months',
          objectives: [
            'Implement advanced AI workflows',
            'Scale Copilot customization',
            'Establish AI leadership practices',
          ],
          keyMilestones: [
            'Overall AI score > 75',
            'Copilot score > 80',
            'Organization score > 70',
          ],
        },
        {
          phase: 'AI Excellence',
          duration: '12-18 months',
          objectives: [
            'Achieve AI-native status',
            'Lead AI innovation',
            'Optimize AI at scale',
          ],
          keyMilestones: [
            'Overall AI score > 90',
            'All component scores > 80',
            'AI leadership established',
          ],
        },
      ];
    } else {
      roadmap.phases = [
        {
          phase: 'AI Innovation Leadership',
          duration: '12-24 months',
          objectives: [
            'Drive AI industry innovation',
            'Scale AI across organization',
            'Establish AI thought leadership',
          ],
          keyMilestones: [
            'AI-native organization',
            'Industry recognition',
            'AI innovation pipeline',
          ],
        },
      ];
    }

    return roadmap;
  }

  getNextLevel(currentLevel) {
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

  generateBenchmarking(scores) {
    const benchmarks = {
      industry: this.getIndustryBenchmarks(),
      competitive: this.getCompetitiveBenchmarks(),
      historical: this.getHistoricalBenchmarks(),
    };

    return {
      current: scores,
      comparisons: {
        industry: this.compareWithBenchmarks(scores, benchmarks.industry),
        competitive: this.compareWithBenchmarks(scores, benchmarks.competitive),
        historical: this.compareWithBenchmarks(scores, benchmarks.historical),
      },
      gaps: this.identifyGaps(scores, benchmarks.industry),
      opportunities: this.identifyOpportunities(scores, benchmarks.industry),
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

  compareWithBenchmarks(scores, benchmarks) {
    const comparison = {};

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      const currentScore = scores[component]?.score || 0;
      comparison[component] = {
        current: currentScore,
        benchmark: benchmark,
        gap: currentScore - benchmark,
        percentile: this.calculatePercentile(currentScore, benchmark),
      };
    }

    return comparison;
  }

  calculatePercentile(score, benchmark) {
    if (score >= benchmark + 20) return 'Top 10%';
    if (score >= benchmark + 10) return 'Top 25%';
    if (score >= benchmark - 5) return 'Top 50%';
    if (score >= benchmark - 15) return 'Bottom 50%';
    return 'Bottom 25%';
  }

  identifyGaps(scores, benchmarks) {
    const gaps = [];

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      const currentScore = scores[component]?.score || 0;
      const gap = benchmark - currentScore;

      if (gap > 10) {
        gaps.push({
          component,
          gap: Math.round(gap),
          priority: gap > 20 ? 'high' : 'medium',
          impact: this.assessGapImpact(component),
          effort: this.assessGapEffort(component),
        });
      }
    }

    return gaps.sort((a, b) => b.gap - a.gap);
  }

  identifyOpportunities(scores, benchmarks) {
    const opportunities = [];

    for (const [component, benchmark] of Object.entries(benchmarks)) {
      const currentScore = scores[component]?.score || 0;
      const advantage = currentScore - benchmark;

      if (advantage > 10) {
        opportunities.push({
          component,
          advantage: Math.round(advantage),
          strength: this.identifyStrength(component),
          leverage: this.suggestLeverage(component),
        });
      }
    }

    return opportunities.sort((a, b) => b.advantage - a.advantage);
  }

  assessGapImpact(component) {
    const impacts = {
      technology: 'high',
      copilot: 'high',
      governance: 'medium',
      organization: 'medium',
      infrastructure: 'medium',
    };

    return impacts[component] || 'medium';
  }

  assessGapEffort(component) {
    const efforts = {
      technology: 'high',
      copilot: 'medium',
      governance: 'medium',
      organization: 'high',
      infrastructure: 'high',
    };

    return efforts[component] || 'medium';
  }

  identifyStrength(component) {
    const strengths = {
      technology: 'Advanced AI technology stack',
      copilot: 'Deep Copilot integration',
      governance: 'Comprehensive AI governance',
      organization: 'Strong AI capabilities',
      infrastructure: 'Robust AI infrastructure',
    };

    return strengths[component] || 'General strength';
  }

  suggestLeverage(component) {
    const leverages = {
      technology: 'Innovate with cutting-edge AI solutions',
      copilot: 'Lead in AI-assisted development practices',
      governance: 'Share governance frameworks with industry',
      organization: 'Mentor other organizations in AI adoption',
      infrastructure: 'Provide infrastructure as a service',
    };

    return leverages[component] || 'Leverage for competitive advantage';
  }
}

// CLI execution
if (require.main === module) {
  const repoPath = process.argv[2] || '.';
  const scorer = new AIMaturityScorer(repoPath);

  scorer
    .calculateMaturity()
    .then(report => {
      console.log('\n📈 AI Maturity Assessment Report');
      console.log('===================================');
      console.log(JSON.stringify(report, null, 2));
    })
    .catch(error => {
      console.error('❌ Maturity assessment failed:', error);
      process.exit(1);
    });
}

module.exports = AIMaturityScorer;

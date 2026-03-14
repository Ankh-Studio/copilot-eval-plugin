#!/usr/bin/env node

/**
 * Copilot Integration Analysis Script
 *
 * Analyzes repository for GitHub Copilot integration maturity,
 * adoption patterns, and AI development workflow readiness.
 */

const fs = require('fs');
const path = require('path');

class CopilotAnalyzer {
  constructor(repoPath = '.') {
    this.repoPath = repoPath;
    this.findings = {
      configurations: new Map(),
      customPrompts: new Map(),
      skills: new Map(),
      integrations: new Map(),
      usagePatterns: new Map(),
      codeQuality: new Map(),
      teamCollaboration: new Map(),
      governance: new Map(),
      workflows: new Map(),
    };
  }

  /**
   * Core analysis methods
   */
  async analyze() {
    console.log('🔍 Starting Copilot Integration Analysis...');

    await this.scanCopilotConfigurations();
    await this.analyzeCustomPrompts();
    await this.detectSkills();
    await this.analyzeIntegrations();
    await this.assessUsagePatterns();
    await this.evaluateCodeQuality();
    await this.analyzeTeamCollaboration();
    await this.assessGovernance();
    await this.analyzeWorkflows();

    return this.generateReport();
  }

  async scanCopilotConfigurations() {
    console.log('⚙️ Scanning Copilot configurations...');

    const configPaths = [
      '.copilot',
      '.github/copilot',
      'copilot',
      '.vscode/settings.json',
      '.copilot.json',
    ];

    for (const configPath of configPaths) {
      const fullPath = path.join(this.repoPath, configPath);
      if (fs.existsSync(fullPath)) {
        await this.analyzeConfiguration(fullPath);
      }
    }
  }

  async analyzeCustomPrompts() {
    console.log('💬 Analyzing custom prompts...');

    const promptPatterns = [
      '**/*.prompt',
      '**/*.copilot-prompt',
      '**/prompts/**',
      '**/.copilot/prompts/**',
      '**/ai-prompts/**',
    ];

    for (const pattern of promptPatterns) {
      const files = this.glob(pattern);
      for (const file of files) {
        await this.analyzePrompt(file);
      }
    }
  }

  async detectSkills() {
    console.log('🎯 Detecting Copilot skills...');

    const skillPatterns = [
      '**/.copilot/skills/**',
      '**/skills/**',
      '**/*.skill',
      '**/*.copilot-skill',
    ];

    for (const pattern of skillPatterns) {
      const files = this.glob(pattern);
      for (const file of files) {
        await this.analyzeSkill(file);
      }
    }
  }

  async analyzeIntegrations() {
    console.log('🔗 Analyzing Copilot integrations...');

    const integrationFiles = [
      '.vscode/extensions.json',
      '.vscode/tasks.json',
      '.vscode/launch.json',
      'package.json',
      'requirements.txt',
      'Gemfile',
    ];

    for (const file of integrationFiles) {
      const filePath = path.join(this.repoPath, file);
      if (fs.existsSync(filePath)) {
        await this.analyzeIntegrationFile(filePath);
      }
    }
  }

  async assessUsagePatterns() {
    console.log('📊 Assessing usage patterns...');

    // Analyze commit messages for AI-related patterns
    await this.analyzeCommitPatterns();

    // Analyze code comments for Copilot references
    await this.analyzeCodeComments();

    // Analyze file naming patterns
    await this.analyzeFilePatterns();
  }

  async evaluateCodeQuality() {
    console.log('🏆 Evaluating code quality indicators...');

    const codeFiles = this.getCodeFiles();

    for (const file of codeFiles) {
      await this.analyzeCodeQuality(file);
    }
  }

  async analyzeTeamCollaboration() {
    console.log('👥 Analyzing team collaboration patterns...');

    // Analyze shared configurations
    await this.analyzeSharedConfigs();

    // Analyze documentation
    await this.analyzeDocumentation();

    // Analyze contribution guidelines
    await this.analyzeContributionGuidelines();
  }

  async assessGovernance() {
    console.log('📋 Assessing governance frameworks...');

    const governanceFiles = [
      'AI_POLICY.md',
      'AI_GUIDELINES.md',
      'COPILOT_GUIDELINES.md',
      '.github/AI_POLICY.md',
      'docs/ai-governance.md',
    ];

    for (const file of governanceFiles) {
      const filePath = path.join(this.repoPath, file);
      if (fs.existsSync(filePath)) {
        await this.analyzeGovernanceFile(filePath);
      }
    }
  }

  async analyzeWorkflows() {
    console.log('🔄 Analyzing workflow integrations...');

    const workflowPaths = [
      '.github/workflows/',
      '.gitlab-ci.yml',
      'azure-pipelines.yml',
      'Jenkinsfile',
    ];

    for (const workflowPath of workflowPaths) {
      const fullPath = path.join(this.repoPath, workflowPath);
      if (fs.existsSync(fullPath)) {
        await this.analyzeWorkflow(fullPath);
      }
    }
  }

  /**
   * Analysis helpers
   */
  async analyzeConfiguration(configPath) {
    const stat = fs.statSync(configPath);

    if (stat.isDirectory()) {
      const files = this.getAllFiles(configPath);
      for (const file of files) {
        await this.analyzeConfigFile(file);
      }
    } else {
      await this.analyzeConfigFile(configPath);
    }
  }

  async analyzeConfigFile(filePath) {
    const content = await this.readFile(filePath);
    const ext = path.extname(filePath);

    try {
      let config = {};

      switch (ext) {
        case '.json':
          config = JSON.parse(content);
          break;
        case '.yml':
        case '.yaml':
          config = this.parseYaml(content);
          break;
        case '.md':
          config = this.parseMarkdownConfig(content);
          break;
      }

      this.findings.configurations.set(filePath, {
        type: this.detectConfigType(filePath),
        content: config,
        completeness: this.assessConfigCompleteness(config),
        bestPractices: this.checkBestPractices(config),
      });
    } catch (error) {
      console.warn(`Failed to parse config ${filePath}:`, error.message);
    }
  }

  async analyzePrompt(filePath) {
    const content = await this.readFile(filePath);

    const promptAnalysis = {
      filePath,
      type: this.detectPromptType(content),
      complexity: this.assessPromptComplexity(content),
      quality: this.assessPromptQuality(content),
      category: this.categorizePrompt(content),
      reuse: this.assessReusability(content),
    };

    this.findings.customPrompts.set(filePath, promptAnalysis);
  }

  async analyzeSkill(filePath) {
    const content = await this.readFile(filePath);

    const skillAnalysis = {
      filePath,
      name: this.extractSkillName(content),
      description: this.extractSkillDescription(content),
      capabilities: this.extractSkillCapabilities(content),
      integration: this.assessSkillIntegration(content),
      maturity: this.assessSkillMaturity(content),
    };

    this.findings.skills.set(filePath, skillAnalysis);
  }

  async analyzeIntegrationFile(filePath) {
    const content = await this.readFile(filePath);

    const integrations = this.detectIntegrations(content);

    this.findings.integrations.set(filePath, {
      filePath,
      integrations,
      copilotSpecific: integrations.filter(i => i.type === 'copilot'),
      aiRelated: integrations.filter(i => i.category === 'ai'),
    });
  }

  async analyzeCommitPatterns() {
    // This would typically require git history analysis
    // For now, we'll simulate based on common patterns
    const patterns = [
      'feat: add AI-generated',
      'fix: resolve Copilot suggestion',
      'refactor: improve AI-assisted code',
      'docs: update AI guidelines',
    ];

    this.findings.usagePatterns.set('commits', {
      totalCommits: 0, // Would need actual git analysis
      aiRelatedCommits: 0,
      patterns: patterns,
    });
  }

  async analyzeCodeComments() {
    const codeFiles = this.getCodeFiles();
    let aiComments = 0;
    let totalComments = 0;

    for (const file of codeFiles) {
      const content = await this.readFile(file);
      const comments = this.extractComments(content);

      totalComments += comments.length;
      aiComments += comments.filter(comment =>
        /ai|copilot|generated|assistant/i.test(comment)
      ).length;
    }

    this.findings.usagePatterns.set('comments', {
      totalComments,
      aiComments,
      aiCommentRatio: totalComments > 0 ? aiComments / totalComments : 0,
    });
  }

  async analyzeFilePatterns() {
    const files = this.getAllFiles(this.repoPath);

    const aiPatterns = [/ai-/i, /copilot-/i, /generated-/i, /assistant-/i];

    const aiFiles = files.filter(file =>
      aiPatterns.some(pattern => pattern.test(path.basename(file)))
    );

    this.findings.usagePatterns.set('files', {
      totalFiles: files.length,
      aiRelatedFiles: aiFiles.length,
      aiFileRatio: files.length > 0 ? aiFiles.length / files.length : 0,
    });
  }

  async analyzeCodeQuality(filePath) {
    const content = await this.readFile(filePath);
    const ext = path.extname(filePath);

    const qualityMetrics = {
      filePath,
      language: this.detectLanguage(ext),
      structure: this.analyzeCodeStructure(content),
      patterns: this.analyzeCodePatterns(content),
      consistency: this.assessCodeConsistency(content),
      documentation: this.assessDocumentation(content),
    };

    this.findings.codeQuality.set(filePath, qualityMetrics);
  }

  async analyzeSharedConfigs() {
    const sharedConfigFiles = [
      '.vscode/settings.json',
      '.editorconfig',
      '.prettierrc',
      '.eslintrc',
      'pyproject.toml',
    ];

    for (const file of sharedConfigFiles) {
      const filePath = path.join(this.repoPath, file);
      if (fs.existsSync(filePath)) {
        const content = await this.readFile(filePath);

        this.findings.teamCollaboration.set(file, {
          filePath,
          type: 'shared-config',
          aiRelated: this.checkAIRelatedSettings(content),
          completeness: this.assessConfigCompleteness(content),
        });
      }
    }
  }

  async analyzeDocumentation() {
    const docFiles = [
      'README.md',
      'CONTRIBUTING.md',
      'docs/AI_GUIDELINES.md',
      'docs/COPILOT.md',
    ];

    for (const file of docFiles) {
      const filePath = path.join(this.repoPath, file);
      if (fs.existsSync(filePath)) {
        const content = await this.readFile(filePath);

        this.findings.teamCollaboration.set(file, {
          filePath,
          type: 'documentation',
          aiContent: this.assessAIContent(content),
          quality: this.assessDocQuality(content),
        });
      }
    }
  }

  async analyzeContributionGuidelines() {
    const contributingFile = path.join(this.repoPath, 'CONTRIBUTING.md');

    if (fs.existsSync(contributingFile)) {
      const content = await this.readFile(contributingFile);

      this.findings.teamCollaboration.set('contributing', {
        filePath: contributingFile,
        type: 'contributing-guidelines',
        aiGuidelines: this.checkAIGuidelines(content),
        copilotMentioned: /copilot/i.test(content),
      });
    }
  }

  async analyzeGovernanceFile(filePath) {
    const content = await this.readFile(filePath);

    this.findings.governance.set(filePath, {
      filePath,
      type: 'governance',
      policies: this.extractPolicies(content),
      guidelines: this.extractGuidelines(content),
      enforcement: this.assessEnforcement(content),
      maturity: this.assessGovernanceMaturity(content),
    });
  }

  async analyzeWorkflow(workflowPath) {
    const stat = fs.statSync(workflowPath);

    if (stat.isDirectory()) {
      const files = this.getAllFiles(workflowPath);
      for (const file of files) {
        await this.analyzeWorkflowFile(file);
      }
    } else {
      await this.analyzeWorkflowFile(workflowPath);
    }
  }

  async analyzeWorkflowFile(filePath) {
    const content = await this.readFile(filePath);

    const workflowAnalysis = {
      filePath,
      type: this.detectWorkflowType(filePath),
      aiIntegration: this.checkAIIntegration(content),
      copilotSteps: this.detectCopilotSteps(content),
      automation: this.assessAutomation(content),
    };

    this.findings.workflows.set(filePath, workflowAnalysis);
  }

  /**
   * Utility methods
   */
  getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (
        stat.isDirectory() &&
        !file.startsWith('.') &&
        file !== 'node_modules'
      ) {
        this.getAllFiles(filePath, fileList);
      } else if (stat.isFile()) {
        fileList.push(filePath);
      }
    }

    return fileList;
  }

  glob(pattern) {
    const files = this.getAllFiles(this.repoPath);
    const regex = new RegExp(
      pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')
    );

    return files.filter(file => regex.test(file));
  }

  getCodeFiles() {
    const codeExtensions = [
      '.js',
      '.ts',
      '.py',
      '.java',
      '.cs',
      '.cpp',
      '.go',
      '.rs',
    ];
    const files = this.getAllFiles(this.repoPath);

    return files.filter(file => codeExtensions.includes(path.extname(file)));
  }

  async readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.warn(`Failed to read ${filePath}:`, error.message);
      return '';
    }
  }

  detectConfigType(filePath) {
    if (filePath.includes('.copilot')) return 'copilot';
    if (filePath.includes('.vscode')) return 'vscode';
    if (filePath.includes('settings')) return 'settings';
    return 'unknown';
  }

  assessConfigCompleteness(config) {
    const requiredFields = ['name', 'description', 'version'];
    const presentFields = requiredFields.filter(field => config[field]);

    return Math.round((presentFields.length / requiredFields.length) * 100);
  }

  checkBestPractices(config) {
    const practices = [];

    if (config.version) practices.push('versioned');
    if (config.description) practices.push('documented');
    if (config.author) practices.push('attributed');
    if (config.license) practices.push('licensed');

    return practices;
  }

  detectPromptType(content) {
    if (content.includes('system:')) return 'system';
    if (content.includes('user:')) return 'user';
    if (content.includes('assistant:')) return 'assistant';
    return 'general';
  }

  assessPromptComplexity(content) {
    const lines = content.split('\n').length;
    const tokens = content.split(/\s+/).length;

    if (lines > 50 || tokens > 500) return 'high';
    if (lines > 20 || tokens > 200) return 'medium';
    return 'low';
  }

  assessPromptQuality(content) {
    let score = 0;

    if (content.length > 50) score += 20;
    if (/[.?]/.test(content)) score += 20;
    if (/\b(explain|describe|generate|create|analyze)\b/i.test(content))
      score += 30;
    if (/\b(format|style|structure|pattern)\b/i.test(content)) score += 30;

    return Math.min(score, 100);
  }

  categorizePrompt(content) {
    const categories = {
      'code-generation':
        /\b(generate|create|write|implement)\b.*\b(code|function|class)\b/i,
      documentation: /\b(document|explain|describe)\b/i,
      testing: /\b(test|spec|assert)\b/i,
      refactoring: /\b(refactor|improve|optimize)\b/i,
      analysis: /\b(analyze|review|audit)\b/i,
    };

    for (const [category, pattern] of Object.entries(categories)) {
      if (pattern.test(content)) return category;
    }

    return 'general';
  }

  assessReusability(content) {
    const indicators = ['{', '[', '$', '{{', '}}'];
    const presentIndicators = indicators.filter(indicator =>
      content.includes(indicator)
    );

    return presentIndicators.length > 0 ? 'template' : 'static';
  }

  extractSkillName(content) {
    const match = content.match(/name[:\s=]+["']?([^"'\n]+)["']?/i);
    return match ? match[1] : 'unnamed';
  }

  extractSkillDescription(content) {
    const match = content.match(/description[:\s=]+["']?([^"'\n]+)["']?/i);
    return match ? match[1] : 'no description';
  }

  extractSkillCapabilities(content) {
    const capabilities = [];

    if (/\b(generate|create|write)\b/i.test(content))
      capabilities.push('generation');
    if (/\b(analyze|review|audit)\b/i.test(content))
      capabilities.push('analysis');
    if (/\b(refactor|improve|optimize)\b/i.test(content))
      capabilities.push('optimization');
    if (/\b(test|spec|validate)\b/i.test(content)) capabilities.push('testing');

    return capabilities;
  }

  assessSkillIntegration(content) {
    const integrationPatterns = [
      /api/i,
      /endpoint/i,
      /service/i,
      /integration/i,
    ];

    const presentPatterns = integrationPatterns.filter(pattern =>
      pattern.test(content)
    );

    return presentPatterns.length;
  }

  assessSkillMaturity(content) {
    let score = 0;

    if (this.extractSkillName(content) !== 'unnamed') score += 25;
    if (this.extractSkillDescription(content) !== 'no description') score += 25;
    if (this.extractSkillCapabilities(content).length > 0) score += 25;
    if (this.assessSkillIntegration(content) > 0) score += 25;

    return score;
  }

  detectIntegrations(content) {
    const integrations = [];

    // Copilot-specific integrations
    if (/@github\/copilot/i.test(content)) {
      integrations.push({
        type: 'copilot',
        category: 'ai',
        name: 'GitHub Copilot',
      });
    }

    // AI service integrations
    const aiServices = [
      { pattern: /openai/i, name: 'OpenAI' },
      { pattern: /anthropic/i, name: 'Anthropic' },
      { pattern: /azure.*ai/i, name: 'Azure AI' },
      { pattern: /google.*ai/i, name: 'Google AI' },
    ];

    for (const service of aiServices) {
      if (service.pattern.test(content)) {
        integrations.push({
          type: 'ai-service',
          category: 'ai',
          name: service.name,
        });
      }
    }

    return integrations;
  }

  extractComments(content) {
    const comments = [];

    // Single-line comments
    content.replace(/\/\/.*$/gm, match => comments.push(match.trim()));
    content.replace(/#.*$/gm, match => comments.push(match.trim()));

    // Multi-line comments
    content.replace(/\/\*[\s\S]*?\*\//g, match => comments.push(match.trim()));

    return comments;
  }

  detectLanguage(ext) {
    const languageMap = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.py': 'Python',
      '.java': 'Java',
      '.cs': 'C#',
      '.cpp': 'C++',
      '.go': 'Go',
      '.rs': 'Rust',
    };

    return languageMap[ext] || 'Unknown';
  }

  analyzeCodeStructure(content) {
    const functions = (
      content.match(/function\s+\w+|def\s+\w+|public\s+\w+\s+\w+/g) || []
    ).length;
    const classes = (content.match(/class\s+\w+|public\s+class\s+\w+/g) || [])
      .length;
    const imports = (content.match(/import|from|require/g) || []).length;

    return { functions, classes, imports };
  }

  analyzeCodePatterns(content) {
    const patterns = {
      errorHandling: (content.match(/try|catch|throw|raise/g) || []).length,
      async: (content.match(/async|await|Promise/g) || []).length,
      comments: (content.match(/\/\/|#|\/\*/g) || []).length,
      tests: (content.match(/test|spec|it\(|describe\(/g) || []).length,
    };

    return patterns;
  }

  assessCodeConsistency(content) {
    // Simple consistency check based on formatting
    const hasMixedIndentation = /\t.*    |    .*    \t/.test(content);
    const hasInconsistentSpacing = /\n{3,}/.test(content);

    return {
      consistentIndentation: !hasMixedIndentation,
      consistentSpacing: !hasInconsistentSpacing,
      score: !hasMixedIndentation && !hasInconsistentSpacing ? 100 : 50,
    };
  }

  assessDocumentation(content) {
    const docBlocks = (
      content.match(/\/\*\*[\s\S]*?\*\/|"""[\s\S]*?"""/g) || []
    ).length;
    const inlineComments = (content.match(/\/\/.*|#.*$/gm) || []).length;

    return {
      docBlocks,
      inlineComments,
      documentationRatio:
        content.length > 0
          ? (docBlocks + inlineComments) / (content.length / 100)
          : 0,
    };
  }

  checkAIRelatedSettings(content) {
    const aiSettings = [/copilot/i, /ai/i, /assistant/i, /intellisense/i];

    return aiSettings.some(setting => setting.test(content));
  }

  assessAIContent(content) {
    const aiKeywords = ['ai', 'copilot', 'assistant', 'generated', 'automated'];
    const mentions = aiKeywords.filter(keyword =>
      new RegExp(keyword, 'gi').test(content)
    ).length;

    return {
      mentions,
      aiContentRatio:
        content.length > 0 ? mentions / (content.length / 100) : 0,
    };
  }

  assessDocQuality(content) {
    let score = 0;

    if (content.length > 500) score += 25;
    if (/#+\s/.test(content)) score += 25; // Has headers
    if (/```/.test(content)) score += 25; // Has code blocks
    if (/\[.*\]\(.*\)/.test(content)) score += 25; // Has links

    return score;
  }

  checkAIGuidelines(content) {
    const guidelines = [
      /ai.*guidelines/i,
      /copilot.*policy/i,
      /generated.*code/i,
      /assistant.*usage/i,
    ];

    return guidelines.some(guideline => guideline.test(content));
  }

  extractPolicies(content) {
    const policies = [];

    const policyPatterns = [
      { pattern: /##\s*(\w+)\s*Policy/gi, type: 'policy' },
      { pattern: /##\s*(\w+)\s*Guidelines/gi, type: 'guideline' },
      { pattern: /##\s*(\w+)\s*Rules/gi, type: 'rule' },
    ];

    for (const { pattern, type } of policyPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        policies.push({ type, name: match[1] });
      }
    }

    return policies;
  }

  extractGuidelines(content) {
    const guidelines = [];

    const guidelinePatterns = [
      /-?\s*Use\s+\w+/gi,
      /-?\s*Avoid\s+\w+/gi,
      /-?\s*Always\s+\w+/gi,
      /-?\s*Never\s+\w+/gi,
    ];

    for (const pattern of guidelinePatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        guidelines.push(match[0]);
      }
    }

    return guidelines;
  }

  assessEnforcement(content) {
    const enforcementIndicators = [
      /required/i,
      /must/i,
      /enforced/i,
      /automated.*check/i,
    ];

    const presentIndicators = enforcementIndicators.filter(indicator =>
      indicator.test(content)
    );

    return {
      automated: presentIndicators.length > 2,
      manual: presentIndicators.length > 0 && presentIndicators.length <= 2,
      level: presentIndicators.length,
    };
  }

  assessGovernanceMaturity(content) {
    let score = 0;

    if (this.extractPolicies(content).length > 0) score += 25;
    if (this.extractGuidelines(content).length > 0) score += 25;
    if (this.assessEnforcement(content).level > 0) score += 25;
    if (content.length > 1000) score += 25; // Comprehensive

    return score;
  }

  detectWorkflowType(filePath) {
    if (filePath.includes('github')) return 'github-actions';
    if (filePath.includes('gitlab')) return 'gitlab-ci';
    if (filePath.includes('azure')) return 'azure-pipelines';
    if (filePath.includes('jenkins')) return 'jenkins';
    return 'unknown';
  }

  checkAIIntegration(content) {
    const aiKeywords = ['copilot', 'ai', 'openai', 'anthropic', 'azure-ai'];
    return aiKeywords.some(keyword => new RegExp(keyword, 'gi').test(content));
  }

  detectCopilotSteps(content) {
    const copilotPatterns = [/copilot/i, /ai.*assistant/i, /generated.*code/i];

    const steps = [];
    for (const pattern of copilotPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        steps.push(match[0]);
      }
    }

    return steps;
  }

  assessAutomation(content) {
    const automationIndicators = [
      /auto/i,
      /trigger/i,
      /schedule/i,
      /workflow/i,
    ];

    return automationIndicators.filter(indicator => indicator.test(content))
      .length;
  }

  parseYaml(content) {
    // Simple YAML parser for basic structures
    const lines = content.split('\n');
    const result = {};

    for (const line of lines) {
      const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
      if (match) {
        const key = match[2].trim();
        const value = match[3].trim();
        result[key] = value || '';
      }
    }

    return result;
  }

  parseMarkdownConfig(content) {
    // Extract configuration from markdown frontmatter or code blocks
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      return this.parseYaml(frontmatterMatch[1]);
    }

    return {};
  }

  /**
   * Report generation
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.generateSummary(),
      details: this.generateDetails(),
      scores: this.calculateScores(),
      recommendations: this.generateRecommendations(),
      maturity: this.assessMaturity(),
    };

    return report;
  }

  generateSummary() {
    return {
      configurations: this.findings.configurations.size,
      customPrompts: this.findings.customPrompts.size,
      skills: this.findings.skills.size,
      integrations: Array.from(this.findings.integrations.values()).reduce(
        (sum, int) => sum + int.integrations.length,
        0
      ),
      codeFiles: this.findings.codeQuality.size,
      governanceFiles: this.findings.governance.size,
      workflowFiles: this.findings.workflows.size,
    };
  }

  generateDetails() {
    return {
      configurations: Object.fromEntries(this.findings.configurations),
      customPrompts: Object.fromEntries(this.findings.customPrompts),
      skills: Object.fromEntries(this.findings.skills),
      integrations: Object.fromEntries(this.findings.integrations),
      usagePatterns: Object.fromEntries(this.findings.usagePatterns),
      codeQuality: Object.fromEntries(this.findings.codeQuality),
      teamCollaboration: Object.fromEntries(this.findings.teamCollaboration),
      governance: Object.fromEntries(this.findings.governance),
      workflows: Object.fromEntries(this.findings.workflows),
    };
  }

  calculateScores() {
    const scores = {
      configuration: this.calculateConfigurationScore(),
      customization: this.calculateCustomizationScore(),
      integration: this.calculateIntegrationScore(),
      adoption: this.calculateAdoptionScore(),
      quality: this.calculateQualityScore(),
      governance: this.calculateGovernanceScore(),
      overall: 0,
    };

    // Calculate overall score
    scores.overall =
      scores.configuration * 0.2 +
      scores.customization * 0.2 +
      scores.integration * 0.2 +
      scores.adoption * 0.15 +
      scores.quality * 0.15 +
      scores.governance * 0.1;

    return scores;
  }

  calculateConfigurationScore() {
    if (this.findings.configurations.size === 0) return 0;

    const configs = Array.from(this.findings.configurations.values());
    const avgCompleteness =
      configs.reduce((sum, config) => sum + config.completeness, 0) /
      configs.length;
    const bestPracticesCount = configs.reduce(
      (sum, config) => sum + config.bestPractices.length,
      0
    );

    return Math.round(
      (avgCompleteness * 0.7 + Math.min(bestPracticesCount * 10, 30)) * 0.3
    );
  }

  calculateCustomizationScore() {
    const promptCount = this.findings.customPrompts.size;
    const skillCount = this.findings.skills.size;

    let score = 0;

    // Custom prompts (50%)
    score += Math.min(promptCount * 10, 50);

    // Custom skills (50%)
    score += Math.min(skillCount * 15, 50);

    return Math.round(score);
  }

  calculateIntegrationScore() {
    const integrations = Array.from(this.findings.integrations.values());
    const totalIntegrations = integrations.reduce(
      (sum, int) => sum + int.integrations.length,
      0
    );
    const copilotIntegrations = integrations.reduce(
      (sum, int) => sum + int.copilotSpecific.length,
      0
    );

    let score = 0;

    // Total integrations (60%)
    score += Math.min(totalIntegrations * 5, 60);

    // Copilot-specific (40%)
    score += Math.min(copilotIntegrations * 20, 40);

    return Math.round(score);
  }

  calculateAdoptionScore() {
    const patterns = this.findings.usagePatterns;
    let score = 0;

    // AI-related commits (25%)
    const commits = patterns.get('commits');
    if (commits) {
      score += Math.min(commits.aiRelatedCommits * 5, 25);
    }

    // AI-related comments (25%)
    const comments = patterns.get('comments');
    if (comments) {
      score += Math.round(comments.aiCommentRatio * 25);
    }

    // AI-related files (25%)
    const files = patterns.get('files');
    if (files) {
      score += Math.round(files.aiFileRatio * 25);
    }

    // Team collaboration (25%)
    const collaborationScore = this.findings.teamCollaboration.size * 5;
    score += Math.min(collaborationScore, 25);

    return Math.round(score);
  }

  calculateQualityScore() {
    const codeQuality = Array.from(this.findings.codeQuality.values());

    if (codeQuality.length === 0) return 50; // Default score

    const avgConsistency =
      codeQuality.reduce((sum, cq) => sum + cq.consistency.score, 0) /
      codeQuality.length;
    const avgDocumentation =
      codeQuality.reduce(
        (sum, cq) => sum + cq.documentation.documentationRatio,
        0
      ) / codeQuality.length;

    return Math.round(
      avgConsistency * 0.6 + Math.min(avgDocumentation * 20, 40)
    );
  }

  calculateGovernanceScore() {
    if (this.findings.governance.size === 0) return 0;

    const governance = Array.from(this.findings.governance.values());
    const avgMaturity =
      governance.reduce((sum, g) => sum + g.maturity, 0) / governance.length;
    const enforcementLevel =
      governance.reduce((sum, g) => sum + g.enforcement.level, 0) /
      governance.length;

    return Math.round(avgMaturity * 0.7 + Math.min(enforcementLevel * 10, 30));
  }

  generateRecommendations() {
    const recommendations = [];
    const scores = this.calculateScores();

    if (scores.configuration < 60) {
      recommendations.push({
        priority: 'high',
        category: 'configuration',
        title: 'Enhance Copilot Configuration',
        description: 'Improve Copilot setup and configuration completeness',
        actions: [
          'Create comprehensive .copilot configuration',
          'Add workspace-level settings',
          'Document configuration purpose and usage',
        ],
      });
    }

    if (scores.customization < 50) {
      recommendations.push({
        priority: 'medium',
        category: 'customization',
        title: 'Develop Custom Prompts and Skills',
        description: 'Create custom prompts and skills for team-specific needs',
        actions: [
          'Develop reusable prompt templates',
          'Create custom Copilot skills',
          'Establish prompt library and sharing mechanisms',
        ],
      });
    }

    if (scores.integration < 60) {
      recommendations.push({
        priority: 'medium',
        category: 'integration',
        title: 'Expand Copilot Integrations',
        description: 'Integrate Copilot with development tools and workflows',
        actions: [
          'Install and configure Copilot extensions',
          'Integrate with CI/CD pipelines',
          'Connect to AI services and APIs',
        ],
      });
    }

    if (scores.adoption < 50) {
      recommendations.push({
        priority: 'high',
        category: 'adoption',
        title: 'Increase Team Adoption',
        description: 'Improve Copilot usage across the development team',
        actions: [
          'Conduct Copilot training sessions',
          'Share best practices and success stories',
          'Establish usage guidelines and policies',
        ],
      });
    }

    if (scores.governance < 40) {
      recommendations.push({
        priority: 'low',
        category: 'governance',
        title: 'Establish AI Governance Framework',
        description: 'Create policies and guidelines for AI tool usage',
        actions: [
          'Develop AI usage policies',
          'Create code review guidelines for AI-generated code',
          'Establish compliance and security measures',
        ],
      });
    }

    return recommendations;
  }

  assessMaturity() {
    const scores = this.calculateScores();
    const overall = scores.overall;

    if (overall >= 90) return 'AI-Native';
    if (overall >= 70) return 'AI-Ready';
    if (overall >= 50) return 'AI-Aware';
    return 'AI-Novice';
  }
}

// CLI execution
if (require.main === module) {
  const repoPath = process.argv[2] || '.';
  const analyzer = new CopilotAnalyzer(repoPath);

  analyzer
    .analyze()
    .then(report => {
      console.log('\n📊 Copilot Integration Analysis Report');
      console.log('=======================================');
      console.log(JSON.stringify(report, null, 2));
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = CopilotAnalyzer;

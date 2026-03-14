/**
 * Repository Context Analyzer
 *
 * Analyzes repository structure, technology stack, team patterns, and development maturity
 * to provide AI enablement recommendations based on actual repository characteristics.
 */

const fs = require('fs');
const path = require('path');

class RepositoryContextAnalyzer {
  constructor(repositoryPath = '.') {
    this.repositoryPath = repositoryPath;
    this.analysis = {
      technologyStack: {},
      teamPatterns: {},
      developmentMaturity: {},
      repositoryCharacteristics: {},
    };
  }

  /**
   * Perform comprehensive repository analysis
   */
  async analyzeRepository() {
    console.log('🔍 Analyzing repository context...');

    await this.analyzeTechnologyStack();
    await this.analyzeTeamPatterns();
    await this.analyzeDevelopmentMaturity();
    await this.analyzeRepositoryCharacteristics();

    return this.generateContextReport();
  }

  /**
   * Analyze technology stack and dependencies
   */
  async analyzeTechnologyStack() {
    const stack = {
      languages: new Set(),
      frameworks: new Set(),
      packageManagers: new Set(),
      buildTools: new Set(),
      testingFrameworks: new Set(),
      aiTools: new Set(),
    };

    // Scan package files
    const packageFiles = [
      'package.json',
      'package-lock.json',
      'yarn.lock',
      'requirements.txt',
      'Pipfile',
      'poetry.lock',
      'pom.xml',
      'build.gradle',
      'Cargo.toml',
      'composer.json',
      'Gemfile',
      'go.mod',
    ];

    for (const file of packageFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        await this.parsePackageFile(filePath, stack);
        stack.packageManagers.add(this.getPackageManager(file));
      }
    }

    // Scan source files for language detection
    await this.scanSourceFiles(stack);

    this.analysis.technologyStack = {
      languages: Array.from(stack.languages),
      frameworks: Array.from(stack.frameworks),
      packageManagers: Array.from(stack.packageManagers),
      buildTools: Array.from(stack.buildTools),
      testingFrameworks: Array.from(stack.testingFrameworks),
      aiTools: Array.from(stack.aiTools),
      maturity: this.assessStackMaturity(stack),
    };
  }

  /**
   * Analyze team patterns from commit history and collaboration
   */
  async analyzeTeamPatterns() {
    const patterns = {
      teamSize: 'unknown',
      commitFrequency: 0,
      collaborationLevel: 'unknown',
      codeReviewPractice: 'unknown',
      branchStrategy: 'unknown',
      coordinationMechanisms: [],
    };

    try {
      // Analyze git history for team patterns
      patterns.commitFrequency = await this.getCommitFrequency();
      patterns.teamSize = await this.estimateTeamSize();
      patterns.collaborationLevel = await this.assessCollaborationLevel();
      patterns.codeReviewPractice = await this.analyzeCodeReviewPractice();
      patterns.branchStrategy = await this.detectBranchStrategy();
      patterns.coordinationMechanisms =
        await this.identifyCoordinationMechanisms();
    } catch (error) {
      console.warn('Could not analyze git history:', error.message);
    }

    this.analysis.teamPatterns = patterns;
  }

  /**
   * Analyze development maturity and processes
   */
  async analyzeDevelopmentMaturity() {
    const maturity = {
      ciCd: this.analyzeCICD(),
      testing: this.analyzeTestingStrategy(),
      documentation: this.analyzeDocumentation(),
      codeQuality: this.analyzeCodeQuality(),
      automation: this.analyzeAutomation(),
      monitoring: this.analyzeMonitoring(),
    };

    this.analysis.developmentMaturity = maturity;
  }

  /**
   * Analyze repository characteristics
   */
  async analyzeRepositoryCharacteristics() {
    const characteristics = {
      age: await this.getRepositoryAge(),
      size: await this.getRepositorySize(),
      complexity: await this.assessComplexity(),
      maintenanceMode: await this.detectMaintenanceMode(),
      growthRate: await this.calculateGrowthRate(),
      dependencyHealth: await this.assessDependencyHealth(),
    };

    this.analysis.repositoryCharacteristics = characteristics;
  }

  /**
   * Parse package files for dependencies and frameworks
   */
  async parsePackageFile(filePath, stack) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const ext = path.extname(filePath);

      switch (ext) {
        case '.json':
          const packageData = JSON.parse(content);
          this.parsePackageJson(packageData, stack);
          break;
        case '.xml':
          this.parsePomXml(content, stack);
          break;
        case '.txt':
          this.parseRequirementsTxt(content, stack);
          break;
        // Add more parsers as needed
      }
    } catch (error) {
      console.warn(`Could not parse ${filePath}:`, error.message);
    }
  }

  /**
   * Parse package.json for Node.js projects
   */
  parsePackageJson(packageData, stack) {
    // Detect languages
    if (packageData.dependencies || packageData.devDependencies) {
      const allDeps = {
        ...packageData.dependencies,
        ...packageData.devDependencies,
      };

      // Detect frameworks
      const frameworks = [
        'react',
        'vue',
        'angular',
        'express',
        'next',
        'nuxt',
        'gatsby',
      ];
      frameworks.forEach(fw => {
        if (allDeps[fw]) stack.frameworks.add(fw);
      });

      // Detect testing frameworks
      const testing = [
        'jest',
        'mocha',
        'jasmine',
        'vitest',
        'cypress',
        'playwright',
      ];
      testing.forEach(test => {
        if (allDeps[test]) stack.testingFrameworks.add(test);
      });

      // Detect AI tools
      const aiTools = [
        'openai',
        '@anthropic-ai/sdk',
        'tensorflow',
        'torch',
        'scikit-learn',
      ];
      aiTools.forEach(ai => {
        if (allDeps[ai]) stack.aiTools.add(ai);
      });

      // Detect build tools
      const buildTools = ['webpack', 'vite', 'rollup', 'parcel', 'esbuild'];
      buildTools.forEach(tool => {
        if (allDeps[tool]) stack.buildTools.add(tool);
      });
    }

    // Add TypeScript detection
    if (
      packageData.devDependencies?.typescript ||
      packageData.dependencies?.typescript
    ) {
      stack.languages.add('typescript');
    }
  }

  /**
   * Scan source files to detect languages
   */
  async scanSourceFiles(stack) {
    const extensions = {
      '.js': 'javascript',
      '.ts': 'typescript',
      '.jsx': 'javascript',
      '.tsx': 'typescript',
      '.py': 'python',
      '.java': 'java',
      '.cpp': 'cpp',
      '.c': 'c',
      '.cs': 'csharp',
      '.go': 'go',
      '.rs': 'rust',
      '.rb': 'ruby',
      '.php': 'php',
      '.swift': 'swift',
      '.kt': 'kotlin',
    };

    const sourceDirs = ['src', 'lib', 'app', 'components', 'pages', 'utils'];

    for (const dir of sourceDirs) {
      const dirPath = path.join(this.repositoryPath, dir);
      if (fs.existsSync(dirPath)) {
        await this.scanDirectory(dirPath, extensions, stack);
      }
    }
  }

  /**
   * Recursively scan directory for source files
   */
  async scanDirectory(dirPath, extensions, stack) {
    try {
      const files = fs.readdirSync(dirPath);

      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          await this.scanDirectory(filePath, extensions, stack);
        } else {
          const ext = path.extname(file);
          if (extensions[ext]) {
            stack.languages.add(extensions[ext]);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dirPath}:`, error.message);
    }
  }

  /**
   * Assess technology stack maturity
   */
  assessStackMaturity(stack) {
    let score = 0;
    const factors = [];

    // Modern frameworks
    const modernFrameworks = ['react', 'vue', 'angular', 'next', 'nuxt'];
    const hasModernFramework = modernFrameworks.some(fw =>
      stack.frameworks.has(fw)
    );
    if (hasModernFramework) {
      score += 20;
      factors.push('Modern framework detected');
    }

    // TypeScript adoption
    if (stack.languages.has('typescript')) {
      score += 15;
      factors.push('TypeScript adoption');
    }

    // Testing infrastructure
    if (stack.testingFrameworks.length > 0) {
      score += 15;
      factors.push('Testing framework present');
    }

    // Build tools
    if (stack.buildTools.length > 0) {
      score += 10;
      factors.push('Build tooling');
    }

    // AI tooling
    if (stack.aiTools.length > 0) {
      score += 20;
      factors.push('AI tooling present');
    }

    // Package management
    if (stack.packageManagers.length > 0) {
      score += 10;
      factors.push('Package management');
    }

    const maturity = score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low';
    return { score, maturity, factors };
  }

  /**
   * Get commit frequency from git history
   */
  async getCommitFrequency() {
    try {
      const { execSync } = require('child_process');
      const commits = execSync('git log --since="1 month ago" --oneline', {
        cwd: this.repositoryPath,
        encoding: 'utf8',
      });
      return commits.trim().split('\n').length;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Estimate team size from commit history
   */
  async estimateTeamSize() {
    try {
      const { execSync } = require('child_process');
      const authors = execSync(
        'git log --since="3 months ago" --format="%ae" | sort -u',
        {
          cwd: this.repositoryPath,
          encoding: 'utf8',
        }
      );
      const authorCount = authors
        .trim()
        .split('\n')
        .filter(email => email).length;

      if (authorCount <= 2) return 'small (1-2)';
      if (authorCount <= 5) return 'medium (3-5)';
      if (authorCount <= 10) return 'large (6-10)';
      return 'enterprise (11+)';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Analyze CI/CD setup
   */
  analyzeCICD() {
    const ciCdFiles = [
      '.github/workflows',
      '.gitlab-ci.yml',
      'Jenkinsfile',
      'azure-pipelines.yml',
      '.travis.yml',
      'circle.yml',
    ];

    let hasCICD = false;
    let platforms = [];

    for (const file of ciCdFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        hasCICD = true;
        if (file.includes('.github')) platforms.push('GitHub Actions');
        if (file.includes('.gitlab')) platforms.push('GitLab CI');
        if (file.includes('Jenkinsfile')) platforms.push('Jenkins');
        if (file.includes('azure')) platforms.push('Azure Pipelines');
      }
    }

    return {
      present: hasCICD,
      platforms,
      maturity: hasCICD
        ? platforms.length > 1
          ? 'advanced'
          : 'basic'
        : 'none',
    };
  }

  /**
   * Analyze testing strategy
   */
  analyzeTestingStrategy() {
    const testingDirs = ['test', 'tests', '__tests__', 'spec'];
    const testFiles = [
      'jest.config.js',
      'vitest.config.js',
      'cypress.config.js',
    ];

    let hasTestDir = false;
    let hasConfig = false;
    let frameworks = [];

    for (const dir of testingDirs) {
      if (fs.existsSync(path.join(this.repositoryPath, dir))) {
        hasTestDir = true;
        break;
      }
    }

    for (const file of testFiles) {
      if (fs.existsSync(path.join(this.repositoryPath, file))) {
        hasConfig = true;
        frameworks.push(path.basename(file, '.js').replace('.config', ''));
      }
    }

    return {
      hasTestDirectory: hasTestDir,
      hasConfiguration: hasConfig,
      frameworks,
      maturity:
        hasConfig && hasTestDir
          ? 'comprehensive'
          : hasTestDir
            ? 'basic'
            : 'none',
    };
  }

  /**
   * Analyze documentation quality
   */
  analyzeDocumentation() {
    const docFiles = [
      'README.md',
      'CONTRIBUTING.md',
      'CHANGELOG.md',
      'docs/',
      'documentation/',
      '.github/ISSUE_TEMPLATE/',
    ];

    const present = [];
    for (const file of docFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        present.push(file);
      }
    }

    return {
      filesPresent: present,
      maturity:
        present.length >= 4
          ? 'comprehensive'
          : present.length >= 2
            ? 'basic'
            : 'minimal',
    };
  }

  /**
   * Analyze code quality tools
   */
  analyzeCodeQuality() {
    const qualityFiles = [
      '.eslintrc.js',
      '.prettierrc',
      'tsconfig.json',
      'sonar-project.properties',
      '.codeclimate.yml',
    ];

    const tools = [];
    for (const file of qualityFiles) {
      if (fs.existsSync(path.join(this.repositoryPath, file))) {
        tools.push(file);
      }
    }

    return {
      tools,
      maturity:
        tools.length >= 3
          ? 'comprehensive'
          : tools.length >= 1
            ? 'basic'
            : 'none',
    };
  }

  /**
   * Analyze automation level
   */
  analyzeAutomation() {
    const automationFiles = [
      'package.json',
      'Makefile',
      'docker-compose.yml',
      'Dockerfile',
      'scripts/',
    ];

    const indicators = [];
    for (const file of automationFiles) {
      if (fs.existsSync(path.join(this.repositoryPath, file))) {
        indicators.push(file);
      }
    }

    return {
      indicators,
      maturity:
        indicators.length >= 3
          ? 'high'
          : indicators.length >= 1
            ? 'medium'
            : 'low',
    };
  }

  /**
   * Analyze monitoring setup
   */
  analyzeMonitoring() {
    const monitoringFiles = [
      'sentry.properties',
      '.datadog.yml',
      'newrelic.js',
      'appsignal.yml',
      'monitoring/',
    ];

    const tools = [];
    for (const file of monitoringFiles) {
      if (fs.existsSync(path.join(this.repositoryPath, file))) {
        tools.push(file);
      }
    }

    return {
      tools,
      maturity:
        tools.length >= 2
          ? 'comprehensive'
          : tools.length >= 1
            ? 'basic'
            : 'none',
    };
  }

  /**
   * Get repository age from first commit
   */
  async getRepositoryAge() {
    try {
      const { execSync } = require('child_process');
      const firstCommit = execSync(
        'git log --reverse --format="%ct" | head -1',
        {
          cwd: this.repositoryPath,
          encoding: 'utf8',
        }
      );
      const ageInDays = Math.floor(
        (Date.now() / 1000 - parseInt(firstCommit)) / 86400
      );

      if (ageInDays < 30) return 'new (< 1 month)';
      if (ageInDays < 90) return 'young (1-3 months)';
      if (ageInDays < 365) return 'mature (3-12 months)';
      return 'established (> 1 year)';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Get repository size (file count)
   */
  async getRepositorySize() {
    try {
      const { execSync } = require('child_process');
      const fileCount = execSync('find . -type f | wc -l', {
        cwd: this.repositoryPath,
        encoding: 'utf8',
      });
      const count = parseInt(fileCount.trim());

      if (count < 100) return 'small (< 100 files)';
      if (count < 1000) return 'medium (100-1000 files)';
      if (count < 10000) return 'large (1000-10000 files)';
      return 'enterprise (> 10000 files)';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Assess repository complexity
   */
  async assessComplexity() {
    // Simple complexity assessment based on file diversity and directory structure
    const complexity = {
      fileTypes: new Set(),
      directoryDepth: 0,
      dependencies: 0,
    };

    try {
      const { execSync } = require('child_process');
      const files = execSync('find . -type f | head -100', {
        cwd: this.repositoryPath,
        encoding: 'utf8',
      });

      files.split('\n').forEach(file => {
        if (file) {
          const ext = path.extname(file);
          if (ext) complexity.fileTypes.add(ext);

          const depth = file.split('/').length;
          complexity.directoryDepth = Math.max(
            complexity.directoryDepth,
            depth
          );
        }
      });

      // Count dependencies from package files
      const packageFiles = ['package.json', 'requirements.txt', 'pom.xml'];
      for (const file of packageFiles) {
        const filePath = path.join(this.repositoryPath, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          complexity.dependencies += (
            content.match(/"dependencies"/g) || []
          ).length;
        }
      }

      const complexityScore =
        complexity.fileTypes.size * 10 +
        complexity.directoryDepth * 5 +
        complexity.dependencies * 2;

      return {
        score: complexityScore,
        level:
          complexityScore > 100
            ? 'high'
            : complexityScore > 50
              ? 'medium'
              : 'low',
        details: complexity,
      };
    } catch (error) {
      return { score: 0, level: 'unknown', details: complexity };
    }
  }

  /**
   * Detect if repository is in maintenance mode
   */
  async detectMaintenanceMode() {
    try {
      const { execSync } = require('child_process');
      const recentCommits = execSync(
        'git log --since="6 months ago" --oneline',
        {
          cwd: this.repositoryPath,
          encoding: 'utf8',
        }
      );

      const commitCount = recentCommits
        .trim()
        .split('\n')
        .filter(line => line).length;
      return commitCount < 5 ? 'maintenance' : 'active';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Calculate repository growth rate
   */
  async calculateGrowthRate() {
    try {
      const { execSync } = require('child_process');
      const monthlyCommits = execSync(
        'git log --since="6 months ago" --format="%h" --date="short" | cut -d" " -f1 | sort | uniq -c',
        {
          cwd: this.repositoryPath,
          encoding: 'utf8',
        }
      );

      const months = monthlyCommits.trim().split('\n').length;
      return months > 0
        ? `${months} commits in 6 months`
        : 'no recent activity';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Assess dependency health
   */
  async assessDependencyHealth() {
    const health = {
      outdated: 0,
      vulnerable: 0,
      total: 0,
    };

    // Check for outdated dependencies (basic check)
    const packageFiles = ['package.json', 'requirements.txt'];
    for (const file of packageFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        health.total++;
        // Simple heuristic for outdated detection
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('"0.') || content.includes('"1.')) {
          health.outdated++;
        }
      }
    }

    return {
      ...health,
      status:
        health.outdated > health.total * 0.3 ? 'needs attention' : 'healthy',
    };
  }

  /**
   * Generate comprehensive context report
   */
  generateContextReport() {
    return {
      summary: this.generateSummary(),
      technologyStack: this.analysis.technologyStack,
      teamPatterns: this.analysis.teamPatterns,
      developmentMaturity: this.analysis.developmentMaturity,
      repositoryCharacteristics: this.analysis.repositoryCharacteristics,
      aiReadiness: this.assessAIReadiness(),
      recommendations: this.generateRecommendations(),
    };
  }

  /**
   * Generate repository summary
   */
  generateSummary() {
    const { technologyStack, teamPatterns, repositoryCharacteristics } =
      this.analysis;

    return {
      primaryLanguage: technologyStack.languages[0] || 'unknown',
      primaryFramework: technologyStack.frameworks[0] || 'none',
      teamSize: teamPatterns.teamSize,
      repositoryAge: repositoryCharacteristics.age,
      repositorySize: repositoryCharacteristics.size,
      developmentVelocity:
        teamPatterns.commitFrequency > 20
          ? 'high'
          : teamPatterns.commitFrequency > 5
            ? 'medium'
            : 'low',
    };
  }

  /**
   * Assess AI readiness score
   */
  assessAIReadiness() {
    let score = 0;
    const factors = [];

    // Technology stack compatibility
    if (this.analysis.technologyStack.aiTools.length > 0) {
      score += 25;
      factors.push('AI tools already present');
    }

    // Team maturity
    if (this.analysis.developmentMaturity.testing.maturity !== 'none') {
      score += 15;
      factors.push('Testing infrastructure');
    }

    // Code quality
    if (this.analysis.developmentMaturity.codeQuality.maturity !== 'none') {
      score += 15;
      factors.push('Code quality tools');
    }

    // Documentation
    if (
      this.analysis.developmentMaturity.documentation.maturity !== 'minimal'
    ) {
      score += 10;
      factors.push('Documentation present');
    }

    // CI/CD
    if (this.analysis.developmentMaturity.ciCd.present) {
      score += 20;
      factors.push('CI/CD automation');
    }

    // Team size (smaller teams adopt faster)
    if (
      this.analysis.teamPatterns.teamSize.includes('small') ||
      this.analysis.teamPatterns.teamSize.includes('medium')
    ) {
      score += 15;
      factors.push('Team size favorable for AI adoption');
    }

    const readiness = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low';
    return { score, readiness, factors };
  }

  /**
   * Generate AI enablement recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    const { technologyStack, teamPatterns, developmentMaturity } =
      this.analysis;

    // Technology-specific recommendations
    if (
      technologyStack.languages.includes('javascript') ||
      technologyStack.languages.includes('typescript')
    ) {
      recommendations.push({
        category: 'tools',
        priority: 'high',
        title: 'JavaScript/TypeScript AI Tools',
        description:
          'Leverage rich ecosystem of AI tools for JavaScript development',
        tools: [
          'GitHub Copilot',
          'ChatGPT Extensions',
          'AI-powered code review',
        ],
      });
    }

    if (technologyStack.languages.includes('python')) {
      recommendations.push({
        category: 'automation',
        priority: 'high',
        title: 'Python AI Automation',
        description: 'Implement AI for data processing and model development',
        tools: ['Jupyter AI', 'Python AI assistants', 'Automated testing'],
      });
    }

    // Process improvement recommendations
    if (developmentMaturity.testing.maturity === 'none') {
      recommendations.push({
        category: 'foundation',
        priority: 'high',
        title: 'Establish Testing Foundation',
        description: 'Add testing infrastructure before AI adoption',
        tools: ['Jest', 'Cypress', 'Testing frameworks'],
      });
    }

    if (developmentMaturity.ciCd.maturity === 'none') {
      recommendations.push({
        category: 'automation',
        priority: 'medium',
        title: 'Implement CI/CD',
        description: 'Set up continuous integration for AI-enhanced workflows',
        tools: ['GitHub Actions', 'GitLab CI', 'Automated pipelines'],
      });
    }

    // Team-specific recommendations
    if (teamPatterns.teamSize.includes('small')) {
      recommendations.push({
        category: 'workflow',
        priority: 'high',
        title: 'Agile AI Adoption',
        description:
          'Small teams can adopt AI tools quickly with minimal overhead',
        tools: ['Copilot', 'AI code review', 'Automated documentation'],
      });
    }

    return recommendations;
  }

  /**
   * Get package manager from file name
   */
  getPackageManager(filename) {
    if (filename.includes('package.json')) return 'npm';
    if (filename.includes('yarn.lock')) return 'yarn';
    if (filename.includes('pnpm-lock.yaml')) return 'pnpm';
    if (filename.includes('requirements.txt')) return 'pip';
    if (filename.includes('poetry.lock')) return 'poetry';
    if (filename.includes('pom.xml')) return 'maven';
    if (filename.includes('build.gradle')) return 'gradle';
    if (filename.includes('Cargo.toml')) return 'cargo';
    if (filename.includes('composer.json')) return 'composer';
    if (filename.includes('Gemfile')) return 'bundler';
    if (filename.includes('go.mod')) return 'go modules';
    return 'unknown';
  }

  // Additional helper methods for team pattern analysis
  async assessCollaborationLevel() {
    // Implementation for collaboration assessment
    return 'medium'; // Placeholder
  }

  async analyzeCodeReviewPractice() {
    // Implementation for code review analysis
    return 'basic'; // Placeholder
  }

  async detectBranchStrategy() {
    // Implementation for branch strategy detection
    return 'feature-branch'; // Placeholder
  }

  async identifyCoordinationMechanisms() {
    // Implementation for coordination mechanism identification
    return ['git commits', 'pull requests']; // Placeholder
  }

  // Additional parsers for different package file types
  parsePomXml(content, stack) {
    // Basic Maven XML parsing
    if (content.includes('<artifactId>spring')) {
      stack.frameworks.add('spring');
    }
    if (content.includes('junit')) {
      stack.testingFrameworks.add('junit');
    }
  }

  parseRequirementsTxt(content, stack) {
    // Basic Python requirements parsing
    if (content.includes('django')) stack.frameworks.add('django');
    if (content.includes('flask')) stack.frameworks.add('flask');
    if (content.includes('pytest')) stack.testingFrameworks.add('pytest');
    if (content.includes('tensorflow') || content.includes('torch')) {
      stack.aiTools.add('ml-frameworks');
    }
    stack.languages.add('python');
  }
}

module.exports = RepositoryContextAnalyzer;

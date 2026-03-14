/**
 * Constraint Discovery Framework
 *
 * Identifies and analyzes constraints that affect AI adoption and enablement,
 * including external policies, technical limitations, and repository-specific factors.
 */

const fs = require('fs');
const path = require('path');

class ConstraintDiscoveryFramework {
  constructor(repositoryPath = '.') {
    this.repositoryPath = repositoryPath;
    this.constraints = {
      external: {},
      technical: {},
      repository: {},
      discovered: [],
    };
  }

  /**
   * Perform comprehensive constraint discovery
   */
  async discoverConstraints() {
    console.log('🔍 Discovering AI adoption constraints...');

    await this.analyzeExternalConstraints();
    await this.analyzeTechnicalConstraints();
    await this.analyzeRepositoryConstraints();
    await this.testYOLOMode();

    return this.generateConstraintReport();
  }

  /**
   * Analyze external constraints (policies, security, compliance)
   */
  async analyzeExternalConstraints() {
    const external = {
      corporatePolicies: await this.detectCorporatePolicies(),
      securityRequirements: await this.detectSecurityRequirements(),
      complianceFrameworks: await this.detectComplianceFrameworks(),
      budgetConstraints: await this.detectBudgetConstraints(),
      dataPrivacy: await this.detectDataPrivacyRequirements(),
      networkRestrictions: await this.detectNetworkRestrictions(),
    };

    this.constraints.external = external;
  }

  /**
   * Analyze technical constraints (infrastructure, tools, access)
   */
  async analyzeTechnicalConstraints() {
    const technical = {
      infrastructureLimits: await this.detectInfrastructureLimits(),
      toolAvailability: await this.analyzeToolAvailability(),
      accessRestrictions: await this.detectAccessRestrictions(),
      environmentConstraints: await this.detectEnvironmentConstraints(),
      integrationCapabilities: await this.analyzeIntegrationCapabilities(),
      performanceLimitations: await this.detectPerformanceLimitations(),
    };

    this.constraints.technical = technical;
  }

  /**
   * Analyze repository constraints (processes, skills, patterns)
   */
  async analyzeRepositoryConstraints() {
    const repository = {
      processConstraints: await this.analyzeProcessConstraints(),
      skillGaps: await this.detectSkillGaps(),
      technicalDebt: await this.assessTechnicalDebt(),
      workflowResistance: await this.analyzeWorkflowResistance(),
      documentationGaps: await this.analyzeDocumentationGaps(),
      coordinationComplexity: await this.assessCoordinationComplexity(),
    };

    this.constraints.repository = repository;
  }

  /**
   * Test YOLO mode capabilities (what's actually available)
   */
  async testYOLOMode() {
    const yoloTests = {
      externalApiAccess: await this.testExternalApiAccess(),
      aiToolAvailability: await this.testAIToolAvailability(),
      networkConnectivity: await this.testNetworkConnectivity(),
      fileSystemAccess: await this.testFileSystemAccess(),
      processExecution: await this.testProcessExecution(),
      memoryConstraints: await this.testMemoryConstraints(),
    };

    this.constraints.yoloMode = yoloTests;
  }

  /**
   * Detect corporate policy constraints
   */
  async detectCorporatePolicies() {
    const policies = {
      aiUsagePolicy: false,
      codeSharingPolicy: false,
      toolApprovalProcess: false,
      securityClearance: false,
      auditRequirements: false,
    };

    // Look for policy documents
    const policyFiles = [
      'POLICY.md',
      'SECURITY.md',
      'COMPLIANCE.md',
      'AI-POLICY.md',
      'CODE-OF-CONDUCT.md',
      '.github/POLICY.md',
      'docs/POLICY.md',
    ];

    for (const file of policyFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (
          content.includes('ai') ||
          content.includes('artificial intelligence')
        ) {
          policies.aiUsagePolicy = true;
        }
        if (content.includes('code sharing') || content.includes('external')) {
          policies.codeSharingPolicy = true;
        }
        if (content.includes('approval') || content.includes('review')) {
          policies.toolApprovalProcess = true;
        }
        if (content.includes('security') || content.includes('clearance')) {
          policies.securityClearance = true;
        }
        if (content.includes('audit') || content.includes('compliance')) {
          policies.auditRequirements = true;
        }
      }
    }

    // Check for policy indicators in configuration
    const configFiles = ['.github/workflows/', 'jenkins/', '.gitlab-ci.yml'];
    for (const config of configFiles) {
      const configPath = path.join(this.repositoryPath, config);
      if (fs.existsSync(configPath)) {
        policies.toolApprovalProcess = true;
        policies.auditRequirements = true;
      }
    }

    return {
      detected: policies,
      severity: this.calculatePolicySeverity(policies),
      impact: this.assessPolicyImpact(policies),
    };
  }

  /**
   * Detect security requirements
   */
  async detectSecurityRequirements() {
    const security = {
      encryptionRequired: false,
      accessControl: false,
      auditTrails: false,
      vulnerabilityScanning: false,
      codeAnalysis: false,
      environmentIsolation: false,
    };

    // Look for security configurations
    const securityFiles = [
      'security.md',
      '.github/SECURITY.md',
      'sonar-project.properties',
      '.codeclimate.yml',
      '.github/dependabot.yml',
      '.github/CODEOWNERS',
    ];

    for (const file of securityFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (
          content.includes('encrypt') ||
          content.includes('tls') ||
          content.includes('ssl')
        ) {
          security.encryptionRequired = true;
        }
        if (content.includes('access control') || content.includes('rbac')) {
          security.accessControl = true;
        }
        if (content.includes('audit') || content.includes('logging')) {
          security.auditTrails = true;
        }
        if (content.includes('vulnerability') || content.includes('scan')) {
          security.vulnerabilityScanning = true;
        }
        if (content.includes('code analysis') || content.includes('sast')) {
          security.codeAnalysis = true;
        }
      }
    }

    // Check for security tooling
    const securityTools = ['eslint', 'sonar', 'snyk', 'owasp', 'bandit'];
    for (const tool of securityTools) {
      if (this.searchInPackageFiles(tool)) {
        security.codeAnalysis = true;
        security.vulnerabilityScanning = true;
      }
    }

    return {
      detected: security,
      severity: this.calculateSecuritySeverity(security),
      impact: this.assessSecurityImpact(security),
    };
  }

  /**
   * Detect compliance frameworks
   */
  async detectComplianceFrameworks() {
    const compliance = {
      gdpr: false,
      hipaa: false,
      sox: false,
      pci: false,
      iso27001: false,
      industrySpecific: false,
    };

    // Look for compliance indicators
    const complianceFiles = [
      'COMPLIANCE.md',
      'GDPR.md',
      'HIPAA.md',
      'docs/compliance/',
      'legal/',
      '.github/compliance/',
    ];

    for (const file of complianceFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toUpperCase();

        if (content.includes('GDPR')) compliance.gdpr = true;
        if (content.includes('HIPAA')) compliance.hipaa = true;
        if (content.includes('SOX') || content.includes('SARBANES'))
          compliance.sox = true;
        if (content.includes('PCI') || content.includes('DSS'))
          compliance.pci = true;
        if (content.includes('ISO 27001') || content.includes('ISO27001'))
          compliance.iso27001 = true;
        if (
          content.includes('FINRA') ||
          content.includes('FDA') ||
          content.includes('FEDERAL')
        ) {
          compliance.industrySpecific = true;
        }
      }
    }

    return {
      detected: compliance,
      severity: this.calculateComplianceSeverity(compliance),
      impact: this.assessComplianceImpact(compliance),
    };
  }

  /**
   * Detect budget constraints
   */
  async detectBudgetConstraints() {
    const budget = {
      freeToolsOnly: false,
      costConscious: false,
      enterpriseTier: false,
      openSourcePreference: false,
      procurementProcess: false,
    };

    // Look for budget indicators in documentation
    const budgetFiles = ['README.md', 'CONTRIBUTING.md', 'docs/setup.md'];
    for (const file of budgetFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (content.includes('free') || content.includes('open source')) {
          budget.freeToolsOnly = true;
          budget.openSourcePreference = true;
        }
        if (
          content.includes('cost') ||
          content.includes('budget') ||
          content.includes('license')
        ) {
          budget.costConscious = true;
        }
        if (content.includes('enterprise') || content.includes('paid')) {
          budget.enterpriseTier = true;
        }
        if (content.includes('procurement') || content.includes('approval')) {
          budget.procurementProcess = true;
        }
      }
    }

    // Check for free/open source tool preference in dependencies
    const packageFiles = ['package.json', 'requirements.txt'];
    for (const file of packageFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('"license": "MIT"') || content.includes('BSD')) {
          budget.openSourcePreference = true;
        }
      }
    }

    return {
      detected: budget,
      severity: this.calculateBudgetSeverity(budget),
      impact: this.assessBudgetImpact(budget),
    };
  }

  /**
   * Detect data privacy requirements
   */
  async detectDataPrivacyRequirements() {
    const privacy = {
      piiRestrictions: false,
      dataResidency: false,
      encryptionAtRest: false,
      dataProcessingLimits: false,
      consentManagement: false,
    };

    // Look for privacy indicators
    const privacyFiles = ['PRIVACY.md', 'DATA.md', '.github/PRIVACY.md'];
    for (const file of privacyFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (content.includes('pii') || content.includes('personal data')) {
          privacy.piiRestrictions = true;
        }
        if (content.includes('residency') || content.includes('location')) {
          privacy.dataResidency = true;
        }
        if (
          content.includes('encryption at rest') ||
          content.includes('storage')
        ) {
          privacy.encryptionAtRest = true;
        }
        if (content.includes('processing') || content.includes('limits')) {
          privacy.dataProcessingLimits = true;
        }
        if (content.includes('consent') || content.includes('permission')) {
          privacy.consentManagement = true;
        }
      }
    }

    return {
      detected: privacy,
      severity: this.calculatePrivacySeverity(privacy),
      impact: this.assessPrivacyImpact(privacy),
    };
  }

  /**
   * Detect network restrictions
   */
  async detectNetworkRestrictions() {
    const network = {
      airGapped: false,
      firewallRestrictions: false,
      proxyRequired: false,
      whitelistOnly: false,
      noExternalApis: false,
    };

    // Look for network configuration files
    const networkFiles = [
      'proxy.conf',
      '.npmrc',
      'docker-compose.yml',
      'kubernetes/',
      '.env',
      'network.md',
    ];

    for (const file of networkFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (content.includes('proxy') || content.includes('http_proxy')) {
          network.proxyRequired = true;
        }
        if (content.includes('firewall') || content.includes('blocked')) {
          network.firewallRestrictions = true;
        }
        if (content.includes('whitelist') || content.includes('allow list')) {
          network.whitelistOnly = true;
        }
        if (content.includes('offline') || content.includes('air-gap')) {
          network.airGapped = true;
        }
      }
    }

    return {
      detected: network,
      severity: this.calculateNetworkSeverity(network),
      impact: this.assessNetworkImpact(network),
    };
  }

  /**
   * Detect infrastructure limitations
   */
  async detectInfrastructureLimits() {
    const infrastructure = {
      memoryLimits: false,
      cpuConstraints: false,
      storageConstraints: false,
      platformLimits: false,
      scalingRestrictions: false,
    };

    // Look for infrastructure configuration
    const infraFiles = [
      'docker-compose.yml',
      'kubernetes/',
      'helm/',
      'terraform/',
      'cloudformation/',
      'infrastructure/',
    ];

    for (const file of infraFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (content.includes('memory') || content.includes('ram')) {
          infrastructure.memoryLimits = true;
        }
        if (content.includes('cpu') || content.includes('processor')) {
          infrastructure.cpuConstraints = true;
        }
        if (content.includes('storage') || content.includes('disk')) {
          infrastructure.storageConstraints = true;
        }
        if (content.includes('limits') || content.includes('quotas')) {
          infrastructure.platformLimits = true;
        }
      }
    }

    return {
      detected: infrastructure,
      severity: this.calculateInfrastructureSeverity(infrastructure),
      impact: this.assessInfrastructureImpact(infrastructure),
    };
  }

  /**
   * Analyze tool availability
   */
  async analyzeToolAvailability() {
    const tools = {
      aiTools: await this.checkAITools(),
      developmentTools: await this.checkDevelopmentTools(),
      deploymentTools: await this.checkDeploymentTools(),
      monitoringTools: await this.checkMonitoringTools(),
      collaborationTools: await this.checkCollaborationTools(),
    };

    return {
      available: tools,
      missing: this.identifyMissingTools(tools),
      alternatives: this.suggestAlternatives(tools),
    };
  }

  /**
   * Check AI tool availability
   */
  async checkAITools() {
    const aiTools = {
      copilot: false,
      chatgpt: false,
      claude: false,
      localModels: false,
      customAI: false,
    };

    // Check for AI tool configurations
    const aiFiles = [
      '.vscode/settings.json',
      '.github/copilot/',
      'ai-config.json',
      '.ai-tools',
    ];

    for (const file of aiFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();

        if (content.includes('copilot')) aiTools.copilot = true;
        if (content.includes('chatgpt') || content.includes('openai'))
          aiTools.chatgpt = true;
        if (content.includes('claude') || content.includes('anthropic'))
          aiTools.claude = true;
        if (content.includes('local') || content.includes('ollama'))
          aiTools.localModels = true;
        if (content.includes('custom') || content.includes('api'))
          aiTools.customAI = true;
      }
    }

    return aiTools;
  }

  /**
   * Check development tool availability
   */
  async checkDevelopmentTools() {
    const devTools = {
      ide: false,
      linters: false,
      formatters: false,
      testing: false,
      debugging: false,
    };

    // Check for development tool configurations
    const devFiles = [
      '.vscode/',
      '.idea/',
      'eslintrc.js',
      'prettierrc.js',
      'jest.config.js',
      'vitest.config.js',
      'debugger/',
    ];

    for (const file of devFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        if (file.includes('.vscode') || file.includes('.idea'))
          devTools.ide = true;
        if (file.includes('eslint')) devTools.linters = true;
        if (file.includes('prettier')) devTools.formatters = true;
        if (file.includes('jest') || file.includes('vitest'))
          devTools.testing = true;
        if (file.includes('debugger')) devTools.debugging = true;
      }
    }

    return devTools;
  }

  /**
   * Check deployment tool availability
   */
  async checkDeploymentTools() {
    const deployTools = {
      ciCd: false,
      containers: false,
      cloud: false,
      serverless: false,
      traditional: false,
    };

    // Check for deployment configurations
    const deployFiles = [
      '.github/workflows/',
      '.gitlab-ci.yml',
      'jenkins/',
      'dockerfile',
      'docker-compose.yml',
      'kubernetes/',
      'serverless.yml',
      'cloudformation.yml',
    ];

    for (const file of deployFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        if (
          file.includes('workflows') ||
          file.includes('ci') ||
          file.includes('jenkins')
        ) {
          deployTools.ciCd = true;
        }
        if (file.includes('docker')) deployTools.containers = true;
        if (file.includes('kubernetes') || file.includes('cloudformation')) {
          deployTools.cloud = true;
        }
        if (file.includes('serverless')) deployTools.serverless = true;
      }
    }

    return deployTools;
  }

  /**
   * Check monitoring tool availability
   */
  async checkMonitoringTools() {
    const monitoringTools = {
      logging: false,
      metrics: false,
      apm: false,
      errorTracking: false,
      uptime: false,
    };

    // Check for monitoring configurations
    const monitoringFiles = [
      'sentry.properties',
      '.datadog.yml',
      'newrelic.js',
      'prometheus.yml',
      'grafana/',
      'logging/',
    ];

    for (const file of monitoringFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        if (file.includes('sentry')) monitoringTools.errorTracking = true;
        if (file.includes('datadog') || file.includes('prometheus'))
          monitoringTools.metrics = true;
        if (file.includes('newrelic')) monitoringTools.apm = true;
        if (file.includes('logging')) monitoringTools.logging = true;
      }
    }

    return monitoringTools;
  }

  /**
   * Check collaboration tool availability
   */
  async checkCollaborationTools() {
    const collabTools = {
      git: false,
      codeReview: false,
      documentation: false,
      communication: false,
      projectManagement: false,
    };

    // Check for collaboration tool indicators
    const collabFiles = [
      '.github/',
      'gitlab-ci.yml',
      'bitbucket-pipelines.yml',
      'docs/',
      'wiki/',
      'README.md',
      'CONTRIBUTING.md',
    ];

    for (const file of collabFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        if (
          file.includes('.github') ||
          file.includes('gitlab') ||
          file.includes('bitbucket')
        ) {
          collabTools.git = true;
          collabTools.codeReview = true;
        }
        if (
          file.includes('docs') ||
          file.includes('wiki') ||
          file.includes('README')
        ) {
          collabTools.documentation = true;
        }
        if (file.includes('CONTRIBUTING')) {
          collabTools.communication = true;
        }
      }
    }

    return collabTools;
  }

  /**
   * Test external API access
   */
  async testExternalApiAccess() {
    const tests = {
      githubApi: false,
      npmRegistry: false,
      openAiApi: false,
      googleApi: false,
      generalInternet: false,
    };

    try {
      // Test GitHub API
      const https = require('https');
      await this.makeRequest('https://api.github.com', 5000);
      tests.githubApi = true;
      tests.generalInternet = true;
    } catch (error) {
      // GitHub API not accessible
    }

    try {
      // Test npm registry
      await this.makeRequest('https://registry.npmjs.org', 5000);
      tests.npmRegistry = true;
    } catch (error) {
      // npm registry not accessible
    }

    return {
      tests,
      connectivity: tests.generalInternet ? 'full' : 'restricted',
      restrictions: this.identifyNetworkRestrictions(tests),
    };
  }

  /**
   * Test AI tool availability
   */
  async testAIToolAvailability() {
    const tests = {
      copilotAccess: false,
      openaiApi: false,
      anthropicApi: false,
      localAiServices: false,
      modelAccess: false,
    };

    // Test for Copilot (if VS Code extensions are available)
    try {
      const vscodePath = path.join(
        process.env.HOME || process.env.USERPROFILE,
        '.vscode'
      );
      if (fs.existsSync(vscodePath)) {
        const extensionsPath = path.join(vscodePath, 'extensions');
        if (fs.existsSync(extensionsPath)) {
          const extensions = fs.readdirSync(extensionsPath);
          if (extensions.some(ext => ext.includes('github.copilot'))) {
            tests.copilotAccess = true;
          }
        }
      }
    } catch (error) {
      // Cannot detect VS Code extensions
    }

    // Test for local AI services
    try {
      await this.makeRequest('http://localhost:11434', 1000); // Ollama default
      tests.localAiServices = true;
    } catch (error) {
      // No local AI services detected
    }

    return {
      tests,
      availability: this.calculateAIAvailability(tests),
      recommendations: this.suggestAITools(tests),
    };
  }

  /**
   * Test network connectivity
   */
  async testNetworkConnectivity() {
    const connectivity = {
      internetAccess: false,
      corporateNetwork: false,
      proxyRequired: false,
      dnsResolution: false,
      sslCertificates: false,
    };

    try {
      await this.makeRequest('https://www.google.com', 5000);
      connectivity.internetAccess = true;
    } catch (error) {
      // No internet access
    }

    try {
      await this.makeRequest('https://github.com', 5000);
      connectivity.dnsResolution = true;
      connectivity.sslCertificates = true;
    } catch (error) {
      // DNS or SSL issues
    }

    return connectivity;
  }

  /**
   * Test file system access
   */
  async testFileSystemAccess() {
    const access = {
      readAccess: false,
      writeAccess: false,
      executeAccess: false,
      tempDirectory: false,
      largeFiles: false,
    };

    try {
      // Test read access
      const testFile = path.join(this.repositoryPath, 'package.json');
      if (fs.existsSync(testFile)) {
        fs.readFileSync(testFile);
        access.readAccess = true;
      }

      // Test write access
      const tempFile = path.join(this.repositoryPath, '.ai-enablement-test');
      fs.writeFileSync(tempFile, 'test');
      fs.unlinkSync(tempFile);
      access.writeAccess = true;
      access.executeAccess = true;

      // Test temp directory access
      const tempDir = require('os').tmpdir();
      if (fs.existsSync(tempDir)) {
        access.tempDirectory = true;
      }

      // Test large file handling
      const largeContent = 'x'.repeat(1024 * 1024); // 1MB
      const largeFile = path.join(tempDir, 'large-test');
      fs.writeFileSync(largeFile, largeContent);
      fs.unlinkSync(largeFile);
      access.largeFiles = true;
    } catch (error) {
      // File system access restricted
    }

    return access;
  }

  /**
   * Test process execution
   */
  async testProcessExecution() {
    const execution = {
      nodeProcesses: false,
      pythonProcesses: false,
      shellCommands: false,
      networkCommands: false,
      systemCommands: false,
    };

    try {
      const { execSync } = require('child_process');

      // Test Node.js execution
      execSync('node --version', { timeout: 5000 });
      execution.nodeProcesses = true;

      // Test shell commands
      execSync('echo "test"', { timeout: 5000 });
      execution.shellCommands = true;

      // Test system commands
      execSync('ls', { timeout: 5000 });
      execution.systemCommands = true;
    } catch (error) {
      // Process execution restricted
    }

    try {
      const { execSync } = require('child_process');
      execSync('python --version', { timeout: 5000 });
      execution.pythonProcesses = true;
    } catch (error) {
      // Python not available
    }

    return execution;
  }

  /**
   * Test memory constraints
   */
  async testMemoryConstraints() {
    const memory = {
      availableMemory: false,
      largeAllocation: false,
      arraySize: false,
      stringSize: false,
      objectSize: false,
    };

    try {
      // Test available memory
      const used = process.memoryUsage();
      const total = require('os').totalmem();
      const free = total - used.rss;

      if (free > 100 * 1024 * 1024) {
        // 100MB
        memory.availableMemory = true;
      }

      // Test large allocation
      const largeArray = new Array(1000000).fill(0);
      memory.largeAllocation = true;
      memory.arraySize = true;

      // Test string size
      const largeString = 'x'.repeat(1000000);
      memory.stringSize = true;

      // Test object size
      const largeObject = {};
      for (let i = 0; i < 10000; i++) {
        largeObject[i] = { data: 'x'.repeat(100) };
      }
      memory.objectSize = true;
    } catch (error) {
      // Memory constraints detected
    }

    return memory;
  }

  /**
   * Helper method to make HTTP requests
   */
  async makeRequest(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const https = require('https');
      const http = require('http');
      const client = url.startsWith('https') ? https : http;

      const req = client.get(url, { timeout }, res => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  /**
   * Search for patterns in package files
   */
  searchInPackageFiles(pattern) {
    const packageFiles = ['package.json', 'requirements.txt', 'pom.xml'];

    for (const file of packageFiles) {
      const filePath = path.join(this.repositoryPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
        if (content.includes(pattern.toLowerCase())) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Calculate severity levels for different constraint types
   */
  calculatePolicySeverity(policies) {
    const count = Object.values(policies).filter(Boolean).length;
    if (count >= 4) return 'high';
    if (count >= 2) return 'medium';
    return 'low';
  }

  calculateSecuritySeverity(security) {
    const count = Object.values(security).filter(Boolean).length;
    if (count >= 4) return 'high';
    if (count >= 2) return 'medium';
    return 'low';
  }

  calculateComplianceSeverity(compliance) {
    const count = Object.values(compliance).filter(Boolean).length;
    if (count >= 2) return 'high';
    if (count >= 1) return 'medium';
    return 'low';
  }

  calculateBudgetSeverity(budget) {
    const count = Object.values(budget).filter(Boolean).length;
    if (budget.freeToolsOnly || budget.procurementProcess) return 'high';
    if (count >= 2) return 'medium';
    return 'low';
  }

  calculatePrivacySeverity(privacy) {
    const count = Object.values(privacy).filter(Boolean).length;
    if (privacy.piiRestrictions || privacy.dataResidency) return 'high';
    if (count >= 2) return 'medium';
    return 'low';
  }

  calculateNetworkSeverity(network) {
    if (network.airGapped) return 'high';
    if (network.firewallRestrictions || network.noExternalApis) return 'medium';
    return 'low';
  }

  calculateInfrastructureSeverity(infrastructure) {
    const count = Object.values(infrastructure).filter(Boolean).length;
    if (count >= 3) return 'high';
    if (count >= 1) return 'medium';
    return 'low';
  }

  /**
   * Assess impact of constraints
   */
  assessPolicyImpact(policies) {
    const impacts = [];
    if (policies.aiUsagePolicy) impacts.push('AI tool usage requires approval');
    if (policies.codeSharingPolicy)
      impacts.push('Code sharing with external AI services restricted');
    if (policies.toolApprovalProcess)
      impacts.push('New tools require formal approval process');
    if (policies.auditRequirements)
      impacts.push('AI usage must be audited and logged');
    return impacts;
  }

  assessSecurityImpact(security) {
    const impacts = [];
    if (security.encryptionRequired)
      impacts.push('AI tools must support encryption');
    if (security.accessControl)
      impacts.push('AI tool access must be controlled');
    if (security.auditTrails) impacts.push('AI interactions must be logged');
    if (security.vulnerabilityScanning)
      impacts.push('AI-generated code must be scanned');
    return impacts;
  }

  assessComplianceImpact(compliance) {
    const impacts = [];
    if (compliance.gdpr)
      impacts.push('Data processing with AI must comply with GDPR');
    if (compliance.hipaa)
      impacts.push('Healthcare data requires special AI handling');
    if (compliance.sox)
      impacts.push('Financial applications need AI audit trails');
    return impacts;
  }

  assessBudgetImpact(budget) {
    const impacts = [];
    if (budget.freeToolsOnly)
      impacts.push('Limited to free/open source AI tools');
    if (budget.costConscious) impacts.push('AI tool costs must be justified');
    if (budget.procurementProcess)
      impacts.push('AI tools require procurement approval');
    return impacts;
  }

  assessPrivacyImpact(privacy) {
    const impacts = [];
    if (privacy.piiRestrictions)
      impacts.push('Cannot send PII to external AI services');
    if (privacy.dataResidency)
      impacts.push('AI data processing must respect location restrictions');
    if (privacy.encryptionAtRest)
      impacts.push('AI data must be encrypted at rest');
    return impacts;
  }

  assessNetworkImpact(network) {
    const impacts = [];
    if (network.airGapped) impacts.push('No external AI service access');
    if (network.firewallRestrictions)
      impacts.push('AI service access may be blocked');
    if (network.proxyRequired)
      impacts.push('AI tools must support proxy configuration');
    return impacts;
  }

  assessInfrastructureImpact(infrastructure) {
    const impacts = [];
    if (infrastructure.memoryLimits)
      impacts.push('AI models limited by available memory');
    if (infrastructure.cpuConstraints)
      impacts.push('AI processing limited by CPU');
    if (infrastructure.storageConstraints)
      impacts.push('AI model storage limited');
    return impacts;
  }

  /**
   * Additional constraint analysis methods
   */
  async detectAccessRestrictions() {
    // Implementation for access restriction detection
    return { detected: {}, severity: 'low' };
  }

  async detectEnvironmentConstraints() {
    // Implementation for environment constraint detection
    return { detected: {}, severity: 'low' };
  }

  async analyzeIntegrationCapabilities() {
    // Implementation for integration capability analysis
    return { detected: {}, severity: 'low' };
  }

  async detectPerformanceLimitations() {
    // Implementation for performance limitation detection
    return { detected: {}, severity: 'low' };
  }

  async analyzeProcessConstraints() {
    // Implementation for process constraint analysis
    return { detected: {}, severity: 'low' };
  }

  async detectSkillGaps() {
    // Implementation for skill gap detection
    return { detected: {}, severity: 'low' };
  }

  async assessTechnicalDebt() {
    // Implementation for technical debt assessment
    return { detected: {}, severity: 'low' };
  }

  async analyzeWorkflowResistance() {
    // Implementation for workflow resistance analysis
    return { detected: {}, severity: 'low' };
  }

  async analyzeDocumentationGaps() {
    // Implementation for documentation gap analysis
    return { detected: {}, severity: 'low' };
  }

  async assessCoordinationComplexity() {
    // Implementation for coordination complexity assessment
    return { detected: {}, severity: 'low' };
  }

  /**
   * Helper methods for tool analysis
   */
  identifyMissingTools(tools) {
    const missing = [];
    if (!tools.aiTools.copilot) missing.push('GitHub Copilot');
    if (!tools.developmentTools.linters) missing.push('Code linters');
    if (!tools.developmentTools.testing) missing.push('Testing framework');
    return missing;
  }

  suggestAlternatives(tools) {
    const alternatives = {};
    if (!tools.aiTools.copilot) {
      alternatives.copilot = ['Codeium', 'Tabnine', 'Local AI models'];
    }
    return alternatives;
  }

  identifyNetworkRestrictions(tests) {
    const restrictions = [];
    if (!tests.generalInternet) restrictions.push('No internet access');
    if (!tests.githubApi) restrictions.push('GitHub API blocked');
    return restrictions;
  }

  calculateAIAvailability(tests) {
    const available = Object.values(tests).filter(Boolean).length;
    if (available >= 3) return 'high';
    if (available >= 1) return 'medium';
    return 'low';
  }

  suggestAITools(tests) {
    const suggestions = [];
    if (!tests.copilotAccess) suggestions.push('Consider GitHub Copilot');
    if (!tests.localAiServices) suggestions.push('Set up local AI services');
    return suggestions;
  }

  /**
   * Generate comprehensive constraint report
   */
  generateConstraintReport() {
    return {
      summary: this.generateConstraintSummary(),
      externalConstraints: this.constraints.external,
      technicalConstraints: this.constraints.technical,
      repositoryConstraints: this.constraints.repository,
      yoloModeResults: this.constraints.yoloMode,
      overallImpact: this.assessOverallImpact(),
      recommendations: this.generateConstraintRecommendations(),
      mitigationStrategies: this.generateMitigationStrategies(),
    };
  }

  /**
   * Generate constraint summary
   */
  generateConstraintSummary() {
    const constraints = this.constraints;

    return {
      totalConstraints: this.countTotalConstraints(),
      highSeverityConstraints: this.countHighSeverityConstraints(),
      mostRestrictiveCategory: this.identifyMostRestrictiveCategory(),
      aiAdoptionFeasibility: this.assessAIAdoptionFeasibility(),
      quickWins: this.identifyQuickWins(),
    };
  }

  /**
   * Count total constraints
   */
  countTotalConstraints() {
    let count = 0;

    // Count external constraints
    Object.values(this.constraints.external).forEach(category => {
      if (category.detected) {
        count += Object.values(category.detected).filter(Boolean).length;
      }
    });

    // Count technical constraints
    Object.values(this.constraints.technical).forEach(category => {
      if (category.detected) {
        count += Object.values(category.detected).filter(Boolean).length;
      }
    });

    return count;
  }

  /**
   * Count high severity constraints
   */
  countHighSeverityConstraints() {
    let count = 0;

    // Count high severity external constraints
    Object.values(this.constraints.external).forEach(category => {
      if (category.severity === 'high') count++;
    });

    // Count high severity technical constraints
    Object.values(this.constraints.technical).forEach(category => {
      if (category.severity === 'high') count++;
    });

    return count;
  }

  /**
   * Identify most restrictive constraint category
   */
  identifyMostRestrictiveCategory() {
    const categories = [
      { name: 'External Policies', severity: this.getExternalPolicySeverity() },
      { name: 'Security Requirements', severity: this.getSecuritySeverity() },
      {
        name: 'Technical Infrastructure',
        severity: this.getInfrastructureSeverity(),
      },
      { name: 'Network Access', severity: this.getNetworkSeverity() },
    ];

    return categories.reduce((most, current) =>
      current.severity > most.severity ? current : most
    ).name;
  }

  /**
   * Assess AI adoption feasibility
   */
  assessAIAdoptionFeasibility() {
    const totalConstraints = this.countTotalConstraints();
    const highSeverity = this.countHighSeverityConstraints();

    if (highSeverity >= 3) return 'low';
    if (totalConstraints >= 5) return 'medium';
    return 'high';
  }

  /**
   * Identify quick wins (low hanging fruit)
   */
  identifyQuickWins() {
    const quickWins = [];

    // Check for easy tool additions
    if (
      !this.constraints?.technical?.toolAvailability?.available
        ?.developmentTools?.linters
    ) {
      quickWins.push('Add code linters for immediate quality improvement');
    }

    if (
      !this.constraints?.technical?.toolAvailability?.available
        ?.developmentTools?.testing
    ) {
      quickWins.push('Add testing framework for better code quality');
    }

    return quickWins;
  }

  /**
   * Get severity levels for constraint categories
   */
  getExternalPolicySeverity() {
    const policies = this.constraints.external.corporatePolicies;
    return policies ? this.getSeverityWeight(policies.severity) : 0;
  }

  getSecuritySeverity() {
    const security = this.constraints.external.securityRequirements;
    return security ? this.getSeverityWeight(security.severity) : 0;
  }

  getInfrastructureSeverity() {
    const infra = this.constraints.technical.infrastructureLimits;
    return infra ? this.getSeverityWeight(infra.severity) : 0;
  }

  getNetworkSeverity() {
    const network = this.constraints.external.networkRestrictions;
    return network ? this.getSeverityWeight(network.severity) : 0;
  }

  getSeverityWeight(severity) {
    switch (severity) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 0;
    }
  }

  /**
   * Assess overall constraint impact
   */
  assessOverallImpact() {
    return {
      feasibility: this.assessAIAdoptionFeasibility(),
      complexity: this.assessImplementationComplexity(),
      timeline: this.estimateImplementationTimeline(),
      resources: this.estimateResourceRequirements(),
      risks: this.identifyKeyRisks(),
    };
  }

  /**
   * Assess implementation complexity
   */
  assessImplementationComplexity() {
    const totalConstraints = this.countTotalConstraints();
    const highSeverity = this.countHighSeverityConstraints();

    if (highSeverity >= 3 || totalConstraints >= 8) return 'high';
    if (totalConstraints >= 4) return 'medium';
    return 'low';
  }

  /**
   * Estimate implementation timeline
   */
  estimateImplementationTimeline() {
    const complexity = this.assessImplementationComplexity();

    switch (complexity) {
      case 'high':
        return '6-12 months';
      case 'medium':
        return '3-6 months';
      case 'low':
        return '1-3 months';
      default:
        return 'unknown';
    }
  }

  /**
   * Estimate resource requirements
   */
  estimateResourceRequirements() {
    const complexity = this.assessImplementationComplexity();

    switch (complexity) {
      case 'high':
        return 'Dedicated team + external consultants';
      case 'medium':
        return 'Part-time team member + management support';
      case 'low':
        return 'Individual developer + occasional review';
      default:
        return 'unknown';
    }
  }

  /**
   * Identify key risks
   */
  identifyKeyRisks() {
    const risks = [];

    if (this.countHighSeverityConstraints() >= 2) {
      risks.push('Multiple high-severity constraints may block AI adoption');
    }

    if (this.constraints.external.networkRestrictions.detected?.airGapped) {
      risks.push('Air-gapped environment severely limits AI tool options');
    }

    if (this.constraints.external.securityRequirements.detected?.auditTrails) {
      risks.push('Audit requirements add complexity to AI implementation');
    }

    return risks;
  }

  /**
   * Generate constraint-based recommendations
   */
  generateConstraintRecommendations() {
    const recommendations = [];

    // External constraint recommendations
    if (
      this.constraints.external.corporatePolicies.detected?.toolApprovalProcess
    ) {
      recommendations.push({
        category: 'process',
        priority: 'high',
        title: 'Navigate Tool Approval Process',
        description: 'Start approval process early for AI tools',
        actions: [
          'Identify approval stakeholders',
          'Prepare business case',
          'Schedule review meetings',
        ],
      });
    }

    // Technical constraint recommendations
    if (
      this.constraints.technical.infrastructureLimits.detected?.memoryLimits
    ) {
      recommendations.push({
        category: 'infrastructure',
        priority: 'medium',
        title: 'Address Memory Constraints',
        description: 'Optimize AI tool usage for limited memory',
        actions: [
          'Choose lightweight AI tools',
          'Implement model optimization',
          'Consider cloud-based AI',
        ],
      });
    }

    // Repository constraint recommendations
    if (
      this.constraints.repository.processConstraints.detected
        ?.workflowResistance
    ) {
      recommendations.push({
        category: 'change-management',
        priority: 'medium',
        title: 'Manage Workflow Resistance',
        description: 'Address team concerns about AI adoption',
        actions: [
          'Conduct team workshops',
          'Provide training',
          'Start with pilot projects',
        ],
      });
    }

    return recommendations;
  }

  /**
   * Generate mitigation strategies
   */
  generateMitigationStrategies() {
    const strategies = [];

    // Strategy for high constraint environments
    if (this.assessAIAdoptionFeasibility() === 'low') {
      strategies.push({
        approach: 'phased-adoption',
        description: 'Start with non-critical projects to build confidence',
        timeline: '12-18 months',
        successFactors: [
          'Executive support',
          'Clear ROI metrics',
          'Team training',
        ],
      });
    }

    // Strategy for security-conscious environments
    if (this.constraints.external.securityRequirements.severity === 'high') {
      strategies.push({
        approach: 'security-first',
        description: 'Prioritize security and compliance in AI adoption',
        timeline: '6-9 months',
        successFactors: [
          'Security team involvement',
          'Compliance validation',
          'Audit trails',
        ],
      });
    }

    // Strategy for resource-constrained environments
    if (
      this.constraints?.external?.budgetConstraints?.detected?.freeToolsOnly
    ) {
      strategies.push({
        approach: 'open-source-priority',
        description: 'Focus on free and open-source AI tools',
        timeline: '3-6 months',
        successFactors: [
          'Community support',
          'Self-hosting capability',
          'Technical expertise',
        ],
      });
    }

    return strategies;
  }
}

module.exports = ConstraintDiscoveryFramework;

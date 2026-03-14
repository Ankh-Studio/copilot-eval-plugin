#!/usr/bin/env node

/**
 * AI Enablement Intelligence Skill Execution
 *
 * Main entry point for the AI Enablement Intelligence skill
 * that performs repository analysis, constraint discovery, and AI enablement recommendations.
 */

const AIEnablementIntelligence = require('./index');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    repositoryPath: '.',
    depth: 'comprehensive',
    focus: 'all',
    researchMode: false,
    outputPath: './ai-enablement-report.json',
    format: 'json',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--path':
      case '-p':
        options.repositoryPath = args[++i];
        break;
      case '--depth':
      case '-d':
        options.depth = args[++i];
        break;
      case '--focus':
      case '-f':
        options.focus = args[++i];
        break;
      case '--research-mode':
      case '-r':
        options.researchMode = true;
        break;
      case '--output':
      case '-o':
        options.outputPath = args[++i];
        break;
      case '--format':
        options.format = args[++i];
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
      default:
        if (!arg.startsWith('-')) {
          options.repositoryPath = arg;
        }
    }
  }

  return options;
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`
AI Enablement Intelligence - Repository Analysis and AI Enablement Recommendations

USAGE:
  ai-enablement-intelligence [options] [repository-path]

OPTIONS:
  -p, --path <path>        Repository path to analyze (default: current directory)
  -d, --depth <level>      Analysis depth: quick, comprehensive (default: comprehensive)
  -f, --focus <area>       Focus area: all, constraints, opportunities, recommendations (default: all)
  -r, --research-mode      Enable research-backed analysis with market insights
  -o, --output <path>      Output file path (default: ./ai-enablement-report.json)
  --format <format>        Output format: json, markdown, html (default: json)
  -h, --help               Show this help message

EXAMPLES:
  ai-enablement-intelligence
  ai-enablement-intelligence ./my-project
  ai-enablement-intelligence --depth quick --focus constraints
  ai-enablement-intelligence --research-mode --output report.json
  ai-enablement-intelligence --format markdown --output report.md

FOCUS AREAS:
  all              - Complete analysis (context, constraints, opportunities, recommendations)
  constraints      - Focus on constraint discovery and analysis
  opportunities     - Focus on AI opportunity mapping
  recommendations  - Focus on enablement recommendations and implementation

ANALYSIS DEPTH:
  quick            - Fast analysis with key insights (2-5 minutes)
  comprehensive    - Deep analysis with detailed recommendations (5-15 minutes)

OUTPUT FORMATS:
  json             - Machine-readable JSON format
  markdown         - Human-readable Markdown format
  html             - Interactive HTML report

For more information, see the skill documentation.
`);
}

/**
 * Validate repository path
 */
function validateRepositoryPath(repositoryPath) {
  if (!fs.existsSync(repositoryPath)) {
    console.error(
      `❌ Error: Repository path does not exist: ${repositoryPath}`
    );
    process.exit(1);
  }

  const gitPath = path.join(repositoryPath, '.git');
  if (!fs.existsSync(gitPath)) {
    console.warn(`⚠️  Warning: Not a git repository: ${repositoryPath}`);
    console.warn('   Some analysis features may be limited.');
  }

  return repositoryPath;
}

/**
 * Save report to file
 */
function saveReport(report, outputPath, format) {
  let content;
  let extension = path.extname(outputPath);

  // Determine format from file extension if not specified
  if (!format && extension) {
    format = extension.slice(1).toLowerCase();
  }

  switch (format) {
    case 'json':
      content = JSON.stringify(report, null, 2);
      if (!extension) outputPath += '.json';
      break;
    case 'markdown':
    case 'md':
      content = generateMarkdownReport(report);
      if (!extension) outputPath += '.md';
      break;
    case 'html':
      content = generateHTMLReport(report);
      if (!extension) outputPath += '.html';
      break;
    default:
      console.error(`❌ Error: Unsupported format: ${format}`);
      process.exit(1);
  }

  try {
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`📄 Report saved to: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error saving report: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(report) {
  const {
    executiveSummary,
    repositoryAnalysis,
    constraintAnalysis,
    opportunityMapping,
    recommendations,
  } = report;

  return `# AI Enablement Intelligence Report

Generated on: ${new Date().toISOString()}

## Executive Summary

### Repository Profile
- **Technology**: ${executiveSummary.repositoryProfile.technology}
- **Framework**: ${executiveSummary.repositoryProfile.framework}
- **Team Size**: ${executiveSummary.repositoryProfile.teamSize}
- **Maturity**: ${executiveSummary.repositoryProfile.maturity}

### AI Readiness
- **Score**: ${executiveSummary.aiReadiness.score}/100
- **Level**: ${executiveSummary.aiReadiness.level}
- **Key Factors**: ${(executiveSummary.aiReadiness.keyFactors || []).join(', ')}

### Constraint Analysis
- **Total Constraints**: ${executiveSummary.constraintProfile.totalConstraints}
- **High Severity**: ${executiveSummary.constraintProfile.highSeverityConstraints}
- **Feasibility**: ${executiveSummary.constraintProfile.feasibility}

### Opportunities
- **Total Opportunities**: ${executiveSummary.opportunitySummary.totalOpportunities}
- **High Impact**: ${executiveSummary.opportunitySummary.highImpact}
- **Quick Wins**: ${executiveSummary.opportunitySummary.quickWins}

### Recommendations
- **Total Recommendations**: ${executiveSummary.recommendationSummary.totalRecommendations}
- **High Priority**: ${executiveSummary.recommendationSummary.highPriority}
- **Immediate Value**: ${executiveSummary.recommendationSummary.immediateValue}

## Repository Analysis

### Technology Stack
${(repositoryAnalysis.technologyStack.languages || []).map(lang => `- **${lang}**`).join('\n')}

### Team Patterns
- **Team Size**: ${repositoryAnalysis.teamPatterns.teamSize}
- **Commit Frequency**: ${repositoryAnalysis.teamPatterns.commitFrequency} commits/month
- **Collaboration Level**: ${repositoryAnalysis.teamPatterns.collaborationLevel}

### Development Maturity
- **CI/CD**: ${repositoryAnalysis.developmentMaturity.ciCd.maturity}
- **Testing**: ${repositoryAnalysis.developmentMaturity.testing.maturity}
- **Documentation**: ${repositoryAnalysis.developmentMaturity.documentation.maturity}
- **Code Quality**: ${repositoryAnalysis.developmentMaturity.codeQuality.maturity}

## Constraint Analysis

### External Constraints
${Object.entries(constraintAnalysis.externalConstraints)
  .map(
    ([category, constraint]) => `
#### ${category}
- **Severity**: ${constraint.severity}
- **Impact**: ${(constraint.impact || []).join(', ')}
`
  )
  .join('\n')}

### Technical Constraints
${Object.entries(constraintAnalysis.technicalConstraints)
  .map(
    ([category, constraint]) => `
#### ${category}
- **Severity**: ${constraint.severity}
- **Impact**: ${(constraint.impact || []).join(', ')}
`
  )
  .join('\n')}

## AI Opportunities

${opportunityMapping
  .slice(0, 10)
  .map(
    (opportunity, index) => `
### ${index + 1}. ${opportunity.title}
**Category**: ${opportunity.category}  
**Impact**: ${opportunity.impact} | **Effort**: ${opportunity.effort}

${opportunity.description}

**Tools**: ${(opportunity.tools || []).join(', ')}
**Benefits**: ${(opportunity.benefits || []).join(', ')}
`
  )
  .join('\n')}

## Recommendations

${recommendations
  .slice(0, 10)
  .map(
    (rec, index) => `
### ${index + 1}. ${rec.title}
**Priority**: ${rec.priority} | **Time to Value**: ${rec.timeToValue}

${rec.description}

**Tools**: ${(rec.tools || []).join(', ')}
**Benefits**: ${(rec.benefits || []).join(', ')}
`
  )
  .join('\n')}

## Implementation Timeline

${Object.entries(executiveSummary.implementationTimeline)
  .map(
    ([phase, details]) => `
### ${details.name} (${details.duration})
${(details.items || []).map(item => `- ${item}`).join('\n')}

*Value*: ${details.value}
`
  )
  .join('\n')}

## Next Steps

${report.nextSteps
  .map(
    step => `
### ${step.step}. ${step.title}
**Timeframe**: ${step.timeframe}  
**Owner**: ${step.owner}

${step.description}

**Dependencies**: ${step.dependencies && step.dependencies.length > 0 ? step.dependencies.join(', ') : 'None'}
`
  )
  .join('\n')}

## Success Metrics

### Productivity
${(report.successMetrics.productivity || []).map(metric => `- ${metric}`).join('\n')}

### Quality
${(report.successMetrics.quality || []).map(metric => `- ${metric}`).join('\n')}

### Adoption
${(report.successMetrics.adoption || []).map(metric => `- ${metric}`).join('\n')}

### Business
${(report.successMetrics.business || []).map(metric => `- ${metric}`).join('\n')}

---
*Report generated by AI Enablement Intelligence skill*
`;
}

/**
 * Generate HTML report
 */
function generateHTMLReport(report) {
  const {
    executiveSummary,
    repositoryAnalysis,
    constraintAnalysis,
    opportunityMapping,
    recommendations,
  } = report;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Enablement Intelligence Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
        .section { background: white; padding: 25px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .metric { display: inline-block; margin: 10px 20px 10px 0; }
        .metric-value { font-size: 2em; font-weight: bold; color: #667eea; }
        .metric-label { font-size: 0.9em; color: #666; }
        .opportunity, .recommendation { border-left: 4px solid #667eea; padding-left: 20px; margin: 20px 0; }
        .high-priority { border-left-color: #e53e3e; }
        .medium-priority { border-left-color: #dd6b20; }
        .low-priority { border-left-color: #38a169; }
        .timeline { display: flex; justify-content: space-between; margin: 20px 0; }
        .phase { flex: 1; margin: 0 10px; padding: 15px; background: #f7fafc; border-radius: 5px; }
        h1, h2, h3 { color: #2d3748; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; }
        .badge-high { background: #fed7d7; color: #c53030; }
        .badge-medium { background: #feebc8; color: #c05621; }
        .badge-low { background: #c6f6d5; color: #2f855a; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 AI Enablement Intelligence Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
            <h2>Executive Summary</h2>
            <div class="metric">
                <div class="metric-value">${executiveSummary.aiReadiness.score}</div>
                <div class="metric-label">AI Readiness Score</div>
            </div>
            <div class="metric">
                <div class="metric-value">${executiveSummary.constraintProfile.totalConstraints}</div>
                <div class="metric-label">Total Constraints</div>
            </div>
            <div class="metric">
                <div class="metric-value">${executiveSummary.opportunitySummary.totalOpportunities}</div>
                <div class="metric-label">AI Opportunities</div>
            </div>
            <div class="metric">
                <div class="metric-value">${executiveSummary.recommendationSummary.highPriority}</div>
                <div class="metric-label">High Priority Actions</div>
            </div>
        </div>

        <div class="section">
            <h2>Repository Profile</h2>
            <p><strong>Technology:</strong> ${executiveSummary.repositoryProfile.technology}</p>
            <p><strong>Framework:</strong> ${executiveSummary.repositoryProfile.framework}</p>
            <p><strong>Team Size:</strong> ${executiveSummary.repositoryProfile.teamSize}</p>
            <p><strong>Maturity:</strong> ${executiveSummary.repositoryProfile.maturity}</p>
        </div>

        <div class="section">
            <h2>AI Opportunities</h2>
            ${opportunityMapping
              .slice(0, 5)
              .map(
                opportunity => `
                <div class="opportunity">
                    <h3>${opportunity.title}</h3>
                    <p><strong>Category:</strong> ${opportunity.category}</p>
                    <p><strong>Impact:</strong> <span class="badge badge-${opportunity.impact}">${opportunity.impact}</span></p>
                    <p><strong>Effort:</strong> <span class="badge badge-${opportunity.effort}">${opportunity.effort}</span></p>
                    <p>${opportunity.description}</p>
                    <p><strong>Tools:</strong> ${opportunity.tools.join(', ')}</p>
                </div>
            `
              )
              .join('')}
        </div>

        <div class="section">
            <h2>Recommendations</h2>
            ${recommendations
              .slice(0, 5)
              .map(
                rec => `
                <div class="recommendation ${rec.priority}-priority">
                    <h3>${rec.title}</h3>
                    <p><strong>Priority:</strong> <span class="badge badge-${rec.priority}">${rec.priority}</span></p>
                    <p><strong>Time to Value:</strong> ${rec.timeToValue}</p>
                    <p>${rec.description}</p>
                    <p><strong>Tools:</strong> ${rec.tools.join(', ')}</p>
                </div>
            `
              )
              .join('')}
        </div>

        <div class="section">
            <h2>Implementation Timeline</h2>
            <div class="timeline">
                ${Object.entries(executiveSummary.implementationTimeline)
                  .map(
                    ([phase, details]) => `
                    <div class="phase">
                        <h4>${details.name}</h4>
                        <p><strong>${details.duration}</strong></p>
                        <p>${details.value}</p>
                    </div>
                `
                  )
                  .join('')}
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Main execution function
 */
async function main() {
  try {
    const options = parseArguments();

    // Validate repository path
    options.repositoryPath = validateRepositoryPath(options.repositoryPath);

    console.log('🚀 AI Enablement Intelligence Analysis');
    console.log('='.repeat(50));
    console.log(`📁 Repository: ${path.resolve(options.repositoryPath)}`);
    console.log(`🔍 Depth: ${options.depth}`);
    console.log(`🎯 Focus: ${options.focus}`);
    console.log(`📄 Output: ${options.outputPath}`);
    console.log('='.repeat(50));

    // Create and execute analysis
    const aiEnablement = new AIEnablementIntelligence(options);
    const report = await aiEnablement.execute();

    // Save report
    saveReport(report, options.outputPath, options.format);

    // Show summary
    console.log('\n📊 Analysis Summary:');
    console.log(
      `   AI Readiness: ${report.executiveSummary.aiReadiness.readiness} (${report.executiveSummary.aiReadiness.score}/100)`
    );
    console.log(
      `   Constraints: ${report.executiveSummary.constraintProfile.totalConstraints} total, ${report.executiveSummary.constraintProfile.highSeverityConstraints} high severity`
    );
    console.log(
      `   Opportunities: ${report.executiveSummary.opportunitySummary.totalOpportunities} identified`
    );
    console.log(
      `   Recommendations: ${report.executiveSummary.recommendationSummary.totalRecommendations} prioritized`
    );

    console.log('\n🎯 Next Steps:');
    report.nextSteps.slice(0, 3).forEach(step => {
      console.log(`   ${step.step}. ${step.title} (${step.timeframe})`);
    });

    console.log('\n✅ AI Enablement Intelligence Analysis Complete!');
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run main function if called directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  parseArguments,
  generateMarkdownReport,
  generateHTMLReport,
};

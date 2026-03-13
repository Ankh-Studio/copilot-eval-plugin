/**
 * ADR Lifecycle Management System
 *
 * Manages the complete lifecycle of Architecture Decision Records
 * including relationships, status tracking, and automated workflows.
 */

const fs = require('fs');
const path = require('path');

class LifecycleManager {
  constructor(options = {}) {
    this.adrPath = options.adrPath || path.join(process.cwd(), 'docs', 'adr');
    this.indexFile = path.join(this.adrPath, 'index.json');
    this.relationshipsFile = path.join(this.adrPath, 'relationships.json');
    this.lifecycle = {
      statuses: [
        'Proposed',
        'Accepted',
        'Implemented',
        'Superseded',
        'Deprecated',
      ],
      transitions: {
        Proposed: ['Accepted', 'Deprecated'],
        Accepted: ['Implemented', 'Superseded', 'Deprecated'],
        Implemented: ['Superseded', 'Deprecated'],
        Superseded: ['Deprecated'],
        Deprecated: [],
      },
    };
  }

  /**
   * Initialize ADR lifecycle management
   */
  async initialize() {
    console.log('🔧 Initializing ADR lifecycle management...');

    // Ensure ADR directory exists
    if (!fs.existsSync(this.adrPath)) {
      fs.mkdirSync(this.adrPath, { recursive: true });
    }

    // Initialize index if it doesn't exist
    if (!fs.existsSync(this.indexFile)) {
      await this.createIndex();
    }

    // Initialize relationships if they don't exist
    if (!fs.existsSync(this.relationshipsFile)) {
      await this.createRelationshipsFile();
    }

    console.log('✅ ADR lifecycle management initialized');
  }

  /**
   * Create ADR index file
   */
  async createIndex() {
    const index = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      adrs: {},
      statistics: {
        total: 0,
        byStatus: {},
        byDate: {},
        byAuthor: {},
      },
    };

    fs.writeFileSync(this.indexFile, JSON.stringify(index, null, 2));
  }

  /**
   * Create relationships file
   */
  async createRelationshipsFile() {
    const relationships = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      superseded: {},
      dependencies: {},
      conflicts: {},
      references: {},
    };

    fs.writeFileSync(
      this.relationshipsFile,
      JSON.stringify(relationships, null, 2)
    );
  }

  /**
   * Register a new ADR in the lifecycle system
   */
  async registerADR(filePath, metadata = {}) {
    const index = this.loadIndex();
    const adrId = this.extractADRId(filePath);

    // Parse ADR content
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = this.parseADRContent(content);

    // Create ADR entry
    const adrEntry = {
      id: adrId,
      title: parsed.title || metadata.title,
      status: parsed.status || 'Proposed',
      date: parsed.date || new Date().toISOString().split('T')[0],
      confidence: parsed.confidence,
      author: metadata.author || 'Unknown',
      filePath: path.relative(this.adrPath, filePath),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: metadata.tags || [],
      stakeholders: metadata.stakeholders || [],
      relationships: {
        superseded: [],
        supersededBy: [],
        dependsOn: [],
        requiredBy: [],
        conflicts: [],
        references: [],
      },
    };

    index.adrs[adrId] = adrEntry;
    index.lastUpdated = new Date().toISOString();

    // Update statistics
    this.updateStatistics(index);

    // Save index
    fs.writeFileSync(this.indexFile, JSON.stringify(index, null, 2));

    console.log(`📝 Registered ADR: ${adrId}`);
    return adrEntry;
  }

  /**
   * Update ADR status
   */
  async updateStatus(adrId, newStatus, reason = '') {
    const index = this.loadIndex();

    if (!index.adrs[adrId]) {
      throw new Error(`ADR ${adrId} not found`);
    }

    const currentStatus = index.adrs[adrId].status;

    // Validate transition
    if (!this.isValidTransition(currentStatus, newStatus)) {
      throw new Error(
        `Invalid status transition from ${currentStatus} to ${newStatus}`
      );
    }

    // Update status
    index.adrs[adrId].status = newStatus;
    index.adrs[adrId].updatedAt = new Date().toISOString();

    // Add status change history
    if (!index.adrs[adrId].statusHistory) {
      index.adrs[adrId].statusHistory = [];
    }

    index.adrs[adrId].statusHistory.push({
      from: currentStatus,
      to: newStatus,
      reason: reason,
      timestamp: new Date().toISOString(),
    });

    index.lastUpdated = new Date().toISOString();
    this.updateStatistics(index);

    fs.writeFileSync(this.indexFile, JSON.stringify(index, null, 2));

    console.log(
      `🔄 Updated ADR ${adrId} status: ${currentStatus} → ${newStatus}`
    );

    // Trigger automated actions based on status
    await this.handleStatusChange(adrId, newStatus, reason);

    return index.adrs[adrId];
  }

  /**
   * Create relationship between ADRs
   */
  async createRelationship(fromADR, toADR, type, description = '') {
    const relationships = this.loadRelationships();
    const index = this.loadIndex();

    // Validate ADRs exist
    if (!index.adrs[fromADR]) {
      throw new Error(`Source ADR ${fromADR} not found`);
    }
    if (!index.adrs[toADR]) {
      throw new Error(`Target ADR ${toADR} not found`);
    }

    // Create relationship
    if (!relationships[type]) {
      relationships[type] = {};
    }

    if (!relationships[type][fromADR]) {
      relationships[type][fromADR] = [];
    }

    relationships[type][fromADR].push({
      to: toADR,
      description: description,
      createdAt: new Date().toISOString(),
    });

    // Update reverse relationship for bidirectional types
    if (['superseded', 'dependencies', 'conflicts'].includes(type)) {
      const reverseType = this.getReverseRelationshipType(type);
      if (!relationships[reverseType]) {
        relationships[reverseType] = {};
      }
      if (!relationships[reverseType][toADR]) {
        relationships[reverseType][toADR] = [];
      }

      relationships[reverseType][toADR].push({
        to: fromADR,
        description: description,
        createdAt: new Date().toISOString(),
      });
    }

    relationships.lastUpdated = new Date().toISOString();
    fs.writeFileSync(
      this.relationshipsFile,
      JSON.stringify(relationships, null, 2)
    );

    // Update ADR entries
    index.adrs[fromADR].relationships[type].push(toADR);
    if (type === 'superseded') {
      index.adrs[toADR].relationships.supersededBy.push(fromADR);
    }

    fs.writeFileSync(this.indexFile, JSON.stringify(index, null, 2));

    console.log(`🔗 Created relationship: ${fromADR} ${type} ${toADR}`);
  }

  /**
   * Get ADR lifecycle report
   */
  async getLifecycleReport() {
    const index = this.loadIndex();
    const relationships = this.loadRelationships();

    const report = {
      summary: this.generateSummary(index),
      statusDistribution: this.getStatusDistribution(index),
      timeline: this.generateTimeline(index),
      relationships: this.analyzeRelationships(relationships),
      recommendations: this.generateLifecycleRecommendations(index),
      healthMetrics: this.calculateHealthMetrics(index),
      generatedAt: new Date().toISOString(),
    };

    return report;
  }

  /**
   * Find ADRs that need attention
   */
  async findStaleADRs(daysThreshold = 90) {
    const index = this.loadIndex();
    const staleADRs = [];
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);

    Object.entries(index.adrs).forEach(([adrId, adr]) => {
      const lastUpdated = new Date(adr.updatedAt);

      if (lastUpdated < thresholdDate) {
        const daysOld = Math.floor(
          (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
        );

        staleADRs.push({
          id: adrId,
          title: adr.title,
          status: adr.status,
          daysOld: daysOld,
          lastUpdated: adr.updatedAt,
          recommendations: this.getStaleRecommendations(adr, daysOld),
        });
      }
    });

    return staleADRs.sort((a, b) => b.daysOld - a.daysOld);
  }

  /**
   * Automated workflow for ADR review
   */
  async runAutomatedReview() {
    console.log('🤖 Running automated ADR review...');

    const issues = [];
    const recommendations = [];

    // Check for stale ADRs
    const staleADRs = await this.findStaleADRs();
    if (staleADRs.length > 0) {
      issues.push({
        type: 'stale-adrs',
        count: staleADRs.length,
        description: `${staleADRs.length} ADRs haven't been updated in over 90 days`,
        items: staleADRs,
      });

      recommendations.push({
        priority: 'Medium',
        action: 'Review stale ADRs',
        description:
          'Review and update stale ADRs or mark as deprecated if no longer relevant',
      });
    }

    // Check for orphaned ADRs (no relationships)
    const index = this.loadIndex();
    const orphanedADRs = Object.entries(index.adrs).filter(([id, adr]) => {
      const hasRelationships = Object.values(adr.relationships).some(
        rels => rels.length > 0
      );
      return !hasRelationships && adr.status === 'Accepted';
    });

    if (orphanedADRs.length > 0) {
      issues.push({
        type: 'orphaned-adrs',
        count: orphanedADRs.length,
        description: `${orphanedADRs.length} accepted ADRs have no relationships`,
        items: orphanedADRs.map(([id, adr]) => ({ id, title: adr.title })),
      });

      recommendations.push({
        priority: 'Low',
        action: 'Add relationships to orphaned ADRs',
        description:
          'Connect orphaned ADRs to related decisions or mark as standalone',
      });
    }

    // Check for implementation gaps
    const implementationGaps = Object.entries(index.adrs).filter(
      ([id, adr]) => adr.status === 'Accepted' && !adr.implementationDate
    );

    if (implementationGaps.length > 0) {
      issues.push({
        type: 'implementation-gaps',
        count: implementationGaps.length,
        description: `${implementationGaps.length} accepted ADRs lack implementation tracking`,
        items: implementationGaps.map(([id, adr]) => ({
          id,
          title: adr.title,
          date: adr.date,
        })),
      });

      recommendations.push({
        priority: 'High',
        action: 'Track ADR implementations',
        description:
          'Update accepted ADRs with implementation dates and status',
      });
    }

    const review = {
      timestamp: new Date().toISOString(),
      issues: issues,
      recommendations: recommendations,
      summary: {
        totalIssues: issues.length,
        highPriority: recommendations.filter(r => r.priority === 'High').length,
        mediumPriority: recommendations.filter(r => r.priority === 'Medium')
          .length,
        lowPriority: recommendations.filter(r => r.priority === 'Low').length,
      },
    };

    console.log(`📋 Review completed: ${issues.length} issues found`);
    return review;
  }

  /**
   * Load ADR index
   */
  loadIndex() {
    try {
      return JSON.parse(fs.readFileSync(this.indexFile, 'utf8'));
    } catch (error) {
      throw new Error('Failed to load ADR index: ' + error.message);
    }
  }

  /**
   * Load relationships
   */
  loadRelationships() {
    try {
      return JSON.parse(fs.readFileSync(this.relationshipsFile, 'utf8'));
    } catch (error) {
      throw new Error('Failed to load relationships: ' + error.message);
    }
  }

  /**
   * Extract ADR ID from file path
   */
  extractADRId(filePath) {
    const basename = path.basename(filePath, '.md');
    const match = basename.match(/^(\d+)-(.+)/);
    if (match) {
      return `ADR-${match[1].padStart(3, '0')}-${match[2]}`;
    }
    return basename;
  }

  /**
   * Parse ADR content
   */
  parseADRContent(content) {
    const parsed = {
      title: '',
      status: '',
      date: '',
      confidence: '',
    };

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) parsed.title = titleMatch[1].trim();

    // Extract metadata
    const statusMatch = content.match(/\*\*Status:\*\*\s+(.+)/i);
    if (statusMatch) parsed.status = statusMatch[1].trim();

    const dateMatch = content.match(/\*\*Date:\*\*\s+(.+)/i);
    if (dateMatch) parsed.date = dateMatch[1].trim();

    const confidenceMatch = content.match(/\*\*Confidence:\*\*\s+(.+)/i);
    if (confidenceMatch) parsed.confidence = confidenceMatch[1].trim();

    return parsed;
  }

  /**
   * Validate status transition
   */
  isValidTransition(fromStatus, toStatus) {
    return this.lifecycle.transitions[fromStatus]?.includes(toStatus) || false;
  }

  /**
   * Get reverse relationship type
   */
  getReverseRelationshipType(type) {
    const reverseMap = {
      superseded: 'supersededBy',
      dependencies: 'requiredBy',
      conflicts: 'conflicts',
      references: 'references',
    };
    return reverseMap[type] || type;
  }

  /**
   * Update statistics in index
   */
  updateStatistics(index) {
    const adrs = Object.values(index.adrs);

    index.statistics = {
      total: adrs.length,
      byStatus: {},
      byDate: {},
      byAuthor: {},
    };

    adrs.forEach(adr => {
      // By status
      index.statistics.byStatus[adr.status] =
        (index.statistics.byStatus[adr.status] || 0) + 1;

      // By date
      const month = adr.date.substring(0, 7); // YYYY-MM
      index.statistics.byDate[month] =
        (index.statistics.byDate[month] || 0) + 1;

      // By author
      index.statistics.byAuthor[adr.author] =
        (index.statistics.byAuthor[adr.author] || 0) + 1;
    });
  }

  /**
   * Handle automated actions on status change
   */
  async handleStatusChange(adrId, newStatus, reason) {
    // Log status change
    const logEntry = {
      timestamp: new Date().toISOString(),
      adrId: adrId,
      status: newStatus,
      reason: reason,
    };

    const logFile = path.join(this.adrPath, 'status-changes.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

    // Trigger notifications or other automated actions here
    if (newStatus === 'Implemented') {
      console.log(`🎉 ADR ${adrId} has been implemented!`);
    }
  }

  /**
   * Generate summary statistics
   */
  generateSummary(index) {
    const adrs = Object.values(index.adrs);

    return {
      totalADRs: adrs.length,
      activeADRs: adrs.filter(adr =>
        ['Proposed', 'Accepted', 'Implemented'].includes(adr.status)
      ).length,
      averageAge: this.calculateAverageAge(adrs),
      mostCommonStatus: this.getMostCommonStatus(index.statistics.byStatus),
      lastUpdated: index.lastUpdated,
    };
  }

  /**
   * Get status distribution
   */
  getStatusDistribution(index) {
    return index.statistics.byStatus;
  }

  /**
   * Generate timeline
   */
  generateTimeline(index) {
    const timeline = {};

    Object.entries(index.statistics.byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([date, count]) => {
        timeline[date] = count;
      });

    return timeline;
  }

  /**
   * Analyze relationships
   */
  analyzeRelationships(relationships) {
    const analysis = {
      totalRelationships: 0,
      byType: {},
      complexity: 'low',
    };

    Object.entries(relationships).forEach(([type, rels]) => {
      if (type !== 'version' && type !== 'lastUpdated') {
        const count = Object.values(rels).reduce(
          (sum, arr) => sum + arr.length,
          0
        );
        analysis.byType[type] = count;
        analysis.totalRelationships += count;
      }
    });

    // Determine complexity
    if (analysis.totalRelationships > 20) {
      analysis.complexity = 'high';
    } else if (analysis.totalRelationships > 10) {
      analysis.complexity = 'medium';
    }

    return analysis;
  }

  /**
   * Generate lifecycle recommendations
   */
  generateLifecycleRecommendations(index) {
    const recommendations = [];
    const adrs = Object.values(index.adrs);

    // Check for old proposed ADRs
    const oldProposed = adrs.filter(
      adr =>
        adr.status === 'Proposed' &&
        new Date(adr.date) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (oldProposed.length > 0) {
      recommendations.push({
        type: 'action-required',
        priority: 'High',
        description: `${oldProposed.length} proposed ADRs are older than 30 days`,
        action: 'Review and decide on old proposed ADRs',
      });
    }

    return recommendations;
  }

  /**
   * Calculate health metrics
   */
  calculateHealthMetrics(index) {
    const adrs = Object.values(index.adrs);

    return {
      decisionVelocity: this.calculateDecisionVelocity(adrs),
      implementationRate: this.calculateImplementationRate(adrs),
      relationshipDensity: this.calculateRelationshipDensity(adrs),
    };
  }

  /**
   * Calculate average age of ADRs
   */
  calculateAverageAge(adrs) {
    if (adrs.length === 0) return 0;

    const totalAge = adrs.reduce((sum, adr) => {
      const created = new Date(adr.date);
      const age = Date.now() - created.getTime();
      return sum + age;
    }, 0);

    return Math.floor(totalAge / adrs.length / (1000 * 60 * 60 * 24)); // days
  }

  /**
   * Get most common status
   */
  getMostCommonStatus(byStatus) {
    const entries = Object.entries(byStatus);
    if (entries.length === 0) return 'None';

    return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }

  /**
   * Get recommendations for stale ADRs
   */
  getStaleRecommendations(adr, daysOld) {
    const recommendations = [];

    if (adr.status === 'Proposed') {
      recommendations.push('Review and accept or reject this proposal');
    } else if (adr.status === 'Accepted') {
      recommendations.push(
        'Update implementation status or mark as superseded'
      );
    } else if (adr.status === 'Implemented') {
      recommendations.push('Review if still relevant or mark as deprecated');
    }

    return recommendations;
  }

  /**
   * Calculate decision velocity (time from proposed to decision)
   */
  calculateDecisionVelocity(adrs) {
    const decidedADRs = adrs.filter(adr =>
      ['Accepted', 'Implemented', 'Superseded'].includes(adr.status)
    );

    if (decidedADRs.length === 0) return 0;

    const totalDays = decidedADRs.reduce((sum, adr) => {
      const created = new Date(adr.date);
      const days = Math.floor(
        (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)
      );
      return sum + days;
    }, 0);

    return Math.floor(totalDays / decidedADRs.length);
  }

  /**
   * Calculate implementation rate
   */
  calculateImplementationRate(adrs) {
    const accepted = adrs.filter(adr => adr.status === 'Accepted').length;
    const implemented = adrs.filter(adr => adr.status === 'Implemented').length;

    return accepted > 0 ? Math.round((implemented / accepted) * 100) : 0;
  }

  /**
   * Calculate relationship density
   */
  calculateRelationshipDensity(adrs) {
    const totalRelationships = adrs.reduce((sum, adr) => {
      return (
        sum +
        Object.values(adr.relationships).reduce(
          (relSum, rels) => relSum + rels.length,
          0
        )
      );
    }, 0);

    const maxRelationships = adrs.length * (adrs.length - 1);
    return maxRelationships > 0
      ? Math.round((totalRelationships / maxRelationships) * 100)
      : 0;
  }
}

// Export for use in skill
module.exports = { LifecycleManager };

// CLI usage for testing
if (require.main === module) {
  const manager = new LifecycleManager();

  manager
    .initialize()
    .then(() => manager.getLifecycleReport())
    .then(report => {
      console.log('\n📊 ADR Lifecycle Report');
      console.log('========================');

      console.log('\n📈 Summary:');
      console.log(`Total ADRs: ${report.summary.totalADRs}`);
      console.log(`Active ADRs: ${report.summary.activeADRs}`);
      console.log(`Average Age: ${report.summary.averageAge} days`);
      console.log(`Most Common Status: ${report.summary.mostCommonStatus}`);

      console.log('\n📊 Status Distribution:');
      Object.entries(report.statusDistribution).forEach(([status, count]) => {
        console.log(`  ${status}: ${count}`);
      });

      console.log('\n🔗 Relationships:');
      console.log(`Total: ${report.relationships.totalRelationships}`);
      console.log(`Complexity: ${report.relationships.complexity}`);

      Object.entries(report.relationships.byType).forEach(([type, count]) => {
        console.log(`  ${type}: ${count}`);
      });

      console.log('\n💚 Health Metrics:');
      console.log(
        `Decision Velocity: ${report.healthMetrics.decisionVelocity} days`
      );
      console.log(
        `Implementation Rate: ${report.healthMetrics.implementationRate}%`
      );
      console.log(
        `Relationship Density: ${report.healthMetrics.relationshipDensity}%`
      );

      if (report.recommendations.length > 0) {
        console.log('\n💡 Recommendations:');
        report.recommendations.forEach(rec => {
          console.log(`  [${rec.priority}] ${rec.description}`);
        });
      }
    })
    .catch(error => {
      console.error('Lifecycle report failed:', error);
      process.exit(1);
    });
}

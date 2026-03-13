/**
 * Performance Optimizer for ADR Analysis
 *
 * Optimizes repository analysis and ADR processing for large repositories
 * with caching, parallel processing, and resource management.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class PerformanceOptimizer {
  constructor(options = {}) {
    this.cacheDir =
      options.cacheDir || path.join(process.cwd(), '.cache', 'adr-analysis');
    this.maxCacheSize = options.maxCacheSize || 100 * 1024 * 1024; // 100MB
    this.parallelWorkers = options.parallelWorkers || 4;
    this.chunkSize = options.chunkSize || 50;
    this.enableCaching = options.enableCaching !== false;

    this.cache = new Map();
    this.stats = {
      cacheHits: 0,
      cacheMisses: 0,
      filesProcessed: 0,
      processingTime: 0,
      memoryUsage: 0,
    };

    this.initializeCache();
  }

  /**
   * Initialize cache directory and load existing cache
   */
  initializeCache() {
    if (!this.enableCaching) return;

    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir, { recursive: true });
      }

      // Load cache index
      const indexPath = path.join(this.cacheDir, 'cache-index.json');
      if (fs.existsSync(indexPath)) {
        const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        Object.entries(index).forEach(([key, entry]) => {
          if (this.isValidCacheEntry(entry)) {
            this.cache.set(key, entry);
          }
        });
      }
    } catch (error) {
      console.warn('Cache initialization failed:', error.message);
    }
  }

  /**
   * Check if cache entry is still valid
   */
  isValidCacheEntry(entry) {
    if (!entry || !entry.path || !entry.hash) return false;

    const filePath = path.resolve(process.cwd(), entry.path);
    if (!fs.existsSync(filePath)) return false;

    const currentHash = this.hashFile(filePath);
    return currentHash === entry.hash;
  }

  /**
   * Hash file content for cache validation
   */
  hashFile(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('md5').update(content).digest('hex');
    } catch (error) {
      return null;
    }
  }

  /**
   * Get cached analysis result
   */
  getCached(filePath, analysisType) {
    if (!this.enableCaching) return null;

    const key = `${analysisType}:${filePath}`;
    const entry = this.cache.get(key);

    if (entry && this.isValidCacheEntry(entry)) {
      this.stats.cacheHits++;
      return entry.result;
    }

    this.stats.cacheMisses++;
    return null;
  }

  /**
   * Store analysis result in cache
   */
  setCached(filePath, analysisType, result) {
    if (!this.enableCaching) return;

    const key = `${analysisType}:${filePath}`;
    const entry = {
      path: path.relative(process.cwd(), filePath),
      hash: this.hashFile(filePath),
      result: result,
      timestamp: Date.now(),
    };

    this.cache.set(key, entry);
    this.saveCacheIndex();

    // Clean cache if too large
    this.cleanCache();
  }

  /**
   * Save cache index to disk
   */
  saveCacheIndex() {
    try {
      const indexPath = path.join(this.cacheDir, 'cache-index.json');
      const index = {};

      this.cache.forEach((entry, key) => {
        index[key] = {
          path: entry.path,
          hash: entry.hash,
          timestamp: entry.timestamp,
        };
      });

      fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    } catch (error) {
      console.warn('Failed to save cache index:', error.message);
    }
  }

  /**
   * Clean cache if it exceeds size limit
   */
  cleanCache() {
    const totalSize = this.calculateCacheSize();

    if (totalSize > this.maxCacheSize) {
      const entries = Array.from(this.cache.entries()).sort(
        (a, b) => a[1].timestamp - b[1].timestamp
      );

      // Remove oldest entries until under limit
      let removed = 0;
      while (
        totalSize - removed > this.maxCacheSize * 0.8 &&
        entries.length > 0
      ) {
        const [key] = entries.shift();
        this.cache.delete(key);
        removed += 1000; // Estimate
      }

      this.saveCacheIndex();
    }
  }

  /**
   * Estimate cache size
   */
  calculateCacheSize() {
    let size = 0;
    this.cache.forEach(entry => {
      size += JSON.stringify(entry.result).length;
    });
    return size;
  }

  /**
   * Optimized repository analysis with caching and parallel processing
   */
  async analyzeRepository(repoPath = process.cwd()) {
    const startTime = Date.now();

    console.log('🚀 Starting optimized repository analysis...');

    // Get all relevant files
    const files = await this.getRelevantFiles(repoPath);
    console.log(`📁 Found ${files.length} relevant files`);

    // Process files in parallel chunks
    const results = await this.processFilesInChunks(files);

    // Generate optimized report
    const report = this.generateOptimizedReport(results);

    this.stats.processingTime = Date.now() - startTime;
    this.stats.filesProcessed = files.length;
    this.stats.memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // MB

    console.log(`✅ Analysis completed in ${this.stats.processingTime}ms`);
    console.log(`📊 Cache hit rate: ${this.getCacheHitRate()}%`);
    console.log(`💾 Memory usage: ${this.stats.memoryUsage.toFixed(2)}MB`);

    return report;
  }

  /**
   * Get relevant files for ADR analysis
   */
  async getRelevantFiles(repoPath) {
    const relevantExtensions = [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.md',
      '.yml',
      '.yaml',
    ];
    const relevantDirs = [
      'src',
      'components',
      'lib',
      'utils',
      'config',
      'docs',
    ];
    const excludeDirs = ['node_modules', '.git', 'dist', 'build', 'coverage'];

    const files = [];

    const scanDirectory = (dir, depth = 0) => {
      if (depth > 5) return; // Limit depth for performance

      try {
        const items = fs.readdirSync(dir);

        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            if (
              !excludeDirs.includes(item) &&
              relevantDirs.some(rDir => fullPath.includes(rDir))
            ) {
              scanDirectory(fullPath, depth + 1);
            }
          } else if (stat.isFile()) {
            const ext = path.extname(item);
            if (relevantExtensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(repoPath);
    return files;
  }

  /**
   * Process files in parallel chunks
   */
  async processFilesInChunks(files) {
    const results = [];

    for (let i = 0; i < files.length; i += this.chunkSize) {
      const chunk = files.slice(i, i + this.chunkSize);
      const chunkResults = await this.processChunkParallel(chunk);
      results.push(...chunkResults);

      // Allow garbage collection between chunks
      if (i % (this.chunkSize * 2) === 0) {
        if (global.gc) global.gc();
      }
    }

    return results;
  }

  /**
   * Process chunk of files in parallel
   */
  async processChunkParallel(files) {
    const promises = files.map(file => this.analyzeFileOptimized(file));
    const results = await Promise.allSettled(promises);

    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  }

  /**
   * Optimized file analysis with caching
   */
  async analyzeFileOptimized(filePath) {
    // Check cache first
    const cached = this.getCached(filePath, 'file-analysis');
    if (cached) {
      return cached;
    }

    const result = {
      path: path.relative(process.cwd(), filePath),
      type: path.extname(filePath),
      size: fs.statSync(filePath).size,
      technologies: this.extractTechnologies(filePath),
      patterns: this.identifyPatterns(filePath),
      decisions: this.findDecisions(filePath),
      lastModified: fs.statSync(filePath).mtime,
    };

    // Cache the result
    this.setCached(filePath, 'file-analysis', result);

    return result;
  }

  /**
   * Extract technologies from file (optimized)
   */
  extractTechnologies(filePath) {
    const ext = path.extname(filePath);
    const technologies = [];

    if (ext === '.json' && path.basename(filePath) === 'package.json') {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const pkg = JSON.parse(content);
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };

        // Only check architectural dependencies
        const archDeps = [
          'react',
          'redux',
          'mobx',
          'zustand',
          'react-query',
          'swr',
          'axios',
          'react-router',
          'next',
          'gatsby',
          'styled-components',
          'emotion',
          'tailwind',
          'sass',
          'webpack',
          'vite',
          'babel',
          'typescript',
        ];

        archDeps.forEach(dep => {
          if (deps[dep]) {
            technologies.push({ name: dep, version: deps[dep] });
          }
        });
      } catch (error) {
        // Invalid JSON, skip
      }
    }

    return technologies;
  }

  /**
   * Identify patterns in file (optimized)
   */
  identifyPatterns(filePath) {
    const patterns = [];
    const ext = path.extname(filePath);

    if (['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Quick pattern matching with regex
        const patternMap = [
          {
            name: 'state-management',
            regex: /\b(useState|useReducer|redux|mobx|zustand)\b/,
          },
          {
            name: 'data-fetching',
            regex: /\b(fetch|axios|swr|react-query|apollo)\b/,
          },
          { name: 'routing', regex: /\b(react-router|next\/router|gatsby)\b/ },
          {
            name: 'styling',
            regex: /\b(css|scss|styled-components|emotion|tailwind)\b/,
          },
          { name: 'testing', regex: /\b(jest|test|spec|cypress|playwright)\b/ },
        ];

        patternMap.forEach(({ name, regex }) => {
          if (regex.test(content)) {
            patterns.push(name);
          }
        });
      } catch (error) {
        // Skip files that can't be read
      }
    }

    return patterns;
  }

  /**
   * Find decisions in file (optimized)
   */
  findDecisions(filePath) {
    const decisions = [];
    const ext = path.extname(filePath);

    if (['.js', '.jsx', '.ts', '.tsx', '.md'].includes(ext)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        // Quick scan for decision indicators
        const indicators = [
          'TODO: architecture',
          'TODO: refactor',
          'FIXME: design',
          'NOTE: temporary',
          'HACK:',
          'deprecated',
          'legacy',
        ];

        lines.forEach((line, index) => {
          if (
            indicators.some(indicator =>
              line.toLowerCase().includes(indicator.toLowerCase())
            )
          ) {
            decisions.push({
              line: index + 1,
              content: line.trim(),
              type: this.classifyDecision(line),
            });
          }
        });
      } catch (error) {
        // Skip files that can't be read
      }
    }

    return decisions;
  }

  /**
   * Classify decision type
   */
  classifyDecision(line) {
    if (line.toLowerCase().includes('deprecated')) return 'deprecation';
    if (line.toLowerCase().includes('legacy')) return 'legacy';
    if (line.toLowerCase().includes('temporary')) return 'temporary';
    if (line.toLowerCase().includes('refactor')) return 'refactor';
    return 'general';
  }

  /**
   * Generate optimized analysis report
   */
  generateOptimizedReport(results) {
    const technologies = this.aggregateTechnologies(results);
    const patterns = this.aggregatePatterns(results);
    const decisions = this.aggregateDecisions(results);

    return {
      summary: {
        filesAnalyzed: results.length,
        technologiesFound: technologies.length,
        patternsDetected: patterns.length,
        decisionsIdentified: decisions.length,
        processingTime: this.stats.processingTime,
        cacheHitRate: this.getCacheHitRate(),
      },
      technologies,
      patterns,
      decisions,
      performance: this.stats,
      recommendations: this.generatePerformanceRecommendations(results),
    };
  }

  /**
   * Aggregate technologies from results
   */
  aggregateTechnologies(results) {
    const techMap = new Map();

    results.forEach(result => {
      result.technologies.forEach(tech => {
        if (techMap.has(tech.name)) {
          const existing = techMap.get(tech.name);
          existing.count++;
          existing.files.push(result.path);
        } else {
          techMap.set(tech.name, {
            name: tech.name,
            version: tech.version,
            count: 1,
            files: [result.path],
          });
        }
      });
    });

    return Array.from(techMap.values()).sort((a, b) => b.count - a.count);
  }

  /**
   * Aggregate patterns from results
   */
  aggregatePatterns(results) {
    const patternMap = new Map();

    results.forEach(result => {
      result.patterns.forEach(pattern => {
        if (patternMap.has(pattern)) {
          patternMap.set(pattern, patternMap.get(pattern) + 1);
        } else {
          patternMap.set(pattern, 1);
        }
      });
    });

    return Array.from(patternMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Aggregate decisions from results
   */
  aggregateDecisions(results) {
    const decisions = results.flatMap(result =>
      result.decisions.map(decision => ({
        ...decision,
        file: result.path,
      }))
    );

    return decisions.slice(0, 20); // Limit for performance
  }

  /**
   * Generate performance recommendations
   */
  generatePerformanceRecommendations(results) {
    const recommendations = [];

    if (this.stats.cacheHitRate < 30) {
      recommendations.push({
        type: 'performance',
        recommendation:
          'Low cache hit rate. Consider enabling persistent caching.',
        impact: 'medium',
      });
    }

    if (this.stats.memoryUsage > 100) {
      recommendations.push({
        type: 'memory',
        recommendation:
          'High memory usage detected. Consider reducing chunk size.',
        impact: 'high',
      });
    }

    if (this.stats.processingTime > 10000) {
      recommendations.push({
        type: 'speed',
        recommendation:
          'Slow processing time. Consider increasing parallel workers.',
        impact: 'medium',
      });
    }

    return recommendations;
  }

  /**
   * Get cache hit rate percentage
   */
  getCacheHitRate() {
    const total = this.stats.cacheHits + this.stats.cacheMisses;
    return total > 0 ? Math.round((this.stats.cacheHits / total) * 100) : 0;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    try {
      if (fs.existsSync(this.cacheDir)) {
        fs.rmSync(this.cacheDir, { recursive: true, force: true });
      }
      this.initializeCache();
    } catch (error) {
      console.warn('Failed to clear cache:', error.message);
    }
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      ...this.stats,
      cacheSize: this.calculateCacheSize(),
      cacheEntries: this.cache.size,
    };
  }
}

// Export for use in skill
module.exports = { PerformanceOptimizer };

// CLI usage for testing
if (require.main === module) {
  const optimizer = new PerformanceOptimizer({
    enableCaching: true,
    parallelWorkers: 4,
    chunkSize: 25,
  });

  optimizer
    .analyzeRepository()
    .then(report => {
      console.log('\n📊 Performance-Optimized Analysis Report');
      console.log('==========================================');

      console.log('\n📈 Summary:');
      console.log(`Files analyzed: ${report.summary.filesAnalyzed}`);
      console.log(`Technologies found: ${report.summary.technologiesFound}`);
      console.log(`Patterns detected: ${report.summary.patternsDetected}`);
      console.log(`Processing time: ${report.summary.processingTime}ms`);
      console.log(`Cache hit rate: ${report.summary.cacheHitRate}%`);

      if (report.technologies.length > 0) {
        console.log('\n🔧 Top Technologies:');
        report.technologies.slice(0, 5).forEach(tech => {
          console.log(`  ${tech.name}@${tech.version} (${tech.count} files)`);
        });
      }

      if (report.patterns.length > 0) {
        console.log('\n🎯 Detected Patterns:');
        report.patterns.forEach(pattern => {
          console.log(`  ${pattern.name}: ${pattern.count} occurrences`);
        });
      }

      if (report.recommendations.length > 0) {
        console.log('\n💡 Performance Recommendations:');
        report.recommendations.forEach(rec => {
          console.log(`  [${rec.type}] ${rec.recommendation}`);
        });
      }

      console.log('\n📊 Performance Stats:');
      console.log(
        `  Memory usage: ${report.performance.memoryUsage.toFixed(2)}MB`
      );
      console.log(`  Cache entries: ${report.performance.cacheEntries}`);
      console.log(
        `  Cache size: ${(report.performance.cacheSize / 1024 / 1024).toFixed(2)}MB`
      );
    })
    .catch(error => {
      console.error('Optimized analysis failed:', error);
      process.exit(1);
    });
}

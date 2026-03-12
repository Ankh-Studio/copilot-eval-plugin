# Deployment Guide

Comprehensive deployment guide for the Copilot Eval Plugin with advanced persona routing and memory-enhanced evaluation capabilities.

## 🚀 Quick Start

### Prerequisites
- GitHub Copilot CLI installed
- Node.js 18+ (for local development)
- Git repository with Copilot customizations

### Installation Methods

#### Method 1: Direct from GitHub (Recommended)
```bash
copilot plugin install Ankh-Studio/copilot-eval-plugin
```

#### Method 2: Local Development
```bash
git clone https://github.com/Ankh-Studio/copilot-eval-plugin.git
cd copilot-eval-plugin
copilot plugin install .
```

## 📋 System Requirements

### Minimum Requirements
- **Memory**: 512MB available RAM
- **Storage**: 100MB disk space
- **Network**: Internet connection for persona routing
- **Copilot**: CLI version 2.0+

### Recommended Configuration
- **Memory**: 1GB+ available RAM
- **Storage**: 500MB disk space
- **Network**: Stable broadband connection
- **Copilot**: CLI version 2.1+ with latest models

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom persona routing threshold
COPILOT_EVAL_ROUTING_THRESHOLD=0.7

# Optional: Memory cache size (MB)
COPILOT_EVAL_CACHE_SIZE=256

# Optional: Performance monitoring
COPILOT_EVAL_TELEMETRY=true
```

### Plugin Configuration
Create `.copilot/eval-config.yaml` in your repository:

```yaml
# Evaluation behavior
routing:
  confidence_threshold: 0.7
  enable_memory_routing: true
  fallback_to_neutral: true

# Performance settings
performance:
  cache_size_mb: 256
  parallel_processing: true
  timeout_seconds: 120

# Persona preferences
personas:
  enabled:
    - team-staff-engineer
    - business-product-manager
    - frontend-specialist
    - technical-lead
  default: neutral-evaluator
```

## 🏗️ Architecture Overview

### Core Components
1. **Advanced Router**: Intelligent persona selection with confidence scoring
2. **Memory Engine**: Historical pattern recognition and learning
3. **Performance Optimizer**: Caching and parallel processing
4. **Test Framework**: Comprehensive validation and quality assurance

### Data Flow
```
User Input → Context Analysis → Persona Routing → Memory Enhancement → Evaluation → Results
```

### Memory System
- **Persona-specific contexts**: Isolated memory spaces per persona
- **Pattern recognition**: Learning from previous evaluations
- **Evidence caching**: Structured storage of relevant information
- **Compaction**: Efficient memory management

## 🔍 Verification

### Post-Installation Verification
```bash
# Test basic evaluation
copilot evaluate-artifact README.md

# Test persona routing
copilot eval-debate "architecture decision"

# Test memory system
copilot eval-tldr --persona=technical-lead README.md

# Test performance
copilot eval-performance --benchmark
```

### Health Check
```bash
# Run comprehensive health check
copilot test-runner --suite=health

# Check memory system
copilot memory-enhanced-router --status

# Verify routing configuration
copilot advanced-router --validate-config
```

## 🚦 Production Deployment

### Enterprise Setup

#### 1. Team Configuration
```yaml
# .copilot/team-config.yaml
team:
  name: "Development Team"
  personas:
    - team-staff-engineer
    - business-product-manager
    - frontend-specialist
    - technical-lead
  
  routing_rules:
    - trigger: "architecture"
      persona: "technical-lead"
      confidence: 0.8
    - trigger: "user experience"
      persona: "frontend-specialist"
      confidence: 0.7
```

#### 2. Quality Gates
```yaml
# .copilot/quality-gates.yaml
gates:
  pre_commit:
    - eval-quality-gates --level=standard
    - eval-adversarial --quick
  
  pre_push:
    - eval-quality-gates --level=strict
    - eval-regression --full
  
  release:
    - eval-quality-gates --level=enterprise
    - eval-performance --benchmark
    - eval-batch --all-artifacts
```

#### 3. CI/CD Integration
```yaml
# .github/workflows/evaluation.yml
name: Quality Evaluation
on: [push, pull_request]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Copilot
        run: |
          copilot plugin install Ankh-Studio/copilot-eval-plugin
      - name: Run Evaluation
        run: |
          copilot eval-quality-gates --level=standard
          copilot eval-performance --quick
```

## 🔧 Troubleshooting

### Common Issues

#### Installation Problems
```bash
# Clear plugin cache
copilot plugin cache clear

# Reinstall plugin
copilot plugin uninstall copilot-eval-plugin
copilot plugin install Ankh-Studio/copilot-eval-plugin
```

#### Performance Issues
```bash
# Check memory usage
copilot eval-performance --memory-usage

# Clear memory cache
copilot memory-enhanced-router --clear-cache

# Optimize configuration
copilot performance-optimizer --tune
```

#### Routing Problems
```bash
# Validate routing configuration
copilot advanced-router --validate

# Test persona selection
copilot advanced-router --test --input="your test case"

# Reset routing memory
copilot memory-enhanced-router --reset-routing
```

### Debug Mode
```bash
# Enable debug logging
COPILOT_EVAL_DEBUG=true copilot evaluate-artifact README.md

# Detailed routing analysis
copilot advanced-router --debug --input="test case"

# Memory system diagnostics
copilot memory-enhanced-router --diagnostics
```

## 📊 Performance Optimization

### Recommended Settings
```yaml
performance:
  # Cache configuration
  cache_size_mb: 512
  cache_ttl_seconds: 3600
  
  # Parallel processing
  max_concurrent_evaluations: 4
  parallel_routing: true
  
  # Memory management
  memory_compaction_interval: 1800
  max_memory_per_persona_mb: 64
```

### Benchmarking
```bash
# Run full benchmark suite
copilot eval-performance --benchmark --full

# Compare performance
copilot eval-performance --compare --baseline=v1.0

# Profile memory usage
copilot eval-performance --profile --memory
```

## 🔐 Security Considerations

### Data Privacy
- **Local Processing**: All evaluation data processed locally
- **No Data Transmission**: No sensitive data sent to external services
- **Memory Isolation**: Persona-specific data isolated and protected

### Access Control
```yaml
security:
  # Restrict persona access
  allowed_personas:
    - team-staff-engineer
    - technical-lead
  
  # Audit logging
  audit_log: true
  log_retention_days: 30
```

## 📈 Monitoring

### Performance Metrics
```bash
# Real-time monitoring
copilot performance-optimizer --monitor

# Historical analysis
copilot performance-optimizer --history --days=7

# Alert configuration
copilot performance-optimizer --alert-threshold=2.0
```

### Health Monitoring
```bash
# System health check
copilot test-runner --suite=health --continuous

# Memory health
copilot memory-enhanced-router --health-check

# Routing performance
copilot advanced-router --health
```

## 🔄 Updates and Maintenance

### Plugin Updates
```bash
# Check for updates
copilot plugin update copilot-eval-plugin

# View update history
copilot plugin info copilot-eval-plugin
```

### Maintenance Tasks
```bash
# Weekly maintenance
copilot performance-optimizer --maintenance
copilot memory-enhanced-router --cleanup
copilot test-runner --suite=maintenance
```

## 📞 Support

### Getting Help
- **Documentation**: [Full documentation](https://github.com/Ankh-Studio/copilot-eval-plugin/wiki)
- **Issues**: [GitHub Issues](https://github.com/Ankh-Studio/copilot-eval-plugin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ankh-Studio/copilot-eval-plugin/discussions)

### Reporting Issues
Include the following in issue reports:
- Plugin version
- Copilot CLI version
- Operating system
- Error messages
- Configuration files
- Debug logs (if available)

---

**Deployment Status**: ✅ Production Ready  
**Last Updated**: Phase 2 Complete with Advanced Persona Routing and Memory Systems

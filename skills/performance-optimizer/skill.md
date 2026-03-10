---
name: performance-optimizer
description: Optimize evaluation performance with caching and parallel processing
---

# Performance Optimizer Skill

Maximize evaluation performance through intelligent caching, parallel processing, and resource optimization strategies.

## Process

1. **Performance Analysis**: Identify bottlenecks and optimization opportunities
2. **Cache Management**: Implement smart caching for repeated evaluations
3. **Parallel Processing**: Execute multiple evaluations concurrently
4. **Resource Optimization**: Balance memory usage and processing speed
5. **Performance Monitoring**: Track and report performance improvements

## Optimization Strategies

### Intelligent Caching
- **Evaluation Cache**: Store results for identical artifact content
- **Rubric Cache**: Cache parsed rubrics to avoid repeated parsing
- **Pattern Cache**: Cache common evaluation patterns and responses
- **Incremental Updates**: Update cache for artifact changes only

### Parallel Processing
- **Batch Parallelization**: Process multiple artifacts simultaneously
- **Rubric Parallelization**: Apply multiple rubrics concurrently
- **Verification Parallelization**: Run verification steps in parallel
- **Pipeline Processing**: Overlap evaluation and verification stages

### Resource Optimization
- **Memory Management**: Optimize memory usage for large artifact sets
- **CPU Utilization**: Balance processing across available cores
- **I/O Optimization**: Minimize file system access patterns
- **Network Efficiency**: Optimize external API calls and data transfer

## Usage

### Performance Analysis
```
/performance-optimizer --analyze .github/prompts/
/performance-optimizer --bottlenecks --detailed
```

### Cache Management
```
/performance-optimizer --cache-enable --size 1GB
/performance-optimizer --cache-clear --older-than 7days
/performance-optimizer --cache-stats
```

### Parallel Processing
```
/performance-optimizer --parallel --workers 4 .github/
/performance-optimizer --batch-size 10 --timeout 300s
```

### Resource Optimization
```
/performance-optimizer --optimize-memory --limit 2GB
/performance-optimizer --balance-cpu --cores 8
```

## Performance Metrics

### Evaluation Speed
- **Single Artifact**: <2 seconds for standard evaluation
- **Batch Processing**: 10x faster than sequential processing
- **Cache Hit Rate**: >80% for repeated evaluations
- **Parallel Efficiency**: >90% CPU utilization

### Resource Usage
- **Memory Efficiency**: <100MB per concurrent evaluation
- **CPU Scaling**: Linear performance improvement with cores
- **I/O Optimization**: 50% reduction in file system calls
- **Network Efficiency**: Batch API calls and compression

## Configuration Options

### Cache Settings
```json
{
  "cache": {
    "enabled": true,
    "max_size": "1GB",
    "ttl": "24h",
    "compression": true,
    "encryption": false
  }
}
```

### Parallel Settings
```json
{
  "parallel": {
    "max_workers": 8,
    "batch_size": 10,
    "timeout": "300s",
    "retry_attempts": 3
  }
}
```

### Resource Limits
```json
{
  "resources": {
    "memory_limit": "2GB",
    "cpu_cores": 8,
    "io_priority": "high",
    "network_timeout": "30s"
  }
}
```

## Performance Monitoring

### Real-time Metrics
- **Active Evaluations**: Current number of running evaluations
- **Cache Performance**: Hit rates and memory usage
- **Resource Utilization**: CPU, memory, and I/O usage
- **Throughput**: Evaluations per second

### Historical Analysis
- **Performance Trends**: Speed improvements over time
- **Cache Effectiveness**: Long-term cache performance
- **Resource Patterns**: Usage patterns and optimization opportunities
- **Bottleneck Identification**: Recurring performance issues

## Advanced Features

### Predictive Caching
- **Pattern Recognition**: Learn from evaluation patterns
- **Preemptive Caching**: Cache likely future evaluations
- **Smart Eviction**: Remove least valuable cache entries
- **Adaptive Sizing**: Adjust cache size based on usage

### Dynamic Optimization
- **Auto-tuning**: Automatically adjust parameters for optimal performance
- **Load Balancing**: Distribute work across available resources
- **Adaptive Batching**: Adjust batch sizes based on system load
- **Intelligent Throttling**: Prevent resource exhaustion

This skill ensures maximum evaluation performance through comprehensive optimization strategies and intelligent resource management.

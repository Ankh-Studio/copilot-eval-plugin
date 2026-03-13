


name: eval-performance
description: Optimize evaluation performance with caching and parallel processing

---




Maximize evaluation performance through intelligent caching, parallel processing, and resource optimization.

## Process

1. **Analyze**: Identify bottlenecks and optimization opportunities
2. **Cache**: Implement smart caching for repeated evaluations
3. **Parallel**: Execute multiple evaluations concurrently
4. **Optimize**: Balance memory usage and processing speed
5. **Monitor**: Track and report performance improvements

## Strategies

### Caching

- Evaluation cache for identical artifacts
- Rubric cache to avoid repeated parsing
- Pattern cache for common responses
- Incremental updates for changes only

### Parallel Processing

- Batch parallelization for multiple artifacts
- Rubric parallelization for concurrent application
- Verification parallelization
- Pipeline processing with overlapping stages

### Resource Optimization

- Memory management for large artifact sets
- CPU balancing across available cores
- I/O optimization for file access
- Network efficiency for external APIs

## Usage

### Analysis

```bash
/eval-performance --analyze .github/prompts/
/eval-performance --bottlenecks --detailed
```bash

### Cache Management

```bash
/eval-performance --cache-enable --size 1GB
/eval-performance --cache-clear --older-than 7days
/eval-performance --cache-stats
```bash

### Parallel Processing

```bash
/eval-performance --parallel --workers 4 .github/
/eval-performance --batch-size 10 --timeout 300s
```bash

### Resource Optimization

```bash
/eval-performance --optimize-memory --limit 2GB
/eval-performance --balance-cpu --cores 8
```bash

## Metrics

### Speed

- Single artifact: <2 seconds
- Batch processing: 10x faster than sequential
- Cache hit rate: >80% for repeated evaluations
- Parallel efficiency: >90% CPU utilization

### Resources

- Memory: <100MB per concurrent evaluation
- CPU scaling: Linear improvement with cores
- I/O: 50% reduction in file system calls
- Network: Batch API calls and compression

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
```bash

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
```bash

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
```bash

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

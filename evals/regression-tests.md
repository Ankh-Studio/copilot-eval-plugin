# Regression Tests for README and INSTALL Examples

This file contains regression tests to ensure that examples from README.md and INSTALL.md continue to work correctly across plugin versions.

## README.md Examples

### Basic Usage Examples

**Example 1: Single Artifact Evaluation**

```bash
# From README: Basic evaluation
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md

# Regression test: Verify command works and returns valid score
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md --format json
# Expected: Score between 1.0-4.0, detailed feedback
```bash

**Example 2: Batch Evaluation**

```bash
# From README: Batch processing
copilot eval eval-batch .github/prompts/

# Regression test: Verify batch processing works
copilot eval eval-batch .github/prompts/ --comparative --baseline v1.0
# Expected: Comparative report with baseline metrics
```bash

**Example 3: Quality Gates**

```bash
# From README: Quality enforcement
copilot eval eval-quality-gates --pre-deploy .github/prompts/

# Regression test: Verify quality gates function
copilot eval eval-quality-gates --threshold strict .github/prompts/ --report detailed
# Expected: Pass/fail determination with compliance report
```bash

### Advanced Usage Examples

**Example 4: Performance Testing**

```bash
# From README: Performance optimization
copilot eval eval-performance --benchmark .github/prompts/

# Regression test: Verify performance benchmarking
copilot eval eval-performance --stress-test --concurrent 5
# Expected: Performance metrics under stress conditions
```bash

**Example 5: Improvement Recommendations**

```bash
# From README: Artifact improvement
copilot eval eval-improve .github/prompts/code-review.prompt.md --focus=clarity

# Regression test: Verify improvement recommendations
copilot eval eval-improve skills/evaluate-artifact/SKILL.md --comprehensive
# Expected: Actionable improvement suggestions
```bash

## INSTALL.md Examples

### Installation Verification

**Example 6: Plugin Installation Check**

```bash
# From INSTALL: Verify plugin installation
copilot plugin list | grep copilot-eval

# Regression test: Confirm plugin is properly installed
copilot plugin info copilot-eval
# Expected: Plugin information and version details
```bash

**Example 7: Skills Availability**

```bash
# From INSTALL: Check available skills
copilot eval --help

# Regression test: Verify all skills are available
copilot eval evaluate-artifact --help
copilot eval eval-batch --help
copilot eval eval-quality-gates --help
# Expected: Help information for each skill
```bash

### Configuration Examples

**Example 8: Basic Configuration**

```bash
# From INSTALL: Basic setup
copilot config set copilot-eval.threshold 3.0
copilot config set copilot-eval.parallel true

# Regression test: Verify configuration persistence
copilot config get copilot-eval.threshold
copilot config get copilot-eval.parallel
# Expected: Configuration values properly set and retrieved
```bash

## Workflow Integration Tests

### CI/CD Integration Examples

**Example 9: GitHub Actions Integration**

```yaml
# From README: CI/CD integration
- name: Evaluate Copilot Artifacts
  run: |
    copilot eval eval-quality-gates --pre-deploy .github/prompts/
    copilot eval eval-regression --baseline main

# Regression test: Verify CI/CD workflow
copilot eval eval-quality-gates --compliance --report json
copilot eval eval-regression --scoring-consistency --artifact-type prompt
# Expected: JSON reports suitable for CI/CD consumption
```bash

**Example 10: Pre-commit Hooks**

```bash
# From INSTALL: Pre-commit validation
#!/bin/sh
copilot eval eval-quality-gates --threshold strict .github/prompts/
exit $?

# Regression test: Verify pre-commit functionality
copilot eval eval-quality-gates --threshold strict .github/prompts/ --exit-code
# Expected: Proper exit codes for pass/fail scenarios
```bash

## Output Format Regression Tests

### JSON Output Consistency

**Example 11: Structured Output**

```bash
# Test: JSON output format consistency
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md --format json > output-v1.0.json

# Regression test: Compare with current version
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md --format json > output-current.json

# Verify schema consistency
jq '.score' output-v1.0.json
jq '.score' output-current.json
# Expected: Same JSON schema and field structure
```bash

**Example 12: Report Format Stability**

```bash
# Test: Report format consistency
copilot eval eval-batch .github/prompts/ --report detailed > report-v1.0.md

# Regression test: Compare report structure
copilot eval eval-batch .github/prompts/ --report detailed > report-current.md

# Verify report structure consistency
grep -E "^(#|##)" report-v1.0.md | head -10
grep -E "^(#|##)" report-current.md | head -10
# Expected: Same report structure and sections
```bash

## Performance Regression Tests

### Execution Time Benchmarks

**Example 13: Single Evaluation Performance**

```bash
# Benchmark: Single artifact evaluation
time copilot eval evaluate-artifact .github/prompts/code-review.prompt.md

# Regression test: Performance within acceptable range
timeout 30s copilot eval evaluate-artifact .github/prompts/code-review.prompt.md
# Expected: Completion within 30 seconds
```bash

**Example 14: Batch Processing Performance**

```bash
# Benchmark: Batch evaluation performance
time copilot eval eval-batch .github/prompts/ --parallel

# Regression test: Batch performance consistency
timeout 120s copilot eval eval-batch .github/prompts/ --parallel
# Expected: Completion within 2 minutes for typical batch
```bash

### Memory Usage Tests

**Example 15: Memory Consumption**

```bash
# Test: Memory usage during evaluation
/usr/bin/time -v copilot eval eval-batch .github/prompts/ 2>&1 | grep "Maximum resident set size"

# Regression test: Memory usage within limits
/usr/bin/time -v copilot eval eval-adversarial --stress-test performance 2>&1 | grep "Maximum resident set size"
# Expected: Memory usage < 500MB for typical operations
```bash

## Error Handling Regression Tests

### Invalid Input Handling

**Example 16: Non-existent File**

```bash
# Test: Error handling for missing files
copilot eval evaluate-artifact non-existent-file.md

# Regression test: Consistent error messages
copilot eval evaluate-artifact non-existent-file.md 2>&1 | grep -i "not found\|error"
# Expected: Clear error message about missing file
```bash

**Example 17: Invalid Parameters**

```bash
# Test: Invalid parameter handling
copilot eval eval-quality-gates --threshold invalid

# Regression test: Parameter validation
copilot eval eval-quality-gates --threshold invalid 2>&1 | grep -i "invalid\|error"
# Expected: Clear error about invalid threshold value
```bash

### Permission Error Handling

**Example 18: Permission Issues**

```bash
# Test: Permission denied scenarios
chmod 000 .github/prompts/restricted.prompt.md
copilot eval evaluate-artifact .github/prompts/restricted.prompt.md 2>&1 | grep -i "permission\|denied"
chmod 644 .github/prompts/restricted.prompt.md

# Regression test: Consistent permission error handling
# Expected: Clear permission error messages
```bash

## Cross-platform Compatibility Tests

### Windows Compatibility

**Example 19: Windows Path Handling**

```powershell
# Test: Windows path compatibility
copilot eval evaluate-artifact .github\prompts\code-review.prompt.md

# Regression test: Path separator handling
# Expected: Works with both forward and back slashes
```bash

### macOS/Linux Compatibility

**Example 20: Unix Path Handling**

```bash
# Test: Unix path compatibility
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md

# Regression test: Standard Unix path handling
# Expected: Works with standard Unix paths
```bash

## Version Compatibility Tests

### Backward Compatibility

**Example 21: Configuration Compatibility**

```bash
# Test: Old configuration format compatibility
copilot config set copilot-eval.legacy_format true

# Regression test: Legacy configuration support
copilot eval evaluate-artifact .github/prompts/code-review.prompt.md
# Expected: Works with legacy configuration if supported
```bash

### Forward Compatibility

**Example 22: New Feature Detection**

```bash
# Test: New feature availability
copilot eval eval-adversarial --help | grep -i "adversarial"

# Regression test: New feature availability
# Expected: New features are available and documented
```bash

## Integration Regression Tests

### Tool Chain Integration

**Example 23: Git Integration**

```bash
# Test: Git workflow integration
git add .github/prompts/code-review.prompt.md
copilot eval eval-quality-gates --pre-deploy .github/prompts/code-review.prompt.md

# Regression test: Git integration consistency
# Expected: Works properly with Git operations
```bash

**Example 24: IDE Integration**

```bash
# Test: IDE plugin integration
# (This would be tested in the actual IDE environment)

# Regression test: IDE integration stability
# Expected: Stable integration with IDE features
```bash

## Expected Regression Test Outcomes

### Success Criteria

- All README examples continue to work
- All INSTALL instructions remain valid
- Performance characteristics remain stable
- Error handling remains consistent
- Output formats remain compatible

### Failure Indicators

- Commands that previously work now fail
- Output format changes break downstream tools
- Performance degrades significantly
- Error messages become less helpful
- Configuration options become invalid

### Test Execution Frequency

- **Before each release**: Full regression test suite
- **Weekly**: Core functionality regression tests
- **Daily**: Performance and error handling tests
- **Per commit**: Critical path validation

These regression tests ensure that the copilot-eval-plugin maintains backward compatibility and reliable behavior across versions while providing a safety net for future development.

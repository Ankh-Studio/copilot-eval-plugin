# Bug Report Completeness Rubric

Evaluates bug reports for completeness, reproducibility, and actionable information.

## Criteria

### Reproduction Clarity (35%)
- **Score 4**: Clear, step-by-step reproduction with all conditions
- **Score 3**: Good reproduction with minor ambiguities
- **Score 2**: Basic reproduction steps with gaps
- **Score 1**: Vague or incomplete reproduction
- **Score 0**: No reproduction steps or impossible to follow

### Environment Detail (25%)
- **Score 4**: Complete environment info with versions and context
- **Score 3**: Good environment details with minor omissions
- **Score 2**: Basic environment information
- **Score 1**: Minimal environment details
- **Score 0**: No environment information

### Impact Assessment (20%)
- **Score 4**: Clear severity, impact, and frequency assessment
- **Score 3**: Good impact assessment with minor gaps
- **Score 2**: Basic impact information
- **Score 1**: Minimal impact assessment
- **Score 0**: No impact assessment

### Evidence Quality (20%)
- **Score 4**: Comprehensive evidence with logs, screenshots, metrics
- **Score 3**: Good evidence supporting the issue
- **Score 2**: Basic evidence present
- **Score 1**: Minimal or poor quality evidence
- **Score 0**: No evidence provided

## Examples

### Score 4.0
```markdown
## Reproduction Steps
1. Login as admin user (admin@test.com)
2. Navigate to Settings > Integrations
3. Click "Connect to Slack" button
4. Observe loading spinner continues indefinitely

**Environment**: Chrome 118.0.5993.88 on macOS Sonoma 14.1
**Frequency**: 100% reproducible for admin users
**Impact**: Critical - Blocks Slack integration setup

**Evidence**: 
- Console: "POST /api/integrations/slack - 500 Internal Server Error"
- Backend logs: "Slack OAuth token retrieval failed: connection timeout"
```

### Score 2.5
```markdown
## Reproduction Steps
1. Go to settings
2. Click Slack button
3. Loading doesn't stop

**Environment**: Chrome on Mac
**Impact**: High - Can't connect Slack
```

### Score 1.0
```markdown
## Reproduction Steps
Slack doesn't work

**Environment**: Browser
**Impact**: Bug
```

## Evaluation Notes
- Check reproduction step clarity and completeness
- Verify environment details include relevant versions
- Assess impact assessment accuracy
- Evaluate evidence quality and relevance
- Consider regression information and workarounds

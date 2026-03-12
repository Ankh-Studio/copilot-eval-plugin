# Bug Capture Investigation

Comprehensive bug investigation and documentation workflow for thorough issue capture.

## Usage
```
/bug-capture
```

## Process
1. **Issue Analysis**: Understand the bug description and context
2. **Environment Investigation**: Gather detailed environment information
3. **Reproduction Validation**: Test and document reproduction steps
4. **Impact Assessment**: Evaluate severity and user impact
5. **Evidence Collection**: Gather logs, screenshots, and supporting data

## Investigation Areas

### Environment Details
- Operating system and version
- Browser/application versions
- Network conditions
- Device specifications
- Related software versions

### Reproduction Analysis
- Step-by-step reproduction guide
- Required conditions or prerequisites
- Intermittent vs. consistent behavior
- Edge cases and variations
- Time-based or load-dependent factors

### Impact Assessment
- User experience impact
- Business function impact
- Technical system impact
- Data integrity concerns
- Security implications

### Evidence Gathering
- Error logs and stack traces
- Screenshots or screen recordings
- Network requests and responses
- Console output
- Performance metrics

## Examples

### Web Application Bug
```markdown
## Environment Investigation
- **Browser**: Chrome 118.0.5993.88 on macOS Sonoma 14.1
- **Network**: Corporate VPN, 100ms latency
- **Device**: MacBook Pro M2, 16GB RAM
- **Application**: v2.3.1, production environment

## Reproduction Analysis
1. Login with user account (admin role)
2. Navigate to Settings > Integrations
3. Click "Connect to Slack" button
4. Observe loading spinner continues indefinitely

**Conditions**: Only affects admin users, first-time Slack integration
**Frequency**: 100% reproducible for affected users
**Timing**: Issue occurs after 30 seconds of loading

## Impact Assessment
- **User Impact**: High - Blocks Slack integration setup
- **Business Impact**: Medium - Affects team collaboration features
- **Technical Impact**: Low - Isolated to integration module
- **Workaround**: Manual Slack configuration possible

## Evidence Collection
- Console shows: "POST /api/integrations/slack - 500 Internal Server Error"
- Network tab: Request timeout after 30 seconds
- Backend logs: "Slack OAuth token retrieval failed: connection timeout"
```

### API Service Bug
```markdown
## Environment Investigation
- **Server**: Ubuntu 22.04 LTS, 4-core CPU, 8GB RAM
- **Runtime**: Node.js 18.17.0, npm 9.6.7
- **Database**: PostgreSQL 14.5, connection pool: 20
- **Load**: 150 concurrent requests, average response time 200ms
- **Dependencies**: express@4.18.2, pg@8.11.3

## Reproduction Analysis
1. Send concurrent requests to /api/users/bulk-import
2. Request body contains 1000+ user records
3. Observe database connection exhaustion
4. Service becomes unresponsive for 5-10 minutes

**Conditions**: High concurrency + large payload
**Frequency**: Intermittent, occurs under load
**Load Threshold**: 100+ concurrent requests

## Impact Assessment
- **User Impact**: Critical - Service outage during bulk operations
- **Business Impact**: High - Blocks customer data imports
- **Technical Impact**: High - Database connection pool exhaustion
- **Data Impact**: None - transactions rolled back safely

## Evidence Collection
- Database logs: "Connection pool exhausted, waiting for connection"
- Application logs: "Error: connect ETIMEDOUT"
- Monitoring: CPU spikes to 95%, memory usage stable
- Network: Connection timeouts from client side
```

## Guidelines
- **Be Thorough**: Collect comprehensive environment and reproduction details
- **Document Everything**: Include all relevant logs, screenshots, and metrics
- **Assess Impact**: Evaluate both technical and business impact
- **Provide Workarounds**: Include any temporary solutions if available
- **Stay Objective**: Focus on facts and observable behavior

## Context Needed
- Bug description and initial report
- Access to error logs and monitoring data
- Ability to reproduce the issue
- Information about recent changes
- User environment details
- System architecture knowledge

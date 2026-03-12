# PR Overview Quality Rubric

Evaluates pull request overviews for completeness, clarity, and template compliance.

## Criteria

### Template Compliance (30%)
- **Score 4**: Perfectly follows repository template, all sections addressed
- **Score 3**: Follows template with minor omissions or format issues
- **Score 2**: Basic template usage with significant gaps
- **Score 1**: Template present but poorly followed
- **Score 0**: No template compliance or missing template

### Content Completeness (25%)
- **Score 4**: All required sections complete with detailed information
- **Score 3**: Most sections complete with adequate detail
- **Score 2**: Basic completion with minimal detail
- **Score 1**: Significant sections missing or incomplete
- **Score 0**: Major sections missing or empty

### Change Clarity (25%)
- **Score 4**: Clear, specific change descriptions with impact assessment
- **Score 3**: Generally clear with minor ambiguities
- **Score 2**: Vague or unclear change descriptions
- **Score 1**: Poor change descriptions
- **Score 0**: No meaningful change descriptions

### Testing Instructions (20%)
- **Score 4**: Comprehensive, actionable testing instructions
- **Score 3**: Good testing instructions with minor gaps
- **Score 2**: Basic testing instructions
- **Score 1**: Minimal or unclear testing instructions
- **Score 0**: No testing instructions

## Examples

### Score 4.0
```markdown
## 🎯 Type
- [x] ✨ New feature

## 📝 Description
Implements real-time notifications using WebSocket connections for instant user updates across the platform.

## 🔄 Changes
- Add WebSocket server configuration in src/websocket/
- Create NotificationService for message handling
- Update UI components to display real-time alerts
- Add notification preferences in user settings

## 🧪 Testing
- Unit tests: `npm test NotificationService`
- Integration tests: WebSocket connection stability
- Manual testing: Multi-user notification flow
- Performance: Test with 100+ concurrent users

## 📦 Package Impact
- [x] Version bump required
- [x] New dependencies: socket.io, ws
- [x] Documentation updated
```

### Score 2.5
```markdown
## 🎯 Type
- [x] 🐛 Bug fix

## 📝 Description
Fixed login issue

## 🔄 Changes
- Updated login code
- Fixed authentication

## 🧪 Testing
Test login functionality
```

### Score 1.0
```markdown
## 🎯 Type
- [x] 🐛 Bug fix

## 📝 Description
Bug fix

## 🔄 Changes
Some changes
```

## Evaluation Notes
- Check repository template adherence
- Verify all required sections are present
- Assess clarity and specificity of descriptions
- Evaluate testing instruction quality
- Consider impact on reviewers and deployment

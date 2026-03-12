# Generate PR Overview

Generate a comprehensive pull request overview based on repository templates and change analysis.

## Usage
```
/pr-overview
```

## Process
1. **Detect Template**: Check for existing PR template in `.github/`
2. **Analyze Changes**: Review diff content and affected files
3. **Generate Content**: Create structured overview following template
4. **Enhance Quality**: Add testing instructions, impact assessment, and rollout notes

## Output Structure
Adapts to repository template but typically includes:

### Required Sections
- **Type**: Bug fix, new feature, documentation, etc.
- **Description**: Clear summary of changes
- **Changes**: Specific list of modifications
- **Testing**: How to validate the changes

### Optional Sections (when applicable)
- **Package Impact**: Version bumps, dependency changes
- **Breaking Changes**: API modifications, migration needed
- **Screenshots**: UI changes, before/after
- **Performance**: Performance implications
- **Documentation**: Updated docs required
- **Release Notes**: Brief changelog entry

## Template Detection
- Primary: `.github/pull_request_template.md`
- Fallback: Standard structured format
- Enhancement: Adds missing sections automatically

## Examples

### Simple Bug Fix
```markdown
## 🎯 Type
- [x] 🐛 Bug fix

## 📝 Description
Fix null pointer exception in user authentication when profile data is missing.

## 🔄 Changes
- Add null check in UserService.getProfile()
- Update error handling in AuthController
- Add unit test for missing profile scenario

## 🧪 Testing
- Run unit tests: `npm test UserService`
- Test login with incomplete user profiles
- Verify error handling in development mode
```

### Complex Feature
```markdown
## 🎯 Type
- [x] ✨ New feature

## 📝 Description
Implement real-time notifications using WebSocket connections for instant user updates.

## 🔄 Changes
- Add WebSocket server configuration
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

## 🚀 Release Notes
Added real-time notifications for instant user updates and collaboration features.
```

## Context Needed
- Repository PR template (if exists)
- Pull request diff content
- Target branch information
- Repository structure and patterns
- Related issues or tickets

---
name: generate-pr-overview
description: Generate PR overview with template detection and comprehensive content
---

Generate comprehensive pull request overviews by detecting repository templates and creating structured, high-quality PR descriptions.

## Process

1. **Template Detection**: Scan `.github/` directory for PR templates
2. **Content Analysis**: Review diff content and affected files  
3. **Structure Generation**: Create overview following detected template
4. **Quality Enhancement**: Add testing instructions, impact assessment, and rollout notes
5. **Validation**: Ensure completeness and template compliance

## Usage

Generate PR overview for current changes:

```
/generate-pr-overview
```

## Template Detection

- **Primary**: `.github/pull_request_template.md`
- **Secondary**: `.github/PULL_REQUEST_TEMPLATE.md`  
- **Fallback**: Standard structured format
- **Enhancement**: Automatically adds missing sections

## Output Sections

### Always Included
- Type classification (bug fix, feature, docs, etc.)
- Clear description of changes
- Specific change list
- Testing instructions

### Context-Dependent
- Package impact (dependencies, version bumps)
- Breaking changes and migration notes
- Performance implications
- Documentation requirements
- Release notes content
- Screenshots for UI changes

## Examples

### Template-Aware Generation
Detects existing template sections and fills them appropriately:

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

### Enhanced Template
Adds missing sections automatically when template is incomplete:

```markdown
## 📦 Package Impact
- [x] Version bump required
- [ ] Dependencies added/modified
- [ ] Documentation updated

## 🚀 Release Notes
Fixed authentication crash when user profiles are incomplete.
```

## Context Requirements

- Repository structure (for template detection)
- Pull request diff content
- Target branch information
- File types and patterns affected
- Related issue numbers (if available)

## Quality Standards

- All template sections addressed
- Testing instructions included and actionable
- Change descriptions specific and clear
- Impact assessment accurate
- Format consistent with repository standards

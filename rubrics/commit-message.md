# Commit Message Quality Rubric

Evaluates commit messages for compliance with Conventional Commits and team standards.

## Criteria

### Format Compliance (40%)
- **Score 4**: Perfect Conventional Commits format with proper type, scope, and description
- **Score 3**: Minor format issues (e.g., missing scope, description length)
- **Score 2**: Basic format present but significant deviations
- **Score 1**: Incorrect format or missing required elements
- **Score 0**: No conventional commit structure

### Description Quality (30%)
- **Score 4**: Clear, concise, imperative mood, under 72 characters
- **Score 3**: Generally clear with minor clarity issues
- **Score 2**: Vague or unclear description
- **Score 1**: Poor description, hard to understand
- **Score 0**: No description or meaningless text

### Ticket Integration (20%)
- **Score 4**: Proper ticket number in scope, auto-link compatible
- **Score 3**: Ticket present but format issues
- **Score 2**: Ticket mentioned but not in proper scope
- **Score 1**: Ticket reference unclear or missing
- **Score 0**: No ticket reference when required

### Type Appropriateness (10%)
- **Score 4**: Perfect type selection for the change
- **Score 3**: Good type with minor considerations
- **Score 2**: Type could be better but acceptable
- **Score 1**: Poor type choice
- **Score 0**: Wrong or missing type

## Examples

### Score 4.0
```
feat(ABC-123): add user authentication with JWT tokens

Implements secure login flow with token-based authentication
and session management for improved security.

Closes: ABC-123
```

### Score 2.5
```
fix: resolve login issue

Fixed the bug where users couldn't log in
```

### Score 1.0
```
fixed the bug
```

## Evaluation Notes
- Check Conventional Commits specification compliance
- Verify GitHub auto-linking compatibility
- Assess clarity and actionability
- Consider team-specific requirements

# Generate Commit Message

Generate a Conventional Commits compliant commit message with automatic ticket integration and validation.

## Usage
```bash
/commit-message
```

## Process
1. **Analyze Changes**: Review staged changes, diff content, and affected files
2. **Identify Type**: Determine appropriate conventional commit type based on change impact
3. **Extract Ticket**: Automatically find ticket numbers from branch names, PR titles, or commit content using patterns: `ABC-123`, `PROJ-456`, `TICKET-789`
4. **Generate Message**: Create properly formatted commit message with breaking change indicators
5. **Validate**: Ensure compliance with Conventional Commits specification v1.0.0

## Output Format
```
<type>[optional scope](TICKET-NUMBER): short description (imperative mood, < 72 chars)

[optional body with detailed explanation, wrapped at 72 chars]

[optional footers for breaking changes and references]
```

## Commit Types
- **feat**: New feature or functionality
- **fix**: Bug fix or error correction  
- **docs**: Documentation changes only
- **style**: Code formatting, missing semicolons, etc. (no functional changes)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependency updates, etc.
- **build**: Build system or dependency changes
- **ci**: CI/CD configuration changes

## Breaking Changes
Add `!` before scope: `feat!(ABC-123): breaking change description`
Or add footer: `BREAKING CHANGE: detailed explanation`

## Examples

### Input: Staged changes adding user login
**Output:**
```
feat(ABC-123): add user authentication functionality

Implements login form with email/password validation
and session management using JWT tokens.

Closes: ABC-123
```

### Input: Bug fix for null pointer
**Output:**
```
fix(DEF-456): resolve null pointer exception in user service

Add null check before accessing user profile data
to prevent application crashes.

Fixes: DEF-456
```

## Guidelines
- Use imperative mood ("add" not "added")
- Keep description under 72 characters
- Include relevant ticket number
- Add body for complex changes
- Use footers for issue references

## Context Needed
- Staged changes (git diff --cached)
- Current branch name
- Related issue/PR numbers
- Repository commit history

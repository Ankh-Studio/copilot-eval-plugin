---
applyTo: ["**/*.md", "**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx", "**/*.py", "**/*.go", "**/*.java", "**/*.cpp", "**/*.c", "**/*.cs", "**/*.php", "**/*.rb", "**/*.swift", "**/*.kt", "**/*.rs", "**/*.scala"]
---

# Commit Message Standards

Follow Conventional Commits specification with ticket integration:

## Format
```
<type>(TICKET-NUMBER): short description
```

## Types
- `feat`: New feature
- `fix`: Bug fix  
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependency updates, etc.
- `perf`: Performance improvements
- `ci`: CI configuration changes
- `build`: Build system changes

## Examples
✅ Good:
- `feat(ABC-123): add user authentication`
- `fix(DEF-456): resolve null pointer exception`
- `docs(GHI-789): update API documentation`

❌ Bad:
- `fixed the bug`
- `add new feature`
- `ABC-123 feat: add feature` (wrong format)

## Requirements
- Use lowercase types
- Include ticket number in scope (parentheses)
- Keep description under 72 characters
- Use imperative mood ("add feature" not "added feature")
- No period at end of description

## Rationale
- Enables automated changelog generation
- Supports semantic versioning
- Integrates with ticket systems via GitHub auto-linking
- Provides clear commit history

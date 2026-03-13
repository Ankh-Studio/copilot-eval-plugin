# React Development Patterns

When creating React components, follow these specific patterns for consistency and performance.

## Functional Components

Always use functional components with proper TypeScript typing:

```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick
}) => {
  return (
    <button 
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`btn btn--${variant}`}
    >
      {children}
    </button>
  );
};
```bash

## Hook Usage

Use hooks at the top level of components, never inside conditions or loops:

```typescript
// ✅ Correct
export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(u => {
      setUser(u);
      setLoading(false);
    });
  }, [userId]);

  // ❌ Wrong - hook inside condition
  if (loading) {
    const [data, setData] = useState(null); // Never do this
  }
};
```bash

## Props Destructuring

Destructure props in the function signature for better readability:

```typescript
// ✅ Preferred
export const Card: React.FC<CardProps> = ({ title, content, footer }) => {
  // Component logic
};

// ❌ Avoid
export const Card: React.FC<CardProps> = (props) => {
  const { title, content, footer } = props;
  // Component logic
};
```bash

## Component Naming

- Use PascalCase for component names
- Name files identically to components
- Export components as named exports, not default exports

## State Management

Use useState for simple state, consider useReducer for complex state logic:

```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state with useReducer
const [state, dispatch] = useReducer(formReducer, initialState);
```bash

## Integration with Other Packs

### Accessibility Integration
When working with accessibility patterns, combine with `frontend-a11y-ux` pack:
- Use semantic HTML elements from accessibility guidelines
- Apply ARIA patterns consistently with UX instructions
- Test with screen readers following accessibility prompts

### UI Framework Integration
When using UI components, integrate with `frontend-ui-radix-tailwind` pack:
- Leverage Radix UI primitives for accessible components
- Apply Tailwind CSS classes following styling prompts
- Maintain consistent design system patterns

### Data Layer Integration
When managing data, combine with `frontend-data-tanstack-axios` pack:
- Use TanStack Query for server state management
- Implement proper loading and error states
- Follow data fetching patterns from data prompts

## Cross-Pack Compatibility

### Migration Path
Existing projects can gradually adopt these patterns:
1. Start with functional component conversion
2. Add TypeScript interfaces gradually
3. Introduce hooks progressively
4. Combine with other packs as needed

### Common Patterns
These React patterns are designed to work seamlessly with:
- **TypeScript**: All examples include proper typing
- **Accessibility**: Semantic HTML and ARIA support
- **UI Frameworks**: Compatible with Radix UI and Tailwind
- **Data Management**: Works with TanStack Query patterns

## Troubleshooting

### Common Issues
- **Hook Rules Error**: Ensure hooks are called at component top level
- **TypeScript Errors**: Check interface definitions and imports
- **Performance Issues**: Use useMemo and useCallback for optimization
- **Accessibility Issues**: Test with screen readers and keyboard navigation

### Error Handling
Always include proper error boundaries and error handling:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div role="alert">
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

// Wrap components with error boundaries
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <YourComponent />
</ErrorBoundary>
```bash

## Performance Optimization

### React Best Practices
- Use React.memo for expensive components
- Implement proper key props for lists
- Optimize re-renders with useMemo and useCallback
- Consider code splitting for large applications

### Testing Patterns
Write tests following these patterns:
- Test component behavior, not implementation
- Use React Testing Library for accessibility testing
- Mock external dependencies properly
- Test error states and loading states

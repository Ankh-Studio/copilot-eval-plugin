# React Component Generator

Create a React component following TypeScript best practices and modern patterns.

## Component Requirements

When generating a React component, include:

1. **Proper TypeScript interfaces** for all props
2. **Functional component structure** with React.FC typing
3. **Default props** where appropriate
4. **Event handlers** with proper typing
5. **Accessibility attributes** (aria labels, semantic HTML)
6. **Responsive design considerations**
7. **Error handling** for edge cases

## Template Structure

```typescript
import React from 'react';

interface ComponentNameProps {
  // Define all props with proper types
  title: string;
  onAction?: (action: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onAction,
  disabled = false,
  children
}) => {
  // Component logic here
  const [state, setState] = React.useState<string>('');

  const handleClick = React.useCallback(() => {
    if (onAction) {
      onAction('clicked');
    }
  }, [onAction]);

  return (
    <div className="component-name">
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```bash

## Best Practices to Include

- Use React.useCallback for event handlers
- Implement proper loading states
- Add error boundaries for error handling
- Include semantic HTML elements
- Add proper ARIA attributes
- Consider mobile responsiveness

## Accessibility Checklist

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation support
- Color contrast considerations
- Screen reader compatibility

Generate components that are reusable, accessible, and follow modern React patterns.

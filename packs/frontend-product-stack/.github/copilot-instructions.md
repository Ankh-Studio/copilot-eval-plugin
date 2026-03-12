# Complete Modern React Stack Guidelines

This repository uses a comprehensive modern React stack with TypeScript, accessible UI components, data management, and best practices. Follow these patterns for consistent, scalable, and maintainable code.

## Technology Stack

- **React 18+** with functional components and hooks
- **TypeScript 5+** for type safety and better development experience
- **Radix UI** for accessible, unstyled component primitives
- **Tailwind CSS** for utility-first styling and design consistency
- **TanStack Query** for server state management and data fetching
- **Axios** for HTTP client with proper error handling
- **Accessibility** following WCAG 2.1 AA standards

## Core Development Patterns

### Component Architecture

Use functional components with proper TypeScript interfaces:

```typescript
import React from 'react';

interface ComponentProps {
  title: string;
  onAction?: (action: string) => void;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({ title, onAction, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

### State Management Strategy

- **Local State**: useState for simple component state
- **Server State**: TanStack Query for API data and caching
- **Form State**: Built-in form state or consider form libraries for complex forms
- **Global State**: Context API for app-wide state (theme, user, etc.)

### Data Flow Pattern

```typescript
// Queries for reading data
const { data: users, isLoading, error } = useUsers();

// Mutations for changing data
const createUserMutation = useCreateUser();

// Optimistic updates
const handleCreateUser = async (userData) => {
  await createUserMutation.mutateAsync(userData);
};
```

## Accessibility Requirements

All components must meet WCAG 2.1 AA standards:

- Semantic HTML5 elements
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance (4.5:1 minimum)
- Touch targets minimum 44px

## Styling Guidelines

Use Tailwind CSS with consistent patterns:

```typescript
// Component with variants
const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};
```

## File Organization

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── api/                # API functions and configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── pages/              # Page-level components
```

## Error Handling

Implement comprehensive error handling:

- Error boundaries for component errors
- User-friendly error messages
- Proper error logging
- Graceful degradation
- Retry mechanisms for network failures

## Performance Considerations

- Code splitting with React.lazy
- Memoization with React.memo and useMemo
- Image optimization and lazy loading
- Bundle size monitoring
- Proper caching strategies

## Testing Strategy

- Unit tests for components and hooks
- Integration tests for user flows
- Accessibility testing with screen readers
- Performance testing for critical paths

## Development Workflow

1. Use TypeScript strict mode
2. Enable ESLint with accessibility rules
3. Configure Prettier for consistent formatting
4. Set up pre-commit hooks
5. Use browser dev tools for debugging
6. Test with screen readers and keyboard navigation

This stack provides a solid foundation for building modern, accessible, and maintainable React applications at scale.

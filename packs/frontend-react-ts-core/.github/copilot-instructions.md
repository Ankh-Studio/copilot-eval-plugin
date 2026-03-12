# React + TypeScript Development Guidelines

This repository uses React 18+ with TypeScript 5+ for component development. Follow these patterns for consistent, type-safe code.

## Component Patterns

Use functional components with hooks:

```typescript
interface Props {
  title: string;
  onAction?: (action: string) => void;
}

export const Component: React.FC<Props> = ({ title, onAction }) => {
  const [state, setState] = useState<string>('');
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
```

## TypeScript Guidelines

- Define interfaces for all props and state
- Use generic types for reusable components
- Prefer `React.FC` over direct function typing
- Use `React.ReactNode` for children props
- Apply strict null checks with optional chaining

## File Organization

- Components: `ComponentName.tsx`
- Types: `types.ts` or `ComponentName.types.ts`
- Hooks: `useHookName.ts`
- Utilities: `utils.ts`

## Import Order

1. React imports
2. Third-party libraries
3. Internal components (relative)
4. Types and interfaces
5. Utilities and helpers

```typescript
import React, { useState, useEffect } from 'react';
import { SomeLibrary } from 'third-party-lib';
import { InternalComponent } from './InternalComponent';
import { ComponentProps } from './types';
import { utilityFunction } from '../utils';
```

## Error Handling

Use error boundaries and proper error types:

```typescript
interface ErrorState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorState
> {
  // Implementation
}
```

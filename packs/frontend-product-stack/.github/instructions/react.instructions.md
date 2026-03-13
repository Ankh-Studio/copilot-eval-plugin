# React Development Patterns

When creating React components, follow these specific patterns for consistency and performance.

## Functional Components

Always use functional components with proper TypeScript typing:

````typescript
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
````

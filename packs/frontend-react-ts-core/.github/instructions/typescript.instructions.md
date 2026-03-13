# TypeScript Guidelines for React

Follow these TypeScript patterns when working with React components and applications.

## Interface vs Type

Use interfaces for object shapes that might be extended, types for unions and computed types:

````typescript
// ✅ Interface - can be extended
interface User {
  id: string;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}

// ✅ Type - for unions and computed types
type Theme = 'light' | 'dark';
type UserStatus = 'active' | 'inactive' | 'pending';
type UserWithStatus = User & { status: UserStatus };
```bash

## Component Props Typing

Always define props interfaces explicitly:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className
}) => {
  // Implementation
};
```bash

## Generic Components

Use generics for reusable components:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
```bash

## Event Handler Typing

Type event handlers properly:

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Handle click
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  // Handle change
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle submit
};
```bash

## Utility Types

Use TypeScript utility types effectively:

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Pick specific properties
type UserContactInfo = Pick<User, 'email' | 'phone'>;

// Omit specific properties
type CreateUserRequest = Omit<User, 'id' | 'createdAt'>;

// Create a type with required properties
type RequiredUser = Required<Partial<User>>;
```bash
````

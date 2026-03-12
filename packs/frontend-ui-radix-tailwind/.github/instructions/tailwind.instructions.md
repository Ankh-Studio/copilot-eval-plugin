# Tailwind CSS Guidelines

Use Tailwind CSS for consistent, utility-first styling. Follow these patterns for maintainable and scalable styles.

## Utility-First Approach

Prefer utility classes over custom CSS:

```typescript
// ✅ Preferred - utility classes
<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
  Click me
</button>

// ❌ Avoid - custom CSS classes
<button className="btn-primary">
  Click me
</button>
```

## Component Composition

Create reusable component patterns with consistent utilities:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## Responsive Design

Use Tailwind's responsive prefixes consistently:

```typescript
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-4 md:p-6">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Case study
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
          Blog post title
        </div>
        <p className="mt-2 text-gray-500 text-sm md:text-base">
          Responsive content that adapts to screen size
        </p>
      </div>
    </div>
  );
};
```

## Spacing and Layout

Use consistent spacing scales:

```typescript
// Use consistent spacing units
const spacing = {
  xs: 'p-1 m-1',
  sm: 'p-2 m-2',
  md: 'p-4 m-4',
  lg: 'p-6 m-6',
  xl: 'p-8 m-8'
};

// Layout patterns
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header content */}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};
```

## Color System

Use consistent color palette from tailwind.config.js:

```typescript
// Define color usage patterns
const colors = {
  primary: 'blue',
  secondary: 'gray',
  success: 'green',
  warning: 'yellow',
  danger: 'red'
};

// Apply consistently
export const Alert: React.FC<{ type: 'success' | 'warning' | 'error'; children: React.ReactNode }> = ({
  type,
  children
}) => {
  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={`p-4 border rounded-lg ${typeClasses[type]}`}>
      {children}
    </div>
  );
};
```

## Dark Mode Support

Implement dark mode with proper class strategies:

```typescript
// Use dark: prefix for dark mode styles
export const ThemeToggle: React.FC = () => {
  return (
    <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
      Toggle theme
    </button>
  );
};
```

## Custom Utilities

When needed, extend Tailwind with custom utilities in tailwind.config.js:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
```

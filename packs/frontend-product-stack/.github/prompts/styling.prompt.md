# Tailwind CSS Styling Generator

Create React components with Tailwind CSS utility classes following modern design patterns and
accessibility guidelines.

## Styling Requirements

When generating component styles, include:

1. **Utility-first approach** with Tailwind classes
2. **Responsive design** with mobile-first breakpoints
3. **Dark mode support** with proper class variants
4. **Accessibility considerations** (focus states, contrast)
5. **Component variants** (primary, secondary, etc.)
6. **Consistent spacing** using design tokens
7. **Hover and focus states** for interactive elements
8. **Animation and transitions** where appropriate

## Styling Template Structure

````typescript
import React from 'react';

interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:border-gray-200'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[44px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
      disabled={disabled}
    >
      {/* Component content */}
    </button>
  );
};
```bash

## Design System Patterns

### Color Palette

```typescript
// Primary colors
const colors = {
  primary: {
    50: 'bg-blue-50 text-blue-900',
    100: 'bg-blue-100 text-blue-800',
    500: 'bg-blue-500 text-white',
    600: 'bg-blue-600 text-white',
    700: 'bg-blue-700 text-white',
  },
  semantic: {
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }
};
```bash

### Spacing System

```typescript
// Consistent spacing scale
const spacing = {
  xs: 'p-1 m-1 gap-1',
  sm: 'p-2 m-2 gap-2',
  md: 'p-4 m-4 gap-4',
  lg: 'p-6 m-6 gap-6',
  xl: 'p-8 m-8 gap-8',
  '2xl': 'p-12 m-12 gap-12'
};
```bash

### Typography Scale

```typescript
// Typography hierarchy
const typography = {
  heading: {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold'
  },
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-normal',
    small: 'text-sm leading-snug',
    xs: 'text-xs leading-tight'
  }
};
```bash

## Component Patterns

### Button Component

```typescript
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'cursor-not-allowed opacity-70' : ''}
        focus-visible:ring-2 focus-visible:ring-offset-2
        transform transition-transform active:scale-95
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
```bash

### Card Component

```typescript
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  children
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm border
        ${variant === 'elevated' ? 'shadow-lg' : 'shadow-sm'}
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${paddingClasses[padding]}
      `}
    >
      {children}
    </div>
  );
};
```bash

### Input Component

```typescript
export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  ...props
}) => {
  return (
    <input
      className={`
        w-full border rounded-lg transition-colors
        ${variant === 'outlined' ? 'border-gray-300' : 'border-gray-200 bg-gray-50'}
        ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}
        ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
        ${sizeClasses[size]}
        focus:outline-none focus:ring-2 focus:ring-offset-0
      `}
      disabled={disabled}
      {...props}
    />
  );
};
```bash

## Responsive Design Patterns

### Mobile-First Approach

```typescript
// Responsive utilities
const responsive = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
  text: 'text-sm sm:text-base lg:text-lg',
  spacing: 'p-4 sm:p-6 lg:p-8'
};
```bash

### Breakpoint Usage

```typescript
// Common responsive patterns
export const ResponsiveComponent = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Mobile: single column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content */}
      </div>

      {/* Responsive typography */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Heading
      </h1>
    </div>
  );
};
```bash

## Dark Mode Support

### Dark Mode Classes

```typescript
// Dark mode variants
export const ThemedComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600">
        Themed Button
      </button>
    </div>
  );
};
```bash

## Animation Guidelines

### Micro-interactions

```typescript
// Subtle animations
const animationClasses = {
  fadeIn: 'animate-in fade-in duration-200',
  slideUp: 'animate-in slide-in-from-bottom duration-300',
  scale: 'transform transition-transform hover:scale-105',
  spin: 'animate-spin'
};
```bash

## Accessibility Considerations

### Focus Management

```typescript
// Accessible focus styles
const focusStyles = 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

// High contrast mode support
const highContrast = 'contrast-more:border-current';
```bash

### Motion Preferences

```typescript
// Respect motion preferences
const motionSafe = 'motion-safe:transition-transform motion-safe:hover:scale-105';
const motionReduce = 'motion-reduce:transform-none';
```bash

Generate styles that are maintainable, accessible, and follow modern design system principles using Tailwind CSS utilities.
````

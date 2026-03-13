# Accessible UI Component Generator

Create React components using Radix UI primitives with Tailwind CSS styling, ensuring full
accessibility and modern design patterns.

## Component Requirements

When generating UI components, include:

1. **Radix UI primitives** for accessibility foundation
2. **Tailwind CSS classes** for consistent styling
3. **ARIA attributes** and semantic HTML
4. **Keyboard navigation** support
5. **Focus management** and visual indicators
6. **Responsive design** considerations
7. **Dark mode compatibility**

## Component Template Structure

````typescript
import React from 'react';
import * as RadixComponent from '@radix-ui/react-component-name';

interface ComponentNameProps {
  // Define props with proper types
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className
}) => {
  const baseClasses = 'base-utility-classes';

  const variantClasses = {
    primary: 'variant-specific-classes',
    secondary: 'variant-specific-classes',
    outline: 'variant-specific-classes'
  };

  const sizeClasses = {
    sm: 'size-specific-classes',
    md: 'size-specific-classes',
    lg: 'size-specific-classes'
  };

  return (
    <RadixComponent.Root className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}>
      {/* Radix UI component structure */}
      {children}
    </RadixComponent.Root>
  );
};
```bash

## Common Radix UI Patterns

### Dialog/Modal Component

```typescript
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out">
          <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
          <Dialog.Close className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <button aria-label="Close">
              <XIcon className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```bash

### Dropdown Menu Component

```typescript
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items, align = 'start' }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 min-w-[200px] z-50 data-[state=open]:animate-in data-[state=closed]:animate-out"
          align={align}
          sideOffset={5}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className={`
                px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                ${item.destructive
                  ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
```bash

### Form Field Component

```typescript
import * as Label from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  error,
  description,
  children
}) => {
  return (
    <div className="space-y-2">
      <Label.Root
        htmlFor={id}
        className={`
          block text-sm font-medium
          ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </Label.Root>
      {children}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400" id={`${id}-description`}>
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const ToggleSwitch: React.FC<{
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}> = ({ id, checked, onCheckedChange, disabled = false, label }) => {
  return (
    <div className="flex items-center gap-2">
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`
          h-5 w-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
          ${checked
            ? 'bg-blue-600'
            : 'bg-gray-200 dark:bg-gray-700'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <Switch.Thumb className="block h-4 w-4 rounded-full bg-white transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5" />
      </Switch.Root>
      {label && (
        <Label.Root htmlFor={id} className="text-sm text-gray-700 dark:text-gray-200">
          {label}
        </Label.Root>
      )}
    </div>
  );
};
```bash

## Styling Guidelines

### Tailwind Class Organization

```typescript
// Base classes (always applied)
const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2';

// Variant classes (mutually exclusive)
const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800'
};

// Size classes (mutually exclusive)
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-md',
  lg: 'px-6 py-3 text-lg rounded-lg'
};
```bash

### State-Based Styling

Use Radix UI data attributes for state styling:

```typescript
// Example: Styling based on component state
const stateClasses = `
  data-[state=open]:bg-blue-700
  data-[state=closed]:bg-blue-600
  data-[disabled]:opacity-50
  data-[disabled]:cursor-not-allowed
  focus-visible:ring-2
  focus-visible:ring-offset-2
`;
```bash

## Accessibility Checklist

- [ ] Semantic HTML structure
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Touch target sizes (minimum 44px)
- [ ] High contrast mode support

Generate components that are accessible, reusable, and follow modern React patterns with Radix UI and Tailwind CSS.
````

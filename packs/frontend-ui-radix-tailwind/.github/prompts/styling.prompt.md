# Tailwind CSS Styling Generator for Radix UI Components

Create React components using Radix UI primitives with Tailwind CSS styling, ensuring accessibility and modern design patterns.

## Radix UI + Tailwind Requirements

When generating styled Radix UI components, include:

1. **Radix UI primitives** for accessibility foundation
2. **Tailwind CSS classes** for consistent styling
3. **Data attribute styling** for component states
4. **Responsive design** with mobile-first approach
5. **Dark mode support** with class variants
6. **Focus management** and visual indicators
7. **Animation and transitions** for smooth interactions

## Radix UI + Tailwind Template

```typescript
import React from 'react';
import * as RadixComponent from '@radix-ui/react-component-name';

interface StyledComponentProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const StyledComponent: React.FC<StyledComponentProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false
}) => {
  return (
    <RadixComponent.Root disabled={disabled} className="radix-component-root">
      <RadixComponent.Trigger className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        hover:scale-105 active:scale-95
        focus-visible:ring-2 focus-visible:ring-blue-500
        data-[state=open]:bg-blue-700
        data-[state=closed]:bg-blue-600
        data-[disabled]:opacity-50
      `}>
        {children}
      </RadixComponent.Trigger>
    </RadixComponent.Root>
  );
};

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm min-h-[44px]',
  md: 'px-4 py-2 text-base min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[48px]'
};
```bash

## Radix UI Component Patterns

### Styled Dialog with Tailwind

```typescript
import * as Dialog from '@radix-ui/react-dialog';

export const StyledDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onOpenChange, title, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2">
          <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 data-[state=open]:bg-gray-100 data-[state=open]:dark:bg-gray-700 rounded-sm p-1">
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

### Styled Dropdown Menu

```typescript
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

export const StyledDropdown: React.FC<{
  trigger: React.ReactNode;
  items: DropdownItem[];
}> = ({ trigger, items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1 min-w-[200px] z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className={`
                px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                flex items-center gap-2
                ${item.destructive 
                  ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20' 
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700'
                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-blue-500
                data-[highlighted]:bg-gray-100 data-[highlighted]:dark:bg-gray-700
              `}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
```bash

### Styled Form Controls

```typescript
import * as Label from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';
import * as Checkbox from '@radix-ui/react-checkbox';

export const StyledFormField: React.FC<{
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, id, required = false, error, children }) => {
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
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </Label.Root>
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const StyledSwitch: React.FC<{
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
          h-5 w-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked 
            ? 'bg-blue-600' 
            : 'bg-gray-200 dark:bg-gray-700'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          data-[state=checked]:bg-blue-600
          data-[state=unchecked]:bg-gray-200
          data-[disabled]:opacity-50
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

export const StyledCheckbox: React.FC<{
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}> = ({ id, checked, onCheckedChange, disabled = false, label }) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`
          h-4 w-4 rounded border border-gray-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600
          data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300
          data-[disabled]:opacity-50
        `}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-white">
          <CheckIcon className="h-3 w-3" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && (
        <Label.Root htmlFor={id} className="text-sm text-gray-700 dark:text-gray-200">
          {label}
        </Label.Root>
      )}
    </div>
  );
};
```bash

## State-Based Styling with Data Attributes

### Common Data Attribute Patterns

```typescript
// Radix UI provides data attributes for state styling
const stateStyles = `
  // Open/closed states
  data-[state=open]:bg-blue-700
  data-[state=closed]:bg-blue-600
  
  // Disabled states
  data-[disabled]:opacity-50
  data-[disabled]:cursor-not-allowed
  
  // Highlighted/focused states (in dropdowns, menus)
  data-[highlighted]:bg-gray-100
  data-[highlighted]:dark:bg-gray-700
  
  // Checked/unchecked states
  data-[state=checked]:bg-blue-600
  data-[state=unchecked]:bg-gray-200
  
  // Active/inactive states
  data-[state=active]:bg-blue-700
  data-[state=inactive]:bg-gray-600
`;
```bash

### Animation with Data Attributes

```typescript
// Smooth transitions using data attributes
const animationStyles = `
  // Fade animations
  data-[state=open]:animate-in data-[state=open]:fade-in-0
  data-[state=closed]:animate-out data-[state=closed]:fade-out-0
  
  // Scale animations
  data-[state=open]:animate-in data-[state=open]:zoom-in-95
  data-[state=closed]:animate-out data-[state=closed]:zoom-out-95
  
  // Slide animations
  data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2
  data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2
`;
```bash

## Dark Mode Support

### Dark Mode Variants

```typescript
export const DarkModeComponent = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <button className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400">
        Dark Mode Button
      </button>
      
      <Dialog.Root>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 dark:bg-black/70" />
          <Dialog.Content className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <Dialog.Title className="text-gray-900 dark:text-gray-100">
              Dark Mode Dialog
            </Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
```bash

## Responsive Design with Radix UI

### Responsive Component Patterns

```typescript
export const ResponsiveDialog = ({ children, ...props }) => {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className={`
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg
          w-[calc(100vw-2rem)] sm:w-full max-w-md
          max-h-[calc(100vh-2rem)] sm:max-h-[90vh]
          overflow-auto
        `}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```bash

## Accessibility Enhancements

### Focus Management

```typescript
// Enhanced focus styles for Radix components
const focusStyles = `
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus-visible:ring-offset-2
`;

// High contrast mode support
const highContrastStyles = `
  contrast-more:border-current
  contrast-more:text-current
`;
```bash

Generate Radix UI components with Tailwind CSS that are fully accessible, responsive, and follow modern design system principles.

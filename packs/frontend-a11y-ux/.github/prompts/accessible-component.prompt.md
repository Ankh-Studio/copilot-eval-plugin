# Accessible Component Generator

Create React components that meet WCAG 2.1 AA standards with semantic HTML, ARIA attributes, and keyboard navigation.

## Core Requirements

Generate components with:

1. **Semantic HTML** for structure
2. **ARIA attributes** where needed
3. **Keyboard navigation** for all interactions
4. **Focus management** and visual indicators
5. **Screen reader** compatibility
6. **Color contrast** compliance (4.5:1)
7. **Touch targets** minimum 44px
8. **Error announcements** for feedback

## Accessible Button Template

```typescript
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}

export const AccessibleButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  ariaLabel,
  onClick
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```bash

## Accessible Input Template

```typescript
import React from 'react';

interface InputProps {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const AccessibleInput: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  disabled = false,
  value,
  onChange
}) => {
  const inputId = React.useId();
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId}>
        {label}
        {required && <span aria-label="required">*</span>}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && (
        <div id={errorId} role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
};
```bash
  const componentRef = useRef<HTMLDivElement>(null);

  // Focus management logic
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle keyboard interactions
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Handle activation
        break;
      case 'Escape':
        // Handle cancellation
        break;
    }
  };

  return (
    <div
      ref={componentRef}
      role="button" // Or appropriate role
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-required={required}
      aria-invalid={invalid}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      onKeyDown={handleKeyDown}
      className={`
        // Focus styles
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        // Disabled styles
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        // Invalid styles
        ${invalid ? 'border-red-500' : ''}
      `}
    >
      {children}
    </div>
  );
};
```bash

## Common Accessible Patterns

### Accessible Button

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const AccessibleButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  ariaLabel,
  ariaDescribedBy
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[44px]', // 44px minimum touch target
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {children}
    </button>
  );
};
```bash

### Accessible Form Field

```typescript
interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  error,
  hint,
  children
}) => {
  const describedBy = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${
          error ? 'text-red-600' : 'text-gray-700'
        }`}
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {React.cloneElement(children as React.ReactElement, {
        id,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': !!error,
        'aria-required': required
      })}
      
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-gray-500">
          {hint}
        </p>
      )}
      
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-sm text-red-600" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
```bash

### Accessible Modal/Dialog

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AccessibleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
        
        if (event.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (event.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        // Restore focus
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>
        
        <h2 id="modal-title" className="text-lg font-semibold mb-4">
          {title}
        </h2>
        
        <div className="mb-6">
          {children}
        </div>
      </div>
    </div>
  );
};
```bash

### Accessible Navigation

```typescript
interface NavigationItem {
  label: string;
  href: string;
  current?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  ariaLabel?: string;
}

export const AccessibleNavigation: React.FC<NavigationProps> = ({
  items,
  ariaLabel = 'Main navigation'
}) => {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex space-x-6">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`
                px-3 py-2 rounded-md text-sm font-medium
                ${item.current
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```bash

## Accessibility Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements reachable with Tab
- [ ] Logical tab order
- [ ] Enter/Space activation for buttons
- [ ] Escape cancellation where appropriate
- [ ] Arrow key navigation for menus
- [ ] Visible focus indicators

### Screen Reader Support
- [ ] Semantic HTML structure
- [ ] Proper ARIA labels and descriptions
- [ ] Announcements for dynamic content
- [ ] Form error announcements
- [ ] Status updates via live regions

### Visual Accessibility
- [ ] Color contrast 4.5:1 minimum
- [ ] Text resizing to 200% maintains functionality
- [ ] High contrast mode compatibility
- [ ] Touch targets 44px minimum
- [ ] No reliance on color alone

### Cognitive Accessibility
- [ ] Clear error messages
- [ ] Consistent navigation
- [ ] Predictable functionality
- [ ] Help text and instructions
- [ ] Sufficient time limits (if any)

Generate components that are fully accessible and provide an inclusive experience for all users.

# Accessibility (WCAG) Guidelines

Follow WCAG 2.1 AA standards for inclusive design. These patterns ensure your components work for all users.

## Semantic HTML

Use proper semantic HTML5 elements:

```typescript
// ✅ Semantic HTML
export const ArticleLayout: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <time dateTime="2023-01-01">January 1, 2023</time>
      </header>
      <main>
        <p>{content}</p>
      </main>
      <footer>
        <nav aria-label="Article navigation">
          <a href="#prev">Previous</a>
          <a href="#next">Next</a>
        </nav>
      </footer>
    </article>
  );
};

// ❌ Non-semantic div soup
export const BadArticleLayout: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div>
      <div>
        <div>{title}</div>
        <div>January 1, 2023</div>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div>
        <div>
          <a href="#prev">Previous</a>
          <a href="#next">Next</a>
        </div>
      </div>
    </div>
  );
};
```

## ARIA Attributes

Use ARIA attributes appropriately:

```typescript
export const AccordionItem: React.FC<{
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, content, isOpen, onToggle }) => {
  const itemId = `accordion-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="border rounded-lg">
      <h3>
        <button
          aria-expanded={isOpen}
          aria-controls={itemId}
          onClick={onToggle}
          className="w-full text-left p-4 font-medium"
        >
          {title}
          <span aria-hidden="true" className="float-right">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={itemId}
        role="region"
        aria-labelledby={`${itemId}-button`}
        hidden={!isOpen}
        className="p-4 border-t"
      >
        {content}
      </div>
    </div>
  );
};
```

## Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
export const CustomButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}> = ({ children, onClick, disabled = false }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) {
        onClick();
      }
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      className={`px-4 py-2 rounded ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
      }`}
    >
      {children}
    </div>
  );
};
```

## Focus Management

Manage focus properly for custom components:

```typescript
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      
      return () => {
        document.removeEventListener('keydown', handleTabKey);
        // Restore focus
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

## Form Accessibility

Ensure forms are properly labeled:

```typescript
export const FormField: React.FC<{
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, id, required = false, error, children }) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id}
        className={`block text-sm font-medium mb-1 ${
          error ? 'text-red-600' : 'text-gray-700'
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const TextInput: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}> = ({ id, value, onChange, placeholder, error, required }) => {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full px-3 py-2 border rounded-md ${
        error 
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      }`}
    />
  );
};
```

## Color and Contrast

Ensure sufficient color contrast (4.5:1 for normal text):

```typescript
// ✅ Good contrast
const goodColors = {
  text: 'text-gray-900', // Dark text on light background
  background: 'bg-white',
  primary: 'bg-blue-600 text-white', // Blue with white text
  error: 'bg-red-600 text-white', // Red with white text
};

// ❌ Poor contrast
const badColors = {
  text: 'text-gray-400', // Light gray text
  primary: 'bg-blue-200 text-gray-300', // Light blue with light gray text
};
```

## Screen Reader Announcements

Use ARIA live regions for dynamic content:

```typescript
export const StatusMessage: React.FC<{ message: string; type: 'success' | 'error' | 'info' }> = ({ 
  message, 
  type 
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`p-3 rounded-md ${
        type === 'success' ? 'bg-green-100 text-green-800' :
        type === 'error' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}
    >
      {message}
    </div>
  );
};

// For alerts that need immediate attention
export const AlertMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="p-3 bg-red-100 text-red-800 rounded-md"
    >
      {message}
    </div>
  );
};
```

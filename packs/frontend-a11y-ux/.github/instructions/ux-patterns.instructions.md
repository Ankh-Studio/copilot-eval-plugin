# UX Design Patterns for Accessible Interfaces

Follow these UX patterns to create intuitive, accessible, and user-friendly interfaces that work for everyone.

## Accessibility-First Design Principles

### Universal Design
- Design for the widest possible audience from the start
- Don't treat accessibility as an afterthought
- Consider diverse user needs and abilities
- Test with actual assistive technology users

### Progressive Enhancement
- Ensure core functionality works without JavaScript
- Layer enhancements on top of semantic HTML
- Maintain functionality across different devices and capabilities
- Provide alternatives for complex interactions

## User Experience Patterns

### Navigation Patterns

#### Accessible Navigation Menu
```typescript
// Semantic navigation with proper ARIA
export const AccessibleNavigation = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex space-x-6">
        <li>
          <a 
            href="/home" 
            aria-current="page"
            className="px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700"
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="/about" 
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};
```bash

#### Breadcrumb Navigation
```typescript
export const Breadcrumb = () => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <a href="/products" className="text-gray-500 hover:text-gray-700">
            Products
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span className="text-gray-900 font-medium">Current Page</span>
        </li>
      </ol>
    </nav>
  );
};
```bash

### Form Patterns

#### Accessible Form Structure
```typescript
export const AccessibleForm = () => {
  return (
    <form aria-labelledby="form-title">
      <fieldset className="space-y-4">
        <legend className="text-lg font-medium">Personal Information</legend>
        
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name <span aria-label="required">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            aria-describedby="name-help name-error"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <p id="name-help" className="text-sm text-gray-500">
            Enter your full legal name
          </p>
          <p id="name-error" className="text-sm text-red-600" role="alert">
            {/* Error message appears here */}
          </p>
        </div>
      </fieldset>
    </form>
  );
};
```bash

#### Radio Button Groups
```typescript
export const RadioGroup = () => {
  return (
    <fieldset role="radiogroup" aria-labelledby="payment-label">
      <legend id="payment-label" className="text-sm font-medium text-gray-700">
        Payment Method
      </legend>
      <div className="space-y-2">
        {['Credit Card', 'PayPal', 'Bank Transfer'].map((method, index) => (
          <div key={method}>
            <input
              type="radio"
              id={`payment-${index}`}
              name="payment"
              value={method.toLowerCase().replace(' ', '-')}
              className="sr-only"
            />
            <label
              htmlFor={`payment-${index}`}
              className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3 peer-checked:bg-blue-600 peer-checked:border-blue-600"></span>
              {method}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
```bash

### Content Patterns

#### Accessible Cards
```typescript
export const AccessibleCard = ({ title, description, link, imageAlt }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageAlt && (
        <img 
          src="/image.jpg" 
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <a 
            href={link}
            className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            {title}
          </a>
        </h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={link}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-describedby={`${title}-read-more`}
        >
          Read more
          <span className="sr-only" id={`${title}-read-more`}>
            about {title}
          </span>
        </a>
      </div>
    </article>
  );
};
```bash

#### Data Tables
```typescript
export const AccessibleTable = () => {
  return (
    <table role="table" aria-label="User data">
      <caption className="text-left text-sm text-gray-600 mb-2">
        List of registered users with their roles and status
      </caption>
      <thead>
        <tr>
          <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-900">
            Name
          </th>
          <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-900">
            Role
          </th>
          <th scope="col" className="px-4 py-2 text-left text-sm font-medium text-gray-900">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
          <td className="px-4 py-2 text-sm text-gray-900">Administrator</td>
          <td className="px-4 py-2 text-sm">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
```bash

## Interaction Patterns

### Button Variants

#### Primary Actions
```typescript
export const PrimaryButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 bg-blue-600 text-white rounded-md
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
        min-h-[44px] min-w-[44px] // Touch target size
      `}
    >
      {children}
    </button>
  );
};
```bash

#### Secondary Actions
```typescript
export const SecondaryButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
    >
      {children}
    </button>
  );
};
```bash

### Loading and Progress Patterns

#### Loading States
```typescript
export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md min-h-[44px]"
      aria-busy={loading}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      <span className={loading ? 'sr-only' : undefined}>
        {children}
      </span>
      {loading && (
        <span aria-live="polite" className="sr-only">
          Loading, please wait
        </span>
      )}
    </button>
  );
};
```bash

#### Progress Indicators
```typescript
export const ProgressBar = ({ value, max = 100, label }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
```bash

## Error and Feedback Patterns

### Error Messages
```typescript
export const ErrorMessage = ({ message, onDismiss }) => {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-md p-4"
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">{message}</div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-md p-1.5 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Dismiss error"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
```bash

### Success Messages
```typescript
export const SuccessMessage = ({ message }) => {
  return (
    <div 
      className="bg-green-50 border border-green-200 rounded-md p-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Success</h3>
          <div className="mt-2 text-sm text-green-700">{message}</div>
        </div>
      </div>
    </div>
  );
};
```bash

## Mobile-First Patterns

### Touch-Friendly Interactions
```typescript
export const MobileButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`
        px-6 py-3 bg-blue-600 text-white rounded-lg
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        min-h-[48px] min-w-[48px] // Larger touch targets for mobile
        text-base // Larger text for mobile readability
      `}
    >
      {children}
    </button>
  );
};
```bash

### Responsive Navigation
```typescript
export const MobileNavigation = () => {
  return (
    <nav aria-label="Mobile navigation">
      <div className="flex justify-around items-center h-16 bg-white border-t border-gray-200">
        {[
          { icon: HomeIcon, label: 'Home', href: '/' },
          { icon: SearchIcon, label: 'Search', href: '/search' },
          { icon: UserIcon, label: 'Profile', href: '/profile' }
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center justify-center p-2 min-h-[48px] min-w-[48px]"
            aria-label={label}
          >
            <Icon className="h-6 w-6 text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};
```bash

## Content Guidelines

### Writing for Accessibility
- Use clear, simple language (8th grade reading level or lower)
- Write descriptive link text (avoid "click here")
- Use headings hierarchically (h1, h2, h3, etc.)
- Provide alternative text for meaningful images
- Use descriptive button labels

### Visual Hierarchy
- Use size, weight, and color to establish hierarchy
- Maintain consistent spacing patterns
- Use whitespace effectively
- Ensure sufficient color contrast (4.5:1 minimum)
- Don't rely on color alone to convey meaning

Follow these patterns to create interfaces that are accessible, usable, and delightful for all users, regardless of their abilities or the devices they use.

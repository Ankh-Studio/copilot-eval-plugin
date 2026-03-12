# UX Design Patterns and Guidelines

Follow these UX patterns to create intuitive, user-friendly interfaces that provide excellent user experiences.

## Design Principles

### Clarity and Simplicity
- Use clear, concise language
- Avoid unnecessary complexity
- Prioritize essential information
- Use visual hierarchy to guide attention

### Consistency
- Maintain consistent patterns across the application
- Use familiar UI conventions
- Keep interactions predictable
- Standardize colors, typography, and spacing

### Accessibility
- Design for all users and abilities
- Ensure keyboard navigation
- Provide sufficient color contrast
- Include screen reader support

### Feedback and Response
- Provide immediate feedback for user actions
- Use loading states for async operations
- Show clear error messages and recovery options
- Confirm successful actions

## Common UX Patterns

### Navigation Patterns

#### Primary Navigation
- Keep navigation simple and organized
- Use clear labels for navigation items
- Highlight current page/section
- Provide breadcrumbs for deep hierarchies

#### Progressive Disclosure
- Show essential information first
- Reveal details on demand
- Use accordions and tabs for organization
- Hide advanced options by default

### Form Patterns

#### Form Layout
- Group related fields together
- Use single-column layouts for mobile
- Provide clear labels and placeholders
- Show validation errors inline

#### Input Patterns
```typescript
// Good form field pattern
<FormField
  label="Email Address"
  id="email"
  required
  hint="We'll never share your email"
  error={errors.email}
>
  <TextInput
    id="email"
    type="email"
    value={values.email}
    onChange={setEmail}
    placeholder="you@example.com"
  />
</FormField>
```

### Content Patterns

#### Card Layouts
- Use cards for related information
- Include clear headings and actions
- Maintain consistent card structures
- Use whitespace effectively

#### Data Tables
- Provide sorting and filtering
- Use clear column headers
- Include pagination for large datasets
- Offer row actions where appropriate

## Interaction Patterns

### Button Interactions
- Use primary buttons for main actions
- Provide visual feedback on hover/focus
- Disable buttons during loading
- Group related buttons together

### Modal Dialogs
- Use modals for focused tasks
- Provide clear close options
- Prevent background interaction
- Maintain focus within modal

### Loading States
- Show loading indicators for async operations
- Use skeleton screens for content loading
- Provide progress indicators for long operations
- Allow cancellation when appropriate

## Mobile UX Considerations

### Touch Targets
- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Consider thumb reach zones
- Avoid hover-only interactions

### Mobile Navigation
- Use bottom navigation for primary actions
- Implement hamburger menus for secondary navigation
- Consider swipe gestures for navigation
- Optimize for one-handed use

### Responsive Design
- Design mobile-first
- Adapt layouts for different screen sizes
- Optimize images and media
- Consider device capabilities

## Error Handling and Recovery

### Error Prevention
- Validate input before submission
- Provide clear constraints and formats
- Use confirmations for destructive actions
- Offer undo functionality

### Error Communication
- Use clear, human-readable error messages
- Explain what went wrong and why
- Provide specific recovery steps
- Maintain brand voice in error messages

### Recovery Patterns
- Offer retry options for network errors
- Preserve user input during errors
- Provide alternative paths when possible
- Include help links for complex issues

## Performance UX

### Perceived Performance
- Show content immediately when possible
- Use progressive loading for complex pages
- Implement skeleton screens
- Optimize critical rendering path

### Loading Feedback
- Use progress bars for determinate operations
- Use spinners for indeterminate operations
- Show estimated time when available
- Allow users to continue during background operations

## Visual Design Guidelines

### Typography
- Use readable font sizes (16px minimum for body text)
- Maintain adequate line height (1.5x preferred)
- Use font weights for hierarchy
- Limit font families to 2-3 maximum

### Color Usage
- Use color consistently for meaning
- Ensure sufficient contrast ratios
- Don't rely on color alone
- Consider color blindness accessibility

### Spacing and Layout
- Use consistent spacing scales
- Align elements properly
- Use whitespace effectively
- Maintain visual rhythm

## Content Strategy

### Writing Style
- Use active voice and simple language
- Write for scanning (short paragraphs, bullet points)
- Use consistent terminology
- Provide context and instructions

### Microcopy
- Write helpful button labels
- Provide descriptive placeholder text
- Use encouraging error messages
- Include contextual help when needed

Follow these patterns to create experiences that are intuitive, accessible, and delightful for all users.

# UX Review and Improvement Generator

Analyze and improve user experience design patterns, accessibility, and usability of React components and interfaces.

## UX Review Requirements

When conducting UX reviews, include:

1. **Accessibility audit** against WCAG 2.1 AA standards
2. **Usability assessment** for user workflows and interactions
3. **Visual design review** for consistency and hierarchy
4. **Performance considerations** for perceived and actual speed
5. **Mobile responsiveness** evaluation across devices
6. **Error handling analysis** for user recovery
7. **Content clarity** assessment for messaging and instructions
8. **Navigation flow** review for user journeys

## UX Review Template

```typescript
interface UXReview {
  component: string;
  accessibility: AccessibilityScore;
  usability: UsabilityScore;
  visualDesign: DesignScore;
  performance: PerformanceScore;
  issues: UXIssue[];
  recommendations: UXRecommendation[];
}

interface UXIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'accessibility' | 'usability' | 'design' | 'performance';
  description: string;
  impact: string;
  solution: string;
}
```bash

## Accessibility Review Patterns

### Focus Management Review

```typescript
export const reviewFocusManagement = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check for visible focus indicators
  if (!hasVisibleFocusStyles(component)) {
    issues.push({
      severity: 'high',
      category: 'accessibility',
      description: 'Component lacks visible focus indicators',
      impact: 'Keyboard users cannot track focus location',
      solution: 'Add focus-visible styles with :focus-visible or data-focus attributes'
    });
  }
  
  // Check focus trap in modals
  if (isModalComponent(component) && !hasFocusTrap(component)) {
    issues.push({
      severity: 'critical',
      category: 'accessibility',
      description: 'Modal does not trap focus within dialog',
      impact: 'Focus can escape to background elements',
      solution: 'Implement focus trap using focus management library or custom logic'
    });
  }
  
  return issues;
};
```bash

### Color Contrast Analysis

```typescript
export const analyzeColorContrast = (styles: CSSProperties) => {
  const issues: UXIssue[] = [];
  
  const foregroundColor = styles.color;
  const backgroundColor = styles.backgroundColor;
  
  if (foregroundColor && backgroundColor) {
    const contrastRatio = calculateContrastRatio(foregroundColorColor, backgroundColorColor);
    
    if (contrastRatio < 4.5) {
      issues.push({
        severity: 'high',
        category: 'accessibility',
        description: `Insufficient color contrast: ${contrastRatio.toFixed(2)}:1`,
        impact: 'Text difficult to read for users with visual impairments',
        solution: 'Increase contrast ratio to meet WCAG AA standards (4.5:1 minimum)'
      });
    }
  }
  
  return issues;
};
```bash

## Usability Review Patterns

### Interaction Design Review

```typescript
export const reviewInteractions = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check for hover states
  if (isInteractiveComponent(component) && !hasHoverStates(component)) {
    issues.push({
      severity: 'medium',
      category: 'usability',
      description: 'Interactive element lacks hover state',
      impact: 'Users unsure if element is clickable',
      solution: 'Add hover styles to indicate interactivity'
    });
  }
  
  // Check for loading states
  if (hasAsyncOperations(component) && !hasLoadingStates(component)) {
    issues.push({
      severity: 'high',
      category: 'usability',
      description: 'Async operation lacks loading indicator',
      impact: 'Users unsure if action is in progress',
      solution: 'Add loading spinner or skeleton screen during async operations'
    });
  }
  
  return issues;
};
```bash

### Form Usability Analysis

```typescript
export const analyzeFormUsability = (formComponent: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check for clear labels
  if (!hasProperLabels(formComponent)) {
    issues.push({
      severity: 'critical',
      category: 'usability',
      description: 'Form inputs lack proper labels',
      impact: 'Screen reader users cannot understand input purpose',
      solution: 'Add associated labels using htmlFor or aria-label attributes'
    });
  }
  
  // Check for inline validation
  if (!hasInlineValidation(formComponent)) {
    issues.push({
      severity: 'medium',
      category: 'usability',
      description: 'Form lacks inline validation feedback',
      impact: 'Users must submit form to discover errors',
      solution: 'Add real-time validation with clear error messages'
    });
  }
  
  return issues;
};
```bash

## Visual Design Review

### Typography Analysis

```typescript
export const reviewTypography = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check text hierarchy
  if (!hasClearHierarchy(component)) {
    issues.push({
      severity: 'medium',
      category: 'design',
      description: 'Typography lacks clear visual hierarchy',
      impact: 'Users cannot easily scan and prioritize information',
      solution: 'Establish consistent heading sizes and font weights'
    });
  }
  
  // Check line height
  const lineHeight = getLineHeight(component);
  if (lineHeight < 1.4) {
    issues.push({
      severity: 'medium',
      category: 'design',
      description: 'Line height too tight for readability',
      impact: 'Text difficult to read, especially for users with dyslexia',
      solution: 'Increase line height to 1.4-1.6 for body text'
    });
  }
  
  return issues;
};
```bash

### Spacing and Layout Review

```typescript
export const analyzeLayout = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check for adequate spacing
  if (!hasAdequateSpacing(component)) {
    issues.push({
      severity: 'medium',
      category: 'design',
      description: 'Insufficient spacing between interactive elements',
      impact: 'Users may accidentally tap wrong target on mobile',
      solution: 'Increase spacing to meet 44px minimum touch target requirements'
    });
  }
  
  // Check visual alignment
  if (!hasProperAlignment(component)) {
    issues.push({
      severity: 'low',
      category: 'design',
      description: 'Elements not properly aligned',
      impact: 'Interface appears unprofessional and harder to scan',
      solution: 'Use consistent grid system and alignment utilities'
    });
  }
  
  return issues;
};
```bash

## Performance Review

### Perceived Performance Analysis

```typescript
export const analyzePerceivedPerformance = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check for loading skeletons
  if (hasAsyncContent(component) && !hasLoadingSkeletons(component)) {
    issues.push({
      severity: 'medium',
      category: 'performance',
      description: 'Async content lacks loading skeleton',
      impact: 'Users experience jarring content shifts',
      solution: 'Add skeleton screens to maintain layout stability'
    });
  }
  
  // Check for unnecessary re-renders
  if (hasUnnecessaryRerenders(component)) {
    issues.push({
      severity: 'low',
      category: 'performance',
      description: 'Component re-renders unnecessarily',
      impact: 'Reduced performance and battery life',
      solution: 'Optimize with React.memo, useMemo, or useCallback'
    });
  }
  
  return issues;
};
```bash

## Mobile UX Review

### Touch Target Analysis

```typescript
export const reviewTouchTargets = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  const touchTargets = getTouchTargets(component);
  
  touchTargets.forEach(target => {
    const size = getTouchTargetSize(target);
    
    if (size < 44) {
      issues.push({
        severity: 'high',
        category: 'usability',
        description: `Touch target too small: ${size}px (minimum 44px required)`,
        impact: 'Difficult to accurately tap on mobile devices',
        solution: 'Increase touch target size or add padding around interactive elements'
      });
    }
  });
  
  return issues;
};
```bash

### Responsive Design Review

```typescript
export const analyzeResponsiveDesign = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check mobile-first approach
  if (!isMobileFirst(component)) {
    issues.push({
      severity: 'medium',
      category: 'design',
      description: 'Component not designed mobile-first',
      impact: 'Poor mobile experience and larger CSS bundles',
      solution: 'Restructure with mobile-first responsive design'
    });
  }
  
  // Check breakpoint usage
  if (!hasProperBreakpoints(component)) {
    issues.push({
      severity: 'low',
      category: 'design',
      description: 'Inconsistent breakpoint usage',
      impact: 'Uneven responsive behavior across screen sizes',
      solution: 'Standardize breakpoint usage across components'
    });
  }
  
  return issues;
};
```bash

## Content Review

### Clarity and Readability

```typescript
export const reviewContentClarity = (component: React.ComponentType) => {
  const issues: UXIssue[] = [];
  
  // Check reading level
  const readingLevel = calculateReadingLevel(component);
  if (readingLevel > 8) {
    issues.push({
      severity: 'medium',
      category: 'usability',
      description: `Content reading level too high: grade ${readingLevel}`,
      impact: 'Content difficult to understand for many users',
      solution: 'Simplify language to 8th grade reading level or lower'
    });
  }
  
  // Check for jargon
  if (containsExcessiveJargon(component)) {
    issues.push({
      severity: 'low',
      category: 'usability',
      description: 'Content contains excessive technical jargon',
      impact: 'Users may not understand terminology',
      solution: 'Replace jargon with plain language or provide explanations'
    });
  }
  
  return issues;
};
```bash

## UX Improvement Recommendations

### Prioritization Framework

```typescript
export const prioritizeImprovements = (issues: UXIssue[]): UXRecommendation[] => {
  return issues
    .sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })
    .map(issue => ({
      issue,
      priority: getPriority(issue.severity),
      estimatedEffort: estimateEffort(issue),
      expectedImpact: estimateImpact(issue),
      implementation: generateImplementationPlan(issue)
    }));
};
```bash

### Implementation Templates

```typescript
export const generateAccessibilityFix = (issue: UXIssue): string => {
  switch (issue.description) {
    case 'Component lacks visible focus indicators':
      return `
// Add focus-visible styles
const buttonStyles = `
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  focus-visible:ring-2 focus-visible:ring-blue-500
`;
      `;
    
    case 'Modal does not trap focus within dialog':
      return `
// Implement focus trap
import { useFocusTrap } from '@radix-ui/react-dialog';

// In modal component:
const focusTrapRef = useFocusTrap();
      `;
    
    default:
      return '// Review specific implementation requirements';
  }
};
```bash

Generate comprehensive UX reviews that identify accessibility issues, usability problems, and provide actionable improvement recommendations for better user experiences.

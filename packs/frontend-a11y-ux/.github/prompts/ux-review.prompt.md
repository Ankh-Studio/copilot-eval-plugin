# Accessibility and UX Review Generator

Analyze React components and interfaces for accessibility compliance, usability issues, and UX best
practices following WCAG 2.1 AA standards.

## Accessibility Review Requirements

When conducting accessibility and UX reviews, include:

1. **WCAG 2.1 AA compliance** audit against all success criteria
2. **Screen reader testing** patterns and compatibility
3. **Keyboard navigation** analysis and focus management
4. **Color contrast** validation for all text and UI elements
5. **Touch target** size and spacing verification
6. **Semantic HTML** structure and heading hierarchy
7. **ARIA implementation** review for custom components
8. **Usability testing** for user workflows and interactions

## Accessibility Review Template

````typescript
interface AccessibilityReview {
  component: string;
  wcagCompliance: WCAGScore;
  screenReaderSupport: ScreenReaderScore;
  keyboardNavigation: KeyboardScore;
  colorContrast: ContrastScore;
  touchTargets: TouchTargetScore;
  semanticHTML: SemanticScore;
  issues: AccessibilityIssue[];
  recommendations: AccessibilityRecommendation[];
}

interface AccessibilityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  wcagCriterion: string; // e.g., "1.4.3 Contrast (Minimum)"
  category: 'perceivable' | 'operable' | 'understandable' | 'robust';
  description: string;
  impact: string;
  solution: string;
  codeExample?: string;
}
```bash

## WCAG Compliance Analysis

### Color Contrast Review

```typescript
export const analyzeColorContrast = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check text contrast ratios
  const textElements = getTextElements(component);
  textElements.forEach(element => {
    const foreground = getForegroundColor(element);
    const background = getBackgroundColor(element);
    const ratio = calculateContrastRatio(foreground, background);

    if (ratio < 4.5) {
      issues.push({
        severity: 'high',
        wcagCriterion: '1.4.3 Contrast (Minimum)',
        category: 'perceivable',
        description: `Insufficient color contrast: ${ratio.toFixed(2)}:1 (minimum 4.5:1 required)`,
        impact: 'Text difficult to read for users with visual impairments',
        solution: 'Increase contrast ratio by adjusting foreground or background colors',
        codeExample: `
// Current (insufficient contrast)
className="text-gray-400 bg-white"

// Improved (sufficient contrast)
className="text-gray-600 bg-white"
        `
      });
    }
  });

  // Check large text contrast (3:1 minimum)
  const largeTextElements = getLargeTextElements(component);
  largeTextElements.forEach(element => {
    const ratio = calculateContrastRatio(
      getForegroundColor(element),
      getBackgroundColor(element)
    );

    if (ratio < 3.0) {
      issues.push({
        severity: 'medium',
        wcagCriterion: '1.4.3 Contrast (Minimum)',
        category: 'perceivable',
        description: `Insufficient large text contrast: ${ratio.toFixed(2)}:1 (minimum 3:1 required)`,
        impact: 'Large heading text difficult to read',
        solution: 'Increase contrast for large text elements to 3:1 minimum'
      });
    }
  });

  return issues;
};
```bash

### Focus Management Review

```typescript
export const analyzeFocusManagement = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check for visible focus indicators
  const interactiveElements = getInteractiveElements(component);
  interactiveElements.forEach(element => {
    if (!hasVisibleFocusStyles(element)) {
      issues.push({
        severity: 'high',
        wcagCriterion: '2.4.7 Focus Visible',
        category: 'operable',
        description: 'Interactive element lacks visible focus indicator',
        impact: 'Keyboard users cannot track focus location',
        solution: 'Add visible focus styles using :focus-visible or data-focus attributes',
        codeExample: `
// Add focus-visible styles
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

// Or use data attributes for custom focus states
data-focus-visible="ring-2 ring-blue-500"
        `
      });
    }
  });

  // Check focus trap in modals
  if (isModalComponent(component) && !hasFocusTrap(component)) {
    issues.push({
      severity: 'critical',
      wcagCriterion: '2.1.2 No Keyboard Trap',
      category: 'operable',
      description: 'Modal does not implement proper focus trap',
      impact: 'Focus can escape to background elements, breaking keyboard navigation',
      solution: 'Implement focus trap using focus management library or custom logic',
      codeExample: `
// Implement focus trap
import { useFocusTrap } from '@radix-ui/react-dialog';

const focusTrapRef = useFocusTrap();
return <div ref={focusTrapRef}>Modal content</div>;
      `
    });
  }

  // Check logical tab order
  const tabOrder = getTabOrder(component);
  if (!isLogicalTabOrder(tabOrder)) {
    issues.push({
      severity: 'medium',
      wcagCriterion: '2.4.3 Focus Order',
      category: 'operable',
      description: 'Focus order does not follow logical reading order',
      impact: 'Keyboard navigation confusing and unpredictable',
      solution: 'Ensure DOM structure matches visual layout and reading order'
    });
  }

  return issues;
};
```bash

### Keyboard Navigation Analysis

```typescript
export const analyzeKeyboardNavigation = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check for keyboard accessibility
  const clickTargets = getClickTargets(component);
  clickTargets.forEach(target => {
    if (!isKeyboardAccessible(target)) {
      issues.push({
        severity: 'critical',
        wcagCriterion: '2.1.1 Keyboard',
        category: 'operable',
        description: 'Interactive element not accessible via keyboard',
        impact: 'Keyboard users cannot access functionality',
        solution: 'Ensure all interactive elements are keyboard accessible',
        codeExample: `
// Use semantic HTML elements
<button onClick={handleClick}>Click me</button>

// Or add keyboard support to div-based elements
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Click me
</div>
        `
      });
    }
  });

  // Check for skip links
  if (hasMultipleInteractiveElements(component) && !hasSkipLinks(component)) {
    issues.push({
      severity: 'medium',
      wcagCriterion: '2.4.1 Bypass Blocks',
      category: 'operable',
      description: 'Page lacks skip navigation links',
      impact: 'Keyboard users must tab through repeated navigation',
      solution: 'Add skip links to main content areas',
      codeExample: `
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-2 rounded">
  Skip to main content
</a>
<main id="main-content">
  {/* Main content */}
</main>
      `
    });
  }

  return issues;
};
```bash

## Screen Reader Support Analysis

### Semantic HTML Review

```typescript
export const analyzeSemanticHTML = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check for proper heading structure
  const headings = getHeadings(component);
  if (!hasProperHeadingHierarchy(headings)) {
    issues.push({
      severity: 'medium',
      wcagCriterion: '1.3.1 Info and Relationships',
      category: 'perceivable',
      description: 'Heading hierarchy is not logical or skips levels',
      impact: 'Screen reader users cannot understand content structure',
      solution: 'Use proper heading hierarchy (h1, h2, h3, etc.) without skipping levels',
      codeExample: `
// Incorrect heading hierarchy
<h1>Main Title</h1>
<h3>Subtitle</h3> {/* Skips h2 */}

// Correct heading hierarchy
<h1>Main Title</h1>
<h2>Subtitle</h2>
<h3>Section Title</h3>
      `
    });
  }

  // Check for landmark elements
  if (!hasLandmarkElements(component)) {
    issues.push({
      severity: 'medium',
      wcagCriterion: '1.3.6 Identify Purpose',
      category: 'perceivable',
      description: 'Page lacks proper landmark elements',
      impact: 'Screen reader users cannot navigate page sections efficiently',
      solution: 'Add semantic landmark elements (header, nav, main, aside, footer)',
      codeExample: `
<header role="banner">Site header</header>
<nav role="navigation">Main navigation</nav>
<main role="main">Main content</main>
<aside role="complementary">Sidebar</aside>
<footer role="contentinfo">Footer</footer>
      `
    });
  }

  // Check for proper list structures
  const lists = getListElements(component);
  lists.forEach(list => {
    if (!hasProperListStructure(list)) {
      issues.push({
        severity: 'low',
        wcagCriterion: '1.3.1 Info and Relationships',
        category: 'perceivable',
        description: 'List structure is not semantically correct',
        impact: 'Screen reader users cannot understand list relationships',
        solution: 'Use proper list elements (ul/ol with li children)',
        codeExample: `
// Incorrect list structure
<div>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Correct list structure
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
      `
      });
    }
  });

  return issues;
};
```bash

### ARIA Implementation Review

```typescript
export const analyzeARIAImplementation = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check for proper ARIA labels
  const unlabeledInteractiveElements = getUnlabeledInteractiveElements(component);
  unlabeledInteractiveElements.forEach(element => {
    issues.push({
      severity: 'high',
      wcagCriterion: '1.3.1 Info and Relationships',
      category: 'perceivable',
      description: 'Interactive element lacks accessible name',
      impact: 'Screen reader users cannot understand element purpose',
      solution: 'Add aria-label, aria-labelledby, or associated text content',
      codeExample: `
// Add aria-label
<button aria-label="Close dialog">×</button>

// Use aria-labelledby
<button aria-labelledby="dialog-title-close">×</button>
<h2 id="dialog-title-close">Close Dialog</h2>

// Use associated label
<label htmlFor="search">Search</label>
<input id="search" type="text" />
      `
    });
  });

  // Check for ARIA state management
  const dynamicElements = getDynamicElements(component);
  dynamicElements.forEach(element => {
    if (!hasProperARIAStates(element)) {
      issues.push({
        severity: 'medium',
        wcagCriterion: '4.1.2 Name, Role, Value',
        category: 'robust',
        description: 'Dynamic element lacks proper ARIA state attributes',
        impact: 'Screen reader users not informed of state changes',
        solution: 'Add appropriate ARIA state attributes (aria-expanded, aria-pressed, etc.)',
        codeExample: `
// Accordion with proper ARIA states
<button
  aria-expanded={isOpen}
  aria-controls={`panel-${id}`}
  onClick={toggle}
>
  Accordion Header
</button>
<div
  id={`panel-${id}`}
  role="region"
  aria-labelledby={`header-${id}`}
  hidden={!isOpen}
>
  Accordion Content
</div>
      `
      });
    }
  });

  return issues;
};
```bash

## Touch Target Analysis

### Mobile Accessibility Review

```typescript
export const analyzeTouchTargets = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  const touchTargets = getTouchTargets(component);
  touchTargets.forEach(target => {
    const size = getTouchTargetSize(target);
    const spacing = getTouchTargetSpacing(target);

    if (size < 44) {
      issues.push({
        severity: 'high',
        wcagCriterion: '2.5.5 Target Size',
        category: 'operable',
        description: `Touch target too small: ${size}px (minimum 44px required)`,
        impact: 'Difficult to accurately tap on mobile devices',
        solution: 'Increase touch target size or add padding around interactive elements',
        codeExample: `
// Increase touch target size
className="px-4 py-3 min-h-[44px] min-w-[44px]"

// Add invisible padding
className="p-2">
  <button className="px-2 py-1">Small button</button>
</div>
        `
      });
    }

    if (spacing < 8) {
      issues.push({
        severity: 'medium',
        wcagCriterion: '2.5.5 Target Size',
        category: 'operable',
        description: `Insufficient spacing between touch targets: ${spacing}px (minimum 8px recommended)`,
        impact: 'Users may accidentally tap wrong target',
        solution: 'Increase spacing between interactive elements'
      });
    }
  });

  return issues;
};
```bash

## Usability Testing Patterns

### User Workflow Analysis

```typescript
export const analyzeUserWorkflows = (component: React.ComponentType) => {
  const issues: AccessibilityIssue[] = [];

  // Check form completion workflow
  if (isFormComponent(component)) {
    if (!hasClearErrorMessages(component)) {
      issues.push({
        severity: 'medium',
        wcagCriterion: '3.3.3 Error Suggestion',
        category: 'understandable',
        description: 'Form errors lack clear descriptions and suggestions',
        impact: 'Users cannot understand or fix form errors',
        solution: 'Provide specific error messages with correction suggestions',
        codeExample: `
// Clear error messages
<p className="text-red-600" role="alert">
  Email address is required. Please enter a valid email address.
</p>

// Link to error fields
<a href="#email-field" className="text-red-600">
  Fix email address
</a>
        `
      });
    }

    if (!hasProgressIndicator(component)) {
      issues.push({
        severity: 'low',
        wcagCriterion: '2.2.2 Pause, Stop, Hide',
        category: 'operable',
        description: 'Multi-step form lacks progress indicator',
        impact: 'Users cannot track progress through form',
        solution: 'Add progress indicators for multi-step processes',
        codeExample: `
// Progress indicator
<div role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
  Step {currentStep} of {totalSteps}
</div>
        `
      });
    }
  }

  return issues;
};
```bash

## Accessibility Improvement Recommendations

### Prioritization Framework

```typescript
export const prioritizeAccessibilityFixes = (issues: AccessibilityIssue[]): AccessibilityRecommendation[] => {
  return issues
    .sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })
    .map(issue => ({
      issue,
      priority: getAccessibilityPriority(issue.severity),
      estimatedEffort: estimateAccessibilityEffort(issue),
      userImpact: assessUserImpact(issue),
      implementation: generateAccessibilityImplementation(issue),
      testing: generateAccessibilityTestPlan(issue)
    }));
};
```bash

### Implementation Templates

```typescript
export const generateAccessibilityFix = (issue: AccessibilityIssue): string => {
  switch (issue.wcagCriterion) {
    case '1.4.3 Contrast (Minimum)':
      return `
// Improve color contrast
const improvedColors = {
  text: 'text-gray-700', // Increased from text-gray-400
  background: 'bg-white',
  focus: 'ring-blue-500' // Ensure focus is also visible
};
      `;

    case '2.4.7 Focus Visible':
      return `
// Add focus-visible styles
const focusStyles = `
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus-visible:ring-offset-2
`;
      `;

    case '2.1.1 Keyboard':
      return `
// Make element keyboard accessible
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  onClick={handleClick}
>
  Interactive content
</div>
      `;

    default:
      return '// Review specific accessibility requirements';
  }
};
```bash

### Testing Templates

```typescript
export const generateAccessibilityTest = (issue: AccessibilityIssue): string => {
  return `
// Accessibility test for ${issue.wcagCriterion}
describe('${issue.wcagCriterion}', () => {
  it('should meet accessibility requirements', () => {
    // Test with screen reader
    cy.get('[role="button"]').should('have.attr', 'aria-label');

    // Test keyboard navigation
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-focus-visible');

    // Test color contrast
    cy.get('.text-element')
      .should('have.css', 'color')
      .and('have.css', 'background-color');
  });
});
  `;
};
```bash

Generate comprehensive accessibility reviews that identify WCAG violations, provide actionable recommendations, and ensure interfaces are usable by everyone regardless of their abilities.
````

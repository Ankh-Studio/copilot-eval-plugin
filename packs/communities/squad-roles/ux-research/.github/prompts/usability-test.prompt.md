# Usability Testing Protocol

Comprehensive usability testing framework for evaluating user experience and identifying improvement opportunities.

## Usage
```
/usability-test
```

## Process
1. **Test Planning**: Define objectives and success metrics
2. **Participant Recruitment**: Select representative users
3. **Test Design**: Create realistic scenarios and tasks
4. **Session Execution**: Conduct moderated or unmoderated tests
5. **Data Analysis**: Identify patterns and insights
6. **Reporting**: Document findings and recommendations

## Test Types

### Moderated Testing
- **In-Person**: Face-to-face observation and interaction
- **Remote Video**: Screen sharing with video conferencing
- **Think-Aloud**: Participants verbalize thought processes
- **Interview Style**: Conversational exploration

### Unmoderated Testing
- **Remote Async**: Self-guided testing with recording
- **Automated Scripts**: Predefined task flows
- **A/B Variants**: Comparative design testing
- **Large Scale**: High-volume data collection

## Test Structure

### Research Questions
- **Primary Questions**: Core investigation areas
- **Secondary Questions**: Supporting exploration
- **Success Criteria**: Measurable outcomes
- **Hypotheses**: Testable assumptions

### Participant Profiles
- **Target Personas**: Representative user types
- **Screening Criteria**: Selection requirements
- **Sample Size**: Statistical significance
- **Diversity Considerations**: Inclusive representation

### Task Scenarios
- **Realistic Context**: Authentic user situations
- **Goal-Oriented**: Clear completion objectives
- **Progressive Difficulty**: Increasing complexity
- **Time Constraints**: Realistic time limits

## Examples

### E-commerce Usability Test
```markdown
## Research Objectives
Evaluate the checkout process efficiency and identify friction points in the purchase flow.

## Test Design
### Participants
- **Primary**: 8 frequent online shoppers (2+ purchases/month)
- **Secondary**: 4 occasional shoppers (1-2 purchases/quarter)
- **Screening**: Must have made online purchase in past 6 months

### Tasks
1. **Product Discovery**: Find and select a specific product
2. **Cart Management**: Add items and review cart contents
3. **Checkout Process**: Complete purchase with new payment method
4. **Account Creation**: Register for loyalty program during checkout

### Success Metrics
- **Task Completion**: 90% success rate for checkout
- **Time-on-Task**: < 3 minutes for checkout completion
- **Error Rate**: < 2 errors per session
- **Satisfaction**: 4+ rating on ease of use

### Test Protocol
**Moderated Remote Testing (45 minutes)**
- Introduction and consent (5 min)
- Background questionnaire (5 min)
- Task 1: Product discovery (10 min)
- Task 2: Cart management (5 min)
- Task 3: Checkout process (10 min)
- Debrief and feedback (10 min)

## Key Findings
### Pain Points
- **Payment Method Selection**: Confusing interface layout
- **Address Form**: Too many required fields
- **Order Review**: Missing shipping cost visibility
- **Error Messages**: Unclear validation feedback

### Success Patterns
- **Guest Checkout**: Preferred by 75% of users
- **Auto-Fill**: Reduced form completion time by 40%
- **Progress Indicators**: Improved user confidence
- **One-Click Options**: Increased conversion rate

## Recommendations
1. **Simplify Payment**: Reduce payment options to top 3 methods
2. **Streamline Forms**: Implement address auto-completion
3. **Enhance Transparency**: Show all costs upfront
4. **Improve Feedback**: Clear, actionable error messages
```

### Mobile App Usability Test
```markdown
## Research Objectives
Assess mobile app navigation efficiency and evaluate core feature discoverability.

## Test Design
### Participants
- **Target**: 12 smartphone users (iOS/Android split)
- **Experience**: Mixed mobile app usage levels
- **Age Range**: 18-65 years old

### Tasks
1. **Onboarding**: Complete first-time user setup
2. **Core Feature**: Access and use primary functionality
3. **Settings**: Modify user preferences
4. **Help System**: Find and use support resources

### Success Metrics
- **First-Time Success**: 80% complete onboarding without assistance
- **Feature Discovery**: 90% find core feature within 2 minutes
- **Navigation Efficiency**: < 5 taps to reach any feature
- **Task Satisfaction**: 4+ rating on ease of use

### Test Protocol
**In-Person Testing (30 minutes)**
- Device setup and consent (3 min)
- Warm-up tasks (2 min)
- Task 1: Onboarding flow (8 min)
- Task 2: Core feature usage (7 min)
- Task 3: Settings navigation (5 min)
- Task 4: Help system access (5 min)

## Key Findings
### Navigation Issues
- **Hidden Menus**: 60% missed hamburger menu location
- **Gesture Confusion**: Inconsistent swipe patterns
- **Button Size**: Too small for accurate tapping
- **Label Clarity**: Ambiguous icon meanings

### Positive Patterns
- **Visual Hierarchy**: Clear size and color contrast
- **Progressive Disclosure**: Gradual feature introduction
- **Contextual Help**: In-app guidance effective
- **Voice Commands**: Accessibility feature well-received

## Recommendations
1. **Redesign Navigation**: Implement bottom tab bar
2. **Standardize Gestures**: Use platform conventions
3. **Increase Touch Targets**: 44px minimum button size
4. **Add Text Labels**: Complement icons with text
```

### Internal Tool Usability Test
```markdown
## Research Objectives
Evaluate internal dashboard usability for data analysis and reporting workflows.

## Test Design
### Participants
- **Target**: 10 employees from different departments
- **Roles**: Sales, Marketing, Operations, Finance
- **Experience**: Mixed data tool usage levels

### Tasks
1. **Data Access**: Find and open specific report
2. **Filter Application**: Apply date and category filters
3. **Export Function**: Download data in preferred format
4. **Collaboration**: Share report with team members

### Success Metrics
- **Report Location**: 85% find target report within 1 minute
- **Filter Accuracy**: 95% apply filters correctly
- **Export Success**: 90% complete export without errors
- **Sharing Efficiency**: < 2 minutes to share report

### Test Protocol
**Remote Moderated Testing (40 minutes)**
- System check and introduction (5 min)
- Task 1: Report discovery (8 min)
- Task 2: Filter application (7 min)
- Task 3: Data export (7 min)
- Task 4: Report sharing (8 min)
- Feedback collection (5 min)

## Key Findings
### Efficiency Issues
- **Search Functionality**: Poor result relevance
- **Filter Interface**: Complex interaction patterns
- **Export Options**: Limited format choices
- **Sharing Workflow**: Too many steps required

### Strengths
- **Data Visualization**: Clear and informative charts
- **Responsive Design**: Works well on different devices
- **Loading Performance**: Fast data retrieval
- **Help Documentation**: Comprehensive and accessible

## Recommendations
1. **Improve Search**: Add auto-complete and filters
2. **Simplify Filters**: Use dropdown and checkbox interfaces
3. **Expand Export**: Add CSV, Excel, and PDF options
4. **Streamline Sharing**: One-click sharing functionality
```

## Guidelines
- **User-Centered**: Focus on user needs and behaviors
- **Task-Oriented**: Design around realistic user goals
- **Data-Driven**: Use quantitative and qualitative data
- **Iterative**: Test early and often throughout development
- **Inclusive**: Consider diverse user abilities and contexts

## Context Needed
- Product requirements and user stories
- Target user personas and demographics
- Current analytics and usage data
- Business objectives and success metrics
- Technical constraints and platform requirements
- Competitive analysis and industry benchmarks
- Previous research findings and insights

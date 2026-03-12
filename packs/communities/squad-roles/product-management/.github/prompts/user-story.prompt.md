# User Story Creator

Generate comprehensive user stories with proper structure, acceptance criteria, and business context using industry-standard agile practices.

## Usage
```bash
/user-story
```

## Process
1. **User Analysis**: Identify specific user persona and contextual scenario
2. **Need Discovery**: Articulate user goal, motivation, and pain points
3. **Benefit Definition**: Clarify measurable value and business outcomes
4. **Acceptance Criteria**: Define testable conditions with Gherkin syntax
5. **Story Estimation**: Assess relative effort using story points (Fibonacci scale: 1,2,3,5,8,13)
6. **Business Value**: Connect to OKRs and strategic objectives
7. **Dependency Analysis**: Identify technical and business dependencies
8. **Risk Assessment**: Evaluate implementation risks and mitigations

## Story Structure

### Standard Format
```
As a [specific user persona], I want [specific action] so that [measurable benefit].
```

### Enhanced Format with Context
```
As a [user persona], I want [action] so that [benefit].

**Context**: [User scenario and environment]
**Priority**: [High/Medium/Low]
**Story Points**: [Estimated effort]
**Business Value**: [Expected impact/KPIs]
```

### Acceptance Criteria Template (Gherkin)
```gherkin
Scenario: [User story title]
  Given [specific context/precondition]
  And [additional setup conditions]
  When [specific action/trigger occurs]
  Then [expected outcome is achieved]
  And [additional validation conditions]
  And [measurable success criteria]
```

### Definition of Done
- **Code Quality**: Code is complete, reviewed, and meets standards
- **Testing**: Unit tests pass with >90% coverage, integration tests validated
- **Documentation**: Technical docs, API docs, and user guides updated
- **Acceptance Criteria**: All criteria met and verified by QA
- **Performance**: Meets defined performance benchmarks
- **Security**: Security review completed and approved
- **Product Approval**: Product owner sign-off obtained
- **Deployment**: Deployable to production environment

## Story Quality Checklist
- [ ] User persona is specific and realistic
- [ ] Action is clearly defined and testable
- [ ] Benefit is measurable and valuable
- [ ] Acceptance criteria are specific and testable
- [ ] Story is appropriately sized for single sprint
- [ ] Dependencies are identified and documented
- [ ] Business value is articulated and measurable
- [ ] Risk factors are assessed and mitigated

## Examples

### E-commerce User Story
```markdown
## User Story
As a registered customer, I want to save items to a wishlist so that I can purchase them later.

## Acceptance Criteria
**Given** I am logged in as a registered customer
**When** I view a product page
**Then** I see a "Save to Wishlist" button
**And** clicking the button adds the item to my wishlist
**And** I can view my wishlist from my account page

**Given** I have items in my wishlist
**When** an item goes out of stock
**Then** the item is marked as unavailable in my wishlist
**And** I receive a notification when it becomes available

## Business Value
- Increases conversion rates by 15%
- Reduces cart abandonment by 20%
- Improves customer retention and engagement

## Story Points: 5
## Priority: High
## Epic: Customer Account Management
```

### Internal Tool User Story
```markdown
## User Story
As a system administrator, I want to schedule automated database backups so that I can ensure data recovery capabilities.

## Acceptance Criteria
**Given** I have system administrator privileges
**When** I access the backup configuration page
**Then** I can set backup frequency (daily/weekly/monthly)
**And** I can specify backup retention period
**And** I can test backup configuration

**Given** A scheduled backup fails
**When** the backup job encounters an error
**Then** I receive an immediate email notification
**And** the error is logged in the system event log
**And** a retry attempt is automatically scheduled

## Business Value
- Ensures business continuity and data protection
- Reduces manual backup management overhead
- Provides compliance with data retention policies

## Story Points: 8
## Priority: Critical
## Epic: System Administration
```

### Mobile App User Story
```markdown
## User Story
As a mobile user, I want to receive push notifications for important updates so that I stay informed about relevant activities.

## Acceptance Criteria
**Given** I have the mobile app installed
**When** I enable push notifications in settings
**Then** I receive notifications for account activities
**And** I can customize notification preferences
**And** I can snooze notifications for a specified period

**Given** I receive a push notification
**When** I tap on the notification
**Then** I am taken to the relevant screen in the app
**And** the notification is marked as read
**And** I can dismiss or take action on the notification

## Business Value
- Improves user engagement by 25%
- Increases app session frequency
- Enhances user retention and satisfaction

## Story Points: 3
## Priority: Medium
## Epic: Mobile Experience
```

## Guidelines
- **User-Centric**: Focus on user needs and benefits
- **Specific**: Clear, actionable, and testable
- **Valuable**: Articulate business and user value
- **Sized**: Appropriate scope for single sprint
- **Independent**: Minimal dependencies on other stories

## Context Needed
- User personas and journey maps
- Business objectives and KPIs
- Technical constraints and dependencies
- Market research and user feedback
- Competitive analysis and benchmarks
- Regulatory and compliance requirements

# Backlog Refinement

Systematic process for refining, prioritizing, and preparing user stories for development sprints.

## Usage
```
/backlog-refinement
```

## Process
1. **Story Review**: Validate clarity and completeness
2. **Acceptance Criteria**: Ensure testable conditions
3. **Dependencies**: Identify and document blockers
4. **Estimation**: Assess relative effort
5. **Prioritization**: Apply framework criteria
6. **Readiness Assessment**: Confirm sprint readiness

## Refinement Checklist

### Story Quality
- [ ] User story follows standard format
- [ ] Acceptance criteria are clear and testable
- [ ] Business value is articulated
- [ ] User type and context are specific
- [ ] Story scope is appropriate for single sprint

### Technical Readiness
- [ ] Technical approach is understood
- [ ] Dependencies are identified and documented
- [ ] Integration points are clear
- [ ] Performance considerations are addressed
- [ ] Security implications are evaluated

### Business Alignment
- [ ] Connected to business objectives
- [ ] Stakeholder approval obtained
- [ ] Market opportunity validated
- [ ] Competitive advantage considered
- [ ] ROI and success metrics defined

## Prioritization Frameworks

### MoSCoW Method
- **Must Have**: Critical for current release
- **Should Have**: Important but not critical
- **Could Have**: Desirable if time permits
- **Won't Have**: Explicitly out of scope

### RICE Scoring
- **Reach**: Number of users affected
- **Impact**: Degree of user impact
- **Confidence**: Certainty in estimates
- **Effort**: Development time required

### Value vs. Effort Matrix
- **Quick Wins**: High value, low effort
- **Major Projects**: High value, high effort
- **Fill-ins**: Low value, low effort
- **Thankless Tasks**: Low value, high effort

## Examples

### Story Refinement Session
```markdown
## Original Story
As a user, I want to search for products so I can find what I need.

## Refined Story
As a registered customer, I want to search for products using keywords and filters so that I can quickly find relevant items.

## Acceptance Criteria
**Given** I am on the products page
**When** I enter search terms in the search bar
**Then** I see a list of matching products
**And** results are ranked by relevance
**And** I can filter by category, price, and rating

**Given** I apply multiple filters
**When** I search with filters active
**Then** results match all selected criteria
**And** I can see active filters and remove them

## Dependencies
- Search service API completion
- Product data indexing
- Filter UI components

## Estimation: 5 story points
## Priority: High (Must Have)
## Business Value: Improves user experience, increases conversion
```

### Backlog Prioritization
```markdown
## Sprint 1 (Must Have)
- User authentication and registration (8 pts)
- Basic product catalog (5 pts)
- Simple search functionality (3 pts)
- Shopping cart basics (5 pts)

## Sprint 2 (Should Have)
- Advanced search with filters (5 pts)
- User profile management (3 pts)
- Order history (3 pts)
- Product reviews (5 pts)

## Sprint 3 (Could Have)
- Wishlist functionality (3 pts)
- Product recommendations (5 pts)
- Social sharing (2 pts)
- Email notifications (3 pts)

## Future (Won't Have)
- Advanced analytics dashboard
- Multi-language support
- Third-party integrations
```

### Dependency Mapping
```markdown
## Story Dependencies
- **User Stories** depend on Authentication Service
- **Search Features** depend on Product Indexing
- **Payment Processing** depends on Gateway Integration
- **Order Management** depends on Inventory System

## Cross-Team Dependencies
- **Frontend Team**: UI components for search filters
- **Backend Team**: Search API and indexing
- **DevOps Team**: Search infrastructure scaling
- **QA Team**: Search performance testing

## Blockers
- **External API**: Payment gateway integration delayed
- **Third-party Service**: Product data feed issues
- **Resource Constraint**: Limited database capacity
```

## Guidelines
- **Iterative**: Regular refinement cycles
- **Collaborative**: Include development team in estimation
- **Data-Driven**: Use metrics for prioritization
- **Transparent**: Clear rationale for decisions
- **Flexible**: Adapt to changing priorities

## Context Needed
- Current sprint capacity and velocity
- Team skills and availability
- Technical dependencies and constraints
- Business priorities and deadlines
- User feedback and market research
- Competitive landscape and opportunities

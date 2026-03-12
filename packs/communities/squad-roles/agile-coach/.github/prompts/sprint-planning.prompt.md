# Sprint Planning Facilitation

Comprehensive framework for facilitating effective sprint planning sessions and setting teams up for success.

## Usage
```
/sprint-planning
```

## Process
1. **Preparation**: Review backlog, assess capacity, identify dependencies
2. **Goal Setting**: Define clear sprint objectives and success criteria
3. **Story Selection**: Prioritize and select backlog items
4. **Effort Estimation**: Assess story points and task breakdown
5. **Commitment Making**: Team agreement and accountability
6. **Action Planning**: Task assignment and dependency management

## Planning Structure

### Pre-Planning Activities
- **Backlog Refinement**: Story completion and validation
- **Velocity Analysis**: Historical performance review
- **Capacity Assessment**: Team availability and constraints
- **Dependency Mapping**: Cross-team and technical dependencies
- **Risk Identification**: Potential blockers and mitigation strategies

### Planning Session Flow
1. **Welcome & Context** (5 min): Sprint overview and business priorities
2. **Sprint Goal Discussion** (10 min): Objective definition and alignment
3. **Backlog Review** (15 min): Story presentation and clarification
4. **Estimation & Discussion** (20 min): Effort assessment and questions
5. **Capacity Planning** (10 min): Team availability and commitment
6. **Commitment Confirmation** (5 min): Team buy-in and accountability

### Post-Planning Follow-up
- **Sprint Board Setup**: Visual task management preparation
- **Task Breakdown**: Technical task identification and assignment
- **Dependency Tracking**: Cross-team coordination setup
- **Stakeholder Communication**: Sprint goals and commitment sharing
- **Progress Monitoring**: Daily standup and tracking preparation

## Examples

### Software Development Sprint Planning
```markdown
## Sprint Planning - E-commerce Platform Enhancement

### Preparation Summary
- **Team Capacity**: 6 developers × 8 days = 48 story points
- **Historical Velocity**: 45-50 points per sprint
- **Business Priority**: Mobile checkout optimization
- **Key Dependencies**: Payment gateway integration

### Sprint Goal
**"Improve mobile checkout conversion rate by 15% through streamlined payment process and enhanced user experience"**

### Backlog Items for Consideration
1. **Mobile Payment Optimization** (13 points)
   - Implement Apple Pay and Google Pay
   - Optimize payment form for mobile screens
   - Add saved payment methods

2. **Checkout Flow Redesign** (8 points)
   - Reduce checkout steps from 5 to 3
   - Implement progress indicators
   - Add guest checkout option

3. **Performance Optimization** (5 points)
   - Optimize images for mobile devices
   - Implement lazy loading
   - Reduce page load time to < 3 seconds

4. **Error Handling Enhancement** (3 points)
   - Improve error message clarity
   - Add retry mechanisms for failed payments
   - Implement better validation feedback

5. **Analytics Integration** (2 points)
   - Add conversion tracking
   - Implement user behavior analytics
   - Set up A/B testing framework

### Planning Discussion
**Questions & Clarifications:**
- **Payment Gateway**: API documentation available, integration complexity medium
- **Design Resources**: Mobile UX designs completed and approved
- **Testing Requirements**: Must support iOS and Android testing
- **Launch Timeline**: Target end of month for production release

### Estimation Breakdown
- **Story 1**: 13 points (3 days backend, 2 days frontend, 2 days testing)
- **Story 2**: 8 points (2 days design, 3 days development, 1 day testing)
- **Story 3**: 5 points (2 days optimization, 2 days testing, 1 day deployment)
- **Story 4**: 3 points (1 day development, 1 day testing, 1 day deployment)
- **Story 5**: 2 points (1 day integration, 1 day validation)

### Capacity Allocation
- **Total Points**: 31 points
- **Buffer**: 17 points (35% capacity buffer for unknown work)
- **Team Commitment**: 31 points achievable with current capacity

### Dependencies & Risks
**Dependencies:**
- Payment gateway API access by Day 3
- Mobile design assets available immediately
- QA environment setup by Day 5

**Risks & Mitigations:**
- **Risk**: Payment gateway integration complexity
- **Mitigation**: Technical spike completed, integration patterns established

- **Risk**: Mobile device testing limitations
- **Mitigation**: Cloud-based testing platform procured

### Sprint Commitment
**Team commits to delivering 31 story points focusing on mobile checkout optimization with the goal of improving conversion rates by 15%.**

### Action Items
- **Development Lead**: Coordinate with payment gateway provider
- **QA Lead**: Set up mobile testing environment
- **Product Owner**: Finalize acceptance criteria for all stories
- **Scrum Master**: Monitor dependencies and remove impediments
```

### Data Engineering Sprint Planning
```markdown
## Sprint Planning - Data Pipeline Optimization

### Preparation Summary
- **Team Capacity**: 4 engineers × 8 days = 32 story points
- **Historical Velocity**: 28-35 points per sprint
- **Business Priority**: Reduce data processing latency
- **Key Dependencies**: Source system API updates

### Sprint Goal
**"Reduce data pipeline processing time by 40% through optimization and parallel processing improvements"**

### Backlog Items for Consideration
1. **Parallel Processing Implementation** (12 points)
   - Implement parallel data processing
   - Optimize resource allocation
   - Add performance monitoring

2. **Data Quality Enhancement** (8 points)
   - Implement data validation rules
   - Add anomaly detection
   - Create quality dashboards

3. **API Integration Optimization** (6 points)
   - Optimize API call patterns
   - Implement caching mechanisms
   - Add retry logic for failures

4. **Monitoring & Alerting** (4 points)
   - Set up performance monitoring
   - Implement alert thresholds
   - Create operational dashboards

5. **Documentation & Training** (2 points)
   - Update technical documentation
   - Create team training materials
   - Record process walkthroughs

### Planning Discussion
**Questions & Clarifications:**
- **Source Systems**: API updates scheduled for Day 2 of sprint
- **Infrastructure**: Additional compute resources approved and available
- **Testing Strategy**: Need performance testing in staging environment
- **Success Metrics**: Latency reduction measured end-to-end

### Estimation Breakdown
- **Story 1**: 12 points (4 days development, 2 days testing, 2 days optimization)
- **Story 2**: 8 points (3 days development, 2 days validation, 1 day documentation)
- **Story 3**: 6 points (2 days optimization, 2 days testing, 1 day monitoring)
- **Story 4**: 4 points (2 days setup, 1 day configuration, 1 day validation)
- **Story 5**: 2 points (1 day documentation, 1 day training)

### Capacity Allocation
- **Total Points**: 32 points
- **Buffer**: 0 points (full capacity utilization)
- **Team Commitment**: 32 points at full capacity with high confidence

### Dependencies & Risks
**Dependencies:**
- Source system API updates delivered on schedule
- Additional compute resources provisioned by Day 1
- Staging environment available for performance testing

**Risks & Mitigations:**
- **Risk**: Performance optimization may require infrastructure changes
- **Mitigation**: Infrastructure team on standby for rapid provisioning

- **Risk**: Data quality issues may delay pipeline deployment
- **Mitigation**: Incremental rollout with rollback capability

### Sprint Commitment
**Team commits to delivering 32 story points focusing on data pipeline optimization with the goal of reducing processing time by 40%.**

### Action Items
- **Tech Lead**: Coordinate with infrastructure team for resource provisioning
- **Data Engineer**: Validate source system API compatibility
- **QA Engineer**: Prepare performance testing environment
- **Scrum Master**: Monitor cross-team dependencies and remove blockers
```

### Marketing Team Sprint Planning
```markdown
## Sprint Planning - Product Launch Campaign

### Preparation Summary
- **Team Capacity**: 5 marketers × 8 days = 40 story points
- **Historical Velocity**: 35-42 points per sprint
- **Business Priority**: New product launch campaign
- **Key Dependencies**: Product development completion

### Sprint Goal
**"Execute comprehensive product launch campaign achieving 50,000 qualified leads and 15% conversion rate"**

### Backlog Items for Consideration
1. **Campaign Strategy Development** (10 points)
   - Define target audience segments
   - Create messaging framework
   - Develop channel strategy

2. **Content Creation** (12 points)
   - Write blog posts and articles
   - Create social media content
   - Develop email campaign sequences

3. **Digital Advertising Setup** (8 points)
   - Configure paid search campaigns
   - Set up social media ads
   - Implement tracking and analytics

4. **Influencer Outreach** (6 points)
   - Identify and contact influencers
   - Coordinate content collaboration
   - Track engagement metrics

5. **Launch Event Planning** (4 points)
   - Organize virtual launch event
   - Coordinate speaker schedules
   - Set up registration system

### Planning Discussion
**Questions & Clarifications:**
- **Product Timeline**: Product features finalized by Day 3
- **Budget Allocation**: $50,000 campaign budget approved
- **Creative Resources**: Design team available for support
- **Success Metrics**: Lead quality and conversion tracking implemented

### Estimation Breakdown
- **Story 1**: 10 points (3 days strategy, 2 days validation, 1 day documentation)
- **Story 2**: 12 points (4 days creation, 2 days review, 1 day optimization)
- **Story 3**: 8 points (2 days setup, 2 days testing, 1 day optimization)
- **Story 4**: 6 points (2 days outreach, 2 days coordination, 1 day tracking)
- **Story 5**: 4 points (1 day planning, 1 day coordination, 1 day setup)

### Capacity Allocation
- **Total Points**: 40 points
- **Buffer**: 0 points (full capacity for critical launch)
- **Team Commitment**: 40 points with high priority and urgency

### Dependencies & Risks
**Dependencies:**
- Product final features and positioning confirmed
- Design resources available for creative support
- Budget approval and access to advertising platforms

**Risks & Mitigations:**
- **Risk**: Product delays may impact campaign timing
- **Mitigation**: Flexible campaign timeline with backup content

- **Risk**: Creative resource constraints may delay content
- **Mitigation**: Pre-approved templates and freelance backup resources

### Sprint Commitment
**Team commits to delivering 40 story points focusing on product launch campaign with the goal of generating 50,000 qualified leads.**

### Action Items
- **Campaign Manager**: Coordinate with product team for launch timing
- **Content Lead**: Schedule design resources and establish review process
- **Digital Specialist**: Set up advertising accounts and tracking
- **Scrum Master**: Monitor cross-functional dependencies and remove blockers
```

## Guidelines
- **Goal-Oriented**: Start with clear, measurable sprint objectives
- **Data-Informed**: Use historical velocity and capacity data
- **Collaborative**: Ensure full team participation and buy-in
- **Realistic**: Set achievable commitments based on actual capacity
- **Transparent**: Make assumptions and constraints visible

## Context Needed
- Product backlog with refined user stories
- Historical velocity and capacity data
- Team availability and vacation schedules
- Business priorities and stakeholder requirements
- Technical dependencies and constraints
- Risk assessment and mitigation strategies
- Success metrics and acceptance criteria

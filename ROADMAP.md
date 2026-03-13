# Copilot Eval Plugin Refocus Roadmap

## Phase 1: Foundation (Week 1)

### 01. Repository Hygiene & Infrastructure Cleanup

- [x] Sync package.json (1.1.0) with plugin.json (1.0.0) versions
- [x] Update package.json files array to match actual structure
- [x] Port useful GitHub workflows from chore-workflow-deploy branch
- [x] Add issue/PR templates
- [x] Implement linting infrastructure (scripts, configs, workflows)
- [x] Fix GitHub workflows to run linting on PR/push to main
- [x] Fix critical linting errors (line length, code blocks, structure)
- [ ] Fix remaining linting errors (trailing spaces, formatting) - technical debt

**Success Criteria**: Clean repository foundation, no version mismatches, working CI/CD

---

## Phase 2: Core Assessment (Week 2)

### ✅ 02. Core Assessment Skill Development

- [ ] Create `skills/repo-assess/SKILL.md` with proper structure
- [ ] Implement artifact inventory logic
- [ ] Add technology stack detection
- [ ] Create pattern recognition system
- [ ] Build repository structure analysis
- [ ] Design structured output format

**Success Criteria**: Working repository assessment skill with CLI integration

### ✅ 03. Repository Assessment Rubric

- [ ] Create `rubrics/repo-assessment.md` with evaluation criteria
- [ ] Define Pattern Detection Accuracy scoring (30% weight)
- [ ] Create Customization Relevance scoring (25% weight)
- [ ] Build Workflow Analysis scoring (20% weight)
- [ ] Add Implementation Quality scoring (15% weight)
- [ ] Implement Conflict Detection scoring (10% weight)
- [ ] Create scoring examples and red flags

**Success Criteria**: Consistent scoring rubric that integrates with assessment skill

---

## Phase 3: Planning & Integration (Week 3)

### ✅ 04. Improvement Planning Skill

- [ ] Create `skills/repo-plan/SKILL.md` for recommendation generation
- [ ] Build recommendation engine for skills/instructions/prompts
- [ ] Implement prioritization framework (impact vs effort)
- [ ] Create artifact generation templates
- [ ] Design implementation phasing (immediate/short-term/long-term)
- [ ] Add conflict resolution strategies
- [ ] Build structured improvement plan output

**Success Criteria**: Actionable improvement plans with specific artifact recommendations

### ✅ 05. Plugin Integration & Documentation

- [ ] Update plugin.json with new skills and remove non-existent ones
- [ ] Simplify agents/evaluator.agent.md for repo assessment focus
- [ ] Rewrite README.md for repository assessment value proposition
- [ ] Update package.json description and keywords
- [ ] Create installation and quick start documentation
- [ ] Clean up references to dropped features

**Success Criteria**: Cohesive plugin presentation focused on repository assessment

---

## Phase 4: Validation & Polish (Week 4)

### ✅ 06. Testing & Validation Framework

- [ ] Set up test infrastructure and test data repositories
- [ ] Test repository assessment on React/Node.js/Vue.js/minimal repos
- [ ] Validate assessment rubric scoring accuracy
- [ ] Test improvement planning recommendation quality
- [ ] Verify plugin integration and CLI functionality
- [ ] Performance test on large repositories
- [ ] Error handling and edge case validation

**Success Criteria**: Reliable functionality across diverse repository types

---

## Success Metrics

### Completion Criteria

- [ ] All 6 workflow chunks completed and tested
- [ ] Plugin installs and functions without errors
- [ ] Assessment accuracy > 80% on test repositories
- [ ] Recommendation relevance > 75% satisfaction rate
- [ ] Documentation examples work as written
- [ ] No regressions in existing evaluation functionality

### Quality Gates

- [ ] Repository hygiene: Clean, maintainable structure
- [ ] Assessment skill: Functional artifact inventory and pattern detection
- [ ] Rubric system: Consistent scoring with clear criteria
- [ ] Planning skill: Actionable, prioritized recommendations
- [ ] Integration: Seamless CLI plugin experience
- [ ] Testing: Comprehensive validation across repository types

---

## Anti-Goals (What We're NOT Building)

- ❌ Persona management systems
- ❌ Memory and pattern recognition engines
- ❌ Performance optimization subsystems
- ❌ Community pack marketplaces
- ❌ Generic code generation skills
- ❌ Complex routing and multi-agent coordination

---

## Timeline Summary

| Week | Focus      | Deliverables                                |
| ---- | ---------- | ------------------------------------------- |
| 1    | Foundation | Clean repository, working infrastructure    |
| 2    | Assessment | Repository assessment skill and rubric      |
| 3    | Planning   | Improvement planning and plugin integration |
| 4    | Validation | Testing, documentation, and polish          |

**Total Estimated Effort**: 30-40 hours across 4 weeks

---

## Next Steps After Completion

1. **User Testing**: Gather feedback from engineers using the tool
2. **Pattern Library**: Build repository pattern knowledge base
3. **Advanced Features**: Consider additional assessment capabilities
4. **Integration**: Explore integration with other development tools

This roadmap transforms the copilot-eval-plugin from a general evaluation toolkit into a focused
repository assessment and planning tool that helps engineers quickly understand and improve
unfamiliar codebases.

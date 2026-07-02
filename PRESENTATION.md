# Build a Node.js Application with GitHub Actions CI Pipeline,
# Feature Branching, PR Reviews, and Testing

---

## Slide 1 — Project Overview

**Title:** Building a Production-Ready Node.js Application

**Objective:**
Build a simple, well-structured Node.js application that demonstrates
professional software development practices used in real-world teams.

**Four Core Pillars:**
- GitHub Actions CI Pipeline
- Feature Branching Strategy
- Pull Request Reviews
- Automated Testing

**Outcome:**
A fully working application hosted on GitHub with an automated pipeline
that validates every code change before it reaches the main branch.

---

## Slide 2 — What We Built

**The Application**
- Node.js Task Manager
- Add, complete, and delete tasks
- Data persists in the browser via localStorage
- Opens directly in any browser — no server required

**Technology Stack**
- Runtime: Node.js v24 LTS
- Testing: Jest (100% code coverage)
- Linting: ESLint with Airbnb style guide
- Formatting: Prettier
- Version Control: Git + GitHub
- CI/CD: GitHub Actions

**Repository:**
github.com/rwell10-Red/nodejs-ci-app

---

## Slide 3 — Project Structure

```
nodejs-ci-app/
├── src/
│   ├── taskManager.js         Core application logic
│   └── __tests__/
│       └── taskManager.test.js  Automated tests
├── public/
│   └── index.html             Browser UI (no server needed)
├── .github/
│   ├── workflows/
│   │   ├── ci.yml             CI pipeline definition
│   │   └── release.yml        Release automation
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
├── .eslintrc.js               Code style rules
├── jest.config.js             Test configuration
├── CONTRIBUTING.md            Team workflow guide
└── README.md                  Project documentation
```

---

## Slide 4 — GitHub Actions CI Pipeline

**What it does:**
Automatically validates every code change pushed to GitHub.

**Pipeline Flow:**
1. Developer pushes code or opens a Pull Request
2. GitHub Actions triggers automatically
3. Step 1 — Lint: checks code style with ESLint
4. Step 2 — Test: runs Jest tests with coverage report
5. Pass or Fail result reported back to the PR

**Key Features:**
- Runs on every push to main and develop branches
- Runs on every Pull Request
- Coverage report uploaded as a build artifact
- Pipeline completes in under 60 seconds
- Zero cost for public repositories

**Result:** Broken code cannot reach the main branch undetected.

---

## Slide 5 — Feature Branching Strategy

**Branch Structure:**
```
main          Production-ready code only
develop       Integration branch for completed features
feature/*     New features (branch from develop)
fix/*         Bug fixes (branch from develop)
hotfix/*      Urgent production fixes (branch from main)
release/*     Release preparation
```

**Developer Workflow:**
1. Create a branch from develop
   git checkout -b feature/your-feature-name
2. Write code and tests locally
3. Run lint and tests before pushing
   npm run lint && npm test
4. Push branch and open a Pull Request
5. CI pipeline runs automatically
6. Team reviews the code
7. Merge after approval and green CI

**Why it matters:**
No one works directly on main. Every change is isolated,
reviewed, and validated before integration.

---

## Slide 6 — Pull Request Reviews

**PR Template (auto-populated on every PR):**

- Description of what the PR does
- Type of change (feature, bug fix, refactor, docs)
- List of specific changes made
- Testing confirmation checklist
- Code quality checklist

**Review Requirements:**
- At least 1 approval required before merge
- CI pipeline must be green
- Branch must be up to date with target branch

**Issue Templates:**
- Bug Report template — structured reproduction steps
- Feature Request template — motivation and proposed solution

**Why it matters:**
Catches bugs before they ship. Shares knowledge across the team.
Maintains consistent code quality standards.

---

## Slide 7 — Automated Testing

**Testing Framework:** Jest

**Test Results:**
- 11 tests passing
- 100% code coverage (statements, branches, functions, lines)
- Runs in under 1 second

**What is tested:**
- Add a task — valid input, empty input, whitespace input
- Complete a task — existing task, unknown ID
- Delete a task — existing task, unknown ID
- Get all tasks
- Get pending tasks only
- Get completed tasks only

**Coverage Threshold:**
The pipeline enforces a minimum of 80% coverage.
If coverage drops below 80%, the CI pipeline fails.

**Why it matters:**
Tests prove the code works as expected.
They catch regressions when new changes are made.

---

## Slide 8 — Tools and Setup

**Development Tools:**
| Tool | Purpose | Cost |
|------|---------|------|
| Node.js v24 LTS | JavaScript runtime | Free |
| Git | Version control | Free |
| GitHub | Code hosting + CI | Free (public repos) |
| GitHub CLI (gh) | Terminal GitHub access | Free |
| ESLint | Code linting | Free |
| Jest | Automated testing | Free |
| Prettier | Code formatting | Free |
| Pandoc | Document conversion | Free |
| Git Bash | Unix shell on Windows | Free |

**Total Cost: $0**

---

## Slide 9 — CI Pipeline Results

**Pipeline Runs:**
- Run 1: Failed — ESLint object formatting rule violation
  Fix: Expanded module.exports to multi-line format
- Run 2: Passed — All checks green
- Run 3: Passed — Simplified app, 100% coverage

**Current Status:** ✅ Passing

**What triggers the pipeline:**
- Every push to main or develop
- Every Pull Request to main or develop
- Automatically — no manual action needed

---

## Slide 10 — Key Lessons Learned

**Environment Setup Challenges:**
- Node.js, Git, GitHub CLI, and Pandoc were installed but not on the system PATH
- PowerShell execution policy blocked npm scripts by default
- Solution: Set execution policy to RemoteSigned, manually added tools to PATH
- Permanent fix: configured .bash_profile in Git Bash

**CI Pipeline Lesson:**
- First push failed due to an ESLint rule (object-curly-newline)
- The pipeline caught the issue before it could cause problems
- This is exactly what CI is designed to do

**Simplicity Lesson:**
- Started with a full Express REST API with database patterns
- Simplified to a pure Node.js module with a static HTML frontend
- Same CI/CD practices apply regardless of application complexity

---

## Slide 11 — What This Demonstrates

This project demonstrates the same practices used by professional
software development teams at any scale:

✅ Automated quality gates — no broken code reaches main
✅ Team workflow — branching, reviews, and approvals
✅ Living documentation — README, CONTRIBUTING guide, PR templates
✅ Test-driven confidence — 100% coverage on core logic
✅ Zero infrastructure cost — entirely free toolchain
✅ Repeatable process — any project can follow this same pattern

**This foundation scales:**
Add a database → same pipeline validates it
Add authentication → same PR review process applies
Add deployment → same CI workflow triggers it

---

## Slide 12 — Next Steps

**Immediate (already documented):**
- Step 16: Set up branch protection rules on GitHub
- Step 17: Walk through a full feature branch → PR → merge cycle
- Step 18: Add a database (MongoDB or PostgreSQL)
- Step 19: Add JWT authentication

**Future:**
- Deploy to AWS using GitHub Actions + OIDC (no stored credentials)
- Add Dependabot for automated dependency updates
- Add a code coverage badge to the README
- Set up staging and production environments

---

*Prepared by: Andre Rockwell*
*Repository: github.com/rwell10-Red/nodejs-ci-app*
*Date: July 1, 2026*

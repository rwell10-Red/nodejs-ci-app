# Contributing Guide

## Branching Strategy

This project follows a **Git Flow** style branching model:

```
main          ← production-ready code only
develop       ← integration branch for completed features
feature/*     ← new features (branch from develop)
fix/*         ← bug fixes (branch from develop)
hotfix/*      ← urgent production fixes (branch from main)
release/*     ← release prep (branch from develop)
```

### Branch Naming Examples
- `feature/add-user-auth`
- `fix/login-redirect-loop`
- `hotfix/critical-null-pointer`
- `release/v1.2.0`

## Workflow

1. **Create a branch** from `develop` (or `main` for hotfixes):
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** — keep commits small and focused.

3. **Run checks locally** before pushing:
   ```bash
   npm run lint
   npm test
   ```

4. **Push your branch** and open a Pull Request against `develop`:
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. **PR Review** — at least one approval is required. The CI pipeline must be green.

6. **Merge** using **Squash and Merge** to keep `develop` history clean.

## Recommended Branch Protection Rules (GitHub Settings)

For `main` and `develop`:
- Require pull request before merging (1+ approvals)
- Require status checks: `Lint` and `Test` must pass
- Require branches to be up to date before merging
- Do not allow force pushes
- Do not allow deletions

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user authentication
fix: resolve null pointer in user service
docs: update README with setup instructions
test: add edge cases for deleteUser
ci: pin Node.js version in workflow
```

## Code Style

- ESLint (airbnb-base) + Prettier enforced via `npm run lint`
- All new code must include tests
- Coverage threshold: 80% lines/branches/functions

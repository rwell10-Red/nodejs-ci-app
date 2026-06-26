# Project Journal: Node.js App with GitHub Actions CI Pipeline

## Overview
A complete walkthrough of building a Node.js REST API from scratch, getting it running locally,
and pushing it to GitHub with a fully working CI pipeline.

---

## Step 1 — Project Scaffolding

### What we did
Created the entire project structure from scratch including:
- `package.json` — project metadata, scripts, and dependencies
- `src/app.js` — Express app setup with routes and error handlers
- `src/index.js` — server entry point
- `src/routes/health.js` — GET /health endpoint
- `src/routes/users.js` — CRUD endpoints for users
- `src/services/userService.js` — business logic with in-memory data store
- `src/__tests__/` — Jest unit and integration tests
- `.eslintrc.js` — ESLint with airbnb-base rules
- `.prettierrc` — Prettier formatting config
- `jest.config.js` — Jest config with 80% coverage threshold
- `.env.example` — environment variable template
- `.gitignore` — excludes node_modules, coverage, .env

### Why
Starting with a clean, well-structured project means every tool (linter, test runner, CI)
has a consistent foundation to work against. Separating routes, services, and the app entry
point follows the single responsibility principle and makes testing easier.

---

## Step 2 — GitHub Actions CI Pipeline

### What we did
Created two workflow files:
- `.github/workflows/ci.yml` — runs on every push and PR to main/develop
  - Job 1: Lint (ESLint)
  - Job 2: Test (Jest with coverage) across Node 18, 20, and 22 in parallel
  - Uploads coverage report as a build artifact from the Node 20 run
- `.github/workflows/release.yml` — triggers on version tags (v*.*.*)

### Why
CI ensures every change is automatically validated before it can affect the main branch.
Running tests across multiple Node versions catches compatibility issues early.
The lint job runs first so test jobs don't waste time if code style is broken.

---

## Step 3 — PR Review Infrastructure

### What we did
Created:
- `.github/pull_request_template.md` — checklist for every PR (tests, lint, no console.logs)
- `.github/ISSUE_TEMPLATE/bug_report.md` — structured bug reporting
- `.github/ISSUE_TEMPLATE/feature_request.md` — structured feature requests
- `CONTRIBUTING.md` — full branching strategy, commit conventions, and PR workflow
- `README.md` — setup instructions, API docs, and script reference

### Why
PR templates enforce consistency and reduce back-and-forth in reviews.
The CONTRIBUTING guide documents the branching model (main → develop → feature/*)
so everyone on the team follows the same workflow.

---

## Step 4 — Installing Node.js

### What we did
Installed Node.js v24.18.0 LTS via winget.

### Why
Node.js is required to run the app, install dependencies, and execute tests.
We chose the LTS version for stability. v24 is the current LTS as of 2026.

### Command used
```cmd
winget install OpenJS.NodeJS.LTS
```

---

## Step 5 — Fixing the PowerShell Execution Policy

### Error encountered
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running
scripts is disabled on this system.
```

### Why it happened
Windows locks down PowerShell by default to prevent unauthorized scripts from running.
npm ships as a `.ps1` PowerShell script, so it was blocked.

### Fix
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

`-Scope CurrentUser` — only affects your account, not the whole machine.
`RemoteSigned` — allows local scripts to run freely; downloaded scripts must be signed.
This is the standard developer setting recommended by Microsoft.

---

## Step 6 — Fixing Node.js PATH

### Error encountered
```
node : The term 'node' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

### Why it happened
Node.js was installed but `C:\Program Files\nodejs` was not added to the PATH
in the current terminal session.

### Temporary fix (current session only)
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

### Permanent fix (User scope — no admin required)
```powershell
[System.Environment]::SetEnvironmentVariable("PATH", "C:\Program Files\nodejs;" + [System.Environment]::GetEnvironmentVariable("PATH", "User"), "User")
```

Note: Machine-scope PATH update failed due to missing admin rights:
```
Exception calling "SetEnvironmentVariable" with "3" argument(s):
"Requested registry access is not allowed."
```
User-scope was used instead.

---

## Step 7 — Installing Dependencies

### What we did
```cmd
copy .env.example .env
npm install
```

### What npm install reported
- 536 packages installed
- Several deprecation warnings for older package versions (eslint@8, supertest@6, glob@7)
- 25 vulnerabilities (mostly in dev dependencies — not in production runtime code)

### What we fixed
Updated `supertest` from `6.3.4` to `7.1.3` in `package.json` to address the deprecation
warning, then ran `npm install` again.

---

## Step 8 — Running Tests

### What we did
```cmd
npm test
```

### Result
```
Test Suites: 3 passed, 3 total
Tests:       14 passed, 14 total
Coverage:    95.31% statements, 100% branches, 85.71% functions, 94.91% lines
```

All 14 tests passed across 3 test suites:
- `health.test.js` — integration test for GET /health
- `users.test.js` — integration tests for all user CRUD endpoints
- `userService.test.js` — unit tests for the service layer

---

## Step 9 — Running the Dev Server

### What we did
```cmd
npm run dev
```

nodemon starts the server and watches for file changes, auto-restarting on save.
Server runs at http://localhost:3000.

### Testing the API from PowerShell
PowerShell's `curl` is an alias for `Invoke-WebRequest`, not the real curl.
Use `-UseBasicParsing` or `Invoke-RestMethod` instead:

```powershell
# Health check
curl http://localhost:3000/health -UseBasicParsing

# Get all users
Invoke-RestMethod http://localhost:3000/api/users

# Get single user
Invoke-RestMethod http://localhost:3000/api/users/1

# Create a user
Invoke-RestMethod http://localhost:3000/api/users -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Carol","email":"carol@example.com"}'

# Delete a user
Invoke-RestMethod http://localhost:3000/api/users/1 -Method DELETE
```

---

## Step 10 — Installing Git and GitHub CLI

### Error encountered
```
git : The term 'git' is not recognized...
gh : The term 'gh' is not recognized...
```

### Why it happened
Both were installed via winget but not on the PATH.

### Fix (current session)
```powershell
$env:PATH = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:PATH
```

### Permanent fix
```powershell
[System.Environment]::SetEnvironmentVariable("PATH", "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + [System.Environment]::GetEnvironmentVariable("PATH", "User"), "User")
```

---

## Step 11 — Authenticating with GitHub

### What we did
```cmd
gh auth login
```
Chose: GitHub.com → HTTPS → Login with a web browser → pasted the one-time code.

### Why
The GitHub CLI needs an authenticated session to create repos and view CI runs.

---

## Step 12 — Initializing Git and Making the First Commit

### What we did
```cmd
git init
git checkout -b main
git add .
git commit -m "feat: initial project setup with Express API, tests, and CI pipeline"
```

### Why
`git init` creates the local repository.
`git checkout -b main` names the default branch `main` (GitHub's default).
`git add .` stages all 22 project files.
The commit message follows Conventional Commits format (`feat:` prefix).

---

## Step 13 — Creating the GitHub Repo and Pushing

### What we did
```cmd
gh repo create nodejs-ci-app --public --source=. --remote=origin --push
```

This single command:
- Created the repo at https://github.com/rwell10-Red/nodejs-ci-app
- Added it as the `origin` remote
- Pushed the `main` branch

The CI pipeline triggered automatically on this push.

---

## Step 14 — First CI Run Failed (Lint Error)

### Error encountered
```
X Expected a line break before this closing brace    (userService.js#35)
X Expected a line break after this opening brace     (userService.js#35)
```

### Why it happened
ESLint's `object-curly-newline` rule (enforced by airbnb-base) requires object literals
with multiple properties to have each property on its own line.

The original code:
```js
module.exports = { getAllUsers, getUserById, createUser, deleteUser, reset };
```

### Fix
```js
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  reset,
};
```

### Committed and pushed
```cmd
git add src/services/userService.js
git commit -m "fix: expand module.exports to satisfy ESLint object-curly-newline rule"
git push
```

---

## Step 15 — CI Passes

### Result
```
✓ fix: expand module.exports to...  CI  main  push  28266849194  36s
```

Lint passed. Tests passed across Node 18, 20, and 22. Coverage report uploaded as artifact.
Pipeline fully operational.

---

## Errors Summary

| # | Error | Cause | Fix |
|---|-------|-------|-----|
| 1 | `npm.ps1 cannot be loaded, scripts disabled` | PowerShell execution policy blocks scripts by default | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| 2 | `node` not recognized | Node installed but not on PATH | `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH` |
| 3 | Machine PATH update: registry access denied | No admin rights for Machine-scope env var | Use `-Scope User` instead of `Machine` |
| 4 | `git` / `gh` not recognized | Installed but not on PATH | `$env:PATH = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:PATH` |
| 5 | `--push enabled but no commits found` | Ran `gh repo create --push` before committing | Run `git init`, `git add .`, `git commit` first |
| 6 | CI lint failure: `object-curly-newline` | `module.exports` written on one line, violating airbnb-base ESLint rule | Expand object to multi-line format |

---

## Final State

- **Repo:** https://github.com/rwell10-Red/nodejs-ci-app
- **CI:** Passing on every push to main
- **Tests:** 14 passing, 95%+ coverage
- **Dev server:** http://localhost:3000
- **Endpoints:** GET /health, GET /api/users, GET /api/users/:id, POST /api/users, DELETE /api/users/:id

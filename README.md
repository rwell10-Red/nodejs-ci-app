# nodejs-ci-app

A Node.js Express REST API with a full GitHub Actions CI pipeline, feature branching, PR reviews, and Jest testing.

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

The server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint        | Description          |
|--------|----------------|----------------------|
| GET    | /health         | Health check         |
| GET    | /api/users      | List all users       |
| GET    | /api/users/:id  | Get user by ID       |
| POST   | /api/users      | Create a new user    |
| DELETE | /api/users/:id  | Delete a user        |

### Example Requests

```bash
# Health check
curl http://localhost:3000/health

# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Carol","email":"carol@example.com"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1
```

## Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm start`       | Start production server              |
| `npm run dev`     | Start with nodemon (auto-reload)     |
| `npm test`        | Run tests with coverage              |
| `npm run test:ci` | Run tests in CI mode                 |
| `npm run lint`    | Check code style                     |
| `npm run lint:fix`| Auto-fix lint issues                 |
| `npm run format`  | Format code with Prettier            |

## CI Pipeline

The GitHub Actions pipeline runs on every push and PR to `main` and `develop`:

1. **Lint** — ESLint checks against airbnb-base rules
2. **Test** — Jest tests with coverage across Node 18, 20, and 22
3. Coverage report uploaded as a build artifact (Node 20 run)

Releases are triggered by pushing a version tag (`v*.*.*`).

## Branching & Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full branching strategy and PR workflow.

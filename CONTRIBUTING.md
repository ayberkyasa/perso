# Contributing to Perso

Thank you for your interest in contributing to Perso! We welcome contributions from the community and are grateful for any help you can provide.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots or GIFs if applicable**
- **Include your environment details** (OS, Node.js version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Describe the current behavior and explain the expected behavior**
- **Explain why this enhancement would be useful**

### Your First Code Contribution

Unsure where to begin? You can start by looking through `good-first-issue` and `help-wanted` issues:

- **Good first issues** - issues which should only require a few lines of code
- **Help wanted issues** - issues which are more involved

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** outlined below
3. **Add tests** if you've added code that should be tested
4. **Ensure the test suite passes** by running `npm test`
5. **Make sure your code lints** by running `npm run lint`
6. **Update documentation** as needed
7. **Create a pull request** with a clear description and title with an issue ID

## Development Process

### Prerequisites

- Node.js 24+ (LTS)
- npm 10+ (required for workspaces)
- Git

### Repository Structure

Perso is a [Turborepo](https://turborepo.com) monorepo using npm workspaces:

```
perso/
├── apps/
│   ├── api/         # NestJS backend
│   └── web/         # React + Vite frontend
├── packages/
│   └── shared/      # Shared types, widget contracts, utilities
├── turbo.json       # Turborepo pipeline config
└── package.json     # Workspace root
```

### Setup

1. Fork and clone the repository:

   ```bash
   git clone https://github.com/your-username/perso.git
   cd perso
   ```

2. Install dependencies for all workspaces from the root:

   ```bash
   npm install
   ```

3. Set up environment variables for each app:

   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```

4. Start both services in development mode:

   ```bash
   npm run dev
   ```

   Turborepo runs the NestJS API and the React dev server in parallel.

   To run a single app:

   ```bash
   npm run dev -- --filter=api
   npm run dev -- --filter=web
   ```

### Default Ports

- Web (Vite): http://localhost:5173
- API (NestJS): http://localhost:3000

### Common Scripts

Run from the repo root:

```bash
npm run build       # Build all workspaces (cached by Turborepo)
npm run test        # Run tests across all workspaces
npm run lint        # Lint all workspaces
npm run typecheck   # Type-check all workspaces
```

Scope any task to a single workspace with `--filter`, e.g. `npm run test -- --filter=api`. Turborepo caches task outputs locally — re-running an unchanged task is near-instant.

### Making Changes

1. Create a new branch for your feature or fix:

   ```bash
   git checkout -b your-branch-name
   ```

2. Make your changes following our coding standards

3. Test your changes thoroughly

4. Commit your changes with **THE PROPER COMMIT MESSAGE FORMAT**:
   ```bash
   git commit -m "feat: add new feature description"
   ```

### Coding Standards

- **TypeScript**: All new code should be written in TypeScript
- **ESLint**: Follow the existing ESLint configuration
- **Formatting**: Use Prettier for code formatting
- **Naming**: Use descriptive names for variables, functions, and components
- **Components**: Follow React best practices and use functional components with hooks
- **File Structure**: Follow the existing project structure

### Commit Message Guidelines

We follow [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:

```
feat: add support for Groq LLM provider
fix: resolve token counting issue for Claude models
docs: update installation instructions
refactor: improve the query performance
```

## Documentation

- Update the README.md if you change functionality
- Add JSDoc comments to new functions
- Update inline code comments as needed

## Questions?

If you have questions about contributing, please:

- Check existing issues
- Create a new issue with the `question` label

Thank you for contributing to Perso!

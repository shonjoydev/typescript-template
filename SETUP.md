# TypeScript Project

> Professional TypeScript development environment with automated quality checks and modern tooling.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Prerequisites](#-prerequisites)
- [Installation](#️-installation)
- [Development Tools](#-development-tools)
- [Available Scripts](#-available-scripts)
- [Configuration Files](#-configuration-files)
- [Git Hooks with Husky](#-git-hooks-with-husky)
- [VSCode Setup](#-vscode-setup)
- [Development Workflow](#-development-workflow)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

---

## ⚡ Quick Start

```bash
# Clone repository
git clone
cd typescript-template

# Install dependencies (Husky auto-installs)
pnpm install

# Start development with all watchers
pnpm dev:watch

# Or start basic dev server only
pnpm dev
```

---

## 📦 Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm**: v8+ (enforced via preinstall script)
- **Git**: v2.9+ (for Husky hooks)
- **VSCode**: Latest version (recommended)

### Install pnpm

```bash
# Via npm
npm install -g pnpm

# Via Corepack (Node.js 16.9+)
corepack enable
corepack prepare pnpm@latest --activate
```

---

## 🛠️ Installation

### 1. Core Dependencies

```bash
# Development tools
pnpm add -D tsx nodemon concurrently rimraf

# TypeScript
pnpm add -D typescript tsc-alias

# Code quality
pnpm add -D @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-prettier eslint-plugin-unused-imports globals prettier typescript-eslint

# Testing
pnpm add -D vitest @vitest/ui

# Git hooks
pnpm add -D husky lint-staged
```

### 2. Optional: Commit Standards

```bash
# Commitlint (enforce conventional commits)
pnpm add -D @commitlint/cli @commitlint/config-conventional

# Commitizen (interactive commits)
pnpm add -D commitizen cz-conventional-changelog
```

### 3. Initialize Husky

```bash
pnpm exec husky init
```

---

## 🔧 Development Tools

### Package Manager: pnpm

- **Enforced** via `preinstall` script
- Fast, disk-efficient
- Strict dependency resolution
- Lock file: `pnpm-lock.yaml`

### Runtime: tsx

- Modern TypeScript executor
- Native path alias support
- Hot reload with watch mode
- Zero configuration needed

### Code Quality

- **ESLint**: Code linting with flat config
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **EditorConfig**: Cross-editor consistency

### Testing: Vitest

- Fast, modern test runner
- Built-in coverage
- Watch mode
- UI for debugging

---

## 📜 Available Scripts

### Development Scripts

```bash
# Basic development
pnpm dev              # Start dev server with hot reload
pnpm dev:debug        # Debug mode with inspector
pnpm dev:check        # Server + type checking
pnpm dev:lint         # Server + types + linting
pnpm dev:watch        # Full development (server + types + lint + tests)
```

**Recommendation**: Use `pnpm dev:watch` for active development to catch all issues in real-time.

### Build Scripts

```bash
pnpm build            # Production build (TypeScript + tsc-alias)
pnpm build:watch      # Watch mode build (parallel compilation)
pnpm start            # Run production build
```

### Code Quality Scripts

```bash
# Linting
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm lint:watch       # Watch mode linting

# Formatting
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting without changes

# Type checking
pnpm type-check       # TypeScript type checking

# Combined checks
pnpm check            # Run format:check + lint + type-check
pnpm check:fix        # Auto-fix all fixable issues
```

**Before committing**: Run `pnpm check:fix` to auto-fix most issues.

### Testing Scripts

```bash
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:changed     # Run tests on changed files
pnpm test:coverage    # Generate coverage report
pnpm test:ui          # Open Vitest UI
pnpm test:ci          # CI mode with verbose output
```

### Cleanup Scripts

```bash
# Fast cleanup (parallel deletion)
pnpm clean            # Clean all build artifacts
pnpm clean:cache      # Clean cache only
pnpm clean:build      # Clean build folders only
pnpm clean:coverage   # Clean coverage reports

# Deep cleanup
pnpm clean:modules    # Delete node_modules & lockfile
pnpm clean:reinstall  # Clean modules + reinstall
pnpm clean:deep       # Full cleanup + reinstall
```

**Performance**: All cleanup scripts use `concurrently` for 3-4x faster parallel deletion.

### Rebuild Scripts

```bash
pnpm rebuild          # Quick rebuild (clean build + install + build)
pnpm fresh            # Deep clean + start dev
pnpm reset            # Deep clean + validate + build
```

### CI/CD Scripts

```bash
pnpm ci               # Full CI pipeline (lint + type-check + test + build)
```

### Git Hooks Scripts

```bash
pnpm prepare          # Setup Husky (auto-runs after install)
pnpm commit           # Interactive commit with Commitizen
```

---

## 📁 Configuration Files

### Project Structure

```text
typescript-template/
├── .husky/                      # Git hooks
│   ├── pre-commit              # Lint staged files
│   ├── pre-push                # Type-check + tests
│   └── commit-msg              # Validate commit messages (optional)
├── .vscode/                     # VSCode settings
│   ├── settings.json           # Workspace settings
│   ├── extensions.json         # Recommended extensions
│   └── launch.json             # Debug configurations
├── src/                         # Source code
│   └── index.ts                # Entry point
├── dist/                        # Build output (gitignored)
├── .editorconfig               # Editor consistency
├── .gitignore                  # Git ignore rules
├── tsconfig.json               # TypeScript config
├── tsconfig.build.json         # Build-specific TS config
├── eslint.config.js            # ESLint flat config
├── .prettierrc                 # Prettier config
├── .prettierignore             # Prettier ignore
├── vitest.config.ts            # Vitest config
├── commitlint.config.js        # Commitlint config (optional)
├── package.json                # Project metadata & scripts
└── pnpm-lock.yaml              # Dependency lockfile
```

### Key Configuration Details

#### TypeScript Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```

**Usage in code:**

```typescript
// Instead of: import { add } from '../../../utils/math'
import { add } from '@/utils/math';
```

**No extra config needed** - `tsx` handles aliases natively for development, `tsc-alias` for production builds.

---

## 🪝 Git Hooks with Husky

### Automatic Setup

Husky hooks are automatically installed when you run `pnpm install` (via the `prepare` script).

### Pre-commit Hook

**File**: `.husky/pre-commit`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

**What it does:**

- ✅ Runs on **staged files only** (fast: 2-5 seconds)
- ✅ Auto-fixes ESLint issues
- ✅ Auto-formats with Prettier
- ✅ Prevents commit if unfixable errors exist

**Configured via `package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix --cache", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### Pre-push Hook

**File**: `.husky/pre-push`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running type check..."
pnpm type-check || exit 1

echo "🧪 Running tests..."
pnpm test:run || exit 1

echo "✅ Pre-push checks passed!"
```

**What it does:**

- ✅ Full TypeScript type checking
- ✅ Runs complete test suite
- ✅ Prevents push if checks fail
- ⏱️ Takes ~30-60 seconds (comprehensive)

### Commit-msg Hook (Optional)

**File**: `.husky/commit-msg`

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Uncomment to enforce conventional commits
# npx --no -- commitlint --edit $1
```

**Requires**: `@commitlint/cli` and `commitlint.config.js`

### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit (not recommended)
git commit --no-verify -m "emergency fix"

# Skip pre-push (not recommended)
git push --no-verify
```

⚠️ **Warning**: Only bypass in emergencies. CI will still catch issues.

### Commitlint Setup (Optional)

**1. Install:**

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

**2. Create `commitlint.config.js`:**

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, no code change
        'refactor', // Code restructuring
        'perf', // Performance improvement
        'test', // Tests
        'chore', // Maintenance
        'ci', // CI/CD changes
        'build', // Build system
        'revert', // Revert commit
      ],
    ],
  },
};
```

**3. Uncomment in `.husky/commit-msg`:**

```bash
npx --no -- commitlint --edit $1
```

**4. Valid commit examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve memory leak in cache"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify validation logic"
```

### Commitizen (Interactive Commits)

**1. Install:**

```bash
pnpm add -D commitizen cz-conventional-changelog
```

**2. Configure in `package.json`:**

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

**3. Use interactive commit:**

```bash
# Instead of: git commit -m "..."
pnpm commit
```

This opens an interactive prompt that guides you through writing proper commit messages!

---

## 💻 VSCode Setup

### Recommended Extensions

Install all recommended extensions:

1. Open VSCode
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Extensions: Show Recommended Extensions"
4. Click "Install All"

**Essential extensions:**

- ESLint
- Prettier
- EditorConfig
- Error Lens
- Pretty TypeScript Errors

### Key Features Enabled

✅ **Auto-format on save** with Prettier
✅ **Auto-fix ESLint** issues on save
✅ **Auto-organize imports** on save
✅ **Real-time type checking**
✅ **Inline error display**
✅ **Path alias autocomplete** (`@/`)
✅ **Debug with breakpoints** (F5)

### Debugging

**Press F5** to start debugging, or select from debug menu:

- Debug TypeScript
- Run Tests
- Debug Current Test File

---

## 🔄 Development Workflow

### Standard Workflow

```text
1. Start development
   → pnpm dev:watch

2. Write code
   → Auto-format on save
   → Real-time linting
   → Type checking
   → Tests running

3. Stage changes
   → git add .

4. Commit (pre-commit hook runs automatically)
   → Lints and formats staged files
   → Auto-fixes issues
   → Fails if unfixable errors

5. Push (pre-push hook runs automatically)
   → Type checks entire codebase
   → Runs all tests
   → Fails if any check fails

6. CI/CD
   → Runs full pipeline on remote
```

### Quick Iteration Workflow

```bash
# For quick prototyping (minimal checks)
pnpm dev

# For serious development (all checks)
pnpm dev:watch

# Before committing
pnpm check:fix

# Manual test run
pnpm test:run
```

### Team Workflow

**For new team members:**

```bash
# 1. Clone repository
git clone https://github.com/shonjoydev/typescript-template.git
cd typescript-template

# 2. Install dependencies (Husky auto-installs)
pnpm install

# 3. Verify setup
pnpm dev

# 4. Start coding!
pnpm dev:watch
```

**All hooks and configurations are automatically set up!**

---

## ✨ Best Practices

### Development

1. **Use `dev:watch` for active development** - Catches all issues in real-time
2. **Use `dev` for quick prototyping** - Faster startup, fewer watchers
3. **Run `check:fix` before committing** - Auto-fixes most issues
4. **Let hooks do their job** - Don't bypass unless emergency
5. **Write tests alongside features** - Keep test coverage high

### **Code Quality**

1. **Follow ESLint rules** - They exist for good reasons
2. **Let Prettier format** - Don't fight the formatter
3. **Use path aliases** - Keeps imports clean and maintainable
4. **Write meaningful commit messages** - Use conventional commits
5. **Keep functions small** - Single responsibility principle

### Performance

1. **Use `clean:build` for quick rebuilds** - Faster than full clean
2. **Leverage caching** - ESLint and test caches speed up checks
3. **Only run what you need** - Use specific dev scripts
4. **Parallel cleanup** - All cleanup scripts use concurrently

### Git Commits

1. **Write clear commit messages** - Use conventional commit format
2. **Keep commits atomic** - One logical change per commit
3. **Test before pushing** - Pre-push hooks help but test manually too
4. **Use feature branches** - Keep main/develop stable
5. **Squash when appropriate** - Clean up history before merging

---

## 🐛 Troubleshooting

### Husky Hooks Not Running

**Problem**: Hooks don't execute on commit/push

**Solutions**:

```bash
# Make hooks executable (Unix/Mac)
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Verify Husky installation
pnpm exec husky --version

# Reinstall hooks
rm -rf .husky
pnpm exec husky init

# Check Git hooks path
git config core.hooksPath
# Should output: .husky
```

### tsx Watch Not Restarting

**Problem**: Server doesn't restart on file changes

**Solutions**:

```bash
# 1. Try the configured setup (already optimal)
pnpm dev

# 2. Alternative: Use nodemon
pnpm add -D nodemon
# Update package.json: "dev": "nodemon"
# Create nodemon.json with watch config

# 3. Check file system
# Some systems (WSL, Docker) need polling:
# Add to package.json: "dev": "tsx watch --poll src/index.ts"
```

### Rimraf Fails on Windows

**Problem**: `*.tsbuildinfo` glob pattern errors

**Solution**: Already fixed in scripts - uses specific file names instead of globs.

### ESLint --watch Not Working

**Problem**: ESLint doesn't have native watch mode in flat config

**Solution**: Already implemented - uses `nodemon` to watch and re-run ESLint via `lint:watch`.

### Slow Pre-commit Hook

**Problem**: `lint-staged` takes too long

**Solutions**:

```bash
# 1. Already optimized - only checks staged files
# 2. Ensure ESLint cache is enabled (already in config)
# 3. Reduce file matches if needed:

# In package.json:
"lint-staged": {
  "*.ts": ["eslint --fix --cache"],  // Only .ts, not .tsx
  "*.json": ["prettier --write"]
}
```

### Can't Delete node_modules

**Problem**: Permission errors when running `clean:modules`

**Solution**: Already implemented - uses Node.js built-in `fs.rmSync()` which handles permissions better than rimraf.

### Path Aliases Not Working

**Problem**: `@/` imports not resolving

**Solutions**:

```bash
# 1. Verify tsconfig.json paths configuration
# 2. Restart TypeScript server in VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"
# 3. For production builds, ensure tsc-alias runs: "build": "tsc && tsc-alias"
# 4. Check baseUrl is set: "baseUrl": "."
```

### Tests Not Running

**Problem**: Vitest not finding tests

**Solutions**:

```bash
# 1. Check test file naming: *.test.ts or *.spec.ts
# 2. Verify vitest.config.ts exists
# 3. Check include patterns in vitest.config.ts
# 4. Run with verbose: pnpm test:run --reporter=verbose
```

### Windows Line Ending Issues

**Problem**: `\r` errors in Git hooks

**Solutions**:

```bash
# Configure git line endings
git config core.autocrlf false
git config core.eol lf

# Fix existing files
git add --renormalize .
git commit -m "fix: normalize line endings"
```

### Type Errors After Install

**Problem**: TypeScript errors in node_modules

**Solutions**:

```bash
# 1. Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo

# 2. Restart TypeScript server in VSCode

# 3. Reinstall dependencies
pnpm clean:reinstall

# 4. Update TypeScript
pnpm add -D typescript@latest
```

---

## 📚 Additional Resources

### Official Documentation

- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- [tsx](https://github.com/esbuild-kit/tsx) - TypeScript execute and watch
- [Vitest](https://vitest.dev/) - Fast unit test framework
- [ESLint](https://eslint.org/) - Pluggable linting utility
- [Prettier](https://prettier.io/) - Opinionated code formatter
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Husky](https://typicode.github.io/husky/) - Git hooks made easy
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on staged files
- [Commitlint](https://commitlint.js.org/) - Lint commit messages
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message convention

### Helpful Tools

- [concurrently](https://github.com/open-cli-tools/concurrently) - Run commands in parallel
- [nodemon](https://nodemon.io/) - Monitor for file changes
- [rimraf](https://github.com/isaacs/rimraf) - Cross-platform rm -rf
- [tsc-alias](https://github.com/justkey007/tsc-alias) - Replace path aliases in build

---

## 📊 Project Statistics

```bash
# View package dependencies
pnpm list --depth=0

# Check outdated packages
pnpm outdated

# Analyze bundle size (if applicable)
pnpm build
# Check dist/ folder size

# View test coverage
pnpm test:coverage
# Open coverage/index.html
```

---

## 🎯 Next Steps

1. ✅ **Setup complete** - All tools configured
2. 📝 **Customize configs** - Adjust to your project needs
3. 🧪 **Write tests** - Start with critical paths
4. 📖 **Document features** - Keep README updated
5. 🚀 **Deploy** - Set up CI/CD pipeline
6. 📈 **Monitor** - Add error tracking and analytics

---

## 🤝 Contributing

When contributing to this project:

1. Follow the established code style (enforced by ESLint/Prettier)
2. Write tests for new features
3. Use conventional commit messages
4. Ensure all checks pass before pushing
5. Keep PRs focused and atomic

---

## 📝 License

[Your License Here]

---

## 💡 Tips & Tricks

### Quick Commands

```bash
# Full development experience
pnpm dev:watch

# Quick restart
rs (when nodemon is running)

# Run single test file
pnpm test src/utils/math.test.ts

# Debug in VSCode
F5 (opens debug panel)

# Format specific file
pnpm format src/index.ts

# Check specific file
pnpm lint src/index.ts
```

### VSCode Shortcuts

- `Ctrl+Shift+P` - Command palette
- `F5` - Start debugging
- `Ctrl+` - Organize imports
- `Shift+Alt+F` - Format document
- `F2` - Rename symbol
- `F12` - Go to definition

### Git Shortcuts

```bash
# Quick commit (uses pre-commit hook)
git add . && git commit -m "feat: your message"

# Interactive commit (if Commitizen installed)
pnpm commit

# Amend last commit (skip hooks)
git commit --amend --no-verify

# Check what would be committed
git diff --cached
```

---

**Last Updated**: December 2025
**Maintained By**: [Shonjoy](https://github.com/shonjoydev)
**Support**: <shonjoy.developer@gmail.com>

---

<div align="center">
  <strong>Happy Coding! 🚀</strong>
</div>

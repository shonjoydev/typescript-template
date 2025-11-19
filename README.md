# TypeScript Project Template

Professional TypeScript project template with modern tooling: linting, formatting, testing, git hooks, and automated CI/CD. Zero config, maximum productivity.

---

## 1. Project Initialization (TypeScript + pnpm)

Set up a clean and production-ready TypeScript project using pnpm with minimal steps.

### 1.1 Create Project Directory

```bash
mkdir my-typescript-project
cd my-typescript-project
```

### 1.2 Generate `.gitignore`

```bash
npx gitignore node
```

### 1.3 Initialize `package.json`

```bash
pnpm init
```

### 1.4 Install TypeScript + Node Types

```bash
pnpm add -D typescript @types/node
```

### 1.5 Install TypeScript Development Tools

```bash
pnpm add -D tsx tsc-alias
```

#### What These Packages Do

| Package       | Purpose                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- |
| **tsx**       | Ultra-fast TypeScript runtime for development. Replaces `ts-node`.                       |
| **tsc-alias** | Automatically rewrites compiled path aliases in `dist` when using `paths` in TypeScript. |

---

## 2. TypeScript Configuration

### 2.1 Base Config (`tsconfig.json`)

A strict, modern, and production-ready base config:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],

    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolveJsonModule": true,

    "outDir": "./dist",
    "noEmit": true,
    "removeComments": true,
    "noEmitOnError": true,
    "sourceMap": false,

    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": false,

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    "skipLibCheck": true,

    "composite": true,

    "useDefineForClassFields": true,

    "paths": {
      "@/*": ["./src/*"]
    },

    "types": ["node"],
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*", "tests/**/*", "test/**/*", "**/*.config.ts"],
  "exclude": ["node_modules", "dist", "build", "coverage"]
}
```

### 2.2 Build Config (`tsconfig.build.json`)

Optimized for production output and alias transformations:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "incremental": true,
    "tsBuildInfoFile": "./dist/.tsbuildinfo",
    "downlevelIteration": true,
    "stripInternal": true,
    "newLine": "lf",

    "assumeChangesOnlyAffectDirectDependencies": true,

    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "coverage",
    "tests",
    "test",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.config.ts",
    "**/*.config.js",
    "**/test-utils/**"
  ]
}
```

### 2.3 Test Config (`tsconfig.test.json`)

Lightweight config for test runners like Vitest, Jest, or tsx tests:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "sourceMap": true,

    "isolatedModules": true,

    "types": ["node"]
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "test/**/*",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ],
  "exclude": ["node_modules", "dist", "build"]
}
```

### 2.4 Add Build and Dev Scripts to `package.json`

```json
{
  "scripts": {
    "// ━━━━━━━━━━━━━━━━━━ BUILD ━━━━━━━━━━━━━━━━━━━━": "",
    "clean": "rm -rf dist coverage",
    "prebuild": "pnpm clean",
    "build": "tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json",
    "build:watch": "tsc -p tsconfig.build.json --watch & tsc-alias -p tsconfig.build.json --watch",

    "// ━━━━━━━━━━━━━━━ DEVELOPMENT ━━━━━━━━━━━━━━━━━": "",
    "dev": "tsx watch --clear-screen=false src/index.ts"
  }
}
```

---

## 3. Engine Lock Configuration

Guarantee consistent environments across all machines and CI pipelines by locking Node.js, pnpm versions, and preventing npm/yarn usage.

### 3.1 Required `package.json` Configuration

Add the following to enforce Node.js and pnpm versions:

```json
{
  "engines": {
    "node": ">=18.0.0 <23.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

**What this enforces:**

- **Node.js:** 18.x → 22.x
- **pnpm:** 8+ (recommended: 9.0.0)
- **Blocks npm/yarn** via `only-allow`

### 3.2 `.npmrc` Strict Mode

Add this to your `.npmrc`:

```text
engine-strict=true
```

**Result:** Installation fails automatically if the wrong Node.js or pnpm version is used — perfect for teams and CI consistency.

---

## 4. Code Quality Setup (ESLint + Prettier)

Enforce consistent code style and catch errors before they reach production.

### 4.1 Install Dependencies

```bash
pnpm i -D @eslint/js @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-prettier eslint-plugin-unused-imports globals jiti prettier typescript-eslint
```

### 4.2 Create `eslint.config.mts`

```typescript
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import n from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import type { ConfigWithExtends } from 'typescript-eslint';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      '*.config.*',
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/coverage/**',
    ],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  // TypeScript files configuration
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Plugins and rules
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      n,
      'unused-imports': unusedImports,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // Console
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Basic rules
      'no-unused-vars': 'off',
      'no-undef': 'off',

      // Node.js specific rules
      'n/prefer-node-protocol': 'error',

      // Unused Imports Plugin
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Variables
      'no-var': 'error',
      'prefer-const': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  } as ConfigWithExtends,
]);
```

### 4.3 Create `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "auto",
  "bracketSameLine": false
}
```

### 4.4 Create `.prettierignore`

```text
# Dependencies
node_modules/
bower_components/

# Build outputs
dist/
build/
out/
.next/
.nuxt/
.cache/

# Coverage
coverage/
.nyc_output/

# Lock files
pnpm-lock.yaml
package-lock.json
yarn.lock

# Logs
*.log
logs/

# TypeScript
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Generated/minified files
*.min.js
*.min.css
*.bundle.js
```

### 4.5 Add Linting Scripts to `package.json`

```json
{
  "scripts": {
    "// ━━━━━━━━━━━━━━ CODE QUALITY ━━━━━━━━━━━━━━━━": "",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 5. Testing Setup (Vitest)

Fast, modern unit testing powered by Vite.

### 5.1 Install Vitest

```bash
pnpm add -D vitest @vitest/ui @vitest/coverage-v8
```

### 5.2 Create `vitest.config.ts`

```typescript
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', 'build', '.idea', '.git', '.cache'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.interface.ts',
        'src/**/*.type.ts',
        'src/**/index.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/__tests__/**',
        'src/**/__mocks__/**',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### 5.3 Create Setup file

Create `tests/setup.ts`:

```ts
/// <reference types="vitest/globals" />
```

### 5.4 Add Test Scripts to `package.json`

```json
{
  "scripts": {
    "// ━━━━━━━━━━━━━━━━━ TESTING ━━━━━━━━━━━━━━━━━━━": "",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 6. Git Hooks Setup (Husky + Lint-Staged + Commitlint)

Automate code quality checks and enforce commit conventions with Git hooks.

### 6.1 Install Dependencies

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

### 6.2 Initialize Husky

```bash
pnpm exec husky init
```

This creates:

- `.husky/` directory
- `.husky/pre-commit` hook
- Adds `"prepare": "husky"` to package.json

### 6.3 Configure Lint-Staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "vitest related --run --passWithNoTests"
    ],
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml}": ["prettier --write"]
  }
}
```

### 6.4 Create Pre-Commit Hook

**`.husky/pre-commit`**

```bash
# Run lint-staged for fast checks on staged files only
pnpm lint-staged
```

### 6.5 Configure Commitlint

Create `commitlint.config.ts`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enforcement
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to our CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],

    // Scope
    'scope-enum': [
      2,
      'always',
      [
        'api', // Backend API changes
        'ui', // Frontend UI changes
        'db', // Database changes
        'auth', // Authentication/Authorization
        'core', // Core functionality
        'config', // Configuration changes
        'deps', // Dependency updates
        'release', // Release-related
        'ci', // CI/CD changes
        'docs', // Documentation
        'test', // Test-related
      ],
    ],
    // 'scope-empty': [2, 'never'], // Scope is required
    'scope-empty': [0], // Allow empty scope (optional)
    'scope-case': [2, 'always', 'lower-case'],

    // Type rules
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],

    // Header rules
    'header-max-length': [2, 'always', 100],

    // Subject rules
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],

    // Body rules (OPTIONAL)
    'body-leading-blank': [1, 'always'], // Warning only
    'body-max-line-length': [2, 'always', 100],

    // Footer rules
    'footer-leading-blank': [1, 'always'], // Warning only
    'footer-max-line-length': [0], // Disabled
  },
};
```

### 6.6 Create Commit-Msg Hook

**`.husky/commit-msg`**

```bash
# Validate commit message
pnpm commitlint --edit $1
```

### 6.7 Create Pre-Push Hook (Optional but Recommended)

**`.husky/pre-push`**

```bash
echo "🚀 Running pre-push checks..."

# Get current branch
branch=$(git branch --show-current)

# Protect main/master branch
if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
  echo "❌ Direct push to $branch is not allowed!"
  echo "Please create a feature branch and submit a PR."
  exit 1
fi

# Type check
echo "🔍 Running type check..."
pnpm type-check || exit 1

# Run tests with coverage
echo "🧪 Running tests..."
pnpm test:ci || exit 1

# Check build
echo "🏗️  Building project..."
pnpm build || exit 1

# Check for sensitive data (optional)
echo "🔒 Checking for sensitive data..."
if git diff --cached --name-only | xargs grep -l -i -E '(api[_-]?key|password|secret|token|private[_-]?key)' > /dev/null 2>&1; then
  echo "⚠️  Warning: Possible sensitive data detected!"
  echo "Please review your changes carefully."
fi

echo "✅ All pre-push checks passed!"
```

### 6.8 Create Prepare-Commit-Msg Hook (Optional - Auto-add Ticket Numbers)

Automatically prepend ticket numbers from branch names to commit messages.

**`.husky/prepare-commit-msg`**

```bash
COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2

# Only modify if it's a new commit (not merge, amend, etc)
if [ -z "$COMMIT_SOURCE" ]; then
  # Get current branch name
  BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

  # Extract ticket number (e.g., JIRA-123, TICKET-456)
  TICKET=$(echo "$BRANCH_NAME" | grep -oE '[A-Z]+-[0-9]+')

  # If ticket found and not already in message
  if [ -n "$TICKET" ]; then
    if ! grep -q "$TICKET" "$COMMIT_MSG_FILE"; then
      # Prepend ticket to commit message
      sed -i.bak -e "1s/^/[$TICKET] /" "$COMMIT_MSG_FILE"
      rm "$COMMIT_MSG_FILE.bak"
    fi
  fi
fi
```

**Usage Example:**

```bash
# Branch name: feature/JIRA-123-add-authentication
git commit -m "feat: add user login"
# Result: "[JIRA-123] feat: add user login"
```

### 6.9 Create Post-Commit Hook (Optional - Notifications & Analytics)

Show notifications and track commit statistics after successful commits.

**`.husky/post-commit`**

```bash
# Get commit details
COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_HASH=$(git log -1 --pretty=%h)
COMMIT_COUNT=$(git rev-list --count HEAD)

echo "✅ Commit successful!"
echo "📝 Hash: $COMMIT_HASH"
echo "💬 Message: $COMMIT_MSG"

# Milestone celebrations
if [ $((COMMIT_COUNT % 10)) -eq 0 ]; then
  echo "🎉 Milestone! Commit #$COMMIT_COUNT"
fi

if [ $((COMMIT_COUNT % 100)) -eq 0 ]; then
  echo "🚀 WOW! $COMMIT_COUNT commits! You're on fire! 🔥"
fi

# Optional: Desktop notification (uncomment for your OS)
# macOS:
# osascript -e "display notification \"$COMMIT_MSG\" with title \"✅ Commit $COMMIT_HASH\""

# Linux (requires notify-send):
# notify-send "✅ Commit Successful" "$COMMIT_MSG"

# Windows (PowerShell):
# powershell -Command "New-BurntToastNotification -Text 'Commit Successful', '$COMMIT_MSG'"
```

### 6.10 Create Post-Merge Hook (Optional - Dependency Updates)

Automatically detect and notify about dependency changes after merging/pulling.

**`.husky/post-merge`**

```bash
echo "🔄 Post-merge checks..."

# Get list of changed files
changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

# Function to check if file changed
check_run() {
  echo "$changed_files" | grep --quiet "$1" && eval "$2"
}

# Check package.json
check_run "package.json" "echo '📦 package.json changed!'; echo '⚠️  Run: pnpm install'"

# Check lock file
check_run "pnpm-lock.yaml" "echo '🔒 Lock file changed!'; echo '⚠️  Run: pnpm install'"

# Check environment example
check_run ".env.example" "echo '🔧 .env.example updated!'; echo '⚠️  Update your .env file'"

# Check TypeScript config
check_run "tsconfig.json" "echo '⚙️  TypeScript config changed!'; echo 'ℹ️  Review tsconfig changes'"

# Optional: Auto-install dependencies (uncomment to enable)
# if echo "$changed_files" | grep -q "package.json\|pnpm-lock.yaml"; then
#   echo "📦 Installing dependencies automatically..."
#   pnpm install
# fi

echo "✅ Post-merge checks complete!"
```

**What it does:**

- Detects changes to `package.json` → Reminds you to run `pnpm install`
- Detects changes to `pnpm-lock.yaml` → Reminds you to run `pnpm install`
- Detects changes to `.env.example` → Reminds you to update `.env`
- Optional: Can auto-install dependencies (commented out by default)

### 6.11 Git Hook Strategy

| Hook           | Purpose                 | When it Runs                 |
| -------------- | ----------------------- | ---------------------------- |
| **pre-commit** | Fast quality checks     | Before commit is created     |
| **commit-msg** | Validate message format | After writing commit message |
| **pre-push**   | Full validation         | Before pushing to remote     |

### 6.12 Valid Commit Message Examples

```bash
# Without scope (valid)
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login bug"
git commit -m "docs: update readme"

# With scope (also valid)
git commit -m "feat(auth): add JWT support"
git commit -m "fix(api): handle null response"
git commit -m "test(user): add unit tests"

# With body and footer
git commit -m "feat(api): add user endpoint" \
  -m "Added REST API endpoint for user management" \
  -m "Closes #123"

# With prepare-commit-msg (auto-adds ticket from branch)
# Branch: feature/JIRA-123-add-login
git commit -m "feat: add login form"
# Result: "[JIRA-123] feat: add login form"
```

### 6.13 Skip Hooks (Emergency Only)

```bash
# Skip pre-commit and commit-msg
git commit --no-verify -m "fix: urgent hotfix"

# Skip pre-push
git push --no-verify

# Skip all hooks
HUSKY=0 git commit -m "emergency fix"
```

### 6.14 Update Package.json Scripts

```json
{
  "scripts": {
    "// ━━━━━━━━━━━━━━━━━━ CI/CD ━━━━━━━━━━━━━━━━━━━━━": "",
    "ci": "pnpm lint && pnpm type-check && pnpm test:ci && pnpm build",
    "// ━━━━━━━━━━━━━━━━ GIT HOOKS ━━━━━━━━━━━━━━━━━": "",
    "prepare": "husky"
  }
}
```

## 7. GitHub Actions CI/CD

Automate testing, building, and deployment with GitHub Actions.

### 11.1 CI Pipeline (Continuous Integration)

`.github/workflows/ci.yml`

```yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # Quality Checks
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  quality:
    name: Code Quality
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4

      - name: 📦 Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: 📦 Install dependencies
        run: pnpm install --frozen-lockfile

      - name: 🔍 Run linter
        run: pnpm lint

      - name: 💅 Check formatting
        run: pnpm format:check

      - name: 🔎 Type check
        run: pnpm type-check

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # Test on Multiple Node Versions
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  test:
    name: Test (Node ${{ matrix.node-version }})
    runs-on: ubuntu-latest
    needs: quality

    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4

      - name: 📦 Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: 🔧 Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: 📦 Install dependencies
        run: pnpm install --frozen-lockfile

      - name: 🧪 Run tests
        run: pnpm test:ci

      - name: 📊 Upload coverage to Codecov
        if: matrix.node-version == 20
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: false

  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  # Build
  # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4

      - name: 📦 Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: 📦 Install dependencies
        run: pnpm install --frozen-lockfile

      - name: 🏗️ Build project
        run: pnpm build

      - name: 📤 Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7
```

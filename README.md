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

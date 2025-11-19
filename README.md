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
  "exclude": ["node_modules", "dist", "build", "coverage"],
  "references": [
    { "path": "./tsconfig.build.json" },
    { "path": "./tsconfig.test.json" }
  ]
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

    "composite": true,

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

    "composite": true,

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

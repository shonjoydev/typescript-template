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

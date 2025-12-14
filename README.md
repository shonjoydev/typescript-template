# TypeScript Project Template

> A professional, production-ready TypeScript starter template with automated code quality checks, modern tooling, and comprehensive development workflow.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange.svg)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ Features

- ⚡️ **Lightning Fast** - Powered by [tsx](https://github.com/esbuild-kit/tsx) and [pnpm](https://pnpm.io/)
- 🔥 **Hot Reload** - Instant feedback with watch mode
- 🎯 **TypeScript First** - Full type safety with path aliases
- 🧪 **Vitest** - Modern, fast testing framework
- 🎨 **Code Quality** - ESLint + Prettier pre-configured
- 🪝 **Git Hooks** - Automated checks with Husky
- 📦 **Smart Bundling** - Optimized production builds
- 🔧 **VSCode Ready** - Includes settings and recommended extensions
- 🚀 **CI/CD Ready** - Pre-configured quality pipeline
- 📚 **Well Documented** - Comprehensive setup guide included

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com//typescript-template.git
cd typescript-template

# Install dependencies (requires pnpm)
pnpm install

# Start development server
pnpm dev

# Or start with all watchers (types, lint, tests)
pnpm dev:watch
```

**That's it!** 🎉 You're ready to start coding.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v24+ ([Download](https://nodejs.org/))
- **pnpm** v9+ ([Install guide](https://pnpm.io/installation))
- **Git** v2.9+ ([Download](https://git-scm.com/))

### Install pnpm

```bash
npm install -g pnpm
# or
corepack enable && corepack prepare pnpm@latest --activate
```

---

## 🛠️ Tech Stack

| Tool                                                           | Purpose                      |
| -------------------------------------------------------------- | ---------------------------- |
| [TypeScript](https://www.typescriptlang.org/)                  | Type-safe JavaScript         |
| [tsx](https://github.com/esbuild-kit/tsx)                      | TypeScript execution & watch |
| [Vitest](https://vitest.dev/)                                  | Unit testing framework       |
| [ESLint](https://eslint.org/)                                  | Code linting                 |
| [Prettier](https://prettier.io/)                               | Code formatting              |
| [Husky](https://typicode.github.io/husky/)                     | Git hooks                    |
| [pnpm](https://pnpm.io/)                                       | Package manager              |
| [concurrently](https://github.com/open-cli-tools/concurrently) | Run parallel commands        |

---

## 📜 Available Scripts

### Development

```bash
pnpm dev              # Start development server
pnpm dev:debug        # Start with debugger attached
pnpm dev:watch        # Full dev mode (server + types + lint + tests)
```

### Building

```bash
pnpm build            # Build for production
pnpm start            # Run production build
```

### Code Quality

```bash
pnpm lint             # Check code with ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript type checking
pnpm check            # Run all checks
pnpm check:fix        # Auto-fix all fixable issues
```

### Testing

```bash
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:coverage    # Generate coverage report
pnpm test:ui          # Open Vitest UI
```

### Maintenance

```bash
pnpm clean            # Clean build artifacts
pnpm clean:deep       # Deep clean (includes node_modules)
pnpm rebuild          # Clean + reinstall + rebuild
```

### CI/CD

```bash
pnpm ci               # Run complete CI pipeline
```

> 💡 **See [SETUP.md](SETUP.md) for complete script documentation**

---

## 📁 Project Structure

```
.
├── .husky/                 # Git hooks configuration
├── .vscode/                # VSCode workspace settings
├── src/                    # Source code
│   ├── index.ts           # Application entry point
│   └── ...                # Your code here
├── dist/                   # Production build output
├── coverage/               # Test coverage reports
├── .editorconfig          # Editor configuration
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Dependency lock file
├── README.md              # This file
└── SETUP.md               # Complete setup guide
```

---

## 🎯 Development Workflow

### Standard Development

```bash
# 1. Start development with all watchers
pnpm dev:watch

# 2. Write your code
# - Auto-formatting on save
# - Real-time linting
# - Type checking
# - Tests running

# 3. Commit changes (hooks run automatically)
git add .
git commit -m "feat: add new feature"

# 4. Push (tests run automatically)
git push
```

### Quick Iteration

```bash
# Start basic dev server (faster startup)
pnpm dev

# Manual checks before commit
pnpm check:fix
pnpm test:run
```

---

## 🪝 Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) for automated quality checks:

### Pre-commit

- ✅ Lints staged files
- ✅ Formats code with Prettier
- ✅ Auto-fixes issues when possible
- ⚡ Fast (~2-5 seconds)

### Pre-push

- ✅ Full TypeScript type checking
- ✅ Runs complete test suite
- ✅ Ensures code quality before push
- 🔍 Comprehensive (~30-60 seconds)

> **Note:** Hooks are automatically installed when you run `pnpm install`

---

## 🎨 Code Style

This project follows strict code quality standards:

- **ESLint**: Catches bugs and enforces best practices
- **Prettier**: Ensures consistent formatting
- **TypeScript**: Provides type safety
- **EditorConfig**: Maintains consistency across editors

All code is automatically formatted and linted on commit. No configuration needed!

---

## 🧪 Testing

Write tests using [Vitest](https://vitest.dev/):

```typescript
// src/utils/math.test.ts
import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

Run tests:

```bash
pnpm test              # Watch mode
pnpm test:run          # Run once
pnpm test:coverage     # With coverage
```

---

## 🔧 Configuration

### Path Aliases

Import modules using clean aliases:

```typescript
// ❌ Avoid this
import { User } from '../../../models/User';

// ✅ Do this
import { User } from '@/models/User';
```

**Configured in `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Environment Variables

Create `.env` file in project root:

```bash
NODE_ENV=development
PORT=3000
```

Load in your code:

```typescript
const port = process.env.PORT || 3000;
```

---

## 🚀 Deployment

### Build for Production

```bash
# Build the project
pnpm build

# Output will be in dist/ folder
# Run production build
pnpm start
```

### Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
```

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide with troubleshooting
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: resolve bug in authentication
docs: update README
style: format code
refactor: restructure user service
test: add unit tests for utils
chore: update dependencies
```

---

## 🐛 Troubleshooting

### Common Issues

**Hooks not running?**

```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

**tsx watch not restarting?**

```bash
# Already optimized in package.json
# If issues persist, see SETUP.md
```

**Path aliases not working?**

```bash
# Restart TypeScript server in VSCode
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

> 📖 **For more troubleshooting, see [SETUP.md](SETUP.md)**

---

## 📈 Performance

- ⚡ **Fast startup**: tsx provides instant TypeScript execution
- 🔥 **Hot reload**: Changes reflect immediately
- 📦 **Efficient**: pnpm uses disk space efficiently
- 🧹 **Clean builds**: Parallel cleanup is 3-4x faster
- 🎯 **Optimized**: Production builds are minified and optimized

---

## 🔐 Security

- Regular dependency updates via Dependabot
- No credentials in code (use environment variables)
- Pre-commit hooks prevent accidental commits of secrets
- TypeScript catches type-related bugs early

---

## 📊 Stats

```bash
# View dependencies
pnpm list --depth=0

# Check for outdated packages
pnpm outdated

# Analyze bundle size
pnpm build && du -sh dist/

# View test coverage
pnpm test:coverage
```

---

## 🙏 Acknowledgments

Built with these amazing tools:

- [TypeScript](https://www.typescriptlang.org/) by Microsoft
- [tsx](https://github.com/esbuild-kit/tsx) by @esbuild-kit
- [Vitest](https://vitest.dev/) by Anthony Fu
- [pnpm](https://pnpm.io/) by @pnpm
- [Husky](https://typicode.github.io/husky/) by @typicode

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

- 📧 Email: <shonjoy.developer@gmail.com>
- 🐛 Issues: [GitHub Issues](https://github.com/shonjoydev/typescript-template/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/shonjoydev/typescript-template/discussions)
- 📖 Docs: [Full Documentation](https://github.com/shonjoydev/typescript-template)

---

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐️!

---

<div align="center">

**[Documentation](SETUP.md)** • **[Contributing](CONTRIBUTING.md)** • **[Changelog](CHANGELOG.md)**

Made with ❤️ by Shonjoy

</div>

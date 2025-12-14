# Contributing to TypeScript Project Template

First off, thank you for considering contributing to this project! 🎉

It's people like you that make this project such a great tool. We welcome contributions from everyone, whether you're fixing a typo, adding a feature, or improving documentation.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Testing Guidelines](#-testing-guidelines)
- [Documentation](#-documentation)
- [Community](#-community)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, education, socio-economic status
- Nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Examples of behavior that contributes to a positive environment:**

✅ Using welcoming and inclusive language
✅ Being respectful of differing viewpoints and experiences
✅ Gracefully accepting constructive criticism
✅ Focusing on what is best for the community
✅ Showing empathy towards other community members

**Examples of unacceptable behavior:**

❌ Trolling, insulting/derogatory comments, and personal or political attacks
❌ Public or private harassment
❌ Publishing others' private information without explicit permission
❌ Other conduct which could reasonably be considered inappropriate

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When creating a bug report, include:**

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, Node version, pnpm version)
- **Additional context** or relevant logs

**Bug Report Template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Run '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g., Windows 11, macOS 13, Ubuntu 22.04]
- Node version: [e.g., 18.17.0]
- pnpm version: [e.g., 8.6.0]
- Project version: [e.g., 1.0.0]

**Additional context**
Any other relevant information.
```

### Suggesting Enhancements

We love to receive enhancement suggestions! Before creating enhancement suggestions, please check if there's already a similar suggestion.

**When suggesting an enhancement, include:**

- **Clear title and description**
- **Use case** - Why is this enhancement needed?
- **Proposed solution** - How would you implement it?
- **Alternatives considered** - What other solutions did you think about?
- **Additional context** - Mockups, examples, etc.

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, screenshots, or examples.
```

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements
- `bug` - Something isn't working

### Pull Requests

We actively welcome your pull requests!

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/typescript-template.git
cd typescript-template

# Add upstream remote
git remote add upstream https://github.com/shonjoydev/typescript-template.git
```

### 2. Install Dependencies

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Create a Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch Naming Convention:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes (formatting, etc.)
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

---

## 🔄 Development Workflow

### 1. Start Development

```bash
# Start development server with all watchers
pnpm dev:watch

# Or basic dev server only
pnpm dev
```

### 2. Make Your Changes

- Write clear, self-documenting code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Run Quality Checks

```bash
# Auto-fix formatting and linting issues
pnpm check:fix

# Run type checking
pnpm type-check

# Run tests
pnpm test:run

# Or run everything at once
pnpm ci
```

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with conventional commit message
git commit -m "feat: add amazing new feature"

# Pre-commit hooks will run automatically
```

### 5. Sync with Upstream

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# Or merge if preferred
git merge upstream/main
```

### 6. Push Your Changes

```bash
# Push to your fork
git push origin feature/your-feature-name

# Pre-push hooks will run automatically
```

### 7. Open a Pull Request

Go to GitHub and open a Pull Request from your fork to the main repository.

---

## 📏 Coding Standards

### TypeScript Guidelines

**✅ Do:**

```typescript
// Use explicit types for function parameters and returns
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use meaningful variable names
const totalPrice = calculateTotal(10, 5);

// Use path aliases
import { User } from '@/models/User';
```

**❌ Don't:**

```typescript
// Avoid 'any' type
function process(data: any) {
  // Bad!
  return data;
}

// Avoid unclear variable names
const x = calculateTotal(10, 5); // What is x?

// Avoid relative imports when alias is available
import { User } from '../../../models/User'; // Use @/ instead
```

### Code Style

This project uses **ESLint** and **Prettier** for code style enforcement.

**General Rules:**

- ✅ Use single quotes for strings
- ✅ 2 spaces for indentation
- ✅ Semicolons required
- ✅ Trailing commas in multi-line
- ✅ Max line length: 80 characters (flexible for readability)
- ✅ Use const/let, never var
- ✅ Prefer arrow functions for callbacks
- ✅ Use template literals for string interpolation

**Example:**

```typescript
// Good
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

// Bad
var greet = function (name) {
  return 'Hello, ' + name + '!';
};

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];
```

### File Structure

```typescript
// 1. Imports - grouped and sorted
import { useState, useEffect } from 'react'; // External
import { User } from '@/models/User'; // Internal

// 2. Types/Interfaces
interface Props {
  user: User;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Main code
export function Component({ user }: Props) {
  // Implementation
}

// 5. Helper functions (if not extracted)
function helperFunction() {
  // Implementation
}
```

---

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without functionality change
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config, etc.)
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

### Scope (Optional)

The scope should be the name of the affected module/feature:

- `auth`
- `api`
- `ui`
- `database`
- `config`

### Subject

- Use imperative, present tense: "add" not "added" nor "adds"
- Don't capitalize first letter
- No period (.) at the end
- Keep under 50 characters

### Body (Optional)

- Use imperative, present tense
- Include motivation for the change
- Contrast with previous behavior

### Footer (Optional)

- Reference issues: `Fixes #123`, `Closes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

**Simple commit:**

```bash
git commit -m "feat: add user authentication"
```

**With scope:**

```bash
git commit -m "fix(auth): resolve token expiration issue"
```

**With body:**

```bash
git commit -m "feat(api): add user profile endpoint

Add new endpoint to fetch user profile data.
Includes caching for improved performance."
```

**Breaking change:**

```bash
git commit -m "feat(api): change response format

BREAKING CHANGE: API now returns data in new format.
Update clients to handle new structure."
```

**Multiple issues:**

```bash
git commit -m "fix: resolve memory leaks

Fixes #123, #456, #789"
```

### Using Commitizen (Interactive)

```bash
# Use interactive commit helper
pnpm commit

# Follow the prompts:
# 1. Select type
# 2. Enter scope (optional)
# 3. Write short description
# 4. Write longer description (optional)
# 5. List breaking changes (optional)
# 6. Reference issues (optional)
```

---

## 🔀 Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass: `pnpm test:run`
2. ✅ Run quality checks: `pnpm ci`
3. ✅ Update documentation if needed
4. ✅ Add/update tests for new features
5. ✅ Sync with upstream: `git pull upstream main`
6. ✅ Resolve merge conflicts if any

### PR Title

Follow the same convention as commits:

```text
feat: add user profile page
fix: resolve authentication bug
docs: update contributing guide
```

### PR Description Template

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Related Issues

Fixes #(issue number)
Related to #(issue number)

## How Has This Been Tested?

Describe the tests you ran to verify your changes.

- [ ] Test A
- [ ] Test B

## Screenshots (if applicable)

Add screenshots to help explain your changes.

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

### After Your PR is Merged

1. Delete your branch: `git branch -d feature/your-feature-name`
2. Sync your fork: `git pull upstream main`
3. Celebrate! 🎉

---

## 🧪 Testing Guidelines

### Writing Tests

**Test file naming:**

```text
src/utils/math.ts       → src/utils/math.test.ts
src/services/api.ts     → src/services/api.test.ts
```

**Test structure:**

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { functionToTest } from './module';

describe('functionToTest', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });

  it('should handle edge cases', () => {
    expect(functionToTest('')).toBe('');
    expect(functionToTest(null)).toThrow();
  });
});
```

### Test Coverage

- Aim for **80%+ coverage** for new code
- Critical paths should have **100% coverage**
- Run coverage: `pnpm test:coverage`

### What to Test

**✅ Do test:**

- Business logic and algorithms
- Edge cases and error conditions
- Integration points
- Public APIs and interfaces
- Critical user flows

**❌ Don't test:**

- Third-party libraries (trust they're tested)
- Trivial getters/setters
- Generated code
- Configuration files

---

## 📚 Documentation

### Code Documentation

**Use JSDoc for public APIs:**

````typescript
/**
 * Calculates the total price including tax.
 *
 * @param price - The base price
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns The total price including tax
 * @throws {Error} If price or taxRate is negative
 *
 * @example
 * ```ts
 * const total = calculateTotal(100, 0.1);
 * console.log(total); // 110
 * ```
 */
export function calculateTotal(price: number, taxRate: number): number {
  if (price < 0 || taxRate < 0) {
    throw new Error('Price and tax rate must be positive');
  }
  return price * (1 + taxRate);
}
````

### README Updates

When adding features, update:

- Feature list
- Usage examples
- Configuration options
- Breaking changes (if any)

### SETUP.md Updates

When changing setup process, update:

- Installation steps
- Configuration changes
- New scripts
- Troubleshooting section

---

## 💬 Community

### Getting Help

- 📖 Read the [documentation](README.md)
- 🔍 Search [existing issues](https://github.com/shonjoydev/typescript-template/issues)
- 💬 Join [discussions](https://github.com/shonjoydev/typescript/discussions)
- 📧 Email: <shonjoy.developer@gmail.com>

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code contributions
- **Email**: For private inquiries

### Recognition

Contributors are recognized in:

- Project README
- Release notes
- Contributors page (if applicable)

---

## 🏆 Recognition of Contributors

We value all contributions, no matter how small. Contributors will be recognized in:

- **README.md**: All contributors section
- **Release Notes**: Acknowledgment in changelog
- **GitHub**: Contributor badge on profile

---

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.

---

## ❓ Questions?

Don't hesitate to ask! We're here to help:

- Open an issue with the `question` label
- Start a discussion on GitHub Discussions
- Reach out to maintainers directly

---

## 🙏 Thank You

Thank you for taking the time to contribute! Every contribution, no matter how small, helps make this project better.

We appreciate:

- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🧪 Test additions
- 💻 Code contributions
- ⭐ Stars and shares

**Happy coding!** 🚀

---

<div align="center">

**[Back to README](README.md)** • **[Setup Guide](SETUP.md)** • **[Changelog](CHANGELOG.md)**

**Made with ❤️ by [Shonjoy](https://github.com/shonjoydev)**

</div>

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

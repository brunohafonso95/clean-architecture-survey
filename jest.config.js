module.exports = {
  displayName: 'Unit tests',
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    'dist',
    'src/presentation/interfaces',
    'src/domain/interfaces',
    'src/utils/interfaces',
  ],
  coverageProvider: 'v8',
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'Survey manager API',
        publicPath: './html-report',
        filename: 'tests-report.html',
        expand: true,
      },
    ],
  ],
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};

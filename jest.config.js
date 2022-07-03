/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ["dist/", "node_modules/", "__tests__/", "__mocks__/"],
  watchPathIgnorePatterns: ["dist/", "node_modules/", "__tests__/", "__mocks__/"],
  coveragePathIgnorePatterns: ["dist/", "node_modules/", "__tests__/", "__mocks__/"],
};
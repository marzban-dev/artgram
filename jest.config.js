const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    collectCoverage: true,
    collectCoverageFrom: ["<rootDir>/**/*.{ts,tsx}"],
    coveragePathIgnorePatterns: ["node_modules", "config", "api", "mocks", "public", "store", "styles", "types"],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    moduleDirectories: ["node_modules", "<rootDir>"],
    testEnvironment: "jest-environment-jsdom",
    setupFiles: ["<rootDir>/config/jest-setup-modules.js"],
    setupFilesAfterEnv: ["<rootDir>/config/jest-setup-tests.js"],
    moduleNameMapper: {
        "^.+\\.(svg)$": "<rootDir>/mocks/svgr-mock.js",
    },
    testMatch: ["<rootDir>/**/*.test.{ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);

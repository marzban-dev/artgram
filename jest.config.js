const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>"],
    testEnvironment: "jest-environment-jsdom",
    setupFiles: ["<rootDir>/config/jest-setup-modules.js"],
    setupFilesAfterEnv: ["<rootDir>/config/jest-setup-tests.js"],
    moduleNameMapper: {
        "^.+\\.(svg)$": "<rootDir>/mocks/svgr-mock.js",
    },
};

module.exports = createJestConfig(customJestConfig);

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/e2e"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;

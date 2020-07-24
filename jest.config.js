module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [
    "<rootDir>/src/"
  ],
  moduleNameMapper: {
    "^@\/(.*)$": "<rootDir>/src/$1",
  }
}

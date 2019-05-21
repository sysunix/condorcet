module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!jest-test)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  setupTestFrameworkScriptFile: "<rootDir>/src/config/setupTest.js",
  collectCoverageFrom: ["src/**/*.{js,vue}", "functions/utils/*.js"],
  coveragePathIgnorePatterns: [
    "src/config",
    "src/registerServiceWorker.js",
    "src/firebase.js",
    "src/main.js",
    "src/types.js",
    "src/plugins/*",
    "src/store/index.js",
    "src/utils/firebase.js"
  ]
};

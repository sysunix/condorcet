process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(babel-jest|jest-vue-preprocessor)/)"
  ],
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/tests/unit/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)"],
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

const got = require("got");

(async () => {
  try {
    await got(
      "https://github-assistant.jean-smaug.now.sh/api/checkPullRequest.js",
      {
        method: "POST",
        json: true,
        body: { number: process.env.PR_NUMBER }
      }
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

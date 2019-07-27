const graphql = require("@octokit/graphql").defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`
  }
});

const TITLE_PR_REGEX = /^(?:chore|feat|fix|style|docs|test|refactor):\s{1}.+/;

async function main(prNumber) {
  const {
    repository: {
      pullRequest: {
        id,
        baseRefName,
        title
        // comments: { nodes: comments }
      }
    }
  } = await graphql(`
    {
      repository(owner: "jean-smaug", name: "condorcet") {
        pullRequest(number: ${prNumber}) {
          id
          baseRefName
          title
          comments(last: 100) {
            nodes {
              body
            }
          }
        }
      }
    }
  `);

  let comment = "👋";

  if (TITLE_PR_REGEX.test(title) === false) {
    comment = `${comment} Merci de faire en sorte que le titre de ta PR respecte le format du guide de contribution\n`;
  }

  if (baseRefName === "master") {
    comment = `${comment} Merci de changer la branche de base de \`master\` vers \`dev\``;
    await graphql(`mutation {
      addComment(input: {subjectId: "${id}", body: "${comment}"}) {
        clientMutationId
      }
    }`);
  }
}

module.exports = async (req, res) => {
  const prNumber = req.body.number;
  await main(prNumber);

  res.writeHead(200);
  res.end();
};

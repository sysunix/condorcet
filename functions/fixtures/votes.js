const random = require("./random");

const NUMBER_OF_VOTES = parseInt(process.env.NUMBER_OF_VOTES);

const numberOfVotes = random(NUMBER_OF_VOTES - 3, NUMBER_OF_VOTES + 3);

module.exports = answers => {
  return Array(numberOfVotes)
    .fill()
    .map(() => {
      let ranks = Array(answers.length)
        .fill()
        .map((_, index) => index);

      return answers.map(answer => {
        const index = random(0, ranks.length - 1);
        const rank = ranks[index];
        ranks.splice(index, 1);

        return {
          rank: rank + 1,
          ...answer
        };
      });
    });
};

// const slugify = require("slugify");

/**
 * rankings {Array<{rank: number, value: string}>}
 */
exports.getRanking = (rankings = []) => {
  let opponents = [];
  const duels = rankings.reduce((acc, ranking) => {
    const duelsForOneRanking = ranking.reduce((secondAcc, answer) => {
      const anwserDuels = ranking.reduce((thirdAcc, secondAnswer) => {
        if (secondAnswer.value === answer.value) {
          return thirdAcc;
        }

        if (answer.rank < secondAnswer.rank) {
          return thirdAcc;
        }

        opponents = [...opponents, answer.value, secondAnswer.value];

        return [
          ...thirdAcc,
          {
            [answer.value]: 0,
            [secondAnswer.value]: 1,
            opponents: [answer.value, secondAnswer.value]
          }
        ];
      }, []);

      return [...secondAcc, ...anwserDuels];
    }, []);

    return [...acc, ...duelsForOneRanking];
  }, []);

  const uniqueOpponents = [...new Set(opponents)];

  uniqueOpponents.reduce((thirdAcc, opponent) => {
    uniqueOpponents.reduce((thirdAcc, subOpponent) => {}, {});
  }, {});

  return duels.filter(
    duel => duel.opponents.includes("Sanji") && duel.opponents.includes("Zorro")
  );
};

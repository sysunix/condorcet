const mergeObjectsValues = require("merge-objects-values");

const getMatrixOfTheDuelsForOneVote = ranking => {
  const rankingMatrix = ranking.reduce((secondAcc, answer) => {
    const anwserDuels = ranking.reduce((thirdAcc, secondAnswer) => {
      if (secondAnswer.value === answer.value) {
        return thirdAcc;
      }

      if (answer.rank > secondAnswer.rank) {
        return Object.assign(thirdAcc, {
          [secondAnswer.slug]: 0
        });
      }

      return Object.assign(thirdAcc, {
        [secondAnswer.slug]: 1
      });
    }, {});

    return Object.assign(secondAcc, {
      [answer.slug]: {
        value: answer.value,
        duels: anwserDuels
      }
    });
  }, {});

  return rankingMatrix;
};

const getMatrixOfTheDuels = votes => {
  return votes.reduce((acc, vote, index) => {
    if (index === 0) {
      return getMatrixOfTheDuelsForOneVote(vote);
    }

    return mergeObjectsValues(null, acc, getMatrixOfTheDuelsForOneVote(vote));
  }, {});
};

/**
 * votes {Array<{rank: number, value: string}>}
 */
const getRanking = (votes = []) => {
  const matrixOfTheDuels = getMatrixOfTheDuels(votes);

  return Object.keys(matrixOfTheDuels)
    .map(alternative => {
      const item = matrixOfTheDuels[alternative];

      const { wins, equalities } = Object.keys(item.duels).reduce(
        (acc, opponent) => {
          const alternativeValue =
            matrixOfTheDuels[opponent].duels[alternative];
          const opponentValue = matrixOfTheDuels[alternative].duels[opponent];

          if (alternativeValue < opponentValue) {
            return Object.assign(acc, { wins: acc.wins + 1 });
          }

          if (alternativeValue === opponentValue) {
            return Object.assign(acc, { equalities: acc.equalities + 1 });
          }

          return acc;
        },
        { wins: 0, equalities: 0 }
      );

      return { value: item.value, slug: alternative, wins, equalities };
    })
    .sort((a, b) => {
      if (a.wins === b.wins) {
        return b.equalities - a.equalities;
      }

      return b.wins - a.wins;
    })
    .map((item, index) => {
      return Object.assign(item, { rank: index + 1 });
    });
};

module.exports = {
  getMatrixOfTheDuelsForOneVote,
  getMatrixOfTheDuels,
  getRanking
};

const slugify = require("slugify");

const getRankingMatrix = ranking => {
  const rankingMatrix = ranking.reduce((secondAcc, answer) => {
    const anwserDuels = ranking.reduce((thirdAcc, secondAnswer) => {
      if (secondAnswer.value === answer.value) {
        return thirdAcc;
      }

      if (answer.rank > secondAnswer.rank) {
        return Object.assign(thirdAcc, {
          [slugify(secondAnswer.value, { lower: true, replacement: "-" })]: 0
        });
      }

      return Object.assign(thirdAcc, {
        [slugify(secondAnswer.value, { lower: true, replacement: "-" })]: 1
      });
    }, {});

    return Object.assign(secondAcc, {
      [slugify(answer.value, { lower: true, replacement: "-" })]: anwserDuels
    });
  }, {});

  return rankingMatrix;
};

/**
 * rankings {Array<{rank: number, value: string}>}
 */
exports.getRanking = (rankings = []) => {
  const matrixOfVictories = rankings.reduce((acc, ranking, index) => {
    const rankingMatrix = getRankingMatrix(ranking);

    // si on est au premier tour de boucle alors la matrice finale sera rankingMatrix
    if (index === 0) {
      return rankingMatrix;
    }

    // rankingMatrix contient la matrice des duels d'un utilisateurs
    // il faut maintenant fusionner les réponses des utilisateurs
    // acc et rankingMatrix doivent être fusionnées

    const alternatives = Object.keys(rankingMatrix);

    const newCurrentMatrix = alternatives.reduce((fourthAcc, alternative) => {
      const opponents = acc[alternative];
      const opponentsKeys = Object.keys(opponents);

      const newResultForAnAlternative = opponentsKeys.reduce(
        (fifthAcc, opponentKey) => {
          return Object.assign(fifthAcc, {
            [opponentKey]:
              opponents[opponentKey] + rankingMatrix[alternative][opponentKey]
          });
        },
        {}
      );

      return Object.assign(fourthAcc, {
        [alternative]: newResultForAnAlternative
      });
    }, {});

    return newCurrentMatrix;
  }, {});

  return matrixOfVictories;
};

module.exports = {
  getMatrixOfVictories(answers, initialMatrix = {}) {
    let matrix = initialMatrix;

    if (JSON.stringify(matrix) === "{}") {
      matrix = answers
        .map(answer => answer.value)
        .reduce((acc, current) => Object.assign(acc, { [current]: {} }), {});
    }

    answers.forEach(answer => {
      answers.forEach(insideAnswer => {
        if (
          answer.value === insideAnswer.value ||
          answer.position > insideAnswer.position
        ) {
          return;
        }

        matrix = Object.assign(matrix, {
          [answer.value]: Object.assign(matrix[answer.value], {
            [insideAnswer.value]:
              matrix[answer.value][insideAnswer.value] + 1 || 1
          })
        });
      });
    });

    return matrix;
  },

  getRanking(arrayOfanwsers) {
    if (!Array.isArray(arrayOfanwsers) || arrayOfanwsers.length === 0) {
      return null;
    }

    const matrix = arrayOfanwsers.reduce((acc, answers) => {
      return this.getMatrixOfVictories(answers, acc);
    }, {});

    const matrixKeys = Object.keys(matrix);

    const winsPerAnswer = matrixKeys.reduce((acc, matrixKey) => {
      matrixKeys.forEach(insideMatrixKey => {
        if (matrixKey === insideMatrixKey) {
          return;
        }

        const currentValue = matrix[matrixKey][insideMatrixKey] || 0;
        const oppositeValue = matrix[insideMatrixKey][matrixKey] || 0;

        if (currentValue > oppositeValue) {
          acc[matrixKey] = acc[matrixKey] + 1 || 1;
          return;
        }
      });

      return acc;
    }, {});

    const winnerKeys = Object.keys(winsPerAnswer);
    const looser = matrixKeys.filter(
      matrixKey => !winnerKeys.includes(matrixKey)
    )[0];

    const wins = Object.assign(winsPerAnswer, { [looser]: 0 });

    return {
      wins,
      ranking: Object.keys(wins)
        .sort((a, b) => {
          return wins[b] - wins[a];
        })
        .reduce((acc, item, index) => {
          return [...acc, { value: item, position: index + 1 }];
        }, [])
        .sort((a, b) => a.position > b.position)
    };
  }
};

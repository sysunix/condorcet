module.exports = {
  getFirstRoundRanking(answers, alternatives) {
    const firstChoices = answers.map(answer => {
      return answer.find(item => item.position === 1);
    });

    return alternatives
      .reduce((acc, alternative) => {
        const numberOfVotes = firstChoices.filter(
          firstChoice => firstChoice.value === alternative
        ).length;
        return [...acc, { value: alternative, numberOfVotes }];
      }, [])
      .sort((a, b) => a.numberOfVotes < b.numberOfVotes)
      .map((result, index) => Object.assign(result, { position: index + 1 }));
  }
};

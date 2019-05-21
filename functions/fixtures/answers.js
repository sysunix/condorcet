module.exports = (pollId, userId) => [
  {
    answers: [
      {
        rank: 1,
        slug: "oui",
        value: "Oui"
      },
      { rank: 2, slug: "non", value: "Non" },
      { rank: 3, slug: "peut-etre", value: "Peut être" }
    ],
    pollId,
    userId
  }
];

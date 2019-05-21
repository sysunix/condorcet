const condorcet = require("../condorcet-v3");

describe("The condorcet poll", () => {
  it("should return the matrix of the duels for one vote", () => {
    const vote = [
      { rank: 2, value: "Luffy", slug: "luffy" },
      { rank: 1, value: "Zorro", slug: "zorro" },
      { rank: 3, value: "Sanji", slug: "sanji" }
    ];

    expect(condorcet.getMatrixOfTheDuelsForOneVote(vote)).toEqual({
      luffy: {
        duels: {
          sanji: 1,
          zorro: 0
        },
        value: "Luffy"
      },
      sanji: {
        duels: {
          luffy: 0,
          zorro: 0
        },
        value: "Sanji"
      },
      zorro: {
        duels: {
          luffy: 1,
          sanji: 1
        },
        value: "Zorro"
      }
    });
  });

  it("should return the matrix of the duels for two vote", () => {
    const votes = [
      [
        { rank: 2, value: "Luffy", slug: "luffy" },
        { rank: 1, value: "Zorro", slug: "zorro" },
        { rank: 3, value: "Sanji", slug: "sanji" }
      ],
      [
        { rank: 2, value: "Luffy", slug: "luffy" },
        { rank: 1, value: "Zorro", slug: "zorro" },
        { rank: 3, value: "Sanji", slug: "sanji" }
      ]
    ];

    expect(condorcet.getMatrixOfTheDuels(votes)).toEqual({
      luffy: {
        duels: {
          sanji: 2,
          zorro: 0
        },
        value: "Luffy"
      },
      sanji: {
        duels: {
          luffy: 0,
          zorro: 0
        },
        value: "Sanji"
      },
      zorro: {
        duels: {
          luffy: 2,
          sanji: 2
        },
        value: "Zorro"
      }
    });
  });

  it("should return the ranking for one vote", () => {
    const votes = [
      [
        { rank: 1, value: "Zorro", slug: "zorro" },
        { rank: 2, value: "Luffy", slug: "luffy" },
        { rank: 3, value: "Sanji", slug: "sanji" }
      ]
    ];

    expect(condorcet.getRanking(votes)).toEqual([
      { rank: 1, value: "Zorro", slug: "zorro", wins: 2, equalities: 0 },
      { rank: 2, value: "Luffy", slug: "luffy", wins: 1, equalities: 0 },
      { rank: 3, value: "Sanji", slug: "sanji", wins: 0, equalities: 0 }
    ]);
  });

  it("should return condorcet's winner with equalities ", () => {
    const votes = [
      [
        { rank: 1, value: "Zorro", slug: "zorro" },
        { rank: 2, value: "Luffy", slug: "luffy" },
        { rank: 3, value: "Sanji", slug: "sanji" }
      ],
      [
        { rank: 1, value: "Luffy", slug: "luffy" },
        { rank: 2, value: "Zorro", slug: "zorro" },
        { rank: 3, value: "Sanji", slug: "sanji" }
      ]
    ];

    expect(condorcet.getRanking(votes)).toEqual([
      { rank: 1, value: "Zorro", slug: "zorro", wins: 1, equalities: 1 },
      { rank: 2, value: "Luffy", slug: "luffy", wins: 1, equalities: 1 },
      { rank: 3, value: "Sanji", slug: "sanji", wins: 0, equalities: 0 }
    ]);
  });

  xit("should return condorcet's winner with small piece of data ", () => {
    const answers = [
      [
        { rank: 1, value: "Zorro" },
        { rank: 2, value: "Luffy" },
        { rank: 2, value: "Sanji" }
      ],
      [
        { rank: 1, value: "Zorro" },
        { rank: 2, value: "Luffy" },
        { rank: 3, value: "Sanji" }
      ],
      [
        { rank: 1, value: "Zorro" },
        { rank: 2, value: "Luffy" },
        { rank: 2, value: "Sanji" }
      ]
    ];

    expect(condorcet.getRanking(answers)).toEqual([
      {
        rank: 1,
        value: "Zorro"
      },
      {
        rank: 2,
        value: "Luffy"
      },
      {
        rank: 3,
        value: "Sanji"
      }
    ]);
  });
});

const condorcet = require("../condorcet");

describe("The condorcet poll", () => {
  it("should return graph of duels", () => {
    const answers = [
      { position: 1, value: "Zorro" },
      { position: 2, value: "Luffy" },
      { position: 3, value: "Sanji" }
    ];

    const answers2 = [
      { position: 2, value: "Zorro" },
      { position: 1, value: "Luffy" },
      { position: 3, value: "Sanji" }
    ];

    const resultMatrix = condorcet.getMatrixOfVictories(answers);
    expect(resultMatrix).toEqual({
      Luffy: { Sanji: 1 },
      Sanji: {},
      Zorro: { Luffy: 1, Sanji: 1 }
    });

    expect(condorcet.getMatrixOfVictories(answers2, resultMatrix)).toEqual({
      Luffy: { Sanji: 2, Zorro: 1 },
      Sanji: {},
      Zorro: { Luffy: 1, Sanji: 2 }
    });
  });

  it("should return null if input is not correct", () => {
    expect(condorcet.getRanking([])).toBe(null);
    expect(condorcet.getRanking(null)).toBe(null);
    expect(condorcet.getRanking(1)).toBe(null);
    expect(condorcet.getRanking("AZZ")).toBe(null);
    expect(condorcet.getRanking({})).toBe(null);
  });

  it("should return condorcet's winner with small piece of data ", () => {
    const answers = [
      [
        { position: 2, value: "Luffy" },
        { position: 1, value: "Zorro" },
        { position: 3, value: "Sanji" }
      ],
      [
        { position: 2, value: "Luffy" },
        { position: 1, value: "Zorro" },
        { position: 3, value: "Sanji" }
      ],
      [
        { position: 1, value: "Luffy" },
        { position: 2, value: "Zorro" },
        { position: 3, value: "Sanji" }
      ]
    ];
    expect(condorcet.getRanking(answers)).toEqual({
      wins: { Luffy: 1, Zorro: 2, Sanji: 0 },
      ranking: [
        {
          position: 1,
          value: "Zorro"
        },
        {
          position: 2,
          value: "Luffy"
        },
        {
          position: 3,
          value: "Sanji"
        }
      ]
    });
  });
});

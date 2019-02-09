const uninominal = require("./uninominal");

describe("uninominal", () => {
  it("should determine the winner of a uninominal poll", () => {
    const anwsers = [
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

    expect(
      uninominal.getFirstRoundRanking(anwsers, ["Zorro", "Luffy", "Sanji"])
    ).toEqual([
      {
        value: "Zorro",
        position: 1,
        numberOfVotes: 2
      },
      {
        value: "Luffy",
        position: 2,
        numberOfVotes: 1
      },
      {
        value: "Sanji",
        position: 3,
        numberOfVotes: 0
      }
    ]);
  });
});

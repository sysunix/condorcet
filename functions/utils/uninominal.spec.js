const uninominal = require("./uninominal");

describe("uninominal", () => {
  it("should determine the winner of a uninominal poll", () => {
    const anwsers = [
      [
        { rank: 2, value: "Luffy" },
        { rank: 1, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ],
      [
        { rank: 2, value: "Luffy" },
        { rank: 1, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ],
      [
        { rank: 1, value: "Luffy" },
        { rank: 2, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ]
    ];

    expect(
      uninominal.getFirstRoundRanking(anwsers, ["Zorro", "Luffy", "Sanji"])
    ).toMatchInlineSnapshot(`
Array [
  Object {
    "numberOfVotes": 2,
    "rank": 1,
    "value": "Zorro",
  },
  Object {
    "numberOfVotes": 1,
    "rank": 2,
    "value": "Luffy",
  },
  Object {
    "numberOfVotes": 0,
    "rank": 3,
    "value": "Sanji",
  },
]
`);
  });
});

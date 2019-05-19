const { getRanking } = require("./condorcet-v2");

describe("The condorcet poll", () => {
  it("should return condorcet's winner with one answer ", () => {
    const answers = [
      [
        { rank: 2, value: "Luffy" },
        { rank: 1, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ]
    ];

    expect(getRanking(answers)).toMatchInlineSnapshot(`
Object {
  "luffy": Object {
    "sanji": 1,
    "zorro": 0,
  },
  "sanji": Object {
    "luffy": 0,
    "zorro": 0,
  },
  "zorro": Object {
    "luffy": 1,
    "sanji": 1,
  },
}
`);
  });

  it("should return condorcet's winner with small piece of data ", () => {
    const answers = [
      [
        { rank: 1, value: "Zorro" },
        { rank: 2, value: "Luffy" },
        { rank: 3, value: "Sanji" }
      ],
      [
        { rank: 1, value: "Zorro" },
        { rank: 2, value: "Luffy" },
        { rank: 3, value: "Sanji" }
      ],
      [
        { rank: 1, value: "Luffy" },
        { rank: 2, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ]
    ];

    expect(getRanking(answers)).toMatchInlineSnapshot(`
Object {
  "luffy": Object {
    "sanji": 3,
    "zorro": 1,
  },
  "sanji": Object {
    "luffy": 0,
    "zorro": 0,
  },
  "zorro": Object {
    "luffy": 2,
    "sanji": 3,
  },
}
`);
  });
});

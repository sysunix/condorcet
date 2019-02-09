const { getRanking } = require("./condorcet-v3");

describe("The condorcet poll", () => {
  xit("should return condorcet's winner with one answer ", () => {
    const answers = [
      [
        { rank: 2, value: "Luffy" },
        { rank: 1, value: "Zorro" },
        { rank: 3, value: "Sanji" }
      ]
    ];

    expect(getRanking(answers)).toEqual([
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

  it("should return condorcet's winner with small piece of data ", () => {
    const answers = [
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

    expect(getRanking(answers)).toEqual([
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

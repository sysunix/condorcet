const condorcet = require("./condorcet");

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
    expect(condorcet.getRanking(answers)).toEqual([
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
    ]);
  });

  it("should return condorcet's winner", () => {
    /* const answers = [
      [
        {
          position: 1,
          value: "Les Nouvelles Aventures d'Aladin"
        },
        {
          position: 2,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 3,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 4,
          value: "Usual Suspects"
        },
        {
          position: 5,
          value: "Jurassic Park"
        },
        {
          position: 6,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        }
      ],
      [
        {
          position: 1,
          value: "Jurassic Park"
        },
        {
          position: 2,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 3,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 4,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 5,
          value: "Usual Suspects"
        },
        {
          position: 6,
          value: "Les Nouvelles Aventures d'Aladin"
        }
      ],
      [
        {
          position: 1,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 2,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 3,
          value: "Jurassic Park"
        },
        {
          position: 4,
          value: "Les Nouvelles Aventures d'Aladin"
        },
        {
          position: 5,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 6,
          value: "Usual Suspects"
        }
      ],
      [
        {
          position: 1,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 2,
          value: "Jurassic Park"
        },
        {
          position: 3,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 4,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 5,
          value: "Usual Suspects"
        },
        {
          position: 6,
          value: "Les Nouvelles Aventures d'Aladin"
        }
      ],
      [
        {
          position: 1,
          value: "Usual Suspects"
        },
        {
          position: 2,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 3,
          value: "Jurassic Park"
        },
        {
          position: 4,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 5,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 6,
          value: "Les Nouvelles Aventures d'Aladin"
        }
      ],
      [
        {
          position: 1,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 2,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 3,
          value: "Jurassic Park"
        },
        {
          position: 4,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 5,
          value: "Usual Suspects"
        },
        {
          position: 6,
          value: "Les Nouvelles Aventures d'Aladin"
        }
      ],
      [
        {
          position: 1,
          value: "Les Nouvelles Aventures d'Aladin"
        },
        {
          position: 2,
          value: "OSS 117 : Le Caire nid d'espions"
        },
        {
          position: 3,
          value: "Le Seigneur des anneaux : La Communauté de l'anneau"
        },
        {
          position: 4,
          value: "The Dark Knight : Le Chevalier noir"
        },
        {
          position: 5,
          value: "Usual Suspects"
        },
        {
          position: 6,
          value: "Jurassic Park"
        }
      ]
    ];*/
    // expect(condorcet.getRanking(answers)).toEqual([]);
  });
});

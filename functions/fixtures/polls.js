const uuid = require("uuid/v1");

module.exports = userId => [
  {
    answers: [
      { slug: "oui", value: "Oui" },
      { slug: "non", value: "Non" },
      { slug: "peut-etre", value: "Peut être" }
    ],
    description: "",
    isActive: true,
    name: "Es-tu d'accord",
    owner: userId,
    token: uuid(),
    users: [userId]
  }
];

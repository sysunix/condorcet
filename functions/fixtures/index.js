require("dotenv").config();

const pollsFixtures = require("./polls");
const answersFixtures = require("./answers");
const { db } = require("../config/firebase");

const { USER_ID: userId } = process.env;

const polls = pollsFixtures(userId);

polls.forEach(async poll => {
  const pollDocument = await db.collection("polls").add(poll);

  const answers = answersFixtures(pollDocument.id, userId);

  answers.forEach(answer => {
    db.collection("answers").add(answer);
  });
});

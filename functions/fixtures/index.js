require("dotenv").config();
const pollsFixtures = require("./polls");
const votesFixtures = require("./votes");

const { db } = require("../config/firebase");

const polls = pollsFixtures();

polls.forEach(async poll => {
  const pollDocument = await (await db.collection("polls").add(poll)).get();
  const pollData = pollDocument.data();

  const votes = votesFixtures(pollData.answers);

  votes.forEach(vote => {
    db.collection("polls")
      .doc(pollDocument.id)
      .collection("votes")
      .add({ vote });
  });
});

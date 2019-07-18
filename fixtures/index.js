require("dotenv").config();
const pollsFixtures = require("./polls");
const votesFixtures = require("./votes");

const { db, admin } = require("../functions/config/firebase");

const polls = pollsFixtures();

polls.forEach(async poll => {
  const pollDocument = await (await db.collection("polls").add(poll)).get();
  const pollData = pollDocument.data();

  const votes = votesFixtures(pollData.answers);

  votes.forEach(vote => {
    db.collection("polls")
      .doc(pollDocument.id)
      .collection("votes")
      .add({ vote, timestamp: admin.firestore.FieldValue.serverTimestamp() })
      .then(() => {
        console.log("add vote");

        return true;
      })
      .catch(() => {
        console.log("c'est la merde");
      });
  });
});

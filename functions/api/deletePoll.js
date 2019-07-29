const { db } = require("./config/firebase");

module.exports = ({ id }) => {
  if (
    db
      .collection("polls")
      .doc(id)
      .collection("votes")
      .get().empty === false
  ) {
    db.collection("polls")
      .doc(id)
      .collection("votes")
      .delete();
  }

  if (
    db
      .collection("polls")
      .doc(id)
      .collection("results")
      .get().empty === false
  ) {
    db.collection("polls")
      .doc(id)
      .collection("results")
      .delete();
  }

  db.collection("polls")
    .doc(id)
    .delete();
};

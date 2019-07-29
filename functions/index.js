const functions = require("firebase-functions");
const { db } = require("./config/firebase");
const condorcet = require("./utils/condorcet-v3");
const uninominal = require("./utils/uninominal");
const deletePoll = require("./api/deletePoll");

exports.deletePoll = functions.https.onCall(deletePoll);

exports.addUserToFirestoreAfterCreation = functions.auth
  .user()
  .onCreate(user => {
    db.collection("users")
      .doc(user.uid)
      .set({ id: user.uid, name: user.displayName, email: user.email });
  });

exports.resultOfThePoll = functions.firestore
  .document("polls/{pollId}")
  .onUpdate(({ after }) => {
    const pollId = after.id;
    const newValue = after.data();

    if (newValue.isActive === true) {
      return 200;
    }

    return db
      .collection("polls")
      .doc(pollId)
      .collection("votes")
      .get()
      .then(answersDocuments => {
        let results = [];
        answersDocuments.forEach(answersDocument => {
          results.push(answersDocument.data().vote);
        });

        const condorcetMatrix = condorcet.getMatrixOfTheDuels(results);
        const condorcetRanking = condorcet.getRanking(results);

        const uninominalRanking = uninominal.getFirstRoundRanking(
          results,
          newValue.answers.map(a => a.value)
        );

        db.collection("polls")
          .doc(pollId)
          .collection("results")
          .doc("condorcet")
          .set({
            ranking: condorcetRanking,
            matrix: condorcetMatrix
          });

        db.collection("polls")
          .doc(pollId)
          .collection("results")
          .doc("uninominal")
          .set({ ranking: uninominalRanking });

        return 200;
      })
      .catch(e => e);
  });

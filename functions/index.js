const functions = require("firebase-functions");
const { db } = require("./config/firebase");
const condorcet = require("./utils/condorcet");
const uninominal = require("./utils/uninominal");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

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
      .collection("answers")
      .where("pollId", "==", pollId)
      .get()
      .then(answersDocuments => {
        let results = [];
        answersDocuments.forEach(answersDocument => {
          results.push(answersDocument.data().answers);
        });

        const condorcetRanking = condorcet.getRanking(results);
        const uninominalRanking = uninominal.getFirstRoundRanking(
          results,
          newValue.answers
        );

        db.collection("results")
          .doc(pollId)
          .set({ condorcet: condorcetRanking, uninominal: uninominalRanking });

        return 200;
      })
      .catch(e => e);
  });

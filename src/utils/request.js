import firebase, { db } from "../firebase";

export const createPoll = async poll => {
  const pollWithTimestap = {
    ...poll,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  return db.collection("polls").add(pollWithTimestap);
};

export const createVote = async (vote, pollId, userId) => {
  const voteWithTimestap = {
    ...vote,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  return db
    .collection("polls")
    .doc(pollId)
    .collection("votes")
    .doc(userId)
    .set(voteWithTimestap);
};

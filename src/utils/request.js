import firebase, { db } from "../firebase";
import { VoteModel } from "../models/Vote";
import { PollModel } from "../models/Poll";
import { validate } from "indicative";

export const createPoll = async poll => {
  const pollWithTimestap = {
    ...poll,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  const validatedPoll = await validate(pollWithTimestap, PollModel);

  return db.collection("polls").add(validatedPoll);
};

export const createVote = async (vote, pollId, userId) => {
  const voteWithTimestap = {
    ...vote,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  const validatedVote = await validate(voteWithTimestap, VoteModel);

  return db
    .collection("polls")
    .doc(pollId)
    .collection("votes")
    .doc(userId)
    .set(validatedVote);
};

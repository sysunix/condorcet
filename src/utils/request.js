import { db } from "../firebase";
import VoteModel from "../models/Vote";
import PollModel from "../models/Poll";

export const createPoll = poll => {
  const Poll = new PollModel(poll);

  const { valid, errors } = Poll.validate();

  if (valid === false) throw errors;

  return db.collection("polls").add(Poll.toJSON());
};

export const createVote = (vote, pollId, userId) => {
  const Vote = new VoteModel(vote);

  const { valid, errors } = Vote.validate();

  if (valid === false) throw errors;

  return db
    .collection("polls")
    .doc(pollId)
    .collection("votes")
    .doc(userId)
    .set(Vote.toJSON());
};

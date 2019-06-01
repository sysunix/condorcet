import { createPoll, createVote } from "../request";
import { MOCK_POLL, MOCK_USER_ID, MOCK_POLL_ID } from "../test";
import { db } from "../../firebase";

jest.mock("../../firebase");

describe("utils/request", () => {
  it("should thorw an error on poll creation", () => {
    expect.assertions(1);
    try {
      createPoll({ answers: [1, 2], question: "what ?", owner: "mo" });
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "\\"users\\" is required",
    "path": "users",
  },
]
`);
    }
  });

  it("should create poll", () => {
    expect.assertions(1);
    createPoll(MOCK_POLL).then(() => {
      expect(db.collection).toBeCalled();
    });
  });

  it("should thorw an error on vote creation", () => {
    expect.assertions(1);
    try {
      createVote({});
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`
Array [
  Object {
    "message": "\\"vote\\" is required",
    "path": "vote",
  },
]
`);
    }
  });

  it("should create vote", () => {
    expect.assertions(1);
    createVote({ vote: [{}, {}] }, MOCK_POLL_ID, MOCK_USER_ID).then(() => {
      expect(db.collection).toBeCalled();
    });
  });
});

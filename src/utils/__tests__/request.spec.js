import { createPoll, createVote } from "../request";
import { MOCK_POLL, MOCK_USER_ID, MOCK_POLL_ID } from "../test";
import { db } from "../../firebase";

jest.mock("../../firebase");

describe("utils/request", () => {
  // it("should thorw an error on poll creation", async () => {
  //   expect.assertions(1);
  //   try {
  //     await createPoll(MOCK_POLL);
  //   } catch (error) {
  //     expect(error).toMatchInlineSnapshot(
  //       `[TypeError: Poll.errors.errorCount is not a function]`
  //     );
  //   }
  // });

  it("should create poll", async () => {
    expect.assertions(1);
    await createPoll(MOCK_POLL);
    expect(db.collection).toBeCalled();
  });

  it("should thorw an error on vote creation", async () => {
    // expect.assertions(1);
    try {
      await createVote({});
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`
Array [
  Object {
    "error": "required validation failed on vote",
    "field": "vote",
    "validation": "required",
  },
]
`);
    }
  });

  it("should create vote", async () => {
    expect.assertions(1);
    await createVote(
      { vote: [{ value: "foo", rank: 1 }, { value: "bar", rank: 2 }] },
      MOCK_POLL_ID,
      MOCK_USER_ID
    );
    expect(db.collection).toBeCalled();
  });
});

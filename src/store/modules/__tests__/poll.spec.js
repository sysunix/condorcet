import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import poll, { setPolls } from "../poll";
import { MOCK_POLL, MOCK_POLL_ID, MOCK_USER_ID } from "../../../utils/test";
// import { getDataFromQuerySnapshot } from "../../../utils/firebase";
import { RESET, SET_POLL, PUSH_POLL, REMOVE_POLL } from "../../types";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../../firebase");
jest.mock("../../../utils/firebase");

describe("store/modules/poll", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: { poll, user: { state: { id: MOCK_USER_ID } } }
    });

    store.commit(`poll/${RESET}`);
  });

  it("should set current poll", () => {
    store.commit("poll/SET_POLLS", [
      { id: MOCK_POLL_ID, ...MOCK_POLL },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL }
    ]);

    store.dispatch("poll/setPoll", MOCK_POLL_ID);

    expect(store.state.poll.current.id).toBe(MOCK_POLL_ID);
    expect(store.state.poll.current.owner).toBe(MOCK_USER_ID);
  });

  it("should set current poll", () => {
    store.dispatch("poll/setPoll", null);

    expect(store.state.poll.current).toBeNull();
  });

  it("should remove poll", () => {
    store.commit("poll/SET_POLLS", [
      { id: MOCK_POLL_ID, ...MOCK_POLL },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL }
    ]);
    expect(store.state.poll.all.length).toBe(2);
    store.commit(`poll/${REMOVE_POLL}`, `${MOCK_POLL_ID}-2`);

    expect(store.state.poll.all.length).toBe(1);
  });

  it("should set current poll", () => {
    store.commit(`poll/${SET_POLL}`, { id: MOCK_POLL_ID, ...MOCK_POLL });

    expect(store.state.poll.current.id).toBe(MOCK_POLL_ID);
  });

  it("should add new poll", () => {
    expect(store.state.poll.all.length).toBe(0);
    store.commit(`poll/${PUSH_POLL}`, { id: MOCK_POLL_ID, ...MOCK_POLL });

    expect(store.state.poll.all.length).toBe(1);
  });

  it("should remove poll from store", () => {
    store.commit("poll/SET_POLLS", [
      { id: MOCK_POLL_ID, ...MOCK_POLL },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL }
    ]);

    store.dispatch("poll/setPoll", MOCK_POLL_ID);

    store.dispatch("poll/removePoll", MOCK_POLL_ID);

    expect(store.state.poll.all).toMatchInlineSnapshot(`
Array [
  Object {
    "answers": Array [
      Object {
        "slug": "luffy",
        "value": "Luffy",
      },
      Object {
        "slug": "zorro",
        "value": "Zorro",
      },
      Object {
        "slug": "sanji",
        "value": "Sanji",
      },
    ],
    "description": "Qui repellendus est aliquam vel qui.",
    "id": "MOCK_POLL_ID-2",
    "isActive": true,
    "isOwner": false,
    "isPublic": true,
    "owner": "MOCK_USER_ID",
    "question": "Qui est le meilleur ?",
    "timestamp": Object {
      "nanoseconds": 154000000,
      "seconds": 1559325107,
    },
    "token": "MOCK_TOKEN",
    "users": Array [
      "MOCK_USER_ID",
    ],
  },
]
`);
  });

  it("should return public polls", () => {
    store.commit("poll/SET_POLLS", [
      {
        id: MOCK_POLL_ID,
        ...MOCK_POLL,
        isPublic: true,
        users: [],
        owner: "ANOTHER_USER_ID"
      },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL, isPublic: false }
    ]);

    expect(store.getters["poll/publicPolls"].length).toBe(1);
    expect(store.getters["poll/publicPolls"][0].id).toBe(MOCK_POLL_ID);
  });

  it("should return user polls", () => {
    store.commit("poll/SET_POLLS", [
      { id: MOCK_POLL_ID, ...MOCK_POLL, users: [MOCK_USER_ID] },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL, users: ["ANOTHER_USER_ID"] }
    ]);

    expect(store.getters["poll/userPolls"].length).toBe(1);
    expect(store.getters["poll/userPolls"][0].id).toBe(MOCK_POLL_ID);
  });

  describe("helper", () => {
    expect(
      setPolls([
        { id: 1, ...MOCK_POLL },
        { id: 1, ...MOCK_POLL }
      ])
    ).toEqual([{ id: 1, ...MOCK_POLL }]);
  });
});

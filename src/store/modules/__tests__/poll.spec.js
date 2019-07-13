import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import poll, { setPolls } from "../poll";
import { MOCK_POLL, MOCK_POLL_ID, MOCK_USER_ID } from "../../../utils/test";
import { RESET } from "../../types";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../../firebase");

describe("store/modules/poll", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { poll, user: { id: MOCK_USER_ID } } });

    store.commit(`poll/${RESET}`);
  });

  it("should set current poll", () => {
    store.commit("poll/SET_POLLS", [
      { id: MOCK_POLL_ID, ...MOCK_POLL },
      { id: `${MOCK_POLL_ID}-2`, ...MOCK_POLL }
    ]);

    store.dispatch("poll/setPoll", MOCK_POLL_ID);

    expect(store.state.poll.current).toMatchInlineSnapshot(`
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
  "id": "MOCK_POLL_ID",
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
}
`);
  });

  it("should set current poll", () => {
    store.commit(`poll/${RESET}`);
    store.dispatch("poll/setPoll", null);
    expect(store.state.poll.current).toBeNull();
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

  describe("helper", () => {
    expect(
      setPolls([{ id: 1, ...MOCK_POLL }, { id: 1, ...MOCK_POLL }])
    ).toEqual([{ id: 1, ...MOCK_POLL }]);
  });
});

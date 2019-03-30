import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import poll from "../poll";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/poll", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { poll } });
  });

  it("should set current poll", () => {
    store.commit("poll/FETCH_POLLS", [{ id: 1 }, { id: 2 }]);

    store.dispatch("poll/setPoll", 2);

    expect(store.state.poll.current).toMatchInlineSnapshot(`
Object {
  "id": 2,
}
`);
  });
});

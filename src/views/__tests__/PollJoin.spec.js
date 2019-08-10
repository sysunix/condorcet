import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PollJoin from "../PollJoin.vue";

import {
  MOCK_POLL_ID,
  MOCK_TOKEN,
  MOCK_USER_ID,
  getTranslation
} from "../../utils/test";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../firebase");

const $route = {
  params: { id: MOCK_POLL_ID },
  query: { token: MOCK_TOKEN }
};

describe("PollJoin.vue", () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: {
            userId: () => MOCK_USER_ID
          }
        }
      }
    });

    wrapper = shallowMount(PollJoin, {
      localVue,
      store,
      mocks: { $route, $t: getTranslation }
    });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

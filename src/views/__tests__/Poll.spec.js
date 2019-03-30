import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Poll from "../Poll.vue";

const $route = {
  params: "adz93dze823j"
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Poll.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      state: { user: { id: "azfj334N3FJ2" } },
      modules: {
        poll: {
          namespaced: true,
          actions: { fetchPoll: jest.fn(() => ({ users: [], answers: [] })) }
        },
        app: { namespaced: true, actions: { addNotification: jest.fn() } }
      }
    });
  });

  it("should render", () => {
    const wrapper = shallowMount(Poll, {
      localVue,
      store,
      mocks: {
        $route,
        $router: { push: jest.fn() }
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});

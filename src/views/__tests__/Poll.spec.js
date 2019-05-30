import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Poll from "../Poll.vue";

const $route = {
  params: "adz93dze823j"
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Poll.vue", () => {
  let wrapper;
  let appActions;

  beforeEach(() => {
    jest.clearAllMocks();
    appActions = { addNotification: jest.fn() };

    const store = new Vuex.Store({
      state: {
        user: { id: "azfj334N3FJ2" }
      },
      modules: {
        poll: {
          namespaced: true,
          actions: { fetchPoll: jest.fn(() => ({ users: [], answers: [] })) }
        },
        app: { namespaced: true, actions: appActions }
      }
    });

    wrapper = shallowMount(Poll, {
      localVue,
      store,
      mocks: {
        $route,
        $router: { push: jest.fn() }
      }
    });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("click to inform user with a notification", () => {
    const voteButton = wrapper.find("button");

    voteButton.trigger("click");

    expect(appActions.addNotification).toBeCalled();
  });
});

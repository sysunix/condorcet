import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Poll from "../Poll.vue";
import { MOCK_POLL_ID, MOCK_USER_ID } from "../../utils/test";

jest.mock("../../firebase");

const $route = {
  params: { id: MOCK_POLL_ID }
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
        user: { id: MOCK_USER_ID }
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

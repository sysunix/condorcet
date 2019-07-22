import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import shuffle from "shuffle-array";
import { createVote } from "../../utils/request";

import Poll from "../Poll.vue";
import { MOCK_POLL_ID, MOCK_USER_ID, MOCK_ANSWERS, getTranslation } from "../../utils/test";

jest.mock("shuffle-array");
jest.mock("../../firebase");
jest.mock("../../utils/request");

shuffle.mockReturnValue(MOCK_ANSWERS);

const $route = {
  params: { id: MOCK_POLL_ID }
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Poll.vue", () => {
  let wrapper;
  let appActions;
  let pollActions;

  beforeEach(() => {
    jest.clearAllMocks();
    appActions = { addNotification: jest.fn() };
    pollActions = { setPoll: jest.fn() };

    const store = new Vuex.Store({
      state: {
        user: { id: MOCK_USER_ID }
      },
      modules: {
        poll: {
          namespaced: true,
          state: {
            current: { answers: MOCK_ANSWERS, users: [MOCK_USER_ID] }
          },
          actions: pollActions
        },
        app: { namespaced: true, actions: appActions }
      }
    });

    wrapper = shallowMount(Poll, {
      localVue,
      store,
      mocks: {
        $t: getTranslation,
        $route,
        $router: { push: jest.fn() }
      }
    });
  });

  it("should render", () => {
    expect(pollActions.setPoll).toBeCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("click to inform user with a notification", () => {
    const voteButton = wrapper.find("button");

    voteButton.trigger("click");

    expect(createVote).toBeCalled();
  });
});

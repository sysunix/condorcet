import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import { db } from "../../firebase";
import { MOCK_USER_ID, MOCK_POLL_ID } from "../../utils/test";
import PollsList from "../PollsList.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../firebase");

describe("PollsList.vue", () => {
  let wrapper;
  let appActions;
  let pollActions;
  let pollGetters;

  beforeEach(() => {
    jest.clearAllMocks();

    pollActions = {
      listenPolls: jest.fn(),
      leavePoll: jest.fn(),
      removePoll: jest.fn()
    };

    appActions = {
      addNotification: jest.fn()
    };

    pollGetters = {
      userPolls: jest.fn(() => [])
    };

    const store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          actions: appActions
        },
        user: {
          namespaced: true,
          getters: {
            userId: () => MOCK_USER_ID
          }
        },
        poll: {
          namespaced: true,
          actions: pollActions,
          getters: pollGetters
        }
      }
    });

    wrapper = shallowMount(PollsList, {
      store,
      stubs: ["router-link"],
      localVue
    });
  });

  it("should render with message saying there is no polls", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with one poll", () => {
    pollGetters.userPolls;
    expect(wrapper).toMatchSnapshot();
  });

  it("should leave poll", () => {
    window.confirm = jest.fn(() => true);
    wrapper.vm.leavePoll(MOCK_POLL_ID);
    expect(db.collection).toBeCalledWith("polls");
    expect(db.collection("polls").doc).toBeCalledWith(MOCK_POLL_ID);
  });
  it("should not leave poll", () => {
    window.confirm = jest.fn(() => false);
    wrapper.vm.leavePoll(MOCK_POLL_ID);
    expect(db.collection).not.toBeCalled();
    expect(db.collection("polls").doc).not.toBeCalled();
  });
});

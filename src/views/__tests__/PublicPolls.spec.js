import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PublicPolls from "../PublicPolls.vue";
import { MOCK_POLL, MOCK_POLL_ID, MOCK_USER_ID } from "../../utils/test";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../firebase");

const mocks = {
  $router: { push: jest.fn() }
};

describe("PublicPolls.vue", () => {
  let wrapper;

  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: {
            userId: () => MOCK_USER_ID
          }
        },
        poll: {
          namespaced: true,
          actions: {
            fetchPublicPolls: () => {}
          },
          getters: {
            publicPolls: () => [{ ...MOCK_POLL, id: MOCK_POLL_ID }]
          }
        }
      }
    });

    wrapper = shallowMount(PublicPolls, { localVue, store, mocks });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should join poll", () => {
    wrapper.vm.joinPoll(MOCK_POLL_ID);
    expect(wrapper.vm.$router.push).toBeCalled();
  });
});

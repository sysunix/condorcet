import { shallowMount, createLocalVue } from "@vue/test-utils";
import PollCreation from "../PollCreation.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("PollCreation.vue", () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = { addNotification: jest.fn() };
    store = new Vuex.Store({
      modules: {
        app: { namespaced: true, actions }
      }
    });
  });
  it("should render", () => {
    const wrapper = shallowMount(PollCreation);

    expect(wrapper).toMatchSnapshot();
  });

  it("should not create poll and notify user that there is an error", () => {
    const wrapper = shallowMount(PollCreation, { localVue, store });
    wrapper.vm.createPoll();

    expect(actions.addNotification).toBeCalled();
  });
});

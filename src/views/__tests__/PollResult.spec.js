import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

const $route = {
  params: "adz93dze823j"
};

describe("PollResult.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollResult, {
      store,
      mocks: {
        $route
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount } from "@vue/test-utils";
import Poll from "../Poll.vue";

const $route = {
  params: "adz93dze823j"
};

describe("Poll.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(Poll, {
      mocks: {
        $route
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});

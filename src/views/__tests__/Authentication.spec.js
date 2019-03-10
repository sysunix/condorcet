import { shallowMount } from "@vue/test-utils";
import Authentication from "../Authentication.vue";

describe("Authentication.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(Authentication);

    expect(wrapper).toMatchSnapshot();
  });
});

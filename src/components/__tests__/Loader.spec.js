import { shallowMount } from "@vue/test-utils";
import Loader from "../Loader.vue";

describe("Loader.vue", () => {
  it("should render when there is no notifications", () => {
    const wrapper = shallowMount(Loader);
    expect(wrapper).toMatchSnapshot();
  });
});

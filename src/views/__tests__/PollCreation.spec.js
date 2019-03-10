import { shallowMount } from "@vue/test-utils";
import PollCreation from "../PollCreation.vue";

describe("PollCreation.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollCreation);

    expect(wrapper).toMatchSnapshot();
  });
});

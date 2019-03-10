import { shallowMount } from "@vue/test-utils";
import PollJoin from "../PollJoin.vue";

describe("PollJoin.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollJoin);

    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount } from "@vue/test-utils";
import PollsList from "../PollsList.vue";
import store from "../../store/index";

describe("PollsList.vue", () => {
  it("should render", () => {
    const wrapper = shallowMount(PollsList, { store, stubs: ["router-link"] });

    expect(wrapper).toMatchSnapshot();
  });
});

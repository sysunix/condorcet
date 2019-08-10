import { shallowMount } from "@vue/test-utils";
import Empty from "../Empty.vue";

describe("Empty.vue", () => {
  it("should render if condition is truthy", () => {
    const wrapper = shallowMount(Empty, {
      propsData: {
        condition: true,
        to: "/polls/new",
        text: "Smaug",
        actionText: "Create Smaug"
      },
      stubs: ["router-link"]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render if condition is falsy", () => {
    const wrapper = shallowMount(Empty, {
      propsData: {
        condition: false,
        to: "/polls/new",
        text: "Smaug",
        actionText: "Create Smaug"
      },
      stubs: ["router-link"]
    });
    expect(wrapper).toMatchSnapshot();
  });
});

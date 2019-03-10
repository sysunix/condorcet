import { shallowMount } from "@vue/test-utils";
import Notifications from "../Notifications.vue";

describe("Notifications.vue", () => {
  it("should render when there is no notifications", () => {
    const wrapper = shallowMount(Notifications, {
      propsData: { notifications: [] }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there is one notification", () => {
    const wrapper = shallowMount(Notifications, {
      propsData: {
        notifications: [{ status: "error", text: "Il y a eu un problème..." }]
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there is more than one notification", () => {
    const wrapper = shallowMount(Notifications, {
      propsData: {
        notifications: [
          { status: "error", text: "Il y a eu un problème..." },
          { status: "success", text: "Yeaaaaah !!!" }
        ]
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallowMount } from "@vue/test-utils";
import Card from "../Card.vue";
import { getTranslation } from "../../utils/test";
import { MOCK_POLL, MOCK_USER_ID, MOCK_POLL_ID } from "../../utils/test";

describe("Card.vue", () => {
  it("should render when there is no notifications", () => {
    const wrapper = shallowMount(Card, {
      propsData: { ...MOCK_POLL, userId: MOCK_USER_ID, id: MOCK_POLL_ID },
      stubs: ["router-link"],
      mocks: {
        $tc: jest.fn(),
        $t: getTranslation
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});

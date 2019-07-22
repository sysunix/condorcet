import { shallowMount } from "@vue/test-utils";
import PollResult from "../PollResult.vue";
import store from "../../store/index";

import { MOCK_POLL_ID, getTranslation } from "../../utils/test";

jest.mock("../../firebase");

const $route = {
  params: { id: MOCK_POLL_ID }
};

describe("PollResult.vue", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(PollResult, {
      store,
      mocks: {
        $t: getTranslation,
        $route
      }
    });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  xit("should set data", () => {
    expect(wrapper.vm.uninominal).toEqual([
      {
        rank: 1,
        value: "luffy"
      }
    ]);
  });
});

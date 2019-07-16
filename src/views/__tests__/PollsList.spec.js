import { shallowMount } from "@vue/test-utils";
import PollsList from "../PollsList.vue";
import store from "../../store/index";

jest.mock("../../firebase");

describe("PollsList.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PollsList, { store, stubs: ["router-link"] });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

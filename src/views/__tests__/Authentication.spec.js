import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Authentication from "../Authentication.vue";
import { signIn } from "../../utils/authentication";
import { getTranslation } from "../../utils/test";

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock("../../utils/authentication");

describe("Authentication.vue", () => {
  let wrapper;
  let appActions;

  beforeEach(() => {
    jest.clearAllMocks();
    appActions = { addNotification: jest.fn() };

    const store = new Vuex.Store({
      modules: {
        app: { namespaced: true, actions: appActions },
        user: {
          namespaced: true
        }
      }
    });

    wrapper = shallowMount(Authentication, {
      localVue,
      store,
      mocks: { $t: getTranslation }
    });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should signout user", () => {
    const signInButton = wrapper.find("button");
    signInButton.trigger("click");

    expect(signIn).toBeCalled();
  });
});

import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Navbar from "../Navbar.vue";
import { signOut } from "../../utils/authentication";
import config from "../../config";

jest.mock("../../utils/authentication");

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Navbar.vue", () => {
  let wrapper;
  let appActions;
  let userActions;

  beforeEach(() => {
    jest.clearAllMocks();
    appActions = { addNotification: jest.fn() };
    userActions = { clearUser: jest.fn() };

    const store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          actions: appActions,
          state: {
            featureFlipping: config.featureFlipping
          }
        },
        user: { namespaced: true, actions: userActions }
      }
    });

    wrapper = shallowMount(Navbar, { localVue, store, stubs: ["router-link"] });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should signout user", async () => {
    const signOutLink = wrapper.find("a");

    signOutLink.trigger("click");

    await expect(signOut).toBeCalled();
    expect(userActions.clearUser).toBeCalled();
  });
});

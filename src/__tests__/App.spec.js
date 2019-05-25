import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import App from "../App";

const localVue = createLocalVue();
localVue.use(Vuex);

const $route = {
  path: "/polls",
  params: "adz93dze823j"
};

describe("App.vue", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters: {
            isAuth: () => true
          }
        },
        app: {
          namespaced: true,
          state: { notifications: [] }
        }
      }
    });
  });
  it("should render", () => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
      mocks: {
        $route
      },
      stubs: ["router-link", "router-view"]
    });

    expect(wrapper).toMatchSnapshot();
  });
});

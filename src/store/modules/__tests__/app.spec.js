import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import app from "../app";

jest.mock("uuid/v1", () => jest.fn().mockReturnValue("uniq-id"));

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/app", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { app } });
  });

  it("should initialize app", () => {
    expect(store.state.app.initialized).toBeFalsy();
    store.commit("app/INITIALIZE");
    expect(store.state.app.initialized).toBeTruthy();
  });

  it("should toggle menu", () => {
    expect(store.state.app.isMenuOpen).toBeFalsy();
    store.dispatch("app/toggleMenu");
    expect(store.state.app.isMenuOpen).toBeTruthy();
  });

  it("should add notification", () => {
    expect(store.state.app.notifications).toEqual([]);
    store.dispatch("app/addNotification", {
      type: "info",
      message: "bonsoir paris yeeeeah"
    });
    expect(store.state.app.notifications).toEqual([
      {
        id: "uniq-id",
        type: "info",
        message: "bonsoir paris yeeeeah"
      }
    ]);
  });
});

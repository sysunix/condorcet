import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import app from "../app";

jest.useFakeTimers();

jest.mock("uuid/v1", () => jest.fn().mockReturnValue("uniq-id"));

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/app", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { app } });
    store.commit("app/RESET");
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

  it("should remove notification after certain amount of time", () => {
    store.dispatch("app/addNotification", {
      type: "info",
      message: "et à paris, on faisait, ta da di da dadam"
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  it("should remove notification from the store", () => {
    store.dispatch("app/addNotification", {
      type: "info",
      message: "et à paris, on faisait, ta da di da dadam"
    });

    store.commit("app/REMOVE_NOTIFICATION", "uniq-id");

    expect(store.state.app.notifications).toEqual([]);
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

import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import app from "../app";
import { MOCK_POLL_ID, MOCK_TOKEN } from "../../../utils/test";
import config from "../../../config";

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
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      config.notificationTimeout
    );

    jest.advanceTimersByTime(config.notificationTimeout);

    expect(store.state.app.notifications.length).toBe(0);
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

  it("should set redirection and clear it", () => {
    expect(store.state.app.redirection).toBeNull();
    store.commit("app/SET_REDIRECTION", {
      name: "poll_join",
      params: { id: MOCK_POLL_ID },
      query: { token: MOCK_TOKEN }
    });
    expect(store.state.app.redirection).toMatchInlineSnapshot(`
Object {
  "name": "poll_join",
  "params": Object {
    "id": "MOCK_POLL_ID",
  },
  "query": Object {
    "token": "MOCK_TOKEN",
  },
}
`);

    store.commit("app/CLEAR_REDIRECTION");
    expect(store.state.app.redirection).toBeNull();
  });
});

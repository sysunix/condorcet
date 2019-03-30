import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import user from "../user";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store/modules/user", () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { user } });
    store.dispatch("user/clearUser");
  });

  it("should set user and clear it", () => {
    expect(store.state.user).toMatchInlineSnapshot(`
Object {
  "email": "",
  "id": "",
  "name": "",
  "photoUrl": "",
  "refreshToken": "",
}
`);

    store.dispatch("user/setUser", {
      displayName: "Jean Smaug",
      email: "jean@smaug.fr",
      uid: "fez88fzE82HFf",
      photoURL: "http://mapp.fr",
      refreshToken: "aziv8F28fJ329"
    });

    expect(store.state.user).toMatchInlineSnapshot(`
Object {
  "email": "jean@smaug.fr",
  "id": "fez88fzE82HFf",
  "name": "Jean Smaug",
  "photoUrl": "http://mapp.fr",
  "refreshToken": "aziv8F28fJ329",
}
`);

    store.dispatch("user/clearUser");

    expect(store.state.user).toMatchInlineSnapshot(`
Object {
  "email": "",
  "id": "",
  "name": "",
  "photoUrl": "",
  "refreshToken": "",
}
`);
  });

  it("should return userId", () => {
    store.dispatch("user/setUser", {
      displayName: "Jean Smaug",
      email: "jean@smaug.fr",
      uid: "fez88fzE82HFf",
      photoURL: "http://mapp.fr",
      refreshToken: "aziv8F28fJ329"
    });

    expect(store.getters["user/userId"]).toMatchInlineSnapshot(
      `"fez88fzE82HFf"`
    );
  });

  it("should determine if user is auth", () => {
    expect(store.getters["user/isAuth"]).toMatchInlineSnapshot(`false`);

    store.dispatch("user/setUser", {
      displayName: "Jean Smaug",
      email: "jean@smaug.fr",
      uid: "fez88fzE82HFf",
      photoURL: "http://mapp.fr",
      refreshToken: "aziv8F28fJ329"
    });

    expect(store.getters["user/isAuth"]).toMatchInlineSnapshot(`true`);
  });
});

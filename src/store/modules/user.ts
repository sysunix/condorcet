import { SET_USER, CLEAR_USER } from "../types";

export default {
  namespaced: true,
  state: {
    name: "",
    email: "",
    id: "",
    photoUrl: "",
    refreshToken: ""
  },
  getters: {
    userId: (state: any) => {
      return state.id;
    },
    isAuth: (state: any) => {
      return state.id !== "";
    }
  },
  mutations: {
    [SET_USER](state: any, { name, email, id, photoUrl, refreshToken }: any) {
      state.name = name;
      state.email = email;
      state.id = id;
      state.photoUrl = photoUrl;
      state.refreshToken = refreshToken;
    },
    [CLEAR_USER](state: any) {
      state.name = "";
      state.email = "";
      state.id = "";
      state.photoUrl = "";
      state.refreshToken = "";
    }
  },
  actions: {
    setUser(
      { commit }: any,
      { displayName, email, uid, photoURL, refreshToken }: any
    ) {
      commit(SET_USER, {
        name: displayName,
        email,
        id: uid,
        photoUrl: photoURL,
        refreshToken
      });
    },
    clearUser({ commit }: any) {
      commit(CLEAR_USER);
    }
  }
};

import { SET_USER, CLEAR_USER } from "../../types";

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
    userId: state => {
      return state.id;
    },
    isAuth: state => {
      return state.id !== "";
    }
  },
  mutations: {
    [SET_USER](state, { name, email, id, photoUrl, refreshToken }) {
      state.name = name;
      state.email = email;
      state.id = id;
      state.photoUrl = photoUrl;
      state.refreshToken = refreshToken;
    },
    [CLEAR_USER](state) {
      state.name = "";
      state.email = "";
      state.id = "";
      state.photoUrl = "";
      state.refreshToken = "";
    }
  },
  actions: {
    setUser({ commit }, { displayName, email, uid, photoURL, refreshToken }) {
      commit(SET_USER, {
        name: displayName,
        email,
        id: uid,
        photoUrl: photoURL,
        refreshToken
      });
    },
    clearUser({ commit }) {
      commit(CLEAR_USER);
    }
  }
};

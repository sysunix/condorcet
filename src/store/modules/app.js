import uuid from "uuid/v1";
import {
  ADD_NOTIFCATION,
  REMOVE_NOTIFICATION,
  INITIALIZE,
  TOGGLE_MENU,
  RESET,
  SET_REDIRECTION,
  CLEAR_REDIRECTION
} from "../types";
import config from "../../config";

export default {
  namespaced: true,
  state: {
    initialized: false,
    notifications: [],
    isMenuOpen: false,
    featureFlipping: config.featureFlipping,
    redirection: null
  },
  mutations: {
    [RESET](state) {
      state.initialized = false;
      state.notifications = [];
      state.isMenuOpen = false;
      state.featureFlipping = config.featureFlipping;
    },
    [INITIALIZE](state) {
      state.initialized = true;
    },
    [ADD_NOTIFCATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [REMOVE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== id
      );
    },
    [TOGGLE_MENU](state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    [SET_REDIRECTION](state, redirection) {
      state.redirection = redirection;
    },
    [CLEAR_REDIRECTION](state) {
      state.redirection = null;
    }
  },
  actions: {
    addNotification({ commit, dispatch }, notification) {
      const id = uuid();
      commit(ADD_NOTIFCATION, { ...notification, id });
      dispatch("removeNotification", id);
    },
    removeNotification({ commit }, id) {
      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, id);
      }, config.notificationTimeout);
    },
    toggleMenu({ commit }) {
      commit(TOGGLE_MENU);
    }
  }
};

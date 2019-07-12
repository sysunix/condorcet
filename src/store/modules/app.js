import uuid from "uuid/v1";
import {
  ADD_NOTIFCATION,
  REMOVE_NOTIFCATION,
  INITIALIZE,
  TOGGLE_MENU
} from "../types";
import config from "../../config";

export default {
  namespaced: true,
  state: {
    initialized: false,
    notifications: [],
    isMenuOpen: false,
    featureFlipping: config.featureFlipping
  },
  mutations: {
    [INITIALIZE](state) {
      state.initialized = true;
    },
    [ADD_NOTIFCATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [REMOVE_NOTIFCATION](state, id) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== id
      );
    },
    [TOGGLE_MENU](state) {
      state.isMenuOpen = !state.isMenuOpen;
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
        commit(REMOVE_NOTIFCATION, id);
      }, config.notificationTimeout);
    },
    toggleMenu({ commit }) {
      commit(TOGGLE_MENU);
    }
  }
};

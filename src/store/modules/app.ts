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
    [RESET](state: any) {
      state.initialized = false;
      state.notifications = [];
      state.isMenuOpen = false;
      state.featureFlipping = config.featureFlipping;
    },
    [INITIALIZE](state: any) {
      state.initialized = true;
    },
    [ADD_NOTIFCATION](state: any, notification: any) {
      state.notifications = [...state.notifications, notification];
    },
    [REMOVE_NOTIFICATION](state: any, id: string) {
      state.notifications = state.notifications.filter(
        (notification: any) => notification.id !== id
      );
    },
    [TOGGLE_MENU](state: any) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    [SET_REDIRECTION](state: any, redirection: any) {
      state.redirection = redirection;
    },
    [CLEAR_REDIRECTION](state: any) {
      state.redirection = null;
    }
  },
  actions: {
    addNotification({ commit, dispatch }: any, notification: any) {
      const id = uuid();
      commit(ADD_NOTIFCATION, { ...notification, id });
      dispatch("removeNotification", id);
    },
    removeNotification({ commit }: any, id: string) {
      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, id);
      }, config.notificationTimeout);
    },
    toggleMenu({ commit }: any) {
      commit(TOGGLE_MENU);
    }
  }
};

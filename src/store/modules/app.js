import uuid from "uuid/v1";
import { ADD_NOTIFCATION, REMOVE_NOTIFCATION, INITIALIZE } from "@/types";

export default {
  namespaced: true,
  state: {
    theme: "light",
    initialized: false,
    notifications: []
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
      }, 3000);
    }
  }
};

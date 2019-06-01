import { SET_POLLS, SET_POLL } from "../../types";
import { db } from "../../firebase";
import { getDataFromQuerySnapshot } from "../../utils/firebase";

export default {
  namespaced: true,
  state: {
    all: [],
    current: {}
  },
  mutations: {
    [SET_POLLS](state, polls) {
      state.all = polls;
    },
    [SET_POLL](state, poll) {
      state.current = poll;
    }
  },
  actions: {
    listenPolls({ commit }, userId) {
      db.collection("polls")
        .where("users", "array-contains", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot(querySnapshot => {
          const polls = getDataFromQuerySnapshot(querySnapshot);
          const enhancedPolls = polls.map(poll => ({
            ...poll,
            isOwner: userId === poll.owner
          }));

          commit(SET_POLLS, enhancedPolls);
        });
    },
    setPoll({ commit, state }, pollId) {
      const poll = state.all.find(poll => poll.id === pollId);
      commit(SET_POLL, poll);
    }
  }
};

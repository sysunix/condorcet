import { FETCH_POLLS, SET_POLL } from "@/types";
import { db } from "../../firebase";

export default {
  namespaced: true,
  state: {
    all: [],
    current: {}
  },
  getters: {
    allPolls: state => {
      return state.all;
    }
  },
  mutations: {
    [FETCH_POLLS](state, polls) {
      state.all = polls;
    },
    [SET_POLL](state, poll) {
      state.current = poll;
    }
  },
  actions: {
    fetchPolls({ commit }, userId) {
      db.collection("polls")
        .where("users", "array-contains", userId)
        .onSnapshot(polls => {
          let data = [];

          polls.forEach(poll => {
            const { is_active: isActive, ...pollData } = poll.data();
            data.push({
              id: poll.id,
              isActive,
              isOwner: userId === pollData.owner,
              ...pollData
            });
          });

          commit(FETCH_POLLS, data);
        });
    },
    fetchPoll({ commit }, pollId) {
      return db
        .collection("polls")
        .doc(pollId)
        .get()
        .then(snapshot => {
          const poll = { id: snapshot.id, ...snapshot.data() };
          commit(SET_POLL, poll);
          return poll;
        });
    },
    setPoll({ commit, state }, pollId) {
      const poll = state.all.find(poll => poll.id === pollId);
      commit(SET_POLL, poll);
    }
  }
};

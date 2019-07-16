import { SET_POLLS, SET_POLL, PUSH_POLL, RESET, REMOVE_POLL } from "../types";
import { db } from "../../firebase";
import {
  getDataFromQuerySnapshot,
  convertDocumentSnapshotToJson
} from "../../utils/firebase";

export const setPolls = polls => {
  return [...new Set(polls.map(poll => poll.id))].map(pollId => {
    return polls.find(poll => poll.id === pollId);
  });
};

export const initialState = {
  all: [],
  current: null
};

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    [RESET](state) {
      state.all = [];
      state.current = null;
    },
    [SET_POLLS](state, polls) {
      state.all = setPolls([...polls, ...state.all]);
    },
    [PUSH_POLL](state, poll) {
      state.all = setPolls([poll, ...state.all]);
    },
    [SET_POLL](state, poll) {
      state.current = poll;
    },
    [REMOVE_POLL](state, pollId) {
      state.all = state.all.filter(poll => poll.id !== pollId);
    }
  },
  getters: {
    publicPolls: (state, _, rootState) => {
      return state.all.filter(
        poll =>
          poll.isPublic === true &&
          poll.users.includes(rootState.user.id) === false
      );
    },
    userPolls: (state, _, rootState) => {
      return state.all.filter(poll => poll.users.includes(rootState.user.id));
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
    async fetchPoll({ commit, rootState }, pollId) {
      try {
        const poll = convertDocumentSnapshotToJson(
          await db
            .collection("polls")
            .doc(pollId)
            .get()
        );

        commit(PUSH_POLL, {
          ...poll,
          isOwner: rootState.user.id === poll.owner
        });

        return poll;
      } catch (error) {
        return null;
      }
    },
    async fetchPublicPolls({ commit }) {
      const polls = getDataFromQuerySnapshot(
        await db
          .collection("polls")
          .where("isPublic", "==", true)
          .get()
      );

      commit(SET_POLLS, polls);
    },
    async setPoll({ commit, state, dispatch }, pollId) {
      let poll = state.all.find(poll => poll.id === pollId);

      if (!poll) {
        const poll = await dispatch("fetchPoll", pollId);

        commit(SET_POLL, poll);

        return;
      }

      commit(SET_POLL, poll);
    },
    removePoll({ commit }, pollId) {
      commit(REMOVE_POLL, pollId);
    }
  }
};

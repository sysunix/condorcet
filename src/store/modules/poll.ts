import { SET_POLLS, SET_POLL, PUSH_POLL, RESET, REMOVE_POLL } from "../types";
import { db } from "../../firebase";
import {
  getDataFromQuerySnapshot,
  convertDocumentSnapshotToJson
} from "../../utils/firebase";

export const setPolls = (polls: any) => {
  const uniqPolls: any = new Set(polls.map((poll: any) => poll.id));
  return [...uniqPolls].map(pollId => {
    return polls.find((poll: any) => poll.id === pollId);
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
    [RESET](state: any) {
      state.all = [];
      state.current = null;
    },
    [SET_POLLS](state: any, polls: any) {
      state.all = setPolls([...polls, ...state.all]);
    },
    [PUSH_POLL](state: any, poll: any) {
      state.all = setPolls([poll, ...state.all]);
    },
    [SET_POLL](state: any, poll: any) {
      state.current = poll;
    },
    [REMOVE_POLL](state: any, pollId: any) {
      state.all = state.all.filter((poll: any) => poll.id !== pollId);
    }
  },
  getters: {
    publicPolls: (state: any, _: any, rootState: any) => {
      return state.all.filter(
        (poll: any) =>
          poll.isPublic === true &&
          poll.users.includes(rootState.user.id) === false
      );
    },
    userPolls: (state: any, _: any, rootState: any) => {
      return state.all.filter((poll: any) =>
        poll.users.includes(rootState.user.id)
      );
    }
  },
  actions: {
    listenPolls({ commit }: any, userId: string) {
      db.collection("polls")
        .where("users", "array-contains", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot: any) => {
          const polls = getDataFromQuerySnapshot(querySnapshot);
          const enhancedPolls = polls.map((poll: any) => ({
            ...poll,
            isOwner: userId === poll.owner
          }));

          commit(SET_POLLS, enhancedPolls);
        });
    },
    async fetchPoll({ commit, rootState }: any, pollId: string) {
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
    async fetchPublicPolls({ commit }: any) {
      const polls = getDataFromQuerySnapshot(
        await db
          .collection("polls")
          .where("isPublic", "==", true)
          .get()
      );

      commit(SET_POLLS, polls);
    },
    async setPoll({ commit, state, dispatch }: any, pollId: string) {
      let poll = state.all.find((poll: any) => poll.id === pollId);

      if (!poll) {
        const poll = await dispatch("fetchPoll", pollId);

        commit(SET_POLL, poll);

        return;
      }

      commit(SET_POLL, poll);
    },
    removePoll({ commit }: any, pollId: string) {
      commit(REMOVE_POLL, pollId);
    }
  }
};

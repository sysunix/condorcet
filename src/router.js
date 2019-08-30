import Vue from "vue";
import Router from "vue-router";

import store from "./store";
import initializationMiddleware from "./utils/initialization";

import Authentication from "./views/Authentication.vue";
import PollsList from "./views/PollsList.vue";
import Poll from "./views/Poll.vue";
import PollResult from "./views/PollResult.vue";
import PollJoin from "./views/PollJoin.vue";
import PollCreation from "./views/PollCreation.vue";
import PublicPolls from "./views/PublicPolls.vue";
import PrivacyPolicy from "./views/PrivacyPolicy";

import { SET_REDIRECTION, CLEAR_REDIRECTION } from "./store/types";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/authentication",
      name: "authentication",
      component: Authentication,
      meta: {
        visitor: true
      }
    },
    {
      path: "/polls",
      name: "polls_list",
      component: PollsList,
      meta: {
        auth: true
      }
    },
    {
      path: "/polls/public",
      name: "polls_public",
      component: PublicPolls,
      meta: {
        auth: true
      }
    },
    {
      path: "/polls/new",
      name: "poll_create",
      component: PollCreation,
      meta: {
        auth: true
      }
    },
    {
      path: "/polls/:id",
      name: "poll_show",
      component: Poll,
      meta: {
        auth: true
      }
    },
    {
      path: "/polls/:id/result",
      name: "poll_result",
      component: PollResult,
      meta: {
        auth: true
      }
    },
    {
      path: "/polls/:id/join",
      name: "poll_join",
      component: PollJoin,
      meta: {
        auth: true
      }
    },
    {
      path: "/privacy-policy",
      name: "privacy_policy",
      component: PrivacyPolicy,
      meta: {
        visitor: true,
        auth: true
      }
    }
  ]
});

export const beforeEach = (to, from, next) => {
  const { meta, name, params, query } = to;
  const userId = store.state.user.id;

  initializationMiddleware(store, ({ state }) => {
    switch (state) {
      case "just_logged":
        if (store.state.app.redirection) {
          next(store.state.app.redirection);
          store.commit(`app/${CLEAR_REDIRECTION}`);

          return;
        }

        if (name === "authentication" || name === null) {
          next({
            name: "polls_list"
          });

          return;
        }

        next();
        return;
      case "no_user":
        if (name === "poll_join") {
          store.commit(`app/${SET_REDIRECTION}`, { name, params, query });
        }

        next({
          name: "authentication"
        });
        return;
      default:
        if (meta.auth && userId === "") {
          next({
            name: "authentication"
          });

          return;
        }

        next();
    }
  });
};

router.beforeEach(beforeEach);

export default router;

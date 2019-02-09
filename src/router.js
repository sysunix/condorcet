import Vue from "vue";
import Router from "vue-router";

import store from "./store";
import initializationMiddleware from "./utils/initialization";

import Authentication from "./components/Authentication.vue";
import Polls from "./components/Polls.vue";
import Poll from "./components/Poll.vue";
import PollResult from "./components/PollResult.vue";
import PollJoin from "./components/PollJoin.vue";
import PollCreation from "./components/PollCreation.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "authentication",
      component: Authentication,
      meta: {
        visitor: true
      }
    },
    {
      path: "/polls",
      name: "polls",
      component: Polls,
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { meta, name } = to;
  const userId = store.state.user.id;

  initializationMiddleware(store, ({ state }) => {
    switch (state) {
      case "just_logged":
        if (name === "authentication") {
          next({
            name: "polls"
          });

          return;
        }

        next();
        return;
      case "no_user":
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
});

export default router;

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";
import user from "./modules/user";
import poll from "./modules/poll";

export default new Vuex.Store({
  modules: {
    app,
    user,
    poll
  }
});

import Vue from "vue";
import Buefy from "buefy";
import VueClipboard from "vue-clipboard2";
import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueClipboard);

import "normalize.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "buefy/dist/buefy.css";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

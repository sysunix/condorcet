import Vue from "vue";
import VueClipboard from "vue-clipboard2";

import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/main.css";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(VueClipboard);

Sentry.init({
  dsn: "https://cce0e1f68c3d4625b5e9507dc1546242@sentry.io/1503931",
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
});

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");

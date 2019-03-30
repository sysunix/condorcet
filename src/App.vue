<template>
  <v-app>
    <v-toolbar v-if="isAuth" app>
      <v-btn v-if="canGoBack" icon>
        <router-link to="/polls">
          <v-icon>arrow_back</v-icon>
        </router-link>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>Condorcet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Notifications :notifications="notifications" />

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <SpeedDial v-if="isAuth" />

      <!-- <v-footer class="pa-3" fixed>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer> -->
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SpeedDial from "./components/SpeedDial";
import Notifications from "./components/Notifications";

export default {
  name: "App",
  components: {
    Notifications,
    SpeedDial
  },
  computed: {
    ...mapState("app", ["notifications"]),
    ...mapGetters("user", ["isAuth"]),
    canGoBack() {
      return this.$route.path !== "/polls";
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

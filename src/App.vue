<template>
  <div>
    <div id="app">
      <Notifications :notifications="notifications" />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <fab
        main-icon="menu"
        :actions="fabActions"
        @signOut="signOut"
        @createPoll="goToCreationPage"
      ></fab>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Fab from "vue-fab";
import Notifications from "./components/Notifications";
import { signOut } from "./utils/authentication.js";

export default {
  components: {
    Notifications,
    Fab
  },
  computed: {
    ...mapState("app", ["notifications"])
  },
  data() {
    return {
      activeTab: 0,
      fabActions: [
        {
          name: "signOut",
          icon: "power_settings_new"
        },
        {
          name: "createPoll",
          icon: "playlist_add"
        }
      ]
    };
  },
  methods: {
    signOut() {
      signOut(error => {
        if (error) return;

        this.$router.push({ name: "authentication" });
      });
    },
    goToCreationPage() {
      this.$router.push({ name: "poll_create" });
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

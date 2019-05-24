<template>
  <div>
    <div v-if="isAuth">
      <button v-if="canGoBack" icon>
        <router-link to="/polls">
          <i>arrow_back</i>
        </router-link>
      </button>
      <div class="headline text-uppercase">
        <span>Condorcet</span>
      </div>
    </div>

    <div>
      <Notifications :notifications="notifications" />

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <SpeedDial v-if="isAuth" />
    </div>
  </div>
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

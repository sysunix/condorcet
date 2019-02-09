<template>
  <div>
    <div id="app">
      <Notifications :notifications="notifications" />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Notifications from "../components/Notifications";

export default {
  components: {
    Notifications
  },
  computed: {
    ...mapState("app", ["notifications"])
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

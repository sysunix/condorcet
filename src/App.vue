<template>
  <div class="bg-gray-100 text-gray-800 min-h-screen lg:pb-4 overflow-scroll">
    <Navbar v-if="isAuth"></Navbar>

    <div
      class="container mx-auto px-4 h-content overflow-scroll"
      :class="isAuth && 'sm:pb-0 lg:pt-24'"
    >
      <Notifications :notifications="notifications" />

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { mapState, mapGetters } from "vuex";
import Navbar from "./components/Navbar.vue";
import Notifications from "./components/Notifications.vue";

@Component({
  components: {
    Navbar,
    Notifications
  }
})
export default class App extends Vue {
  @State(state => state.app.notifications) notifications: any;
  @Getter("user/isAuth") isAuth: any;
}
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

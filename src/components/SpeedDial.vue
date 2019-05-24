<template>
  <div>
    <button fab dark small color="green" @click="goToCreationPage">
      <i>add_circle</i>
    </button>
    <button fab dark small color="red" @click="signOut">
      <i>power_settings_new</i>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { signOut } from "../utils/authentication.js";

export default {
  computed: {
    ...mapState("app", ["notifications"])
  },
  methods: {
    ...mapActions("user", ["clearUser"]),
    signOut() {
      signOut(error => {
        if (error) return;
        this.clearUser();
        this.$router.push({ name: "authentication" });
      });
    },
    goToCreationPage() {
      this.$router.push({ name: "poll_create" });
    }
  }
};
</script>

<style></style>

<template>
  <v-speed-dial
    :fixed="true"
    :right="true"
    :bottom="true"
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <v-btn slot="activator" color="blue darken-2" dark fab>
      <v-icon>menu</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn fab dark small color="green" @click="goToCreationPage">
      <v-icon>add_circle</v-icon>
    </v-btn>
    <v-btn fab dark small color="red" @click="signOut">
      <v-icon>power_settings_new</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapState } from "vuex";
import { signOut } from "../utils/authentication.js";

export default {
  computed: {
    ...mapState("app", ["notifications"])
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

<style></style>

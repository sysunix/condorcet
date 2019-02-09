<template>
  <div>
    <fab
      main-icon="menu"
      :actions="fabActions"
      @signOut="signOut"
      @createPoll="goToCreationPage"
    ></fab>
    <div @keypress.enter="createPoll">
      <b-tabs v-model="activeTab">
        <b-tab-item label="Mes scrutins"> <PollsList /> </b-tab-item>

        <b-tab-item label="Créer un scrutin"> <PollCreation /> </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import Fab from "vue-fab";
import PollsList from "./PollsList";
import PollCreation from "./PollCreation";
import { signOut } from "../utils/authentication.js";

export default {
  name: "Polls",
  components: {
    PollCreation,
    PollsList,
    Fab
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

<style scoped>
.navbarContainer {
  display: flex;
  flex: 1;
}
</style>

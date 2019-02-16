<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Bienvenue sur Condorcet</h3>
          <span class="subheading"
            >Condorcet est une application permettant de réaliser des scrutin en
            utilisant la méthode de Condorcet</span
          >
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Accéder à l'application :</div>
          <v-btn large color="primary" class="mx-0" @click="signIn('google')"
            >Google</v-btn
          >
          <v-btn large color="primary" class="mx-0" @click="signIn('github')"
            >Github</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "../utils/authentication.js";

export default {
  name: "Authentication",
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("app", ["addNotification"]),
    signIn(provider) {
      signIn(
        provider,
        user => {
          this.setUser(user);

          this.$router.push({ name: "polls_list" });
          this.addNotification({ text: "Vous êtes connecté", status: "info" });
        },
        error => {
          switch (error.code) {
            case "auth/account-exists-with-different-credential":
              this.addNotification({
                text: "Veuillez vous identifier via Google",
                status: "error"
              });
              break;

            default:
              break;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1000;
  background: url("../assets/images/scrutin2.jpg");
  filter: blur(10px);
  background-size: cover;
  width: 100%;
  height: 100vh;
}
.Authentication {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background: rgba(100, 100, 100, 0.8);
  min-width: 300px;
  border-radius: 4px;
}
.Authentication__Google {
  height: 50px;
}
</style>

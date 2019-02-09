<template>
  <div>
    <div class="background"></div>
    <section class="Authentication">
      <b-message title="Connexion" :closable="false">
        <div class="has-text-right">
          <button class="button" @click="signIn">
            <span class="icon is-small"> <i class="fab fa-google"></i> </span
            ><span> Google </span>
          </button>
        </div>
      </b-message>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "../utils/authentication.js";

export default {
  name: "Authentication",
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("app", ["addNotification"]),
    signIn() {
      signIn(user => {
        this.setUser(user);

        this.$router.push("polls");
        this.addNotification({ text: "Vous êtes connecté", status: "info" });
      });
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

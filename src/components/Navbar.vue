<template>
  <nav
    class="Menu fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto flex items-center justify-between flex-wrap bg-teal-500 p-6 z-50"
    :class="isMenuOpen ? 'Menu--show' : 'Menu--hide'"
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">Condorcet</span>
    </div>
    <div class="block lg:hidden">
      <button
        @click="toggleMenu"
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="justify-end w-full block lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          @click.native="toggleMenu"
          to="/polls"
          class="block mt-4 mx-6 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >Accueil</router-link
        >
        <router-link
          @click.native="toggleMenu"
          v-if="featureFlipping.publicPolls"
          to="/polls/public"
          class="self-end block mt-4 mx-6 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >Découvrir</router-link
        >
        <router-link
          @click.native="toggleMenu"
          to="/polls/new"
          class="self-end block mt-4 mx-6 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >Créer un scrutin</router-link
        >
      </div>
      <div>
        <a
          href="#"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          @click="signOut"
          >Deconnexion</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { signOut } from "../utils/authentication.js";
export default {
  computed: {
    ...mapState("app", ["notifications", "featureFlipping", "isMenuOpen"])
  },
  methods: {
    ...mapActions("user", ["clearUser"]),
    ...mapActions("app", ["addNotification", "toggleMenu"]),
    async signOut() {
      try {
        await signOut();
        this.clearUser();
        this.$router.push({ name: "authentication" });
      } catch (error) {
        this.addNotification({
          status: "error",
          message: "Il y a eu un problème"
        });
      }
    }
  }
};
</script>

<style>
.Menu {
  transition: transform 300ms;
}

@media (max-width: 1024px) {
  .Menu--hide {
    transform: translateY(165px);
  }

  .Menu--show {
    transform: translateY(0);
  }
}
</style>

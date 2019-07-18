<template>
  <div>
    <div>
      <div class="pt-6">
        <img
          class="rounded-full h-40 w-40 mx-auto"
          src="../assets/images/condorcet.jpg"
        />
      </div>
      <h1 id="title" class="mt-4 text-center text-3xl"></h1>

      <div class="mt-12 text-center">Acceder à l'application via :</div>

      <div class="mt-2 flex justify-center">
        <button
          class="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="signIn('google')"
        >
          Google
        </button>

        <button
          class="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="signIn('github')"
        >
          Github
        </button>

        <button
          class="mx-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click="signIn('facebook')"
        >
          Facebook
        </button>
      </div>
    </div>

    <div class="mt-12">
      <h4 class="text-2xl text-center">Quelles sont les règles ?</h4>

      <ul class="mt-1 px-5 list-disc list-inside">
        <li>Chaque votant classe les alternatives par ordre de préférence</li>
        <li>On organise des duels entre toutes les alternatives</li>
        <li>Celui qui remporte le plus de duels est déclaré gagnant</li>
      </ul>
    </div>

    <div class="mt-12">
      <h4 class="text-2xl text-center">Vidéos qui en parlent</h4>

      <div class="mt-1 flex flex-col flex-wrap sm:flex-row justify-around">
        <div v-for="video in videos" :key="video.id" class="sm:w-1/2 lg:w-1/4">
          <div class="h-56 m-2">
            <iframe
              width="100%"
              height="100%"
              :src="video.link"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "../utils/authentication.js";

import TypeIt from "typeit";

export default {
  name: "Authentication",
  data() {
    return {
      videos: [
        {
          id: "vfTJ4vmIsO4",
          link: "https://www.youtube.com/embed/vfTJ4vmIsO4?start=260"
        },
        {
          id: "hI89r4LqaCc",
          link: "https://www.youtube.com/embed/hI89r4LqaCc"
        },
        {
          id: "wKimU8jy2a8",
          link: "https://www.youtube.com/embed/wKimU8jy2a8"
        },
        {
          id: "ZoGH7d51bvc",
          link: "https://www.youtube.com/embed/ZoGH7d51bvc?start=534"
        }
      ]
    };
  },
  mounted() {
    new TypeIt("#title", {
      strings: ["Condorcet"]
    }).go();
  },
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("app", ["addNotification"]),
    async signIn(provider) {
      try {
        const { user } = await signIn(provider);
        this.setUser(user);

        this.$router.push({ name: "polls_list" });
        this.addNotification({ text: "Vous êtes connecté", status: "info" });
      } catch (error) {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            this.addNotification({
              text: `Ton compte n'est pas assicié à ${
                error.credential.signInMethod
              }. Essaye une autre méthode d'authentification`,
              status: "error"
            });

            break;

          default:
            this.addNotification({
              text: "Il y a eu un problème pour vous authentifier",
              status: "error"
            });
            break;
        }
      }
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

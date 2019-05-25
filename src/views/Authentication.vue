<template>
  <div>
    <div class="mt-10 flex flex-col justify-center">
      <div>
        <Typewriter class="inline-flex text-3xl">
          Bienvenue sur Condorcet
        </Typewriter>
      </div>
      <span class="mt-4">
        L'application qui vous permet de réaliser des scrutins en utilisant la
        méthode de Condorcet et de comparer le résultat au scrutin uninominal.
      </span>

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
      </div>
    </div>

    <div class="mt-12">
      <h4 class="text-2xl">Comment fonctionne le vote ?</h4>
      <div class="mt-4">
        <ul class="list-disc">
          <li>
            Chaque votant classe les alternatives par ordre de préférence
          </li>
          <li>
            On organise des duels entre toutes les alternatives
          </li>
          <li>Celui qui remporte le plus de duels est déclaré gagnant</li>
        </ul>
      </div>
    </div>

    <div class="mt-12">
      <h4 class="text-2xl">Vidéos qui en parlent :</h4>

      <div class="mt-3 flex justify-around">
        <div v-for="video in videos" :key="video.id">
          <div class="px-4 py-2 m-2">
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
import Typewriter from "../components/Typewriter";
// :style="{
//       backgroundImage: `url('${require('../assets/images/artistic-background.jpg')}')`
//     }"

export default {
  name: "Authentication",
  components: {
    Typewriter
  },
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

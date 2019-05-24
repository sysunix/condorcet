<template>
  <div>
    <div>
      <div>
        <div>
          <h3 class="display-3">Bienvenue sur Condorcet</h3>
          <span class="subheading">
            Condorcet est une application permettant de réaliser des scrutin en
            utilisant la méthode de Condorcet
          </span>

          <div class="title mb-3">Accéder à l'application :</div>

          <button large color="primary" class="mx-1" @click="signIn('google')">
            Google
          </button>
          <button large color="primary" class="mx-1" @click="signIn('github')">
            Github
          </button>
        </div>
      </div>
    </div>

    <div>
      <h4 class="display-1">Comment fonctionne la méthode de Condorcet ?</h4>
      <div row wrap>
        <ul>
          <li>Chaque électeur classe les candidats par ordre de préférence.</li>
          <li>
            Le dépouillement du scrutin consiste à simuler l'ensemble des duels
            possibles : pour chaque paire de candidats, on détermine le nombre
            d'électeurs ayant voté pour l'un ou l'autre en vérifiant, sur chaque
            bulletin de vote, comment l'un était classé par rapport à l'autre.
            Ainsi pour chaque duel, il y a un candidat vainqueur. Dans la
            plupart des cas, il y a un unique candidat qui remporte tous ses
            duels : il s'agit du vainqueur du scrutin.
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h4 class="display-1">Vidéos qui en parlent :</h4>
      <div>
        <div v-for="video in videos" :key="video.id">
          <div>
            <div>
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "../utils/authentication.js";

export default {
  name: "Authentication",
  data() {
    return {
      videos: [
        {
          id: "wKimU8jy2a8",
          link: "https://www.youtube.com/embed/wKimU8jy2a8"
        },
        {
          id: "ZoGH7d51bvc",
          link: "https://www.youtube.com/embed/ZoGH7d51bvc?start=534"
        },
        {
          id: "hI89r4LqaCc",
          link: "https://www.youtube.com/embed/hI89r4LqaCc?start=534"
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

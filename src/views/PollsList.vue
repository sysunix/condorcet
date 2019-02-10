<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="poll in polls" :key="poll.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ poll.name }}</p>
            <a
              href="#"
              class="card-header-icon"
              @click.prevent="copyMagicLink(poll.id)"
            >
              <span class="icon"> <i class="fas fa-link"></i> </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">{{ poll.description }}</div>
          </div>
          <footer class="card-footer">
            <a
              v-if="poll.isOwner"
              href="#"
              class="card-footer-item has-background-danger has-text-white"
              @click.prevent="removePoll(poll.id, poll.name)"
              >Supprimer</a
            >
            <a
              v-if="poll.isOwner"
              href="#"
              class="card-footer-item has-background-grey-light has-text-white"
              @click.prevent="togglePoll(poll.id, poll.name)"
            >
              {{ poll.isActive ? "Fermer" : "Ré-ouvir" }}
            </a>
            <router-link
              class="card-footer-item has-background-info has-text-white"
              tag="a"
              :to="{
                name: poll.isActive ? 'poll_show' : 'poll_result',
                params: { id: poll.id }
              }"
              >{{ poll.isActive ? "Voter" : "Résultats" }}</router-link
            >
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { db } from "@/firebase";

export default {
  name: "PollsList",
  mounted() {
    this.fetchPolls(this.userId);
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapState({
      polls: state => state.poll.all
    })
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    ...mapActions("poll", ["fetchPolls"]),
    async togglePoll(id) {
      try {
        const document = db.collection("polls").doc(id);
        const currentPollState = (await document.get()).data();

        const newPollState = {
          ...currentPollState,
          is_active: !currentPollState.is_active
        };

        document.set(newPollState);
      } catch (error) {
        this.addNotification({
          text: `Il y a eu un problème`,
          status: "error"
        });
      }
    },
    removePoll(id, name) {
      try {
        db.collection("polls")
          .doc(id)
          .delete();
        this.addNotification({
          text: `La salle ${name} a bien été supprimée`,
          status: "info"
        });
      } catch (error) {
        this.addNotification({
          text: `Il y a eu un problème lors de la suppression de ${name}`,
          status: "error"
        });
      }
    },
    async copyMagicLink(id) {
      const poll = this.polls.find(poll => poll.id === id);
      const link = `${window.location.origin}/polls/${poll.id}/join?token=${
        poll.token
      }`;

      try {
        await this.$copyText(link);
        this.addNotification({
          text: `Lien copié`,
          status: "info"
        });
      } catch (error) {
        this.addNotification({
          text: `Lien copié`,
          status: "error"
        });
      }
    }
  }
};
</script>

<style></style>

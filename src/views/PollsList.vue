<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="poll in polls" :key="poll.id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ poll.name }}</h3>
              <div>
                {{ poll.description }}
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click.prevent="copyMagicLink(poll.id)"
              >Partager</v-btn
            >
            <v-btn
              v-if="poll.isOwner"
              flat
              color="orange"
              @click.prevent="removePoll(poll.id, poll.name)"
              >Supprimer</v-btn
            >
            <v-btn
              v-if="poll.isOwner"
              flat
              color="orange"
              @click.prevent="togglePoll(poll.id, poll.name)"
              >{{ poll.isActive ? "Fermer" : "Ré-ouvir" }}</v-btn
            >
            <!-- <v-btn  flat color="orange" @click.prevent="togglePoll(poll.id, poll.name)">{{ poll.isActive ? "Fermer" : "Ré-ouvir" }}</v-btn> -->

            <router-link
              class="v-btn v-btn--flat theme--light orange--text"
              tag="a"
              :to="{
                name: poll.isActive ? 'poll_show' : 'poll_result',
                params: { id: poll.id }
              }"
              >{{ poll.isActive ? "Voter" : "Résultats" }}</router-link
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
          isActive: !currentPollState.isActive
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

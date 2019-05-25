<template>
  <div class="flex flex-wrap justify-around">
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg mb-10"
      v-for="poll in polls"
      :key="poll.id"
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ poll.question }}</div>
        <p class="text-gray-700 text-base">
          {{ poll.description }}
        </p>
      </div>
      <div class="px-6 py-4">
        <button
          class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click.prevent="copyMagicLink(poll.id)"
        >
          Partager
        </button>
        <button
          v-if="poll.isOwner"
          class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click.prevent="removePoll(poll.id)"
        >
          Supprimer
        </button>
        <button
          v-if="poll.isOwner"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click.prevent="togglePoll(poll.id)"
        >
          {{ poll.isActive ? "Fermer" : "Ré-ouvir" }}
        </button>
        <router-link
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          tag="button"
          :to="{
            name: poll.isActive ? 'poll_show' : 'poll_result',
            params: { id: poll.id }
          }"
          >{{ poll.isActive ? "Voter" : "Résultats" }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { db } from "../firebase";

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
    removePoll(id) {
      if (confirm("Confirmer le suppression ?") === false) {
        return;
      }

      try {
        db.collection("polls")
          .doc(id)
          .delete();
        this.addNotification({
          text: "Le scrutin  a bien été supprimé",
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

<template>
  <div class="flex">
    <div v-if="polls.length === 0">
      Tu n'a pas encore de scrutin. Tu peux en créé un en cliquant sur
      <router-link to="polls/new" class="text-teal-500 hover:underline"
        >ce lien</router-link
      >.
    </div>

    <div class="flex flex-wrap">
      <div
        class="w-full md:w-1/2 lg:w-1/3"
        v-for="poll in polls"
        :key="poll.id"
      >
        <div class="rounded overflow-hidden shadow-md md:mx-2">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-4">{{ poll.question }}</div>
            <p class="text-gray-700 text-base">{{ poll.description }}</p>
          </div>
          <div class="flex justify-between flex-wrap px-6 py-4">
            <router-link
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-1"
              tag="button"
              :to="{
                name: poll.isActive ? 'poll_show' : 'poll_result',
                params: { id: poll.id }
              }"
              >{{ poll.isActive ? "Voter" : "Résultats" }}</router-link
            >
            <button
              class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full my-1"
              @click.prevent="copyMagicLink(poll.id)"
            >
              Partager
            </button>
            <button
              v-if="poll.isOwner"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full my-1"
              @click.prevent="togglePoll(poll.id)"
            >
              {{ poll.isActive ? "Fermer" : "Ré-ouvir" }}
            </button>

            <button
              v-if="poll.isOwner"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full my-1"
              @click.prevent="removePoll(poll.id)"
            >
              Supprimer
            </button>
          </div>
        </div>
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
    this.listenPolls(this.userId);
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapState({
      polls: state => state.poll.all
    })
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    ...mapActions("poll", ["listenPolls"]),
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

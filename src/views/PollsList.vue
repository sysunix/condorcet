<template>
  <Loader>
    <div class="flex">
      <div v-if="userPolls.length === 0">
        Tu n'a pas encore de scrutin. Tu peux en créé un en cliquant sur
        <router-link to="polls/new" class="text-teal-500 hover:underline"
          >ce lien</router-link
        >.
      </div>

      <div v-else class="flex flex-wrap w-full">
        <div
          v-for="poll in userPolls"
          :key="poll.id"
          class="w-full md:w-1/2 lg:w-1/3"
        >
          <Card
            class="md:mx-2"
            v-bind="poll"
            :user-id="userId"
            @onShare="copyMagicLink"
            @onToggleStatus="togglePoll"
            @onDelete="deletePoll"
            @onLeave="leavePoll"
          />
        </div>
      </div>
    </div>
  </Loader>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { db } from "../firebase";
import Card from "../components/Card";
import Loader from "../components/Loader.vue";

export default {
  name: "PollsList",
  components: {
    Card,
    Loader
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapGetters("poll", ["userPolls"])
  },
  mounted() {
    this.listenPolls(this.userId);
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    ...mapActions("poll", ["listenPolls", "removePoll"]),
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
    async leavePoll(id) {
      if (confirm("Tu veux quitter ce scrutin ?") === false) {
        return;
      }

      const poll = (await db
        .collection("polls")
        .doc(id)
        .get()).data();

      const users = poll.users.filter(user => user !== this.userId);

      db.collection("polls")
        .doc(id)
        .set({ ...poll, users });

      this.removePoll(id);

      this.addNotification({
        text: `Tu as bien quitté le scrutin ${poll.question}`,
        status: "info"
      });
    },
    deletePoll(id) {
      if (confirm("Confirmer le suppression ?") === false) {
        return;
      }

      try {
        db.collection("polls")
          .doc(id)
          .delete();

        this.removePoll(id);

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

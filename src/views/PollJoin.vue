<template>
  <div class="Container">
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../firebase";

export default {
  name: "PollJoin",
  data() {
    return {
      message: "Traitement en cours..."
    };
  },
  computed: {
    ...mapGetters("user", ["userId"])
  },
  async mounted() {
    try {
      const { params, query } = this.$route;
      const document = db.collection("polls").doc(params.id);
      const poll = (await document.get()).data();
      const { users, token: pollToken } = poll;

      if (!query.token) {
        return;
      }

      if (query.token !== pollToken) {
        return;
      }

      const newPoll = { ...poll, users: [...new Set([...users, this.userId])] };

      document.set(newPoll);

      this.message = newPoll.question;
      setTimeout(() => {
        if (newPoll.isActive) {
          this.$router.push({ name: "poll_show", params: params.id });
          return;
        }

        this.$router.push({ name: "poll_result", params: params.id });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style>
.Container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

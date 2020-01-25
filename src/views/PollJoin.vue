<template>
  <Loader :processing="isProcessing">
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-2xl text-center w-full">{{ $t("poll.joined") }}</div>
      <div class="text-xl text-center w-full">{{ message }}</div>
    </div>
  </Loader>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../firebase";
import Loader from "../components/Loader";

export default {
  name: "PollJoin",
  components: {
    Loader
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    isProcessing() {
      return this.message === "";
    }
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
      return;
    }
  }
};
</script>

<style></style>

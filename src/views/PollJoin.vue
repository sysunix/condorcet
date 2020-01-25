<template>
  <Loader :processing="isProcessing">
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-2xl text-center w-full">{{ $t("poll.joined") }}</div>
      <div class="text-xl text-center w-full">{{ message }}</div>
    </div>
  </Loader>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { mapGetters } from "vuex";
import { db } from "../firebase";
import Loader from "../components/Loader.vue";

@Component({
  components: {
    Loader
  }
})
export default class PollJoin extends Vue {
  message: string = "";

  @Getter("user/userId") userId: any;

  get isProcessing() {
    return this.message === "";
  }

  async mounted() {
    try {
      const { params, query }: { params: any; query: any } = this.$route;
      const document = db.collection("polls").doc(params.id);
      const poll: any = (await document.get()).data();
      const { users, token: pollToken } = poll;

      if (!query.token) {
        return;
      }

      if (query.token !== pollToken) {
        return;
      }

      const temp: any = new Set([...users, this.userId]);
      const newPoll = { ...poll, users: [...temp] };

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
}
</script>

<style></style>

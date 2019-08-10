<template>
  <Loader>
    <Empty
      :condition="publicPolls.length === 0"
      :text="$t('empty.publicPolls.text')"
      :action-text="$t('empty.publicPolls.action')"
      to="/polls/new"
    />

    <div class="flex flex-wrap">
      <div
        v-for="poll in publicPolls"
        :key="poll.id"
        class="w-full md:w-1/2 lg:w-1/3"
      >
        <Card
          class="md:mx-2"
          v-bind="poll"
          :user-id="userId"
          :is-joinable="true"
          @onJoin="joinPoll"
        />
      </div>
    </div>
  </Loader>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Empty from "../components/Empty";

export default {
  name: "PublicPolls",
  components: {
    Card,
    Loader,
    Empty
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapGetters("poll", ["publicPolls"])
  },
  created() {
    this.fetchPublicPolls();
  },
  methods: {
    ...mapActions("poll", ["fetchPublicPolls"]),
    joinPoll(id) {
      this.$router.push({
        name: "poll_join",
        params: { id },
        query: { token: this.publicPolls.find(poll => poll.id === id).token }
      });
    }
  }
};
</script>

<style></style>

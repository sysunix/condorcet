<template>
  <div>
    <nav class="navbar" role="navigation">
      <div class="navbar-item">
        <router-link to="/polls">Retour</router-link>
      </div>
    </nav>

    <h3>Condorcet</h3>
    <div class="panel">
      <div
        class="panel-block"
        v-for="item in ranking.condorcet.ranking"
        :key="item.position"
      >
        <span class="panel-icon"> {{ item.position }} </span> {{ item.value }}
      </div>
    </div>

    <h3>Uninominal</h3>
    <div class="panel">
      <div
        class="panel-block"
        v-for="item in ranking.uninominal"
        :key="item.position"
      >
        <span class="panel-icon"> {{ item.position }} </span> {{ item.value }} -
        {{ item.numberOfVotes }} voix
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "PollResult",
  data() {
    return {
      ranking: ""
    };
  },
  async mounted() {
    const result = await db
      .collection("results")
      .doc(this.$route.params.id)
      .get();

    this.ranking = result.data();
  }
};
</script>

<style></style>

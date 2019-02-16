<template>
  <div>
    <h3>Condorcet</h3>

    <v-list>
      <v-list-tile
        class="panel-block"
        v-for="item in ranking.condorcet.ranking"
        :key="item.position"
      >
        {{ item.position }} {{ item.value }}
      </v-list-tile>
    </v-list>

    <h3>Uninominal</h3>
    <v-list>
      <v-list-tile
        class="list-item"
        v-for="item in ranking.uninominal"
        :key="item.position"
      >
        <span class="panel-icon"> {{ item.position }} </span> {{ item.value }} -
        {{ item.numberOfVotes }} voix
      </v-list-tile>
    </v-list>
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

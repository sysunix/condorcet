<template>
  <div>
    <h3>Condorcet</h3>

    <Graph v-if="featureFlipping.graphOfTheDuels"></Graph>

    <v-list v-if="ranking.condorcet">
      <v-list-tile
        class="panel-block"
        v-for="item in ranking.condorcet.ranking"
        :key="item.position"
      >
        {{ item.position }} {{ item.value }}
      </v-list-tile>
    </v-list>

    <div v-else>Problème</div>

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
import { mapState } from "vuex";
import { db } from "@/firebase";
import Graph from "../components/Graph.vue";

export default {
  name: "PollResult",
  components: {
    Graph
  },
  data() {
    return {
      ranking: ""
    };
  },
  computed: {
    ...mapState("app", ["featureFlipping"])
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

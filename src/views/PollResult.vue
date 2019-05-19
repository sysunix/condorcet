<template>
  <div>
    <h3>Condorcet</h3>

    <Graph v-if="featureFlipping.graphOfTheDuels"></Graph>

    <div v-if="condorcet && featureFlipping.matrixOfTheDuels && answers">
      <table>
        <thead>
          <tr>
            <th>Réponse</th>
            <th v-for="answer in answers" :key="answer">{{ answer }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in condorcet" :key="key">
            <td>{{ key }}</td>
            <td v-for="item2 in condorcet[key]" :key="`duel-${item2}-${key}`">
              {{ item2 }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div v-for="item in condorcet"></div> -->
    </div>

    <v-list v-if="condorcet && featureFlipping.condorcetRanking">
      <v-list-tile class="panel-block" v-for="item in condorcet" :key="item">
        <p></p>
        {{ item.position }} {{ item.value }}
      </v-list-tile>
    </v-list>

    <div v-if="uninominal && featureFlipping.uninominalRanking">
      <h3>Uninominal</h3>
      <v-list>
        <v-list-tile
          class="list-item"
          v-for="item in uninominal"
          :key="item.position"
        >
          <span class="panel-icon"> {{ item.position }} </span>
          {{ item.value }} - {{ item.numberOfVotes }} voix
        </v-list-tile>
      </v-list>
    </div>
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
      uninominal: null,
      condorcet: null
    };
  },
  computed: {
    ...mapState("app", ["featureFlipping"]),
    answers() {
      return this.condorcet ? Object.keys(this.condorcet) : null;
    }
  },
  async created() {
    const result = await db
      .collection("results")
      .doc(this.$route.params.id)
      .get();

    const { condorcet, uninominal } = result.data();

    this.condorcet = Object.keys(condorcet).reduce((acc, item) => {
      const temp = { ...condorcet[item], [item]: "/" };

      const sortedTemp = Object.keys(temp)
        .sort()
        .reduce((acc, item2) => {
          return { ...acc, [item2]: temp[item2] };
        }, {});

      return { ...acc, [item]: sortedTemp };
    }, {});
    this.uninominal = uninominal;
  }
};
</script>

<style></style>

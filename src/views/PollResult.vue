<template>
  <div>
    <h3>Condorcet</h3>

    <Graph v-if="featureFlipping.graphOfTheDuels"></Graph>

    <div v-if="condorcet && featureFlipping.matrixOfTheDuels && answers">
      <table>
        <thead>
          <tr>
            <th>Réponse</th>
            <th v-for="answer in answers" :key="answer.slug">
              {{ answer.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, alternative) in condorcet.matrix"
            :key="alternative"
          >
            <td>{{ alternative }}</td>
            <td v-for="opponent in item.duels" :key="opponent.slug">
              {{ opponent }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="condorcet && featureFlipping.condorcetRanking">
      <div
        class="panel-block"
        v-for="item in condorcet.ranking"
        :key="item.slug"
      >
        <p></p>
        {{ item.rank }} {{ item.value }} {{ item.wins }} victoires //
        {{ item.equalities }} matchs nuls
      </div>
    </div>

    <div v-if="uninominal && featureFlipping.uninominalRanking">
      <h3>Uninominal</h3>
      <div>
        <div class="list-item" v-for="item in uninominal" :key="item.slug">
          {{ item.rank }} {{ item.value }} - {{ item.numberOfVotes }} voix
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sortKeys from "sort-keys";
import { db } from "../firebase";
import Graph from "../components/Graph.vue";

export default {
  name: "PollResult",
  components: {
    Graph
  },
  data() {
    return {
      uninominal: null,
      condorcet: null,
      answers: null
    };
  },
  computed: {
    ...mapState("app", ["featureFlipping"])
  },
  async created() {
    const result = await db
      .collection("polls")
      .doc(this.$route.params.id)
      .get();

    const { condorcet, uninominal, answers } = result.data();

    const condorcetMatrix = Object.keys(condorcet.matrix).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          duels: {
            ...condorcet.matrix[key].duels,
            [key]: "/"
          },
          value: condorcet.matrix[key].value
        }
      }),
      {}
    );

    this.condorcet = {
      ranking: condorcet.ranking,
      matrix: sortKeys(condorcetMatrix, { deep: true })
    };
    this.uninominal = uninominal;
    this.answers = answers.sort((a, b) => {
      return a.slug.localeCompare(b.slug);
    });
  }
};
</script>

<style></style>

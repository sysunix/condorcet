<template>
  <div>
    <h3 class="text-4xl">Condorcet</h3>

    <Graph v-if="featureFlipping.graphOfTheDuels"></Graph>

    <div v-if="condorcet && featureFlipping.matrixOfTheDuels && answers">
      <table class="text-left w-full border-collapse">
        <thead>
          <tr>
            <th
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
            >
              Réponse
            </th>
            <th
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              v-for="answer in answers"
              :key="answer.slug"
            >
              {{ answer.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, alternative) in condorcet.matrix"
            :key="alternative"
          >
            <td class="py-4 px-6 border-b border-grey-light">
              {{ alternative }}
            </td>
            <td
              class="py-4 px-6 border-b border-grey-light"
              v-for="opponent in item.duels"
              :key="opponent.slug"
            >
              {{ opponent }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-10" v-if="condorcet && featureFlipping.condorcetRanking">
      <div
        class="font-sans flex items-center justify-center bg-blue-darker w-full py-2"
        v-for="item in condorcet.ranking"
        :key="item.slug"
      >
        <div class="w-1/2 px-6 py-4 rounded overflow-hidden shadow">
          {{ item.rank }} - <span class="font-bold">{{ item.value }}</span> /
          {{ item.wins }} victoire(s) & {{ item.equalities }} match(s) nul(s)
        </div>
      </div>
    </div>

    <div class="mt-10" v-if="uninominal && featureFlipping.uninominalRanking">
      <h3 class="text-4xl">Uninominal</h3>
      <div
        class="font-sans flex items-center justify-center bg-blue-darker w-full py-2"
        v-for="item in uninominal"
        :key="item.slug"
      >
        <div class="w-1/2 px-6 py-4 rounded overflow-hidden shadow">
          {{ item.rank }} - <span class="font-bold">{{ item.value }}</span> /
          {{ item.numberOfVotes }} voix
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

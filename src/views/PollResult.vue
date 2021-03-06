<template>
  <div>
    <h3 class="text-4xl">Condorcet</h3>

    <Graph v-if="featureFlipping.graphOfTheDuels"></Graph>

    <div
      v-if="condorcet && featureFlipping.matrixOfTheDuels && answers"
      class="overflow-scroll"
    >
      <table class="text-left w-full border-collapse">
        <thead>
          <tr>
            <th
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
            >
              Réponse
            </th>
            <th
              v-for="answer in answers"
              :key="answer.slug"
              class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
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
              {{ item.value }}
            </td>
            <td
              v-for="opponent in item.duels"
              :key="opponent.slug"
              class="py-4 px-6 border-b border-grey-light"
            >
              {{ opponent }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="condorcet && featureFlipping.condorcetRanking" class="mt-10">
      <div
        v-for="item in condorcet.ranking"
        :key="item.slug"
        class="font-sans flex items-center justify-center bg-blue-darker w-full py-2"
      >
        <div class="w-full px-6 py-4 rounded overflow-hidden shadow">
          {{ item.rank }} - <span class="font-bold">{{ item.value }}</span> /
          {{ $tc("poll.wins", item.wins, { count: item.wins }) }} &
          {{
            $tc("poll.equalities", item.equalities, { count: item.equalities })
          }}
        </div>
      </div>
    </div>

    <div v-if="uninominal && featureFlipping.uninominalRanking" class="mt-10">
      <h3 class="text-4xl">Uninominal</h3>
      <div
        v-for="item in uninominal"
        :key="item.slug"
        class="font-sans flex items-center justify-center bg-blue-darker w-full py-2"
      >
        <div class="w-full px-6 py-4 rounded overflow-hidden shadow">
          {{ item.rank }} - <span class="font-bold">{{ item.value }}</span> /
          {{
            $tc("poll.numberOfVotes", item.numberOfVotes, {
              count: item.numberOfVotes
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { mapState } from "vuex";
import sortKeys from "sort-keys";
import { db } from "../firebase";
import Graph from "../components/Graph.vue";

import { CondorcetModel, UninominalModel } from "../models/Result";

@Component({
  components: {
    Graph
  }
})
export default class PollResult extends Vue {
  uninominal: object | null = null;
  condorcet: object | null = null;
  answers: object | null = null;

  @State(state => state.app.featureFlipping) featureFlipping: any;

  async created() {
    const resultsRef = db
      .collection("polls")
      .doc(this.$route.params.id)
      .collection("results");
    try {
      const uninominal: any = (await resultsRef.doc("uninominal").get()).data();
      this.uninominal = uninominal.ranking;

      const condorcet: any = (await resultsRef.doc("condorcet").get()).data();

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

      this.answers = condorcet.ranking
        .map((c: any) => ({ value: c.value, slug: c.slug }))
        .sort((a: any, b: any) => {
          return a.slug.localeCompare(b.slug);
        });
    } catch (error) {
      return;
    }
  }
}
</script>

<style></style>

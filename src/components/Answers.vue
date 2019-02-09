<template>
  <div>
    <pre>{{ sortedAnswers }}</pre>
    <button @click="debug">Debug</button>
    <Draggable>
      <div v-for="answer in answers.values" :key="answer.id">
        {{ answer.text }}
      </div>
    </Draggable>
  </div>
</template>

<script>
import Draggable from "vuedraggable";

import { db } from "@/firebase";

export default {
  name: "Answers",
  components: {
    Draggable
  },
  data() {
    return {
      answers: []
    };
  },
  firestore: {
    answers: db.collection("answers").doc("nRCOCiQMhTMsUP3IR69g")
  },
  methods: {
    debug() {
      console.log(this.$firestoreRefs);
      console.log(this.$store);
    }
  },
  computed: {
    sortedAnswers() {
      return this.answers.values;
    }
  }
};
</script>

<style></style>

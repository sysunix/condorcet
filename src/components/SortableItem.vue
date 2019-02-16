<template>
  <v-list-tile class="list-item">{{ answer.value }}</v-list-tile>
</template>

<script>
import { ElementMixin } from "vue-slicksort";

export default {
  mixins: [ElementMixin],
  props: { answer: { type: Object } }
};
</script>

<style></style>

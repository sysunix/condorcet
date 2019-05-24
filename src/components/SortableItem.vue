<template>
  <div class="list-item">{{ answer.value }}</div>
</template>

<script>
import { ElementMixin } from "vue-slicksort";

export default {
  mixins: [ElementMixin],
  props: { answer: { type: Object } }
};
</script>

<style></style>

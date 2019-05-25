<template>
  <div class="px-6 py-4 rounded overflow-hidden shadow select-none">
    {{ answer.value }}
  </div>
</template>

<script>
import { ElementMixin } from "vue-slicksort";

export default {
  mixins: [ElementMixin],
  props: { answer: { type: Object } }
};
</script>

<style></style>

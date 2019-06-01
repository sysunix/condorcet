<template>
  <div class="px-6 py-4 rounded overflow-hidden shadow select-none">
    {{ value }}
  </div>
</template>

<script>
import { ElementMixin } from "vue-slicksort";

export default {
  mixins: [ElementMixin],
  props: { value: { type: String, required: true } }
};
</script>

<style></style>

<template>
  <div class="cursor-move">
    <slot />
  </div>
</template>

<script>
import { ContainerMixin } from "vue-slicksort";
export default {
  mixins: [ContainerMixin]
};
</script>

<style></style>

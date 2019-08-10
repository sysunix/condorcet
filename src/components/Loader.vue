<template>
  <div class="h-full">
    <div v-if="loading" class="flex justify-center items-center h-full">
      <PulseLoader></PulseLoader>
    </div>
    <div v-else class="h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    PulseLoader
  },
  props: {
    processing: {
      type: Boolean
    }
  },
  data() {
    return {
      waitBeforeDisplay: true
    };
  },
  computed: {
    loading() {
      if (this.processing) {
        return this.waitBeforeDisplay || this.processing;
      }
      return this.waitBeforeDisplay;
    }
  },
  mounted() {
    setTimeout(() => {
      this.waitBeforeDisplay = false;
    }, 800);
  }
};
</script>

<style></style>

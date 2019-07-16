<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <PulseLoader></PulseLoader>
    </div>
    <div v-else>
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
    condition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      waitBeforeDisplay: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.waitBeforeDisplay = false;
    }, 800);
  },
  computed: {
    loading() {
      return this.waitBeforeDisplay && this.condition;
    }
  }
};
</script>

<style></style>

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

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

@Component({
  components: {
    PulseLoader
  }
})
export default class Loader extends Vue {
  @Prop({ type: Boolean }) readonly processing!: boolean;

  waitBeforeDisplay: boolean = true;

  get loading() {
    if (this.processing) {
      return this.waitBeforeDisplay || this.processing;
    }
    return this.waitBeforeDisplay;
  }

  mounted() {
    setTimeout(() => {
      this.waitBeforeDisplay = false;
    }, 800);
  }
}
</script>

<style></style>

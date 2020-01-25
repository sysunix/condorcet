<template>
  <div
    v-if="condition"
    class="flex flex-col justify-center items-center h-full"
  >
    <div class="text-xl text-center">
      {{ text }}
    </div>
    <div class="mt-4">
      <router-link
        :to="to"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >{{ actionText }}</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Empty extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  readonly condition!: boolean;

  @Prop({
    type: String,
    required: true
  })
  readonly text!: string;

  @Prop({
    type: String,
    required: true
  })
  readonly actionText!: string;

  @Prop({
    type: String,
    required: true
  })
  readonly to!: string;
}
</script>

<style></style>

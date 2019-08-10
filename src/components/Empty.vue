<template>
  <div
    v-if="condition"
    class="flex flex-col justify-center items-center h-full"
  >
    <div class="text-xl">
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

<script>
export default {
  props: {
    condition: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    actionText: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>

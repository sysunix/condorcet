<template>
  <div class="px-6 rounded overflow-hidden shadow-md">
    <div class="pt-4">
      <div class="font-bold text-xl mb-3">{{ question }}</div>
      <p class="text-gray-700 text-lg mb-2">
        {{ $tc("poll.participants", users.length, { count: users.length }) }}
      </p>
      <p class="text-gray-700 text-base">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-between flex-wrap  py-3">
      <router-link
        v-if="users.includes(userId)"
        :data-testid="
          isActive ? `vote-${questionSlug}` : `results-${questionSlug}`
        "
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        tag="button"
        :to="{
          name: isActive ? 'poll_show' : 'poll_result',
          params: { id: id }
        }"
        >{{ isActive ? $t("global.vote") : $t("global.results") }}</router-link
      >
      <button
        v-if="users.includes(userId)"
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onShare', id)"
      >
        {{ $t("global.share") }}
      </button>
      <button
        v-if="owner === userId"
        :data-testid="
          isActive ? `close-${questionSlug}` : `reOpen-${questionSlug}`
        "
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onToggleStatus', id)"
      >
        {{ isActive ? $t("global.close") : $t("global.reOpen") }}
      </button>

      <button
        v-if="users.includes(userId) === false"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onJoin', id)"
      >
        {{ $t("global.join") }}
      </button>

      <button
        v-if="users.includes(userId) === true && owner !== userId"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onLeave', id)"
      >
        {{ $t("global.leave") }}
      </button>

      <button
        v-if="owner === userId"
        data-testid="delete"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onDelete', id)"
      >
        {{ $t("global.delete") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import slugify from "slugify";

@Component
export default class Card extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;
  @Prop({ type: String, required: true }) readonly userId!: string;
  @Prop({ type: String, required: true }) readonly description!: string;
  @Prop({ type: String, required: true }) readonly question!: string;
  @Prop({ type: String, required: true }) readonly owner!: string;
  @Prop({ type: Boolean, required: true }) readonly isActive!: boolean;
  @Prop({ type: Array, required: true }) readonly users!: Array<string>;

  get questionSlug() {
    return slugify(this.question);
  }
}
</script>

<style></style>

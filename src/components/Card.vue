<template>
  <div class="rounded overflow-hidden shadow-md">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-4">{{ question }}</div>
      <p class="text-gray-700 text-base">{{ description }}</p>
    </div>
    <div class="flex justify-between flex-wrap px-6 py-4">
      <router-link
        v-if="users.includes(userId)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        tag="button"
        :to="{
          name: isActive ? 'poll_show' : 'poll_result',
          params: { id: id }
        }"
        >{{ isActive ? "Voter" : "Résultats" }}</router-link
      >
      <button
        v-if="users.includes(userId)"
        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onShare', id)"
      >
        Partager
      </button>
      <button
        v-if="owner === userId"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onToggleStatus', id)"
      >
        {{ isActive ? "Fermer" : "Ré-ouvir" }}
      </button>

      <button
        v-if="users.includes(userId) === false"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onJoin', id)"
      >
        Rejoindre
      </button>

      <button
        v-if="owner === userId"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full my-1"
        @click.prevent="$emit('onDelete', id)"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>

<template>
  <div>
    <form class="w-full" autocomplete="off" @keypress.enter.prevent>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="question"
          >
            Question *
          </label>
          <input
            v-model="question"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="question"
            type="text"
          />
          <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->

          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            v-model="description"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          ></textarea>

          <div class="md:flex md:items-center mb-6">
            <input
              id="isPublic"
              class="mr-2 leading-tight"
              type="checkbox"
              v-model="isPublic"
              name="isPublic"
            />
            <label
              for="isPublic"
              class="md:w-2/3 block text-gray-500 font-bold"
            >
              <span class="text-sm">
                Rendre le scrutin public ? {{ isPublicText }}
              </span>
            </label>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="answer"
          >
            Ajouter des réponses *
          </label>
          <div class="flex">
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="answer"
              type="text"
              v-model="answer"
              @keypress.enter="addAnswer"
            />
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click.prevent="addAnswer"
            >
              Ajouter
            </button>
          </div>

          <ul class="list-disc mt-6 ml-10">
            <li v-for="answer in answers" :key="answer.slug">
              {{ answer.value }}
            </li>
          </ul>
        </div>

        <div class="w-full mt-4 px-3 flex justify-center">
          <button
            class="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click.prevent="createPoll"
          >
            Créer
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import slugify from "slugify";
import { db } from "../firebase";
import PollModel from "../models/Poll";

export default {
  name: "PollCreation",
  data() {
    return {
      question: "",
      description: "",
      answer: "",
      answers: [],
      isPublic: false
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    }),
    isPublicText() {
      return this.isPublic ? "Oui" : "Non";
    }
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    async createPoll() {
      const poll = new PollModel({
        question: this.question,
        description: this.description,
        answers: this.answers,
        owner: this.userId,
        users: [this.userId],
        isPublic: this.isPublic
      });

      if (poll.validate().valid === false) {
        this.addNotification({
          text: "Veuillez renseigner l'ensemble des informations requises",
          status: "error"
        });
        return;
      }

      try {
        await db.collection("polls").add(poll.toJSON());

        this.addNotification({
          text: "Scrutin créé mon pote",
          status: "success"
        });

        this.question = "";
        this.description = "";
        this.answer = "";
        this.answers = [];
      } catch (error) {
        this.addNotification({
          text: `Il y a eu un problème lors de la création du scrutin`,
          status: "error"
        });
      }
    },
    addAnswer() {
      const cleanAnswer = this.answer.trim();
      if (cleanAnswer.length === 0) {
        this.addNotification({
          text: "Une réponse ne peut pas être vide",
          status: "warning"
        });
        return;
      }

      if (this.answers.find(answer => answer.value === cleanAnswer)) {
        this.addNotification({
          text: "Cette réponse existe déjà",
          status: "warning"
        });

        return;
      }

      this.answers = [
        ...this.answers,
        {
          value: cleanAnswer,
          slug: slugify(cleanAnswer, { lower: true, replacement: "-" })
        }
      ];
      this.answer = "";
    }
  }
};
</script>

<style></style>

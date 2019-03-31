<template>
  <div>
    <v-text-field label="Nom" v-model="name"></v-text-field>

    <v-textarea
      name="input-7-1"
      label="Description"
      v-model="description"
    ></v-textarea>

    <v-text-field
      label="Ajouter une réponse"
      v-model="answer"
      @keypress.enter="addAnswer"
    ></v-text-field>
    <v-btn color="info" @click="addAnswer">Ajouter</v-btn>

    <v-list>
      <v-list-tile
        class="panel-block"
        v-for="answer in answers"
        :key="answer.slug"
      >
        {{ answer.value }}
      </v-list-tile>
    </v-list>

    <v-btn color="info" @click="createPoll">Créer</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import randomString from "random-string";
import slugify from "slugify";
import { db } from "@/firebase";

export default {
  name: "PollCreation",
  data() {
    return {
      name: "",
      description: "",
      answer: "",
      answers: []
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id
    })
  },
  methods: {
    ...mapActions("app", ["addNotification"]),
    async createPoll() {
      if (this.name === "" || this.answers.length < 2) {
        this.addNotification({
          text: "Veuillez renseigner l'ensemble des informations requises",
          status: "error"
        });
        return;
      }

      try {
        let users = [this.userId];

        await db.collection("polls").add({
          name: this.name,
          description: this.description,
          answers: this.answers,
          owner: this.userId,
          isActive: true,
          token: randomString({ length: 20 }),
          users
        });

        this.addNotification({
          text: "Scrutin créé mon pote",
          status: "success"
        });

        this.name = "";
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
      if (this.answers.find(answer => answer.value === this.answer)) {
        this.addNotification({
          text: "Cette réponse existe déjà",
          status: "warning"
        });

        return;
      }

      this.answers = [
        ...this.answers,
        {
          value: this.answer,
          slug: slugify(this.answer, { lower: true, replacement: "-" })
        }
      ];
      this.answer = "";
    }
  }
};
</script>

<style></style>

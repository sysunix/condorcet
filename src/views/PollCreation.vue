<template>
  <div>
    <v-text-field label="Nom" v-model="name"></v-text-field>

    <v-textarea
      name="input-7-1"
      label="Description"
      v-model="description"
    ></v-textarea>

    <v-text-field label="Ajouter une réponse" v-model="answer"></v-text-field>
    <v-btn color="info" @click="addAnswer">Ajouter</v-btn>

    <v-list>
      <v-list-tile class="panel-block" v-for="answer in answers" :key="answer">
        {{ answer }}
      </v-list-tile>
    </v-list>

    <v-btn color="info" @click="createPoll">Créer</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import randomString from "random-string";
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
      } catch (error) {
        this.addNotification({
          text: `Il y a eu un problème lors de la création du scrutin`,
          status: "error"
        });
      }
    },
    addAnswer() {
      this.answers.push(this.answer);
      this.answer = "";
    }
  }
};
</script>

<style></style>

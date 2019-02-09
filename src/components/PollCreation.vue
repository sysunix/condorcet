<template>
  <div>
    <b-field label="Nom"> <b-input v-model="name"></b-input> </b-field>
    <b-field label="Description">
      <b-input v-model="description" maxlength="200" type="textarea"></b-input>
    </b-field>
    <b-field label="Ajouter des réponses">
      <b-taginput
        v-model="answers"
        ellipsis
        icon="label"
        placeholder="Ajouter une réponse"
      >
      </b-taginput>
    </b-field>
    <b-field>
      <button class="button" @click="createPoll">Créer</button>
    </b-field>
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
          is_active: true,
          token: randomString({ length: 20 }),
          // timestamp: db.FieldValue.serverTimestamp,
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
    searchEmail() {
      this.$firestoreRefs.polls;
    }
  }
};
</script>

<style></style>

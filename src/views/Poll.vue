<template>
  <div>
    <nav class="navbar" role="navigation">
      <div class="navbar-item">
        <router-link to="/polls">Retour</router-link>
      </div>
    </nav>

    <div class="container">
      <p>
        Pour voter il suffit de classer vos préférences en les glissant-déposant
      </p>

      <h3 class="title">{{ poll.name }}</h3>
      <div class="panel">
        <SlickList lockAxis="y" v-model="answers" @input="onMove">
          <SlickItem
            class="panel-block"
            v-for="(answer, index) in answers"
            :index="index"
            :key="index"
          >
            <span class="panel-icon"> {{ index + 1 }} </span> {{ answer.value }}
          </SlickItem>
        </SlickList>
      </div>
      <button @click="saveAnswers" class="button">Valider</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { SlickList, SlickItem } from "vue-slicksort";

import { db } from "@/firebase";

export default {
  name: "Poll",
  components: {
    SlickList,
    SlickItem
  },
  data() {
    return {
      answers: []
    };
  },
  async mounted() {
    const poll = await this.fetchPoll(this.$route.params.id);

    if (!poll.users.includes(this.userId)) {
      this.$router.push({ name: "polls_list" });
    }

    this.answers = poll.answers.map((answer, index) => ({
      position: index + 1,
      value: answer
    }));
  },
  methods: {
    ...mapActions("poll", ["fetchPoll"]),
    ...mapActions("app", ["addNotification"]),
    onMove(inputs) {
      this.answers = inputs.map((input, index) => ({
        ...input,
        position: index + 1
      }));
    },
    saveAnswers() {
      const pollId = this.$route.params.id;
      const userId = this.userId;
      db.collection("answers")
        .doc(`${pollId}${userId}`)
        .set({
          poll_id: pollId,
          user_id: userId,
          answers: this.answers
        })
        .then(() => {
          this.addNotification({
            text: "Merci de ton vote",
            status: "success"
          });

          this.$router.push({
            name: "polls"
          });
        });
    }
  },
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapState({
      poll: state => state.poll.current,
      userId: state => state.user.id
    })
  }
};
</script>

<style></style>

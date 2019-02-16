<template>
  <div>
    <div>
      <p>
        Pour voter il suffit de classer vos préférences en les glissant-déposant
      </p>

      <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <SortableList lockAxis="y" v-model="answers" @input="onMove">
              <SortableItem
                v-for="(answer, index) in answers"
                :index="index"
                :key="index"
                :answer="answer"
              >
              </SortableItem>
            </SortableList>
          </v-card>
        </v-flex>
      </v-layout>
      <v-btn @click="saveAnswers" color="info">Valider</v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SortableList from "../components/SortableList";
import SortableItem from "../components/SortableItem";
import { db } from "@/firebase";

export default {
  name: "Poll",
  components: {
    SortableList,
    SortableItem
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
          pollId: pollId,
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

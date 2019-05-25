<template>
  <div>
    <div>
      <p class="text-xl">
        Pour voter il suffit de classer vos préférences en les glissant-déposant
        :
      </p>

      <SortableList
        class="mt-6 mx-auto w-1/2"
        lockAxis="y"
        v-model="answers"
        @input="onMove"
      >
        <SortableItem
          v-for="(answer, index) in answers"
          :index="index"
          :key="answer.rank"
          :answer="answer"
        ></SortableItem>
      </SortableList>

      <div class="w-full mt-10 px-3 flex justify-center">
        <button
          class="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="saveAnswers"
        >
          Voter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SortableList from "../components/SortableList";
import SortableItem from "../components/SortableItem";
import { db } from "../firebase";

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

    this.answers = poll.answers.map((answer, index) => {
      return {
        rank: index + 1,
        ...answer
      };
    });
  },
  methods: {
    ...mapActions("poll", ["fetchPoll"]),
    ...mapActions("app", ["addNotification"]),
    onMove(inputs) {
      this.answers = inputs.map((input, index) => {
        return {
          ...input,
          rank: index + 1
        };
      });
    },
    saveAnswers() {
      const pollId = this.$route.params.id;
      const userId = this.userId;

      db.collection("polls")
        .doc(pollId)
        .collection("answers")
        .doc(userId)
        .set({
          answers: this.answers
        })
        .then(() => {
          this.addNotification({
            text: "Merci de ton vote",
            status: "success"
          });

          this.$router.push({
            name: "polls_list"
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

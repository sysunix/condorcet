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
          :value="answer.value"
        ></SortableItem>
      </SortableList>

      <div class="w-full mt-10 px-3 flex justify-center">
        <button
          class="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="vote"
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
import { createVote } from "../utils/request";

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
  computed: {
    ...mapGetters("user", ["userId"]),
    ...mapState({
      poll: state => state.poll.current,
      userId: state => state.user.id
    })
  },
  async mounted() {
    this.setPoll(this.$route.params.id);

    if (!this.poll.users.includes(this.userId)) {
      this.$router.push({ name: "polls_list" });
    }

    this.answers = this.poll.answers.map((answer, index) => {
      return {
        rank: index + 1,
        ...answer
      };
    });
  },
  methods: {
    ...mapActions("poll", ["setPoll"]),
    ...mapActions("app", ["addNotification"]),
    onMove(inputs) {
      this.answers = inputs.map((input, index) => {
        return {
          ...input,
          rank: index + 1
        };
      });
    },
    async vote() {
      const pollId = this.$route.params.id;
      const userId = this.userId;

      try {
        await createVote({ vote: this.answers }, pollId, userId);

        this.addNotification({
          text: "Merci de ton vote",
          status: "success"
        });

        this.$router.push({
          name: "polls_list"
        });
      } catch (error) {
        this.addNotification({
          text: "Il y a eu un problème",
          status: "error"
        });
      }
    }
  }
};
</script>

<style></style>

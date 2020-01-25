<template>
  <Loader :processing="processing">
    <Empty
      :condition="userPolls.length === 0"
      :text="$t('empty.userPolls.text')"
      :action-text="$t('empty.userPolls.action')"
      to="/polls/new"
    />

    <div class="flex">
      <div class="flex flex-wrap w-full">
        <div
          v-for="poll in userPolls"
          :key="poll.id"
          class="w-full md:w-1/2 lg:w-1/3 py-2"
        >
          <Card
            class="md:mx-2"
            v-bind="poll"
            :user-id="userId"
            @onShare="copyMagicLink"
            @onToggleStatus="togglePoll"
            @onDelete="deletePoll"
            @onLeave="leavePoll"
          />
        </div>
      </div>
    </div>
  </Loader>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { mapActions, mapGetters } from "vuex";
import { db } from "../firebase";
import Card from "../components/Card.vue";
import Loader from "../components/Loader.vue";
import Empty from "../components/Empty.vue";

@Component({
  components: {
    Card,
    Loader,
    Empty
  }
})
export default class PollsList extends Vue {
  processing: boolean = false;

  @Getter("user/userId") userId: any;
  @Getter("poll/userPolls") userPolls: any;

  @Action("app/addNotification") addNotification: any;
  @Action("poll/listenPolls") listenPolls: any;
  @Action("poll/removePoll") removePoll: any;

  mounted() {
    this.listenPolls(this.userId);
  }

  async togglePoll(id: string) {
    try {
      const document = db.collection("polls").doc(id);
      const currentPollState: any = (await document.get()).data();

      const newPollState = {
        ...currentPollState,
        isActive: !currentPollState.isActive
      };

      document.set(newPollState);
    } catch (error) {
      this.addNotification({
        text: `Il y a eu un problème`,
        status: "error"
      });
    }
  }

  async leavePoll(id: string) {
    if (confirm("Tu veux quitter ce scrutin ?") === false) {
      return;
    }

    const poll: any = (
      await db
        .collection("polls")
        .doc(id)
        .get()
    ).data();

    const users = poll.users.filter((user: any) => user !== this.userId);

    db.collection("polls")
      .doc(id)
      .set({ ...poll, users });

    this.removePoll(id);

    this.addNotification({
      text: `Tu as bien quitté le scrutin ${poll.question}`,
      status: "info"
    });
  }

  deletePoll(id: string) {
    if (confirm("Confirmer le suppression ?") === false) {
      return;
    }

    try {
      db.collection("polls")
        .doc(id)
        .delete();

      this.removePoll(id);

      this.addNotification({
        text: "Le scrutin  a bien été supprimé",
        status: "info"
      });
    } catch (error) {
      this.addNotification({
        text: `Il y a eu un problème lors de la suppression de ${name}`,
        status: "error"
      });
    }
  }

  async copyMagicLink(id: string) {
    const poll = this.userPolls.find((poll: any) => poll.id === id);
    const link = `${window.location.origin}/polls/${poll.id}/join?token=${poll.token}`;

    try {
      await this.$copyText(link);
      this.addNotification({
        text: "Lien copié, partage le avec tes AMIS",
        status: "info"
      });
    } catch (error) {
      this.addNotification({
        text: "Réessaye de copier le lien, stp bogass",
        status: "error"
      });
    }
  }
}
</script>

<style></style>

<template>
  <div class="Notification">
    <transition-group name="Transition" tag="p">
      <div
        v-for="(notification, key) in notifications"
        :key="notification.id"
        :data-testid="`notification-${key}`"
        :value="true"
        :type="notification.status"
        class="mt-2 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p>{{ notification.text }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Notifications extends Vue {
  @Prop({ type: Array, required: true }) readonly notifications!: Array<object>;
}
</script>

<style scoped>
.Transition-enter-active,
.Transition-leave-active {
  transition: all 0.3s;
}
.Transition-enter,
.Transition-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.Notification {
  padding: 10px;
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
}
.Notification__Item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  width: 250px;
  background: rgba(10, 10, 10, 0.7);
  color: white;
  height: 50px;
  border-radius: 3px;
  margin-bottom: 10px;
}
</style>

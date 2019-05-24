<template>
  <div class="Notification">
    <transition-group name="Transition" tag="p">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :value="true"
        :type="notification.status"
      >
        {{ notification.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    notifications: { type: Array }
  }
};
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

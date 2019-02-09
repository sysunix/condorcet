<template>
  <div class="Debug">
    <router-link class="Debug__Link" to="/">Home</router-link> |
    <router-link class="Debug__Link" to="/about">About</router-link> |
    <router-link class="Debug__Link" to="/polls">Rooms</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.Debug {
  position: fixed;
  bottom: 0;
  height: 50px;
  background: rgb(81, 90, 212);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
}
.Debug__Link {
  color: white;
  margin: 0 15px;
}
</style>

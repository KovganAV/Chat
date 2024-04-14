<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: lightblue;
}

a {
  text-decoration: none;
  color: #4796ff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.svg-inline--fa {
  color: lightblue !important;
}

.error-window {
  color: red;
  font-weight: bold;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid red;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
}
</style>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.button {
  max-width: 400px;
  padding: 10px;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  color: #ffffff;
  font-size: 24px;
  border-radius: 5px;
  background-color: #4796ff;
  border: none;
  cursor: pointer;
  transition: 0.2s linear;

  &:hover {
    border-radius: 15px;
  }
}
</style>

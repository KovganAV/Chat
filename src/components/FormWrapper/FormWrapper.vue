<template>
  <div class="form-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.form-wrapper {
  max-width: 600px;
  height: 550px;
  background-color: #ffffff;
  border-radius: 15px;
  padding-top: 15px;
  box-sizing: border-box;
}
</style>

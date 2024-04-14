<template>
  <input
    class="input"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :type="props.type"
    @input="handleChangeInput"
  />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

interface Props {
  placeholder: string;
  modelValue: string;
  type: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

function handleChangeInput(event: Event):void {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.input {
  background-color: #f9f9f9;
  border-radius: 15px;
  outline: none;
  border: none;
  font-size: 20px;
  padding-left: 10px;
  box-sizing: border-box;
  transition: 0.8s linear;
  border: 1px solid lightblue;

  &:focus {
    border: 1px solid gray;
    background-color: #ffffff;
  }
}
</style>

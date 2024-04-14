<template>
  <div class="password-input">
    <input
      class="password-input-input"
      :value="props.modelValue"
      :type="getInputType"
      :placeholder="placeholder"
      @input="handleChangeInput"
    />
    <font-awesome-icon
      v-if="isShowed"
      icon="fa-solid fa-eye-slash"
      @click="handleClickIcon"
    />
    <font-awesome-icon
      v-else
      icon="fa-solid fa-eye"
      @click="handleClickIcon"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from "vue";

interface Props {
  modelValue: string;
  placeholder: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const isShowed = ref<boolean>(false);

const getInputType = computed<string>(() => !isShowed.value ? "password" : "text");

function handleChangeInput(event: Event):void {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function handleClickIcon():void {
  isShowed.value = !isShowed.value;
}
</script>

<style lang="scss" scoped>
.password-input {
  position: relative;

  &-input {
    width: 100%;
    height: 100%;
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

  .fa-eye {
    position: absolute;
    right: 10px;
    top: 2px;
    cursor: pointer;
    width: 24px;
    height: 36px;

    &:hover {
      color: #0650d0;
    }
  }

  .fa-eye-slash {
    position: absolute;
    right: 10px;
    top: 2px;
    cursor: pointer;
    width: 24px;
    height: 36px;

    &:hover {
      color: #0650d0;
    }
  }
}
</style>

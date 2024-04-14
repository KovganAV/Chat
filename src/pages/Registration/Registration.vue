<template>
  <Wrapper>
    <FormWrapper class="centered-wrapper">
      <Logo />
      <h1 class="heading">Create an account</h1>
      <p class="title">
        Already have an account?
        <router-link to="/login">
          Sign in
        </router-link>
      </p>
      <div class="inputs">
        <Input
          v-model="name"
          class="inputs-input"
          placeholder="Nickname"
          type="text"
        />
        <div class="inputs-small">
          <PasswordInput
            v-model="password"
            class="inputs-input"
            placeholder="Password"
          />
          <PasswordInput
            v-model="confirmationPassword"
            class="inputs-input"
            placeholder="Confirmation password"
          />
        </div>
      </div>
      <div class="centered">
        <Button @click="handleRegister" @keydown.enter="handleRegister">
          Sign up
        </Button>
        <Transition name="fade">
          <p v-if="error" class="error">{{ error }}</p>
        </Transition>
      </div>
    </FormWrapper>
  </Wrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Wrapper from "@/components/Wrapper/Wrapper.vue";
import FormWrapper from "@/components/FormWrapper/FormWrapper.vue";
import Logo from "@/components/Logo/Logo.vue";
import Input from "@/components/Input/Input.vue";
import PasswordInput from "@/components/PasswordInput/PasswordInput.vue";
import Button from "@/components/Button/Button.vue";
import { register } from "@/api/user";
import router from "@/router";

const name = ref<string>("");
const confirmationPassword = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");

async function handleRegister():Promise<void> {
  try {
    await register(name.value, password.value, confirmationPassword.value);
    router.push({ name: "chat" });
    name.value = "";
    confirmationPassword.value = "";
    password.value = "";
  } catch (e) {
    error.value = "Something went wrong. Please try again later!";
    setTimeout(() => error.value = "", 3000);
  }
}
</script>

<style lang="scss" scoped>
.centered-wrapper {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.heading {
  text-align: center;
  margin-top: 45px;
}

.title {
  text-align: center;
  margin-bottom: 50px;
}

.inputs {
  max-width: 400px;
  margin: 0 auto;

  &-small {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
  }

  &-input {
    width: 100%;
    height: 40px;
  }
}

.centered {
  width: fit-content;
  margin: 0 auto;
}

.error {
  color: red;
  font-weight: bold;
}
</style>

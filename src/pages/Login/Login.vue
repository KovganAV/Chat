<template>
  <Wrapper>
    <FormWrapper class="centered-wrapper">
      <Logo />
      <h1 class="heading">Login to your account</h1>
      <p class="title">
        Don't have an account?
        <router-link to="/registration">
          Sign up
        </router-link>
      </p>
      <div class="inputs">
        <Input
          v-model="name"
          class="inputs-input"
          placeholder="Nickname"
          type="text"
        />
        <PasswordInput
          v-model="password"
          class="inputs-input"
          placeholder="Password"
        />
      </div>
      <div class="centered">
        <Button @click="handleLogin">Sign in</Button>
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
import { login } from "@/api/user";
import router from "@/router";

const name = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");

async function handleLogin(): Promise<void> {
  try {
    await login(name.value, password.value);
    router.push({ name: "chat" });
    name.value = "";
    password.value = "";
  } catch (e) {
    error.value = "Somethint went wrong. Please try again later!";
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
  margin-bottom: 50px;

  input:first-child {
    margin-bottom: 10px;
  }

  &-input {
    width: 100%;
    height: 40px;

    input {
      width: 100%;
      height: 40px;
    }
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

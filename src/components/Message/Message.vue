<template>
  <div
    :class="checkMessage"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div v-if="message.user_id !== user.id" class="name">
      {{ message.user_name }}
    </div>
    <div v-if="editing" class="editing-block">
      <Input v-model="updatedText" placeholder="" type="text" />
      <Button class="editing-block-button" @click="updateExistingMessage">Accept</Button>
    </div>
    <p v-if="!editing" class="text">{{ message.content }}</p>
    <p class="time">
    </p>
    <Transition name="fade">
      <div v-if="hover && message.user_id === user.id" class="actions">
        <font-awesome-icon
          v-if="!editing"
          icon="fa-solid fa-pen"
          @click="editMessage"
        />
        <font-awesome-icon icon="fa-solid fa-trash" @click="deleteExistingMessage" />
        <p
          v-if="editing"
          class="xmark"
          @click="editing = false"
        >
          ✖
        </p>
      </div>
    </Transition>
    <Transition name="fade">
      <p v-if="error" class="error-window">{{ error }}</p>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps, defineEmits } from "vue";
import { IMessage } from "@/pages/Chat/Chat.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { updateMessage, deleteMessage } from "@/api/message";
import { getUserFromStorage } from "@/helpers/user";

interface Props {
  message: IMessage
}

interface User {
  id: string;
  name: string;
  email: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["deleteMessage", "editMessage"]);

const hover = ref<boolean>(true);
const editing = ref<boolean>(false);
const updatedText = ref<string>("");
const error = ref<string>("");
const user = reactive<User>(JSON.parse(getUserFromStorage()));

const checkMessage = computed<string>(() => {
  return props.message.user_id === user.id ? "your-message" : "other-message";
});

function editMessage() {
  editing.value = true;
  updatedText.value = props.message.content;
}

async function updateExistingMessage() {
  try {
    const response = await updateMessage(props.message.id, user.id, updatedText.value);
    const data = await response.json();
    emit("editMessage");
    return data;
  } catch (e) {
    error.value = "Something went wrong!";
    setTimeout(() => error.value = "", 3000);
  }
}

async function deleteExistingMessage() {
  try {
    await deleteMessage(props.message.id, user.id);
    emit("deleteMessage");
  } catch (e) {
    error.value = "Something went wrong!";
    setTimeout(() => error.value = "", 3000);
  }
}
</script>

<style lang="scss" scoped>
.actions {
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  .fa-pen {
    &:hover {
      color: grey;
    }
  }
  .fa-trash {
    &:hover {
      color: grey;
    }
  }
}
.other-message {
  background-color: #F2F2F7;
  width: fit-content;
  max-width: 400px;
  height: fit-content;
  color: #000000;
  border-radius: 0 15px 15px 15px;
  padding: 10px;
  margin-right: auto;
  margin-left: 20px;
  margin-bottom: 20px;

  .name {
    font-weight: bold;
    margin-bottom: 10px;
    padding-left: 5px;
  }

  .text {
    margin: 0;
    padding-left: 5px;
    margin-bottom: 5px;
    margin-right: 50px;
  }

  .time {
    margin: 0;
    text-align: right;
    padding-right: 4px;
  }
}

.your-message {
  background-color: #007AFF;
  width: fit-content;
  max-width: 400px;
  height: fit-content;
  color: #ffffff;
  border-radius: 15px 0 15px 15px;
  padding: 10px;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 20px;

  .text {
    margin: 0;
    padding-left: 5px;
    margin-bottom: 5px;
    margin-right: 50px;
  }

  .time {
    margin: 0;
    text-align: right;
    padding-right: 4px;
  }
}

.editing-block {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;

  &-button {
    font-size: 16px;
    padding: 5px;
  }
}

.xmark {
  font-size: 18px;
  line-height: 18px;
  margin: 0;
  color: lightblue;
}
</style>

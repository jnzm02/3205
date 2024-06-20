<script setup lang="ts">
import { ref } from 'vue'
import {  type UserDto } from '@/dto'

import UserCard from '@/components/userCard.vue'

const email = ref('');
const phone = ref('');
const users = ref([] as UserDto[]);
const errorMessage = ref('');
const noResultsMessage = ref('Start Searching for Users');

const isLoading = ref(false);

const isValidMail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const checkValidCredentials = () => {
  if (!isValidMail(email.value)) {
    errorMessage.value = 'Invalid email';
  } else {
    errorMessage.value = '';
  }
}

const searchUser = async () => {
  if (!email.value) {
    errorMessage.value = 'Email is required';
    return;
  }
  if (!isValidMail(email.value)) {
    errorMessage.value = 'Invalid email';
    return;
  }
  const normalizedPhone = phone.value.replace(/-/g, '');
  if (normalizedPhone.length > 0 && normalizedPhone.length < 6) {
    errorMessage.value = 'Invalid Phone';
    return;
  }

  noResultsMessage.value = 'No Results were Found!';
  errorMessage.value = '';
  isLoading.value = true;
  const response = await fetch(`http://localhost:3000/find-users?email=${email.value}&number=${normalizedPhone}`);
  isLoading.value = false;
  const data = await response.json();
  console.log(data);
  users.value = data;
}
</script>

<template>
  <div class="input">
    <label>Email</label>
    <h4 v-if="errorMessage.length > 0">{{ errorMessage }}</h4>
    <input type="text" v-model="email" @input="checkValidCredentials">
    <label>Phone</label>
    <input type="text" v-model="phone" v-mask="'##-##-##'" placeholder="12-34-56">
    <button @click="searchUser">
      <div v-if="isLoading">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      <div v-else>      
        submit
      </div>
    </button>
  </div>
  <div class="result">
    <div v-if="users.length === 0">
      <h2>{{ noResultsMessage }}</h2>
    </div>
    <div v-else>
      <h2>Found {{ users.length }} users</h2>
      <user-card class="cards" v-for="user in users" :key="user.email+user.number" :user="user" />
    </div>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cards {
  margin-top: 1rem;
}

.lds-ring {
  /* change color here */
  color: white;
}
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}

h2 {
  color: hsla(160, 100%, 37%, 1);
}

h4 {
  color: red;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.result {
  overflow-y: scroll;
  scrollbar-width: 0;
}
</style>

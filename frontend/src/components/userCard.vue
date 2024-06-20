<template>
    <div class="card">
        <h2>{{ props.user.email }}</h2>
        <h4>{{ props.user.number }}</h4>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { type UserDto } from '@/dto';

const props = defineProps<{
    user: UserDto;
}>();

</script>

<style scoped>
.card {
    background: hsla(160, 100%, 37%, 1);
    border-radius: 20px;
    padding: 20px;
    width: 200px;
    display: flex;
    flex-direction: column;
    text-align: left;
    color: white;
}
</style>
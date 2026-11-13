<script setup>
defineProps({ items: Array });
defineEmits(['remove']);
</script>

<template>
  <div class="list-container">
    <div v-for="item in items" :key="item.id" class="card">
      <div class="card-content">
        <h4>{{ item.title }}</h4>
        <p>{{ item.body }}</p>
      </div>
      <button @click="$emit('remove', item.id)" class="btn-delete">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.list-container { display: flex; flex-direction: column; gap: 1rem; }
.card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; }
.btn-delete { background: #ef4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
</style>
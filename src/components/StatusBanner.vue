<script setup>
defineProps({ loading: Boolean, error: String, isEmpty: Boolean });
defineEmits(['retry']);
</script>

<template>
  <div v-if="loading" class="status-banner loading"><p>Cargando datos...</p></div>
  <div v-else-if="error" class="status-banner error"><p>⚠️ {{ error }}</p><button @click="$emit('retry')">Reintentar</button></div>
  <div v-else-if="isEmpty" class="status-banner empty"><p>No hay registros disponibles.</p></div>
</template>

<style scoped>
.status-banner { padding: 1.5rem; text-align: center; border-radius: 6px; margin: 1rem 0; }
.loading { background: #f1f5f9; color: #475569; }
.error { background: #fee2e2; color: #991b1b; }
.empty { background: #fef3c7; color: #92400e; }
.error button { margin-top: 0.5rem; background: #dc2626; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
</style>
<script setup>
import { ref } from 'vue';
defineProps({ disabled: Boolean });
const emit = defineEmits(['submitItem']);

const title = ref('');
const body = ref('');

const handleSubmit = () => {
  if (!title.value.trim() || !body.value.trim()) return;
  emit('submitItem', { title: title.value, body: body.value, userId: 1 });
  title.value = '';
  body.value = '';
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="item-form">
    <h3>Agregar Nuevo Registro</h3>
    <div class="form-group">
      <input v-model="title" type="text" placeholder="Título..." :disabled="disabled" required />
    </div>
    <div class="form-group">
      <textarea v-model="body" placeholder="Descripción..." :disabled="disabled" required></textarea>
    </div>
    <button type="submit" :disabled="disabled">Guardar Registro</button>
  </form>
</template>

<style scoped>
.item-form { background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1rem; }
input, textarea { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; }
button { background: #2563eb; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; }
button:disabled { background: #94a3b8; cursor: not-allowed; }
</style>
<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from '../services/apiService';
import ItemForm from '../components/ItemForm.vue';
import ItemList from '../components/ItemList.vue';
import StatusBanner from '../components/StatusBanner.vue';

const items = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

const loadData = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const data = await apiService.getItems('/posts?_limit=6');
    if (data) items.value = data;
  } catch (err) {
    errorMessage.value = err.message || 'Error de conexión.';
  } finally {
    isLoading.value = false;
  }
};

const handleAddItem = async (newItem) => {
  isLoading.value = true;
  try {
    const created = await apiService.createItem('/posts', newItem);
    items.value.unshift({ ...created, id: Date.now() });
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const handleRemoveItem = (id) => {
  items.value = items.value.filter(item => item.id !== id);
};

onMounted(loadData);
</script>

<template>
  <main class="home-view">
    <h2>Gestión de Registros API</h2>
    <ItemForm :disabled="isLoading" @submitItem="handleAddItem" />
    <StatusBanner :loading="isLoading" :error="errorMessage" :isEmpty="!isLoading && !errorMessage && items.length === 0" @retry="loadData" />
    <ItemList v-if="!isLoading && !errorMessage && items.length > 0" :items="items" @remove="handleRemoveItem" />
  </main>
</template>

<style scoped>
.home-view { max-width: 800px; margin: 0 auto; padding: 1.5rem; }
</style>
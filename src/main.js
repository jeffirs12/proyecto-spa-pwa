import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // <-- Asegúrate de tener esta línea

const app = createApp(App);

app.use(router); // <-- Asegúrate de tener esta línea
app.mount('#app');
// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('Service Worker registrado con éxito:', reg.scope))
      .catch((err) => console.error('Error al registrar el Service Worker:', err));
  });
}
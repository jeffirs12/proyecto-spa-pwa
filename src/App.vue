<script setup>
import { RouterLink, RouterView } from 'vue-router'; // <-- Esto es obligatorio
</script>

<template>
  <header class="navbar">
    <h1>Mi Proyecto Vue PWA</h1>
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/about">Acerca de</RouterLink>
    </nav>
  </header>
  
  <!-- Aquí se renderizan tus vistas (HomeView y AboutView) -->
  <RouterView /> 
</template>

<style>
body { font-family: Arial, sans-serif; margin: 0; background-color: #f8fafc; color: #1e293b; }
.navbar { background: #1e293b; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
.navbar nav a { color: #cbd5e1; text-decoration: none; margin-left: 1.5rem; font-weight: bold; }
.navbar nav a.router-link-active { color: white; border-bottom: 2px solid #38bdf8; }
</style>
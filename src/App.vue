<template>
  <div id="app">
    <BHeader />
    <router-view></router-view>
  </div>
</template>

<script setup>
import BHeader from './components/BHeader.vue'
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>

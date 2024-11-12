<script setup lang="ts"></script>

<template>
  <div class="stats-container">
    <div class="panel">
      <span>
        <h1>Statistiques</h1>
      </span>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  height: 100%;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.panel {
  padding: 0.5rem 2rem;
  margin: var(--panel-margin);
  border-radius: 1rem;
  background-color: var(--color-background);
  width: var(--panel-width);
}

.panel > span {
  text-align: center;
}
</style>

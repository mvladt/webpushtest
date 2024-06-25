<script setup>
import { ref, onMounted } from "vue";

/** @type {import("vue").Ref<ServiceWorkerRegistration>} */
const serviceWorkerRegistration = ref();

onMounted(async () => {
  serviceWorkerRegistration.value = await navigator.serviceWorker.getRegistration();
});
</script>

<template>
  <div>
    <h2>ServiceWorker</h2>

    <template v-if="serviceWorkerRegistration">
      <p>
        Status: <b>{{ serviceWorkerRegistration.active.state }}</b>
      </p>
      <p>
        Path:
        <a :href="serviceWorkerRegistration.active.scriptURL">
          {{ serviceWorkerRegistration.active.scriptURL }}
        </a>
      </p>
    </template>

    <template v-else>ServiceWorkerRegistration не найдено...</template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { urlBase64ToUint8Array } from "../helpers.js";

/** @type {import("vue").Ref<ServiceWorkerRegistration>} */
const serviceWorkerRegistration = ref();
/** @type {import("vue").Ref<PushManager>} */
const pushManager = ref();
/** @type {import("vue").Ref<PushSubscription>} */
const pushSubscription = ref(null);

const subscriptionConfig = {
  userVisibleOnly: true,
  applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
    ? urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
    : null,
};

onMounted(async () => {
  serviceWorkerRegistration.value = await window.navigator.serviceWorker.getRegistration();

  if (serviceWorkerRegistration) {
    pushManager.value = serviceWorkerRegistration.value.pushManager;
    pushSubscription.value = await pushManager.value.getSubscription();
  }
});

const onSubscribe = async () => {
  try {
    pushSubscription.value = await pushManager.value.subscribe(subscriptionConfig);
    alert("Вы подписались на push.");
  } catch (error) {
    alert(`Error in PushThings.vue: ${error.message}`);
    throw error;
  }
};

const onUnsubscribe = async () => {
  try {
    if (await pushSubscription.value.unsubscribe()) alert("Вы отписались от push.");
    else alert("Что-то пошло не так...");

    pushSubscription.value = null;
  } catch (error) {
    alert(`Error in PushThings.vue: ${error.message}`);
    throw error;
  }
};
</script>

<template>
  <div>
    <h2>PushManager</h2>

    <template v-if="serviceWorkerRegistration">
      <p>
        PushSubscription: <code>{{ pushSubscription || "null" }}</code>
        <br />
        <button v-if="!pushSubscription" @click="onSubscribe">Подписаться</button>
        <button v-if="pushSubscription" @click="onUnsubscribe">Отписаться</button>
      </p>
    </template>

    <template v-else>ServiceWorkerRegistration не найдено...</template>
  </div>
</template>

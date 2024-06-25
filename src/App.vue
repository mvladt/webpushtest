<script setup>
import { ref } from "vue";
import PushThings from "./components/PushThings.vue";
import ServiceWorkerThing from "./components/ServiceWorkerThings.vue";

const isSecureContext = ref(window.isSecureContext);
/** @type {import("vue").Ref<NotificationPermission>} */
const notificationPermission = ref(Notification.permission);

const notificationTitle = ref();

const getPermission = (event) => {
  Notification.requestPermission()
    .then((result) => (notificationPermission.value = result))
    .catch((error) => {
      alert(`Error in App.vue->getPerrmission: ${error.message}`);
      throw error;
    });
};

const doNotification = (event) => {
  // new Notification(notificationTitle.value);
  navigator.serviceWorker.getRegistration().then((registration) =>
    registration.showNotification(notificationTitle.value).catch((error) => {
      alert(`Error in App.vue->doNotification(): ${error.message}`);
      throw error;
    })
  );
};
</script>

<template>
  <div>
    <h1>Параметры</h1>
    <p>
      Secure context: <b>{{ isSecureContext }}</b>
    </p>

    <h2>Notification API</h2>
    <p>
      Notification permission: <b>{{ notificationPermission }}</b> <br />
      <button @click="getPermission">Запрос разрешения</button>
    </p>
    <p>
      Сделать уведомление с текстом: <form @submit.prevent="doNotification"><input type="text" v-model="notificationTitle" /> <br />
      <button>Пуск</button></form>
    </p>

    <ServiceWorkerThing />
    <PushThings />
  </div>
</template>

<style>
code {
  font-size: smaller;
}
</style>

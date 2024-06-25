import { createApp } from "vue";
import App from "./App.vue";

const key = import.meta.env.VITE_VAPID_PUBLIC_KEY;

if (!key) {
  alert("Не задан VAPID public key. Он нужен для работы Push API.");
}

navigator.serviceWorker.register("sw.js").then((registration) => {
  if (registration.installing) {
    console.log("Service worker installing.");
  } else if (registration.waiting) {
    console.log("Service worker installed.");
  } else if (registration.active) {
    console.log("Service worker active.");
  }

  registration.showNotification("Service Worker registration!").catch((error) => {
    alert(`Error in main.js 2: ${error.message}`);
    throw error;
  });
});

createApp(App).mount("#app");

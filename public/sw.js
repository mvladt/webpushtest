self.addEventListener("activate", (event) => {
  console.log("Activate!");
});

self.addEventListener("install", (event) => {
  console.log("Install!");
  self.skipWaiting();
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click!");
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification close!");
});

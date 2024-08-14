import createApp from "./app";
// Main fail for virtual store API
const app = createApp();
const APP_VER = process.env.APP_VERSION;
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  console.log(`Ecommerce API ${APP_VER} running on ${HOST}:${PORT}`);
});

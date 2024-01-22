import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import i18n from "./i18n/configI8n"
import "sharedLibrary/mainStyle"
import globalComponents from "./globalComponents"
import filters from "sharedLibrary/filters"

const app = createApp(App)

app.use(router)
app.use(globalComponents)
app.use(i18n)
app.mount("#app")

app.config.globalProperties.$filters = filters

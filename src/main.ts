import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css';
import { Image as VanImage } from 'vant';
import { createMemoryHistory, createRouter } from 'vue-router'
import routes from "./config/route.ts";
import { Col, Row } from 'vant';

// 创建路由器实例
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})


const app = createApp(App);
// app.use(Button);
// app.use(NavBar);
// app.use(Toast);
app.use(Col);
app.use(Row);
app.use(Vant)
app.use(VanImage)
app.use(router)
app.mount('#app');

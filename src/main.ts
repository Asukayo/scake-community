import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css';
import { Image as VanImage } from 'vant';


const app = createApp(App);
// app.use(Button);
// app.use(NavBar);
// app.use(Toast);
app.use(Vant)
app.use(VanImage)
app.mount('#app');

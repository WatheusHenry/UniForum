import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'
import router from './router'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Aura from '@primevue/themes/aura';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Menu from 'primevue/menu';
import Image from 'primevue/image';


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.component('InputText', InputText);
app.component('Button', Button);
app.component('FloatLabel', FloatLabel);
app.component('Password', Password);
app.component('Menu', Menu);
app.component('Image', Image);


app.use(router)

app.mount('#app')

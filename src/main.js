import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBackward, faPlay, faForward, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App);

library.add(faBackward, faPlay, faForward, faPause);
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.productionTip = false;

app.use(store).mount('#app')

import './bootstrap';

import {createApp} from 'vue';
import store from './store.js';
import router from './router.js';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import main_page from './components/main_page.vue';

toastr.options.newestOnTop = true
toastr.options.closeButton = true
toastr.options.timeOut = 5000
window.toastr = toastr

const app = createApp({})
app.component('main_page', main_page)
app.use(store)
app.use(router)
app.mount('#app')
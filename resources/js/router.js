import {createWebHistory, createRouter} from 'vue-router';
import home from './pages/home.vue';
import show_first_table_data from './pages/show_first_table_data.vue';
import store_data_in_second_table from './pages/store_data_in_second_table.vue';
import show_second_table_data from './pages/show_second_table_data.vue';
import pageNotFound from './pages/errors/404.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: home
	},
	{
		path: '/show-first-table-data',
		name: 'Show-First-Table-Data',
		component: show_first_table_data
	},
    {
		path: '/store-data-in-second-table',
		name: 'Store-Data-In-Second-Table',
		component: store_data_in_second_table
	},
	{
		path: '/show-second-table-data',
		name: 'Show-Second-Table-Data',
		component: show_second_table_data
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: pageNotFound
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
export default router
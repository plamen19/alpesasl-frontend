import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../vistas/Inicio.vue'
import Maquinas from '../vistas/Maquinas.vue'
import Maquina from '../vistas/Maquina.vue'
import Operarios from '../vistas/Operarios.vue'
import Operaciones from '../vistas/Operaciones.vue'
import Boletines from '../vistas/Boletines.vue'
import Logs from '../vistas/Logs.vue'
import Log from '../vistas/Log.vue'

const routes = [

	{
		path: '/',
		name: 'Inicio',
		component: Inicio
	},

	{
		path: '/maquinas',
		name: 'Maquinas',
		component: Maquinas
	},

	{
		path: '/maquina/:id',
		name: 'Maquina',
		component: Maquina,
		props: true,
	},

	{
		path: '/operarios',
		name: 'Operarios',
		component: Operarios
	},

	{
		path: '/operaciones',
		name: 'Operaciones',
		component: Operaciones
	},

	{
		path: '/boletines',
		name: 'Boletines',
		component: Boletines
	},

	{
		path: '/logs',
		name: 'Logs',
		component: Logs
	},

	{
		path: '/log/:de',
		name: 'Log',
		component: Log,
		props:true
	},

	{
		path: '/log/:de/error',
		name: 'LogError',
		component: Log,
		props:true
	},

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
	}
})

export default router

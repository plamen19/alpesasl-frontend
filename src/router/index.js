import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../vistas/Inicio.vue'
import Maquinas from '../vistas/Maquinas.vue'
import Maquina from '../vistas/Maquina.vue'
import Areas from '../vistas/Areas.vue'
import TiposMaquinas from '../vistas/TiposMaquinas.vue'
import CategoriasOperarios from '../vistas/CategoriasOperarios.vue'
import GruposOperarios from '../vistas/GruposOperarios.vue'
import Calendarios from '../vistas/Calendarios.vue'
import TiposIntervenciones from '../vistas/TiposIntervenciones.vue'
import MotivosIntervenciones from '../vistas/MotivosIntervenciones.vue'
import ActividadesIntervenciones from '../vistas/ActividadesIntervenciones.vue'
import Embalajes from '../vistas/Embalajes.vue'
import SubFamiliasEmbalajes from '../vistas/SubFamiliasEmbalajes.vue'
import Plantas from '../vistas/Plantas.vue'
import Operarios from '../vistas/Operarios.vue'
import Operaciones from '../vistas/Operaciones.vue'
import Operacion from '../vistas/Operacion.vue'
import Boletines from '../vistas/Boletines.vue'
import Logs from '../vistas/Logs.vue'
import Log from '../vistas/Log.vue'
import Notificaciones from '../vistas/Notificaciones.vue'
import Tavernes from '../vistas/Plantas/Tavernes.vue'

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
		path: '/areas',
		name: 'Areas',
		component: Areas,
	},

	{
		path: '/tipos-maquinas',
		name: 'TiposMaquinas',
		component: TiposMaquinas,
	},	

	{
		path: '/plantas',
		name: 'Plantas',
		component: Plantas
	},

	{
		path: '/operarios',
		name: 'Operarios',
		component: Operarios
	},

	{
		path: '/categorias',
		name: 'CategoriasOperarios',
		component: CategoriasOperarios,
	},	
	
	{
		path: '/grupos',
		name: 'GruposOperarios',
		component: GruposOperarios,
	},		

	{
		path: '/calendarios',
		name: 'Calendarios',
		component: Calendarios
	},

	{
		path: '/tipos-intervenciones',
		name: 'TiposIntervenciones',
		component: TiposIntervenciones
	},	

	{
		path: '/motivos-intervenciones',
		name: 'MotivosIntervenciones',
		component: MotivosIntervenciones
	},	

	{
		path: '/actividades-intervenciones',
		name: 'ActividadesIntervenciones',
		component: ActividadesIntervenciones
	},		

	{
		path: '/embalajes',
		name: 'Embalajes',
		component: Embalajes
	},

	{
		path: '/subfamilias-embalajes',
		name: 'SubFamiliasEmbalajes',
		component: SubFamiliasEmbalajes
	},	

	
	{
		path: '/operaciones',
		name: 'Operaciones',
		component: Operaciones
	},

	{
		path: '/operacion/:id',
		name: 'Operacion',
		component: Operacion,
		props: true,
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

	{
		path: '/log/:de/info',
		name: 'LogInfo',
		component: Log,
		props:true
	},

	{
		path: '/notificaciones',
		name: 'Notificaciones',
		component: Notificaciones
	},

	{
		path: '/plantas/Tavernes',
		name: 'Tavernes',
		component: Tavernes
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

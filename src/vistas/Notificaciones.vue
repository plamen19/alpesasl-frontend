<template>
	
	<div>

		<h3>Notificaciones</h3>
		<p>Centro de notificaciones. Consulta todo lo ocurrido en la fábrica.</p>

		<div v-if="notificaciones.length == 0">

			<p class="text-muted text-center mt-4">No hay notificaciones.</p>

		</div>
		<div v-else v-for="(not, index) in (notificaciones.sort( (a,b)=>{ return a.leida && !b.leida } ))" style="position:relative;" :key="index" :style="not.leida ? 'background-color:rgba(0,0,0,0.04);' : ''" class="box w-75 mx-auto">

		  	<span v-if="!not.leida" class="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle">
				<span class="visually-hidden">New alerts</span>
			</span>

			<span v-if="!not.leida" @click="()=>{ not.leida = true; }" class="tag is-light is-info position-absolute translate-middle" style="font-size:0.55em; z-index:1; top:0px; right:-30px; cursor:pointer;">Marcar como leída</span>

			<p><b>Máquina:</b> {{ not.cod }}</p>
			<p style="font-size:0.7em;">De <span :class="badgeEstados[not.estadoAntes] ? badgeEstados[ not.estadoAntes ] : 'tag'">{{ not.estadoAntes }}</span> a <span :class="badgeEstados[not.estadoNuevo] ? badgeEstados[ not.estadoNuevo ] : 'tag'">{{ not.estadoNuevo }}</span></p>

			<p style="font-size:0.8em;" class="text-muted">{{ (new Date(not.fecha)).toLocaleDateString( "es-ES" ) + " " + (new Date(not.fecha)).toLocaleTimeString( "es-ES" ) }}</p>
		</div>

	</div>

</template>

<script>
export default {
	
	name: 'Notificaciones',

	data(){

		return({
			notificaciones: [],
			badgeEstados: {

				'SIN ESTADO': 'tag is-light is-secondary',
				'PREPARACION': 'tag is-light is-info',
				'MARCHA': 'tag is-light is-success',
				'TEST PARO': 'tag is-light is-secondary',
				'PARO': 'tag is-light is-danger',
				'TEST MARCHA': 'tag is-light is-secondary',
				'DESCANSO': 'tag is-light is-primary',
				'LIMPIEZA': 'tag is-light is-primary',

			},			
		})

	},

	mounted(){
		
		this.notificaciones = JSON.parse( localStorage.getItem( "notificaciones" ) ).maquinas.sort( (a,b) => { return a.fecha < b.fecha } )

	}

}
</script>
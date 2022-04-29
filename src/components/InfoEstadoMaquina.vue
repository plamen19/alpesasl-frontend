<template>
	

	<span class="estado-maquina" v-if="estadoMaquina === 'Desconocido'"><span class="tag is-light is-secondary">Cargando estado...</span></span>
	<span class="estado-maquina" v-else><span style="font-size:0.8em;" :class="badgeEstados[estadoMaquina]">{{ estadoMaquina }}</span></span>


</template>

<script>
export default {
	
	name: 'InfoEstadoMaquina',

	props: [ 'estadoMaquina' ],

	data(){

		return({

			badgeEstados: {

				'SIN ESTADO': 'tag is-light is-secondary',
				'PREPARACION': 'tag is-light is-info',
				'MARCHA': 'tag is-light is-success',
				'TEST PARO': 'tag is-light is-secondary',
				'PARO': 'tag is-light is-danger',
				'TEST MARCHA': 'tag is-light is-secondary',
				'DESCANSO': 'tag is-light is-primary',
				'LIMPIEZA': 'tag is-light is-primary',
				"E.TUBO": 'tag is-light is-warning',

			},

		})

	}

}
</script>
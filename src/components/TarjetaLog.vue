<template>
	
	<div class="col-12 col-md-4 mb-4">

		<vs-card class="h-100">

			<h5><i :class="icono ? icono : ''"></i> {{ titulo }}</h5>
			<p>{{ desc }}</p>

			<router-link :to="'/log/' + tipoLog + '/info'"><el-button class="w-100 mb-2" type="primary" plain><i class="bi bi-info-circle-fill mr-2"></i> Info</el-button></router-link>
			<br>
			<router-link :to="'/log/' + tipoLog + '/error'"><el-button class="w-100 mb-2" type="danger" plain><i class="bi bi-x-circle-fill mr-2"></i> Errores</el-button></router-link>
			<br>
			<router-link :to="'/log/' + tipoLog"><el-button class="w-100" plain>Todos</el-button></router-link>
			
		</vs-card>


	</div>

</template>

<script>
export default {
	
	name: 'TarjetaLog',

	props: [ 'titulo', 'icono', 'desc', 'tipoLog' ],

	methods: {

		
	}

}
</script>

<style scoped>

a { text-decoration: none; }

</style>
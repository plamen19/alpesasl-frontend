<template>
	
	<div>

		<div class="row">

			<div v-for="operacion in operaciones" :key="operacion.idOperacion" class="col-12 col-sm-6 col-md-4">

				<vs-card>

					<h5 class="text-center">{{ operacion.codOperacion }}</h5>

					<vs-divider></vs-divider>

					<li><b>Orden:</b> {{ operacion.codOrden }}</li>
					<li><b>Familia:</b> {{ operacion.codFamilia }}</li>
					<li><b>Estado:</b> <span :class="operacion.EstadoOperacion == 1 ? 'tag is-light is-success' : 'tag is-light is-info'">{{ operacion.EstadoOperacion == 1 ? 'Finalizada' : 'En proceso' }}</span></li>
					<li><b>Descripcion:</b> {{ operacion.Descripcion }}</li>
					<li><b>Cantidad:</b> {{ operacion.CantidadOperacion }}</li>

					<br>

					<el-button type="primary" plain>Ver más...</el-button>

				</vs-card>

			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'ListaOperaciones',

	props: [ 'operaciones' ],

}
</script>

<style scoped>

	li{

		list-style: none;
		padding:5px;

	}

</style>
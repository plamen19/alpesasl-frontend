<template>
	
	<div class="col-12">

		<vs-card>

			<h3 style="font-weight:100;">{{ nombre }}</h3>
			<p><b>Máquinas:</b> {{ numMaquinas || 0 }}</p>
			<p><b>Estado:</b> <el-tag type="success">Activa</el-tag></p>
			<el-button type="success">Acceder</el-button>

		</vs-card>


	</div>

</template>

<script>
export default {
	
	name: 'TarjetaPlanta',

	props: [ 'nombre', "numMaquinas" ],

}
</script>
<template>
	
	<div>

		
		<el-button-group class="mt-2 mb-2">

			<el-button size="large" type="primary" class="p-3">Alta</el-button>
			<el-button size="large" type="primary" class="p-3">Baja</el-button>
			<el-button size="large" type="primary" class="p-3">Capacidad</el-button>

		</el-button-group>

		<el-button-group class="ml-2 mt-2 mb-2">



		</el-button-group>

		<div class="row">

			<div class="col-12 col-md-10">

				<table>

					<thead>

						<th>Cod.</th>
						<th>Operario</th>

					</thead>

					<tbody v-if="listaOperarios && listaOperarios.length > 0">

						<tr v-for="(operario, indice) in listaOperarios" :key="indice">
							
							<td>{{ operario.codOperario }}</td>
							<td>{{ operario.Operario }}</td>

						</tr>

					</tbody>

				</table>

			</div>
			<div class="col-12 col-md-2">

				<el-button size="large" type="primary" class="p-3 w-100" plain>Descanso</el-button>
				<br><br>
				<el-button size="large" type="primary" class="p-3 w-100" plain>Limpieza</el-button>
				<br><br>
				<el-button size="large" type="danger" class="p-3 w-100" plain>Paro</el-button>
				<br><br>
				<el-button size="large" type="warning" class="p-3 w-100" plain>Preparacion</el-button>
		
			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'ListaOperariosAlta',
	props: [ 'listaOperarios' ],

}
</script>

<style scoped>

	th, td{
		padding:10px;
	}

	.vs-button-line{
		padding:10px;
		margin-bottom: 10px;
	}

</style>
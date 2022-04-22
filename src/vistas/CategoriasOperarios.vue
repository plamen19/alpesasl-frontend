<template>
	
	<div>

		<h3>Categorías Operarios</h3>
		<p>Categorías de operarios creadas en el sistema.</p>

		<div class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód. Categoría</th>
					<th>Categoría</th>

				</thead>

				<tbody>

					<tr v-for="categoria in categorias" :key="categoria.idCategoria">

						<td>{{ categoria.idCategoria }}</td>
						<td>{{ categoria.codCategoria }}</td>
						<td>{{ categoria.Categoria }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'CategoriasOperarios',

	data(){
		return({
			categorias: []
		})
	},

	methods: {

		cargarCategoriasOperarios: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/operarios/categorias" ).then( res => {

				this.categorias = res.data

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar las categorías de los operarios. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarCategoriasOperarios();

	}

}
</script>
<template>
	
	<div>

		<h3>Subfamílias Embalajes</h3>
		<p>Subfamílias de embalajes creadas en la base de datos.</p>

		<div v-if="subFamiliasEmbalajes.length > 0 && familiasEmbalajes.length > 0" class="table-responsive">

			<table class="table">

				<thead>

					<th>ID</th>
					<th>Cód.</th>
					<th>Subfamília</th>
					<th>Família</th>

				</thead>

				<tbody>

					<tr v-for="subfamilia in subFamiliasEmbalajes" :key="subfamilia.idSubFamiliaEmbalaje">

						<td>{{ subfamilia.idSubFamiliaEmbalaje }}</td>
						<td>{{ subfamilia.codSubFamiliaEmbalaje }}</td>
						<td>{{ subfamilia.SubFamiliaEmbalaje }}</td>
						<td>{{ (familiasEmbalajes.filter( el => { return el.idEmbalaje == subfamilia.idFamiliaEmbalaje } )[0].Embalaje || "?") }}</td>

					</tr>

				</tbody>

			</table>

		</div>

	</div>

</template>

<script>
import axios from 'axios';

export default {
	
	name: 'SubFamiliasEmbalajes',

	data(){
		return({
			subFamiliasEmbalajes: [],
			familiasEmbalajes: [],
		})
	},

	methods: {

		cargarSubFamilias: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/embalajes/subfamilias" ).then( res => {

				this.subFamiliasEmbalajes = res.data;

				axios.get( "http://" + process.env.VUE_APP_API + ":3000/embalajes/familias" ).then( res => {

					this.familiasEmbalajes = res.data;

				} ).catch( err => {

					console.log( "[ERROR] No se han podido cargar las famílias de los embalajes. Error detallado: " + err );

				} )

			} ).catch( err =>{

				console.log( "[ERROR] No se han podido obtener las subfamílias de los embalajes. Error detallado: " + err );

			} )

		}

	},

	mounted(){

		this.cargarSubFamilias();

	}

}
</script>
<template>
       <div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/employe.svg" alt="">

		<br><br>

              <h3>Operarios</h3>
              <p>Listado de todos los operarios registrados en el sistema. <span style="float:right; font-size:0.75em;" class="text-muted d-none d-md-inline-block d-xl-inline-block">Total {{ operarios.length }}</span></p>

		<el-alert v-if="operariosMostrar.length == 0 && textoBuscar.length > 0" class="mb-2" title="No se han encontrado resultados." type="error" />

		<div class="row">

			<div class="col-12 col-md-5">

				<input v-model="textoBuscar" @input="buscarOperario" placeholder="Nombre o código de operario" type="text" class="form-control">

			</div>

			<div class="col-12 col-md-6 mt-2 mt-md-0">

				<el-select @change="buscarOperario" placeholder="Grupo operarios" v-model="selectGrupo" size="large">

					<el-option
						key="0"
						label="Todos"
						value="0"
					/>
					<el-option
						v-for="grupo in gruposOperarios"
						:key="grupo.idGrupoOperarios"
						:label="grupo.GrupoOperarios"
						:value="grupo.idGrupoOperarios"
					/>					

				</el-select>

			</div>

		</div>

		<br>


		<div v-if="operariosMostrar.length > 0">
			<TarjetasOperarios :operarios="operariosMostrar" :gruposOperarios="gruposOperarios"/>
		</div>
		<div v-else-if="operarios && operarios.length > 0">
			<TarjetasOperarios :operarios="operarios" :gruposOperarios="gruposOperarios"/>
		</div>

       </div>
</template>

<script>
import axios from "axios";
import TarjetasOperarios from '../components/TarjetasOperarios.vue';

export default {
       components: { TarjetasOperarios },
       name: "Operarios",

       data() {
              return {
                     operarios: [],
			operariosMostrar: [],
			gruposOperarios: [],
			textoBuscar: '',
			selectGrupo: '',
              };
       },

       methods: {
              cargarOperarios: function (e) {
                     axios.get("http://"+ process.env.VUE_APP_API +":3000/operarios")
                            .then((res) => {
                                   this.operarios = res.data.sort( (a,b)=>{ return a.TUR !== b.TUR } );
                            })
                            .catch((err) => {
                                   console.log( "[ERROR] No se han podido cargar los operarios. Error detallado: " +  err );
                            });
              },

		cargarGruposOperarios: function(e){

			axios.get( "http://"+ process.env.VUE_APP_API +":3000/operarios/grupos" ).then( res => {

				res.data.forEach(grupo => {
					
					this.gruposOperarios.push( grupo );

				});

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los grupos de operarios. Error detallado: " + err );

			} )

		},

		buscarOperario: function(e){
			
			if( this.selectGrupo != 0 ){

				this.operariosMostrar = this.operarios.filter( el => {
					return ((el.Operario.toLowerCase()).includes( (this.textoBuscar.toLowerCase()) ) || (el.codOperario).includes(this.textoBuscar)) && el.idGrupoOperarios == this.selectGrupo
				} );

			}else{

				this.operariosMostrar = this.operarios.filter( el => {
					return ((el.Operario.toLowerCase()).includes( (this.textoBuscar.toLowerCase()) ) || (el.codOperario).includes(this.textoBuscar))
				} );

			}

		}

       },

       mounted() {
		this.cargarGruposOperarios();
              this.cargarOperarios();
       },
};
</script>
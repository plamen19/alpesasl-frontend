<template>
       <div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/employe.svg" alt="">

		<br><br>

              <h3>Operarios</h3>
              <p>Listado de todos los operarios registrados en el sistema. <span style="float:right; font-size:0.75em;" class="text-muted d-none d-md-inline-block d-xl-inline-block">Total {{ operarios.length }}</span></p>

		<div v-if="operarios && operarios.length > 0">
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
			gruposOperarios: [],
              };
       },

       methods: {
              cargarOperarios: function (e) {
                     axios.get("http://192.168.1.10:3000/operarios")
                            .then((res) => {
                                   this.operarios = res.data.sort( (a,b)=>{ return a.TUR !== b.TUR } );
                            })
                            .catch((err) => {
                                   console.log( "[ERROR] No se han podido cargar los operarios. Error detallado: " +  err );
                            });
              },

		cargarGruposOperarios: function(e){

			axios.get( "http://192.168.1.10:3000/operarios/grupos" ).then( res => {

				res.data.forEach(grupo => {
					
					this.gruposOperarios[ grupo.idGrupoOperarios ] = grupo;

				});

			} ).catch( err => {

				console.log( "[ERROR] No se han podido cargar los grupos de operarios. Error detallado: " + err );

			} )

		}

       },

       mounted() {
		this.cargarGruposOperarios();
              this.cargarOperarios();
       },
};
</script>
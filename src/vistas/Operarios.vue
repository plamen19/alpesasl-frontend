<template>
       <div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/employe.svg" alt="">

		<br><br>

              <h3>Operarios</h3>
              <p>Listado de todos los operarios registrados en el sistema. <span style="float:right; font-size:0.75em;" class="text-muted d-none d-md-inline-block d-xl-inline-block">Total {{ operarios.length }}</span></p>

		<div class="row">

			<div v-for="operario in operarios" :key="operario.idOperario" class="col-12 col-sm-12 col-md-4">
				<div class="box">

					<article class="media">
						<div class="media-left">
							<figure class="image is-64x64">
								<img
									src="https://bulma.io/images/placeholders/128x128.png"
									alt="Image"
								/>
							</figure>
						</div>
						<div class="media-content">
							<div class="content">
								
								<p class="nombre-operario"><b>{{ operario.Operario }}</b></p>
								<li><b>ID:</b> {{ operario.idOperario }}</li>
								<li><b>Grupo:</b> [{{ gruposOperarios[ operario.idGrupoOperarios ].codGrupoOperarios }}] {{ gruposOperarios[ operario.idGrupoOperarios ].GrupoOperarios }}</li>
								<li><b>Turno:</b> {{ ( operario.TUR == "A" ? 'Mañana' : operario.TUR == 'B' ? 'Tarde' : 'Noche' ) }}</li>
								<li><b>Cod.:</b> {{ operario.codOperario }}</li>
						
							</div>

							<button class="button is-success is-small is-light"><i class="bi bi-search mx-1"></i> Ficha</button>
						</div>
					</article>

				</div>
			</div>

		</div>
       </div>
</template>

<script>
import axios from "axios";

export default {
       name: "Operarios",

       data() {
              return {
                     operarios: [],
			gruposOperarios: [],
              };
       },

       methods: {
              cargarOperarios: function (e) {
                     axios.get("http://localhost:3000/operarios")
                            .then((res) => {
                                   this.operarios = res.data.sort( (a,b)=>{ return a.TUR !== b.TUR } );
                            })
                            .catch((err) => {
                                   console.log( "[ERROR] No se han podido cargar los operarios. Error detallado: " +  err );
                            });
              },

		cargarGruposOperarios: function(e){

			axios.get( "http://localhost:3000/operarios/grupos" ).then( res => {

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

<style scoped>

	.nombre-operario{
		font-size: 0.7em;
	}

	li{

		list-style: none;

		font-size: 0.7em;

	}

	.box{

		margin-bottom: 20px;

	}

</style>
<template>
	
	<div>

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

							<button class="button is-info is-small is-light"><i class="bi bi-search mx-1"></i> Ficha</button>
						</div>
					</article>

				</div>
			</div>

		</div>

	</div>

</template>

<script>
export default {
	
	name: 'TarjetasOperarios',

	props: [ "operarios", "gruposOperarios" ],

}
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
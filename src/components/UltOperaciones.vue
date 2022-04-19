<template>

	<div>

		<div class="row">

			<div v-for="operacion in data" :key="operacion.idOperacion" class="col-12 col-sm-12 col-md-4 col-xl-4">

				<div class="card">

					<div class="card-header">

						<h5>{{ operacion.codOperacion }}</h5>

					</div>

					<div class="card-body">

						<li><b>Cliente:</b> {{ operacion.Cliente }}</li>
						<li><b>Pedido:</b> <span style="color:rgb(200,150,0);">{{ operacion.codPedido }}</span></li>
						<li><b>Población:</b> {{ operacion.PoblacionCliente }}</li>
						<li><b>Provincia:</b> {{ operacion.ProvinciaCliente }}</li>

						<br>

						<button class="button is-small is-light is-light"><i style="margin-right:5px;" class="bi bi-eye-fill"></i>Ver más...</button>

					</div>

				</div>

			</div>

		</div>

	</div>
	
</template>

<script>
export default {
	
	name: 'UltOperaciones',

	props: [ "data" ]

}
</script>

<style scoped>

	.card{

		margin-bottom:30px;

	}

	.col h5{

		font-size: 0.85em;

	}

	.card-header{

		background-color: rgba(42,42,46,0.8);
		color:#fff;

	}

	li{

		list-style:none;
		font-size: 0.7em;

		padding:5px;

	}

</style>
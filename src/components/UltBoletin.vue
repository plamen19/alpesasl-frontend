<template>
       <div>

		<div class="row">

			<div class="col">
				
				<div
					v-if="data && data.length > 0"
					class="card"
				>
					<div class="card-header">
						<h5>
							{{ data[0].DireccionCliente }}
						</h5>
					</div>

					<div class="card-body">
						<li>
							<b>Inicio:</b>
							<span class="tag is-light is-secondary">{{
								data[0].InicioBoletin
							}}</span>
						</li>

						<li>
							<b>Población:</b>
							{{ data[0].PoblacionCliente }}
						</li>
						<li>
							<b>Provincia:</b>
							{{ data[0].ProvinciaCliente }}
						</li>
						<li>
							<b>Calidad:</b>
							{{ data[0].codCalidad }}
						</li>
						<li>
							<b>Cod. Postal:</b>
							{{ data[0].codPostalCliente }}
						</li>
						<li>
							<b>Cod. Pedido:</b>
							{{ data[0].codPedido }}
						</li>
						<li>
							<b>Cod. Referencia:</b>
							{{
								data[0].codReferenciaCliente
							}}
						</li>
						<li>
							<b>Cod. Operacion:</b>
							{{ data[0].idOperacion }}
						</li>
						<li>
							<b>Disposición: </b>
							{{ data[0].Disposicion1 }}
						</li>
					</div>
				</div>

			</div>

		</div>

       </div>
</template>

<script>
export default {

       name: "UltBoletin",
       props: ["data"],

};
</script>

<style scoped>

	.card{

		margin-bottom:30px;

	}

	.col h5{

		font-size: 0.85em;

	}

	.card-header{

		background-color: rgba(100,150,100,0.2);

	}

	li{

		list-style:none;
		font-size: 0.7em;

		padding:5px;

	}

</style>
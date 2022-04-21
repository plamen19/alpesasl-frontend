<template>
	
	<div>

		<div class="row">

			

			<div v-for="maquina in (maquinasActualizadas ? maquinasActualizadas : data)" :key="maquina.idMaquina" class="col-12 col-sm-6 col-md-4">

				<div class="card">

					<div :class="maquina.PLC == 1 ? '' : 'sinplc'" class="card-header">

						<h5 class="p-1">{{ maquina.Maquina }}</h5>

					</div>

					<div class="card-body">

						<li><b>Planta</b>: {{ maquina.Planta }}</li>
						<li v-if="tiposMaquinas.length > 0"><b>Tipo:</b> {{ tiposMaquinas.filter( el => { return el.id == maquina.idTipoMaquina } )[0].nombre || "?" }}</li>
						<li><b>PLC:</b> <span :class="maquina.PLC == 1 ? 'tag is-success is-light' : 'tag is-danger is-light'">
							{{ maquina.PLC == 1 ? 'Activo' : 'Inactivo' }}	
						</span></li>
						<li><b>Ult. Boletín:</b> {{ maquina.UltimoBoletin ? maquina.UltimoBoletin : '?' }}</li>

						<br>
						
						<router-link :to="{ name: 'Maquina', params: { id: maquina.idMaquina } }" >

							<el-button class="w-25" type="success" plain>Acceder</el-button>

						</router-link>

					</div>

				</div>

			</div>

		</div>

		
	</div>

</template>

<script>
export default {

	name: 'ListaMaquinas',

	props: [ "data", "tiposMaquinas" ],
	
	data(){

		return({

			maquinasActualizadas: null,

		})

	},

	methods: {

		filtrarMaquinas: function( ndata ){

			this.maquinasActualizadas = ndata;

		}

	}

}
</script>

<style scoped>

	th,td{
		padding:20px;
	}

	a{
		text-decoration: none;
	}

	.card{

		margin-bottom: 50px;

		transition: all .3s;

	}

	.sinplc:hover{

		background-color: rgba(200,0,0,0.6);
		color: #fff;

	}

	.card:hover .card-header{

		background-color: rgba(0,0,0,0.85);
		color: #fff;

	}

	.card h5{
		font-size: 0.8em;
	}
	
	li{

		list-style-type: none;

		margin-bottom: 5px;

	}

	span{

		font-size: 0.85em;

	}

	.card-header{

		background-color: rgba(42, 42, 46, 0.8);
		color:#fff;

		transition: all .3s;

	}

	.card li{

		font-size: 0.8em;

	}

</style>
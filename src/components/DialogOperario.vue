<template>
	
	<el-dialog v-model="abierto" title="Operario" width="60%" center>
		<p>Introduce tu código de operario. Utiliza el teclado de la derecha para hacerlo. El botón <b>C</b> borra todo. La flecha
		es para borrar de uno en uno.</p>
		<br>

		<div class="row">

			<div class="col-12 col-md-8">

				<h5 class="text-muted d-none d-md-block">

					<b>Cód. Operario:</b> {{ codMarcado }}

				</h5>
				<p class="text-muted d-block d-md-none"><b>Cod. Operario:</b> {{ codMarcado }}</p>

			</div>

			<div class="col-12 col-md-4">

				<div @click="introducirDigito('1')" class="button w-25">1</div>
				<div @click="introducirDigito('2')" class="button w-25">2</div>
				<div @click="introducirDigito('3')" class="button w-25">3</div>
				<br>
				<div @click="introducirDigito('4')" class="button w-25">4</div>
				<div @click="introducirDigito('5')" class="button w-25">5</div>
				<div @click="introducirDigito('6')" class="button w-25">6</div>
				<br>
				<div @click="introducirDigito('7')" class="button w-25">7</div>
				<div @click="introducirDigito('8')" class="button w-25">8</div>
				<div @click="introducirDigito('9')" class="button w-25">9</div>
				<br>
				<div @click="resetearCodigo()" class="button w-25">C</div>
				<div @click="introducirDigito('0')" class="button w-25">0</div>
				<div @click="borrarDigito()" class="button w-25">←</div>

			</div>			

		</div>

		<template #footer>

			<span class="dialog-footer">
				<el-button @click="abierto = false">Cancelar</el-button>
				<el-button type="primary" @click="abierto = false">Aceptar</el-button>
			</span>

		</template>
	</el-dialog>

</template>

<script>
export default {
	
	name: 'DialogOperario',

	data(){
		return({
			abierto: false,
			codMarcado: "",
		})
	},

	methods: {

		introducirDigito: function(dig){

			if( this.codMarcado.length < 4 ){
				this.codMarcado = this.codMarcado + dig
			}

		},

		resetearCodigo: function(){
			this.codMarcado = "";
		},

		borrarDigito: function(){
			this.codMarcado = this.codMarcado.slice(0,-1);
		},

		abrirDialog: function(){
			this.abierto = true;
		}

	}

}
</script>

<style scoped>

	.button{

		margin: 5px

	}

</style>
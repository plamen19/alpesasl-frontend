<template>
	
	<div>

		<DialogOperario ref="dialog"/>
		
		<el-button-group class="mt-2 mb-2">

			<el-button @click="abrirDialogOperario()" size="large" type="primary" class="p-3">Alta</el-button>
			<el-button @click="abrirDialogOperario()" size="large" type="primary" class="p-3">Baja</el-button>
			<el-button @click="abrirDialogOperario()" size="large" type="primary" class="p-3">Capacidad</el-button>

		</el-button-group>


	</div>

</template>

<script>
import DialogOperario from './DialogOperario.vue';

export default {
	
	components: { DialogOperario },

	name: 'OpcionesEquipo',
	
	data(){
		return({
			necesitaOperario: false,
		})
	},

	methods: {

		abrirDialogOperario: function(){

			this.necesitaOperario = true;
			this.$refs.dialog.abrirDialog();

		}

	}

}
</script>
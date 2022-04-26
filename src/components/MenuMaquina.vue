<template>
	
	<div>

		<vs-card>

			<vs-button @click.stop="cambiarVentana(1)" color="primary" type="border">Máquina</vs-button>
			<br><br>
			<vs-button @click.stop="cambiarVentana(2)" color="primary" type="border">Equipo</vs-button>
			<br><br>
			<vs-button @click.stop="cambiarVentana(3)" color="primary" type="border">Boletín</vs-button>

		</vs-card>

		<vs-divider></vs-divider>

		<vs-card>

			<div v-if="submenus[Math.floor(ventanaActual)]">
				
				<div v-for="(boton, indice) in submenus[Math.floor(ventanaActual)]" :key="indice">

					<vs-button @click="cambiarVentana(boton.ventana)" :color="boton.color" :type="boton.tipo">{{ boton.texto }}</vs-button>

					<template v-if="indice !== submenus[Math.floor(ventanaActual)].length - 1"><br><br></template>

				</div>

			</div>

		</vs-card>		

	</div>

</template>

<script>
export default {

	name: 'MenuMaquina',

	data() {

		return( {

			ventanaActual: 1,
			
			submenus: {

				1: [ 
					{ texto: 'Preparación', color: 'warning', tipo: 'filled' }, 
					{ texto: 'Intervención', color: 'danger', tipo: 'filled' }
				],

				2: [ 
					{ texto: '% Merma', color: 'primary', tipo: 'filled', ventana: 2.1 }, 
					{ texto: 'Kgph', color: 'primary', tipo: 'filled', ventana: 2.2 },
					{ texto: 'OEE', color: 'primary', tipo: 'filled', ventana: 2.3 },
				],		
				
				3: [ 
					{ texto: 'Fabricación', color: 'primary', tipo: 'filled' }, 
					{ texto: 'Lotes', color: 'primary', tipo: 'filled' },
					{ texto: 'Rechazo', color: 'primary', tipo: 'filled' },
					{ texto: 'Calidad', color: 'warning', tipo: 'filled' },
					{ texto: 'Comentarios', color: 'warning', tipo: 'filled' },
					{ texto: 'Tiras', color: 'primary', tipo: 'filled' },
					{ texto: 'Tiras Teóricas', color: 'primary', tipo: 'filled' },
				],		

			}

		} )

	},

	methods: {

		cambiarVentana: function(ventana){

			this.ventanaActual = ventana; 
			this.$emit( 'cambiarVentana', this.ventanaActual );

		}

	}

}
</script>

<style scoped>

	.vs-button{

		width:100%;

	}

</style>
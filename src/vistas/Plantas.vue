<template>
	
	<div>

		<img style="width:30%; display:block; margin:0 auto;" src="../assets/plantas.svg" alt="">

		<br>

		<h3>Plantas</h3>
		<p>Plantas pertenecientes a la empresa. Consulta el estado de todas las máquinas de una planta en tiempo real.</p>

		<div class="row justify-content-center">

			<TarjetaPlanta nombre="Tavernes" :numMaquinas="34" />
			<TarjetaPlanta nombre="Tavernes Corte" :numMaquinas="2" />
			<TarjetaPlanta nombre="Barcelona" :numMaquinas="6" />
			<TarjetaPlanta nombre="Pte. Genil" :numMaquinas="8" />
			<TarjetaPlanta nombre="UPalet" :numMaquinas="1" />

		</div>


	</div>

</template>

<script>
import TarjetaPlanta from '../components/TarjetaPlanta.vue'

export default {
       components: { TarjetaPlanta },
	
	name: 'Plantas',

}
</script>
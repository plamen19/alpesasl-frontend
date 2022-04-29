<template>
	
	<div>

		<div v-if="error">

			<p class="text-muted text-center">La operación no existe.</p>

		</div>

		<vs-card style="padding:10px;" v-else>

			<h3>{{ datos.codOperacion }}</h3>

			<p><b>Calidad:</b> {{ datos.codCalidad }}</p>
			<p><b>Guardar muestra:</b> <span :class="datos.GuardarMuestra == 1 ? 'tag is-light is-success' : 'tag is-light is-danger'">{{ datos.GuardarMuestra == 1 ? 'Guardar' : 'No' }}</span></p>
			<p><b>Estado:</b> <span :class="datos.EstadoOperacion == 1 ? 'tag is-light is-info' : 'tag is-light is-success'">{{ datos.EstadoOperacion == 1 ? 'En proceso...' : 'Cerrada' }}</span></p>
			<p><b>Fecha validación:</b> <span v-if="datos.FechaValidacion">{{ datos.FechaValidacion }}</span><span v-else class="text-muted">No disponible todavía.</span></p>

			<br>

			<el-collapse>

				<el-collapse-item title="Códigos">

					<li><b>Cód. Operación:</b> {{ datos.codOperacion }}</li>
					<li><b>Cód. Orden:</b> {{ datos.codOrden }}</li>
					<li><b>Cód. Pedido:</b> {{ datos.codPedido }}</li>
					<li><b>Cód. Pedido Cliente:</b> {{ datos.codPedidoCliente }}</li>
					<li><b>Cód. Referencia Cliente:</b> {{ datos.codReferenciaCliente }}</li>
					<li><b>Cód. Fase:</b> {{ datos.codFase }}</li>
					<li><b>Cód. Referencia:</b> {{ datos.codReferencia }}</li>
					<li><b>Cód. Familia:</b> {{ datos.codFamilia }}</li>
					<li><b>Cód. Calidad:</b> {{ datos.codCalidad }}</li>

				</el-collapse-item>

				<el-collapse-item title="Cliente">

					<li><b>Cliente:</b> {{ datos.Cliente }}</li>
					<li><b>Descripción:</b> {{ datos.DescripcionCliente }}</li>
					<li><b>Dirección:</b> {{ datos.DireccionCliente }}</li>
					<li><b>Poblacion:</b> {{ datos.PoblacionCliente }}</li>
					<li><b>Provincia:</b> {{ datos.ProvinciaCliente }}</li>					
					<li><b>Cód. Postal:</b> {{ datos.codPostalCliente }}</li>					

				</el-collapse-item>

				<el-collapse-item title="Producto">

					<li><b>Descripción:</b> {{ datos.DescripcionCliente }}</li>
					<li><b>Cantidad:</b> {{ datos.CantidadOperacion }}</li>
					<li><b>Velocidad:</b> {{ datos.VelocidadOperacion }}</li>
					<li><b>Cortes:</b> {{ datos.numCortes }}</li>					
					<li><b>Cuchillas:</b> {{ datos.numCuchillas }}</li>					

				</el-collapse-item>

				<el-collapse-item title="Diámetros">

					<li><b>Interior:</b> {{ datos.DiametroInt }}</li>
					<li><b>Interior Min.:</b> {{ datos.DiametroIntMin }}</li>
					<li><b>Interior Max.:</b> {{ datos.DiametroIntMax }}</li>
					<li><b>Interior Com.:</b> {{ datos.DiametroIntCom }}</li>					
					<br>
					<li><b>Exterior:</b> {{ datos.DiametroExt }}</li>					
					<li><b>Exterior Min.:</b> {{ datos.DiametroExtMin }}</li>					
					<li><b>Exterior Max.:</b> {{ datos.DiametroExtMax }}</li>					
					<li><b>Exterior Com.:</b> {{ datos.DiametroExtCom }}</li>					

				</el-collapse-item>		

				<el-collapse-item title="Longitudes">

					<li><b>Longitud:</b> {{ datos.Longitud }}</li>
					<li><b>Longitud Min.:</b> {{ datos.LongitudMin }}</li>
					<li><b>Longitud Max.:</b> {{ datos.LongitudMax }}</li>
					<li><b>Longitud Com.:</b> {{ datos.LongitudCom }}</li>

				</el-collapse-item>		

				<el-collapse-item title="Peso">

					<li><b>Peso:</b> {{ datos.Peso }}</li>
					<li><b>Peso Min.:</b> {{ datos.PesoMin }}</li>
					<li><b>Peso Max.:</b> {{ datos.PesoMax }}</li>
					<li><b>Peso Com.:</b> {{ datos.PesoCom }}</li>

				</el-collapse-item>

				<el-collapse-item title="Espesor">

					<li><b>Espesor:</b> {{ datos.Espesor }}</li>
					<li><b>Espesor Min.:</b> {{ datos.EspesorMin }}</li>
					<li><b>Espesor Max.:</b> {{ datos.EspesorMax }}</li>
					<li><b>Espesor Com.:</b> {{ datos.EspesorCom }}</li>

				</el-collapse-item>

				<el-collapse-item title="Alas">

					<li><b>Ala1:</b> {{ datos.Ala1 }}</li>
					<li><b>Ala1 Min.:</b> {{ datos.Ala1Min }}</li>
					<li><b>Ala1 Max.:</b> {{ datos.Ala1Max }}</li>
					<br>
					<li><b>Ala2:</b> {{ datos.Ala2 }}</li>
					<li><b>Ala2 Min.:</b> {{ datos.Ala2Min }}</li>
					<li><b>Ala2 Max.:</b> {{ datos.Ala2Max }}</li>

				</el-collapse-item>	

				<el-collapse-item title="Base">

					<li><b>Base:</b> {{ datos.Base }}</li>
					<li><b>Base Min.:</b> {{ datos.BaseMin }}</li>
					<li><b>Base Max.:</b> {{ datos.BaseMax }}</li>

				</el-collapse-item>

				<el-collapse-item title="Resistencia">

					<li><b>Resistencia:</b> {{ datos.Resistencia }}</li>
					<li><b>Resistencia Min.:</b> {{ datos.ResistenciaMin }}</li>
					<li><b>Resistencia Max.:</b> {{ datos.ResistenciaMax }}</li>
					<li><b>Resistencia Com.:</b> {{ datos.ResistenciaCom }}</li>

				</el-collapse-item>

				<el-collapse-item title="Forro">

					<li><b>Color Forro Int.:</b> {{ datos.codColorForroInt }}</li>
					<li><b>Desc. Color Forro Int.:</b> {{ datos.descColorForroInt }}</li>
					<li><b>Desc. Color Forro Int. Com.:</b> {{ datos.descColorForroIntCom }}</li>
					<li><b>Tipo:</b> {{ datos.codTipoForroInt }}</li>
					<li><b>Desc. Tipo forro:</b> {{ datos.descTipoForroInt }}</li>
					<li><b>Desc. Tipo forro Int. Com.:</b> {{ datos.descTipoForroIntCom }}</li>
					<br>
					<li><b>Color Forro Ext.:</b> {{ datos.codColorForroExt }}</li>
					<li><b>Desc. Color Forro Ext.:</b> {{ datos.descColorForroExt }}</li>
					<li><b>Desc. Color Forro Ext. Com.:</b> {{ datos.descColorForroExtCom }}</li>
					<li><b>Tipo:</b> {{ datos.codTipoForroEct }}</li>
					<li><b>Desc. Tipo forro:</b> {{ datos.descTipoForroExt }}</li>
					<li><b>Desc. Tipo forro Ext. Com.:</b> {{ datos.descTipoForroExtCom }}</li>					

				</el-collapse-item>

				<el-collapse-item title="Muestras e Inspecciones">

					<li><b>Num. Muestras:</b> {{ datos.numMuestras }}</li>
					<li><b>Num. Inspecciones:</b> {{ datos.numInspecciones }}</li>

				</el-collapse-item>										

			</el-collapse>						

		</vs-card>

	</div>
	
</template>

<script>
import axios from 'axios';

export default {
	
	nmae: 'Operacion',

	data(){

		return({

			id: this.$route.params.id || null,
			datos: [],
			areas: [],
			error: false,

		})

	},

	methods: {

		cargarDatosOperacion: function(){

			axios.get( "http://" + process.env.VUE_APP_API + ":3000/operacion/" + this.id ).then( res => {

				if( res && res.data && res.data.length > 0 ){

					this.datos = res.data[0]

				}else{

					this.error = true;

				}

			} ).catch( err => {

				console.log( "[ERROR] No se han podido obtener los datos de la operación. Error detallado: " + err );

			} )

		},

	},

	mounted(){

		this.cargarDatosOperacion();

	}

}
</script>
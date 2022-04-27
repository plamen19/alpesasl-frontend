<template>
	
	<div>

		<el-button id="btn_arriba" style="position:fixed; z-index:1; right:20px; width:40px; height:40px; top:20px;" type="primary" plain circle>
			<el-icon><ArrowUpBold /></el-icon>
   		</el-button>

		<el-button id="btn_abajo" style="position:fixed; z-index:1; right:20px; width:40px; height:40px; bottom:20px;" type="primary" plain circle>
			<el-icon><ArrowDownBold /></el-icon>
   		</el-button>		   

	</div>

</template>

<script>
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'

export default {
	
	components: {

		ArrowDownBold,

		ArrowUpBold

	},

	name: 'BotonesScroll',

	data(){

		return({

			apretadoArriba: false,
			apretadoAbajo: false,

			interval_abajo: null,
			interval_arriba: null,

		})

	},

	methods: {

		enviarScrollAbajo: function(){

			if( this.apretadoArriba ){ this.apretadoArriba = false; }
			
			if( this.apretadoAbajo ){
					
				if( !this.interval_abajo ){
					
					let _self = this;

					this.interval_abajo = setInterval( function(){

						_self.enviarScrollAbajo();

					}, 50 );

				}else{

					this.$emit( "scrollAbajo" );

				}

			}else{
				
				clearInterval( this.interval_abajo );
				this.interval_abajo = null;

			}

		},

		enviarScrollArriba: function(){

			if( this.apretadoAbajo ){ this.apretadoAbajo = false; }

			if( this.apretadoArriba ){

				if( !this.interval_arriba ){
					
					let _self = this;

					this.interval_arriba = setInterval( function(){

						_self.enviarScrollArriba();

					}, 50 );

				}else{

					this.$emit( "scrollArriba" );

				}

			}else{
				
				clearInterval( this.interval_arriba );
				this.interval_arriba = null;

			}

		}

	},

	mounted(){

		let btn_arriba = document.getElementById( "btn_arriba" );
		let btn_abajo = document.getElementById( "btn_abajo" );
		let _self = this;

		btn_arriba.addEventListener( "mousedown", function(){ _self.apretadoArriba = true; _self.enviarScrollArriba() } )	
		btn_abajo.addEventListener( "mousedown", function(){ _self.apretadoAbajo = true; _self.enviarScrollAbajo() } )	

		document.addEventListener( "mouseup", function(){ _self.apretadoArriba = false; _self.apretadoAbajo = false; } )	

	}

}
</script>
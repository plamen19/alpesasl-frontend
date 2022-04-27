<template>
	
	<div>

		<el-button id="btn_arriba" style="position:fixed; right:20px; width:50px; height:50px; top:20px;" type="primary" plain circle>
			<el-icon><ArrowUpBold /></el-icon>
   		</el-button>

		<el-button id="btn_abajo" style="position:fixed; right:20px; width:50px; height:50px; bottom:20px;" type="primary" plain circle>
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

	mounted(){

		let btn_arriba = document.getElementById( "btn_arriba" );

	}

}
</script>
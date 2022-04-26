<template>
       <div style="position:relative;" class="container-fluid">
              <p type="button"
                     @click="abrirCerrarMenu()"
                     style="font-size: 2em; position: absolute; z-index:1;"
			:style="
				this.mostrarMenu ? 'left:70px;' : 'left:0px;'
			"
                     class="bi bi-list"
              ></p>

              <div class="row flex-nowrap">
                     <div class="col-1" :class="mostrarMenu ? '' : 'd-none'">
                            <Menu id="menu" />
                     </div>
                     <div :class="this.mostrarMenu ? 'mt-4 mt-md-0' : ''" class="col ml-2 ml-md-0">
                            <div class="container">
                                   <br />
                                   <router-view @cerrarMenu="()=>{ this.mostrarMenu = false }" />
                            </div>
                     </div>
              </div>
       </div>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
       components: { Menu },
       name: "App",
       data() {
              return {
                     mostrarMenu: true,
              };
       },
	methods:{
		abrirCerrarMenu: function(){
			this.mostrarMenu = !this.mostrarMenu;
		}
	},

};
</script>
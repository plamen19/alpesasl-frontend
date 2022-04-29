<template>
       <div style="position: relative" class="container-fluid">
              <BotonesScroll
                     class="d-none d-md-block"
                     @scrollArriba="scrollArriba()"
                     @scrollAbajo="scrollAbajo()"
              />

              <p
                     type="button"
                     @click="abrirCerrarMenu()"
                     style="font-size: 2em; position: absolute; z-index: 1"
                     :style="this.mostrarMenu ? 'left:70px;' : 'left:0px;'"
                     class="bi bi-list"
              ></p>

              <div class="row flex-nowrap">
                     <div class="col-1" :class="mostrarMenu ? '' : 'd-none'">
                            <Menu id="menu" />
                     </div>
                     <div
                            :class="this.mostrarMenu ? 'mt-4 mt-md-0' : ''"
                            class="col ml-2 ml-md-0"
                     >
                            <div class="container">
                                   <br />
                                   <router-view

                                          :menu="mostrarMenu"
                                          @cerrarMenu="
                                                 () => {
                                                        this.mostrarMenu = false;
                                                 }
                                          "
						@enviarEstadoNuevo="estadoNuevoMaquina"
                                   />
                            </div>
                     </div>
              </div>
       </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import BotonesScroll from "./components/BotonesScroll.vue";

export default {
       components: { Menu, BotonesScroll },

       name: "App",

       data() {
              return {
                     mostrarMenu: true,
              };
       },

       methods: {
              abrirCerrarMenu: function () {
                     this.mostrarMenu = !this.mostrarMenu;
              },

              scrollAbajo: function () {
                     window.scroll(0, window.scrollY + 150);
              },

              scrollArriba: function () {
                     window.scroll(0, window.scrollY - 150);
              },

		estadoNuevoMaquina: function( codmaq, anterior, nuevo ){

			let nots_maquinas = JSON.parse( localStorage.getItem( "notificaciones" ) ).maquinas || [];

			localStorage.setItem( "notificaciones", JSON.stringify( 

				{ maquinas: [ ...nots_maquinas, { cod: codmaq, estadoAntes: anterior, estadoNuevo: nuevo, fecha: new Date(), leida: false } ] } 
				
			) );

		}
       },

	setup(){

		if( !localStorage.getItem( "notificaciones" ) ){

			localStorage.setItem( "notificaciones", JSON.stringify( { maquinas: [] } ) )

		}

	}

};
</script>
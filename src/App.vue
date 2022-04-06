<template>
       <div class="container-fluid">
              <div class="row flex-nowrap">
                     <div
                            class="
                                   col-auto col-md-2 col-xl-2
                                   px-sm-1 px-xl-3 px-0
					menu
                            "
                     >
                            <div
                                   class="
                                          d-flex
                                          flex-column
                                          align-items-center
                                          align-items-sm-start
                                          px-3
                                          pt-2
                                          text-white
                                          min-vh-100
                                   "
                            >
                                   <a
                                          href="/"
                                          class="
                                                 d-flex
                                                 align-items-center
                                                 pb-3
                                                 mb-md-0
                                                 me-md-auto
                                                 text-white text-decoration-none
                                          "
                                   >
                                          <span class="fs-3 d-none d-sm-inline"
                                                 ><i class="bi bi-list mx-2"></i>Menú</span
                                          >
                                   </a>
                                   <ul
                                          class="
                                                 nav nav-pills
                                                 flex-column
                                                 mb-sm-auto mb-0
                                                 align-items-center
                                                 align-items-sm-start
                                          "
                                          id="menu"
                                   >
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(0)" to="/"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-0
                                                        "
                                                 >
                                                        <i
                                                               class="
                                                                      fs-10 bi-house mx-1
                                                               "
									:class="ubicacion === 0 ? 'text-success' : 'text-white'"
                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
                                                               >Inicio</span
                                                        >
                                                 </router-link>
                                          </li>
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(1)" to="/maquinas"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-0
                                                        "
                                                 >
                                                        <i
                                                               class="
										fs-10 bi-pc-display-horizontal mx-1
                                                               "
									:class="ubicacion === 1 ? 'text-success' : 'text-white'"

                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
                                                               >Maquinas</span
                                                        >
                                                 </router-link>
                                          </li>		
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(2)" to="/operarios"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-0
                                                        "
                                                 >
                                                        <i
                                                               class="
										fs-10 bi bi-people-fill mx-1
                                                               "
									:class="ubicacion === 2 ? 'text-success' : 'text-white'"

                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
                                                               >Operarios</span
                                                        >
                                                 </router-link>
                                          </li>		
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(3)" to="/boletines"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-0
                                                        "
                                                 >
                                                        <i
                                                               class="
										fs-10 bi bi-newspaper mx-1
                                                               "
									:class="ubicacion === 3 ? 'text-success' : 'text-white'"

                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
									
                                                               >Boletines</span
                                                        >
                                                 </router-link>
                                          </li>				
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(4)" to="/"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-0
                                                        "
                                                 >
                                                        <i
                                                               class="
										fs-10 bi bi-nut mx-1
                                                               "
									:class="ubicacion === 4 ? 'text-success' : 'text-white'"

                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
                                                               >Producción</span
                                                        >
                                                 </router-link>
                                          </li>		
                                          <li class="nav-item">
                                                 <router-link @click="cambiarUbicacion(4)" to="/"
                                                        href="#"
                                                        class="
                                                               nav-link
                                                               align-middle
                                                               px-1
                                                        "
                                                 >
                                                        <i
                                                               class="
										fs-10 bi bi-calendar
                                                               "
									:class="ubicacion === 4 ? 'text-success' : 'text-white'"

                                                        ></i>
                                                        <span
                                                               class="
                                                                      ms-1
                                                                      d-none
                                                                      d-sm-inline
                                                               "
                                                               >Operaciones</span
                                                        >
                                                 </router-link>
                                          </li>														
                                   </ul>
                            </div>
                     </div>
                     <div class="col py-3">
				<div class="container">
					<br />
					<router-view />
				</div>
                     </div>
              </div>
       </div>
</template>

<script>
export default {
	
	name: 'App',

	data(){

		return({

			ubicacion: 0,

		})

	},

	methods: {

		cambiarUbicacion: function(ubi){

			this.ubicacion = ubi;

		}

	}

}
</script>

<style scoped>

	@import url(https://fonts.googleapis.com/css?family=Open+Sans);
	
	a{

		text-decoration: none;

	}

	.menu{

		background-color: rgba(0,0,0,0.75);

		font-family: 'Open Sans', serif;

		font-size: 0.9em;

	}

	.menu a {
		color: rgba(255,255,255);
		font-size: 0.85em;
		margin-bottom: 10px;
	}

	.menu a:hover{
		color: white;
	}

</style>
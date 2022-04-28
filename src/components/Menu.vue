<template>
	
       <sidebar-menu :disableHover="true" style="height:100vh;" :collapsed="true" width="220px" :menu="menu" />

</template>

<script>
export default {
	
	name: 'Menu',

	data(){

		return({

                     menu: [

				{
					header: 'Alpesa SL - Gestión',
					hidden: false,
					hiddenOnCollapse: true,
				},
				
                            {
                                   href: "/",
                                   title: "Inicio",
                                   icon: "bi bi-house-fill",
                            },

                            {
                                   href: "/maquinas",
                                   title: "Maquinas",
                                   icon: "bi bi-pc-display",
					child: [
						{
							href: '/areas',
							title: 'Areas'
						},
						{
							href: '/tipos-maquinas',
							title: 'Tipos máquina'
						},						
					]
                            },	
                            {
                                   href: "/plantas",
                                   title: "Plantas",
                                   icon: "bi bi-diagram-3",
                            },					
                            {
                                   href: "/operarios",
                                   title: "Operarios",
                                   icon: "bi bi-people-fill",
					child: [

						{
							href: '/categorias',
							title: 'Categorias'
						},

						{
							href: '/grupos',
							title: 'Grupos'
						}						

					]
                            },
                            {
                                   href: "/calendarios",
                                   title: "Calendarios",
                                   icon: "bi bi-calendar4-week",
                            },
                            {
                                   title: "Intervenciones",
                                   icon: "bi bi-tools",
					child: [
					
						{
							href: '/tipos-intervenciones',
							title: 'Tipos'
						},
						{
							href: '/motivos-intervenciones',
							title: 'Motivos'
						},
						{
							href: '/actividades-intervenciones',
							title: 'Actividades'
						},																	

					]
                            },
                            {
                                   href: "/embalajes",
                                   title: "Embalajes",
                                   icon: "bi bi-box",
					child: [

						{
							href: '/subfamilias-embalajes',
							title: 'SubFamílias'
						},															

					]					
                            },													
                            {
                                   href: "/operaciones",
                                   title: "Operaciones",
                                   icon: "bi bi-journals",
                            },	
                            {
                                   href: "/boletines",
                                   title: "Boletines",
                                   icon: "bi bi-journal",
                            },
                            {
                                   href: "/logs",
                                   title: "Logs",
                                   icon: "bi bi-body-text",
                            },

                            {
                                   href: "/notificaciones",
                                   title: "Notificaciones",
                                   icon: "bi bi-bell",
                            },				

                     ],

		});

	}

}
</script>
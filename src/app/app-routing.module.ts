
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { DetailsPersonaComponent } from './cPersona/components/details-persona/details-cliente.component';
import { AddAgendaComponent } from './cAgenda/component/add-agenda/add-agenda.component';
import { DetailsAgendaComponent } from './cAgenda/component/detalles-agenda/details-agenda.component';
import { EditAgendaComponent } from './cAgenda/component/editar-agenda/edit-agenda.component';
import { ImprimirComponent } from './cAgenda/component/imprimir/imprimir.component';
import { AddResolutoComponent } from './cResolutos/components/add-Resoluto/add-resoluto.component';
import { ListActaComponent } from './cActas/Components/List-acta/list-acta.component';
import { Add_ActasComponent } from './cActas/Components/Add-actas/add-actas.component';
import { AppComponent } from './app.component';
import { CompendioComponent } from './Mod2EstCompendio/compendio/compendio.component';
import { FormacionComponent } from './Mod2EstCompendio/procesos/Formacion/formacion.component';
import { IframeCompendioComponent } from './Mod2EstCompendio/compendio/iframe-compendio/iframe-compendio.component';


const routes: Routes = [

  /* Rutas vacia -- validar contra permisos */
  {
    path: "",
    redirectTo: "",
    pathMatch: 'full',
    component: Component, 
  },

  {
    path: "localhost",
    pathMatch: 'full',
    component: Component,
    
  },

  /*Personas*/
  {
    path: 'Personas',
    pathMatch: 'full',
    loadChildren: () => import('./cPersona/persona.module').then(m => m.PersonaModule)
  },


  {
    path: 'Personas/:id',
    component: DetailsPersonaComponent
  },


  /*Agendas*/
  {
    path: 'Agenda',
    pathMatch: 'full',
    loadChildren: () => import('./cAgenda/agenda.module').then(m => m.AgendaModule)
  },

  {
    path: 'Agenda/add',
    component: AddAgendaComponent

  },
  {
    path: 'Agenda/:id',
    component: DetailsAgendaComponent
  },
  {
    path: 'Agenda/:id/:id',
    component: ImprimirComponent
  },


  {
    path: 'Agenda/VistaDetalle/:id',
    component: EditAgendaComponent

  },


  /******* MODULO DE ACTAS ******/
  {
    //path:'Factura',
    path: 'Acta',
    pathMatch: 'full',
    loadChildren: () => import('./cActas/actas.module').then(m => m.Acta_Module)
  },
  {
    //path:'ListFactura', 
    path: 'ListActa',
    component: ListActaComponent

  },

  {
    //path:'ListFactura/Add', 
    path: 'ListActa/Add',
    component: Add_ActasComponent

  },


  /**** RESOLUCIONES  - alias:  Resolutos  ******/
  {
    path: 'Resoluciones',
    pathMatch: 'full',
    loadChildren: () => import('./cResolutos/Resoluto.module').then(O => O.Resolutos_Module)
  },

  {
    path: 'Precio/add',
    component: AddResolutoComponent

  },


   /**** COMPENDIO PARA EL MODULO DE EST  ******/       
     {
       path:'compendio',
       component:CompendioComponent,              
     },
     

];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

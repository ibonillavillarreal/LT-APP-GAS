
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeCompendioComponent } from './compendio/iframe-compendio/iframe-compendio.component';
import { FormacionComponent } from './procesos/Formacion/formacion.component';
import { ExtencionComponent } from './procesos/Extencion/extencion.component';
import { GestionuniComponent } from './procesos/GestionUni/gestionuni.component';
import { InvestigacionComponent } from './procesos/Investigacion/investigacion.component';


/**** LOS COMPENDIO PARA EL MODULO DE EST  ******/
const routes: Routes = [  
  {
    path:'iframe',
    component:IframeCompendioComponent, 
    //loadChildren: () => import('./compendio/iframe-compendio/iframe-compendio.component').then(e => e.IframeCompendioComponent)

  },    
   {
    path: 'extension',
    component: ExtencionComponent,
    pathMatch: 'full',
    // loadChildren: () => import('./procesos/Extencion/extencion.component').then(e => e.ExtencionComponent)
  },  
  {
    path: 'formacion',
    component: FormacionComponent,
    pathMatch: 'full',
    // loadChildren: () => import('./procesos/Formacion/formacion.component').then(f => f.FormacionComponent)
  },
  {
    path: 'gestion',
    component: GestionuniComponent,
    pathMatch: 'full',
    // loadChildren: () => import('./procesos/GestionUni/gestionuni.component').then(g => g.GestionuniComponent)
  },
  {
    path: 'investigacion',
    component: InvestigacionComponent,
    pathMatch: 'full',
    // loadChildren: () => import('./compendio/iframe-compendio/iframe-compendio.component').then(i => i.IframeCompendioComponent)
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompendioRoutingModule { }

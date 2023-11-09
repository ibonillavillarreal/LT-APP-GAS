
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeCompendioComponent } from './compendio/iframe-compendio/iframe-compendio.component';
import { FormacionComponent } from './procesos/Formacion/formacion.component';
import { ExtencionComponent } from './procesos/Extencion/extencion.component';
import { GestionuniComponent } from './procesos/GestionUni/gestionuni.component';
import { InvestigacionComponent } from './procesos/Investigacion/investigacion.component';
import { CompendioModule } from './compendio.module';
import { CompendioComponent } from './compendio/compendio.component';


/**** LOS COMPENDIO PARA EL MODULO DE EST  ******/
const routes: Routes = [  
  {
    path:'',  
    //component: CompendioComponent,
    children:[
      {
        path:'compendio',        
        component:CompendioComponent         
      },
      {
        path:'iframe',        
        component:IframeCompendioComponent         
      },      
      {
        path: 'formacion',
        component: FormacionComponent,
        pathMatch: 'full',        
      },
      {
        path:'extension',        
        component:ExtencionComponent         
      },
      {
        path: 'investigacion',
        component: InvestigacionComponent,
        pathMatch: 'full'        
      }, 
      {
        path: 'gestion',
        component: GestionuniComponent,
        pathMatch: 'full',        
      },     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompendioRoutingModule { }

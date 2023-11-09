import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OferetaACComponent } from './ofereta-ac/Facultades/facultades.component';
import { CarrerasComponent } from './ofereta-ac/OfertaAC/carreras.component';
import { IesComponent } from './ofereta-ac/Ies/ies.component';
import { PEstudiosComponent } from './ofereta-ac/PEstudios/pestudios.component';


const routes: Routes = [
  {

    path: '',
      //component: AppComponent,
    children: [
      {
        path:'Oferta',        
        component:CarrerasComponent,         
      },      
      {
        path: 'list_Facultades',
        component: OferetaACComponent
      },
      {
        path:'Ies',        
        component:IesComponent,         
      },      
      {
        path:'PlanEstudios',
        component:PEstudiosComponent,         
      }, 
      {
        path:'Facultades',
        component:OferetaACComponent, 

      }, 
         
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OferetaACRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OferetaACRoutingModule } from './ofereta-ac-routing.module';
import { OferetaACComponent } from './ofereta-ac/Facultades/facultades.component';
import { SharedModule } from '../shared/Material.module';
import { CarrerasComponent } from './ofereta-ac/OfertaAC/carreras.component';
import { IesComponent } from './ofereta-ac/Ies/ies.component';
import { PEstudiosComponent } from './ofereta-ac/PEstudios/pestudios.component';
import { AddPlanComponent } from './ofereta-ac/PEstudios/addPlan/add-plan.component';
import { AddOfertaComponent } from './ofereta-ac/OfertaAC/add-oferta/add-oferta.component';
import { AddFacultadComponent } from './ofereta-ac/Facultades/add-facultad/add-facultad.component';
import { AddIesComponent } from './ofereta-ac/Ies/add-ies/add-ies.component';


@NgModule({
  declarations: [
    OferetaACComponent, //facultades
    CarrerasComponent,    
    IesComponent,
    PEstudiosComponent,
    AddPlanComponent,
    AddOfertaComponent,
    AddFacultadComponent,
    AddIesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OferetaACRoutingModule
  ]
})
export class OferetaACModule { }

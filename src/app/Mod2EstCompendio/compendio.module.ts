
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompendioRoutingModule } from './compendio-routing.module';
import { IframeCompendioComponent } from './compendio/iframe-compendio/iframe-compendio.component';
import { ExtencionComponent } from './procesos/Extencion/extencion.component';
import { FormacionComponent } from './procesos/Formacion/formacion.component';
import { GestionuniComponent } from './procesos/GestionUni/gestionuni.component';
import { InvestigacionComponent } from './procesos/Investigacion/investigacion.component';
import { CompendioComponent } from './compendio/compendio.component';
import { SharedModule } from '../shared/Material.module';



@NgModule({
  declarations: [
    CompendioComponent,    
    IframeCompendioComponent,    
    FormacionComponent,
    ExtencionComponent,
    InvestigacionComponent,
    GestionuniComponent,    
  ],
  imports: [
    CommonModule,   
    CompendioRoutingModule,
    CommonModule,
    SharedModule,    
  ]
})
export class CompendioModule { }

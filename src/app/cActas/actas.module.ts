
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActaComponent } from './Components/List-acta/list-acta.component';
import { DetailActaComponent } from './Components/Detail-acta/detail-Acta.component';
import { SharedModule } from '../shared/Material.module';
import { Add_ActasComponent } from './Components/Add-actas/add-actas.component';
import { EditActaComponent } from './Components/Edit-acta/edit-acata.component';
import { DelEstadoFacturaComponent } from './Components/Del-Estado_acta/del-estado-factura.component';
import { CarItemAddComponent } from './Components/Car-add-Items/car-item-add.component';
import { carAcuerdosAddComponent } from './Components/Car-add-fil/car-acuerdos-add.component';
import { CarSelecPagosComponent } from './Components/Car-Selec_acta/car-selec-pagos.component';
import { VerItemDetalleComponent } from './Components/Ver-ItemDetail/ver-item-detalle.component';
import { EditarAcuerdosComponent } from './Components/Edit-acuerdos/editar-acuerdos.component';
import { TrackingComponent } from './Components/Seg-Tracking/tracking.component';
import { addfilesComponent } from './Components/Add-files/addfiles.component';
import { ActaRoutingModule } from './actas-routing.module';


@NgModule({
  declarations: [    
    ListActaComponent,
    DetailActaComponent,
    Add_ActasComponent,
    EditActaComponent,
    DelEstadoFacturaComponent,
    CarItemAddComponent,
    carAcuerdosAddComponent,
    CarSelecPagosComponent,
    VerItemDetalleComponent,
    EditarAcuerdosComponent,
    TrackingComponent,
    addfilesComponent,    

  ],
  imports: [    
    ActaRoutingModule, 
    CommonModule,   
    SharedModule
    
  ]
})
export class Acta_Module { }

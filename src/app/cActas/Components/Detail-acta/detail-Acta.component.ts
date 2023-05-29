import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actas } from 'src/app/services/Acta.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AgendaService } from 'src/app/services/agenda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup,FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-Acta.component.html',
  styleUrls: ['./detail-Acta.component.css']
})
export class DetailActaComponent implements OnInit {
  public tools: GlobalUtilities
  public firstLoad: boolean = true;
  
  frmActa!: FormGroup
  public edit_ActaDB: any[] = [];

  @ViewChild(MatPaginator) paginatorArticulos!: MatPaginator; 
  @ViewChild(MatSort) sortArticulos!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcActaDetalle: Actas, 
    private _builder: FormBuilder,
    private dialoRef: MatDialogRef<DetailActaComponent>,
    public dialog: MatDialog,private srcAgendas: AgendaService) 
  {  
  this.tools = GlobalUtilities.getInstance();
  this.iniciar_FormActa();
  this.edit_ActaDB = data.ActaMaestro;    
  this.loadModules();
   }

   async iniciar_FormActa() {
    this.frmActa = this._builder.group({
      IdAgenda: ['', Validators.required],
      Local: ['', Validators.required],
      DescripcionAgenda: ['', Validators.required],
      FechaRegristro: ['', Validators.required],
      HoraRegristro:['',Validators.required]
    });
  }
  //Load list
 async loadModules() {
  this.tools.setisLoadingDetails(true)  
  console.log('reg maestro '+ JSON.stringify(this.edit_ActaDB));        

  if (this.firstLoad) {
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
    this.firstLoad = false;
  }
  
}

  ngOnInit(): void {
  }
  ngAfterViewInit() {
   // this.dataSourceDetFactura.paginator = this.paginatorArticulos;
   // this.dataSourceDetFactura.sort = this.sortArticulos;

  }

  /* Sumit del formulario */
  enviar(values: any, formDirective: FormGroupDirective) {

    


  }

  cerrar() {
    this.frmActa.reset();
    this.dialoRef.close();
         
  }
}



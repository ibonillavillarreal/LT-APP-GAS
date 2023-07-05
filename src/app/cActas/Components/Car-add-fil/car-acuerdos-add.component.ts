
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Actas } from 'src/app/services/Acta.service';
import { Toast } from 'src/app/utils/Toast';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'car-acuerdos-add',
  templateUrl: './car-acuerdos-add.component.html',
  styleUrls: ['./car-acuerdos-add.component.css']
                 
})
export class carAcuerdosAddComponent implements OnInit {

  public tools: GlobalUtilities
  public toast: Toast;
  public permission: boolean = true;
  public firstLoad: boolean = true;
  frmPuntosAgenda!: FormGroup;
  public list_puntosAgendas: any[] = [];
  public Data_puntosAgendas: any[] = [];

  //---
  public dataPuntosDeAcuerdo:any;
  public json_factura_Y_detalle_ConPagos: any;


  dataSourcePuntosAgendas = new MatTableDataSource(this.Data_puntosAgendas);
  displayedColumns: string[] = ['PuntosAgenda', 'NotaObservacion', 'acciones'];


  constructor(
    private dialoRef: MatDialogRef<carAcuerdosAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private srcFactura: Actas, public dialog: MatDialog,
    private _snackbar: MatSnackBar, private _builder: FormBuilder
  ) {
    this.toast = new Toast(this._snackbar);
    this.tools = GlobalUtilities.getInstance();
    this.FrmPuntosAgenda();

    this.list_puntosAgendas = data.list_PuntosDeAgenda;
    this.dataSourcePuntosAgendas.data = this.list_puntosAgendas;
    //console.log('La Data  : ' + JSON.stringify(data));
  }

  ngOnInit(): void {
    this.dataSourcePuntosAgendas.data = this.list_puntosAgendas;
  }

  async FrmPuntosAgenda() {
    this.frmPuntosAgenda = this._builder.group({
      CodAgendaDetalles: [''],
      IdAcuerdos: [''],
      Acuerdos: ['', Validators.required],
      AudioAcuerdo: ['']
    });
  }


  getPaginatorData(event: any) {
  }


  enviar(idDetalle: number) {    
        
    let puntoAgendaDetalle:any;
    let getAudioAcuerdo: any = "sin audio"  // usar srv para get
    
    if (idDetalle === 0) {
      this.toast.showToast("ACUERDO SELECCIONADO SIN PUNTO DE AGENDA  ✔️", "Aceptar");                 
      puntoAgendaDetalle = "Sin Punto de Agenda "    
    } else {
      this.toast.showToast("ACUERDO SELECCIONADO CON PUNTO DE AGENDA  ✔️", "Aceptar");        
      puntoAgendaDetalle =(this.list_puntosAgendas.filter((f:any)=>f.CodAgendaDetalles===idDetalle))[0].PuntosAgenda;
    }

    const strAcuerdo:string = this.frmPuntosAgenda.controls['Acuerdos'].value;
    if( strAcuerdo.length <= 10){
      this.toast.showToast("EL ACUERDO NO DEBE DE SER INCONCLUSO  ❌", "Error");                 
    }else{

      this.dataPuntosDeAcuerdo = {
        CodAgendaDetalles: idDetalle,
        IdAcuerdos: this.data.Id_Acuerdo,
        Acuerdos: this.frmPuntosAgenda.controls['Acuerdos'].value,
        PuntosAgenda: puntoAgendaDetalle,
        AudioAcuerdo: getAudioAcuerdo
      }      
      this.dialoRef.close(this.dataPuntosDeAcuerdo);
    }
  }

  cerrar() {
    this.frmPuntosAgenda.reset();
    this.dialoRef.close();
  }


}

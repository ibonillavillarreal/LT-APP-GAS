
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Actas } from 'src/app/services/srv_Mod1_siga/Acta.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AgendaService } from 'src/app/services/srv_Mod1_siga/agenda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { __values } from 'tslib';
import { EditarAcuerdosComponent } from '../Edit-acuerdos/editar-acuerdos.component';
import { carAcuerdosAddComponent } from '../Car-add-fil/car-acuerdos-add.component';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-factura',
  templateUrl: './edit-acta.component.html',
  styleUrls: ['./edit-acta.component.css']
})
export class EditActaComponent implements OnInit {

  public tools: GlobalUtilities;
  public firstLoad: boolean = true;
  public frmEditActa!: FormGroup;
  public edit_ActaDB: any;
  public list_Acuerdos: any[] = [];
  public Data_Acuerdos: any[] = [];
  public list_TipoSesion: any[] = [];
  public list_PuntosDeAgenda: any[] = [];
  public Cod_Agendas: any;
  public Id_Acuerdo: any;
  public toast: Toast;

  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumnsAcuerdos: string[] = ['IdAcuerdos', 'Acuerdos', 'PuntosAgenda', 'AudioAcuerdo', 'acciones'];
  dataSourceeEditaAgendaAcuerdos = new MatTableDataSource(this.list_Acuerdos);
  @ViewChild(MatPaginator) paginatorAcuerdos!: MatPaginator;
  @ViewChild(MatSort) sortAcuerdos!: MatSort;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcActa: Actas,
    private srcActaDetalle: Actas, private _builder: FormBuilder, public dialog2: MatDialog,
    private _snackbar: MatSnackBar, private dialoRef: MatDialogRef<EditActaComponent>,
    private srcNuevaActa: Actas, public dialog: MatDialog,
  ) {
    this.toast = new Toast(this._snackbar);
    this.tools = GlobalUtilities.getInstance();
    this.edit_ActaDB = data.ActaMaestro;
   // console.log(' Pasado por la Data : ' + JSON.stringify(this.data.ActaMaestro));

    this.iniciar_FormActa();
    this.loadModules();
  }
  ngOnInit(): void {
    this.datos();
  }

  async datos() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)

    var fechaSesion = new Date(this.data.ActaMaestro.FechaSesion);
    var dias = 1; // Número de días a agregar
    fechaSesion.setDate(fechaSesion.getDate() + dias);
    this.frmEditActa.controls['FechaSesion'].setValue(fechaSesion);
    this.frmEditActa.controls['Hora'].setValue(this.data.ActaMaestro.Hora);

    this.list_TipoSesion.push(
      { id: 11, nombre: 'Ordinaria' },
      { id: 12, nombre: 'Extra-Ordinaria' },
      { id: 50, nombre: 'Ordinaria-Virtual' },
      { id: 51, nombre: 'Extra-Ordinaria-Virtual' }
    )
    const id_tipo = this.list_TipoSesion.find((reg) => reg.nombre == this.data.ActaMaestro.TipoSesion).id
    this.frmEditActa.controls['TipoSesion'].setValue(id_tipo);
    this.frmEditActa.controls['Local'].setValue(this.data.ActaMaestro.Local);
    this.frmEditActa.controls['ActaDedicatoria'].setValue(this.data.ActaMaestro.ActaDedicatoria);

    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);

  }

  async iniciar_FormActa() {
    this.frmEditActa = this._builder.group({
      CodActas: [''],
      CodAgenda: [''],
      IdSesion: ['', Validators.required],
      TipoSesion: ['', Validators.required],
      IdAgenda: ['', Validators.required],
      localAgenda: ['', Validators.required],
      Hora: ['', Validators.required],
      FechaSesion: ['', Validators.required],
      Local: ['', Validators.required],
      ActaDedicatoria: ['', Validators.required],
    });
  }
  //Load Acta 
  async loadModules() {
    this.tools.setisLoadingDetails(true)
    this.frmEditActa.controls['CodActas'].setValue(this.edit_ActaDB.CodActas);
    this.frmEditActa.controls['CodAgenda'].setValue(this.edit_ActaDB.CodAgenda);
    this.Cod_Agendas = this.edit_ActaDB.CodAgenda;
    this.frmEditActa.controls['IdSesion'].setValue(this.edit_ActaDB.IdSesion);
    this.frmEditActa.controls['TipoSesion'].setValue(this.edit_ActaDB.TipoSesion);
    this.frmEditActa.controls['IdAgenda'].setValue(this.edit_ActaDB.IdAgenda);
    this.frmEditActa.controls['localAgenda'].setValue(this.edit_ActaDB.localAgenda);
    this.frmEditActa.controls['Hora'].setValue(this.edit_ActaDB.Hora);
    const fecha_Splite = (this.edit_ActaDB.FechaSesion.substring(0, 10)).split('-');  // yyyy-mm-dd
    const fecha_Sesion = fecha_Splite[0] + '-' + fecha_Splite[1] + '-' + fecha_Splite[2];  /// mm-dd-yyyy    
    this.frmEditActa.controls['FechaSesion'].setValue(new Date(fecha_Sesion));
    this.frmEditActa.controls['Local'].setValue(this.edit_ActaDB.Local);
    this.frmEditActa.controls['ActaDedicatoria'].setValue(this.edit_ActaDB.ActaDedicatoria);

    this.get_DetalleAcuerdos();

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }

  async get_DetalleAcuerdos() {
    this.Data_Acuerdos = await this.srcActaDetalle.getDetalleAcuerdos(this.edit_ActaDB.CodActas).toPromise();
    console.log('AQUI Editar: this.Data_Acuerdos : ' + JSON.stringify(this.Data_Acuerdos)) //PuntosAgenda
    if(this.Data_Acuerdos === null){
        this.Data_Acuerdos = [];
      }
    this.list_Acuerdos = this.Data_Acuerdos;    
    this.dataSourceeEditaAgendaAcuerdos.data = this.list_Acuerdos;
  }

  ngAfterViewInit() {
    this.dataSourceeEditaAgendaAcuerdos.paginator = this.paginatorAcuerdos;
    this.dataSourceeEditaAgendaAcuerdos.sort = this.sortAcuerdos;

  }

  getPaginatorData(event: any) {
  }

  async EditaCampo(type: number, IdAcuerdo: number, AcuerdosDescripcion: number) {
    let dialogRef;
    switch (type) {
      case 1: {
        let Acuerdos_Ref = this.dialog2.open(EditarAcuerdosComponent,
          {
            height: '300px', width: '500px',
            data: { IdAcuerdo: IdAcuerdo, Descripcion: AcuerdosDescripcion },
            disableClose: true, autoFocus: true
          });

        Acuerdos_Ref.afterClosed().subscribe((res_Acuerdo: any) => {
          if (res_Acuerdo !== undefined) {
            let IndexAcuerdo = this.Data_Acuerdos.findIndex((reg_acuerdos: any) => reg_acuerdos.IdAcuerdos == IdAcuerdo);
            let fila_Acuerdo = this.Data_Acuerdos[IndexAcuerdo];
            fila_Acuerdo.Acuerdos = res_Acuerdo.Acuerdo;
          }
        });

      } break;
      case 2: {

        this.list_PuntosDeAgenda = await this.srcNuevaActa.postgetPuntosDeAgenda(this.Cod_Agendas).toPromise();
        this.Id_Acuerdo = await this.srcNuevaActa.getNroIdAcuerdo().toPromise();
       // console.log('valor this.Id_Acuerdo : ' + JSON.stringify(this.Id_Acuerdo))

        let txtAcuerdos = this.Id_Acuerdo.substring(0, 8);
        let txtNumeros = this.Id_Acuerdo.substring(8, 11);
        let nVal = Number(txtNumeros) - 1;
        //let nfilas = (this.list_Acuerdos === null ) ? 0:1;
        let nfilas = (this.dataSourceeEditaAgendaAcuerdos.data.length === 0 ) ? 0:this.dataSourceeEditaAgendaAcuerdos.data.length;
        nVal = nVal + nfilas + 1;
        let strVal;
        if (nVal < 10) {
          strVal = txtAcuerdos + '00' + nVal;
        } else if (nVal < 100) {
          strVal = txtAcuerdos + '0' + nVal;
        } else {
          strVal = txtAcuerdos + '' + nVal;
        }
        this.Id_Acuerdo = strVal;

        dialogRef = this.dialog.open(carAcuerdosAddComponent,
          {
            height: '600px', width: '1200px',
            data: { list_PuntosDeAgenda: this.list_PuntosDeAgenda, Id_Acuerdo: this.Id_Acuerdo }
          })
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res === undefined) {
            this.toast.showToast("ACCION CANCELADA CORRECTAMENTE  ✔️", "Aceptar");
          } else {
            //console.log('Acuerdos con pto-Agenda',JSON.stringify(res))
            //this.list_Acuerdos.push(res);            
            this.Data_Acuerdos.push(res);
            this.list_Acuerdos=this.Data_Acuerdos;
            this.dataSourceeEditaAgendaAcuerdos.data = this.list_Acuerdos;
          }
        });

      } break;
    }

  }


  /* Sumit: Edita Acta existente   */
  async Guardar(values: any, formDirective: FormGroupDirective) {

    let Dedicatoria: number = (this.frmEditActa.controls['ActaDedicatoria'].value).length;

    if (Dedicatoria <= 10) {
      this.toast.showToast("INCONSISTENCIA DE DATOS  - ❌", "ERROR DE ACCION");

    } else if (this.Data_Acuerdos.length === 0) {
      this.toast.showToast("ACUERDOS VACIOS O INCONSISTENCIA DE DATOS  - ❌", "ERROR DE ACCION");

    } else {

      const Acta_ful = {
        Acta_Maestro: this.frmEditActa.value,
        Acta_Detalle: this.Data_Acuerdos
      }
     // console.log(' Antes del Servicio Guardar  : ' + JSON.stringify(Acta_ful));

      this.srcActa.Add_Json_Acta(Acta_ful).subscribe((res: any) => {
        this.cerrar();
      });

    }

  }


  cerrar() {
    this.dialoRef.close();
    this.frmEditActa.reset();
  }



  EditaSonido(op: any, CodAcuerdo: any) {

  }


  setComboSesion(id: number) {
    this.frmEditActa.controls['TipoSesion'].setValue(id);
  }



}

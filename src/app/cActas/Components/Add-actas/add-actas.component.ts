
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actas } from 'src/app/services/Acta.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { __values } from 'tslib';
import { MatTableDataSource } from '@angular/material/table';
import { CarItemAddComponent } from '../Car-add-Items/car-item-add.component';
import { carAcuerdosAddComponent } from '../Car-add-fil/car-acuerdos-add.component';

//import { Data } from '@angular/router';
//import { concat } from 'rxjs';







@Component({
  selector: 'app-add-actas',
  templateUrl: './add-actas.component.html',
  styleUrls: ['./add-actas.component.css']
})
export class Add_ActasComponent implements OnInit {

  public tools: GlobalUtilities
  public toast: Toast;
  public permission: boolean = true;
  public firstLoad: boolean = true;
  newFrmActa!: FormGroup
  public new_ActaID: any;
  public list_PuntosDeAgenda: any[] = [];
  public Cod_Agendas: any;
  public Id_Acuerdo: any;
  public tb_Acuerdos: any[] = [];
  public Data_Acuerdos: any[] = [];
  public list_TipoSesion: any[] = [];
  public list_Agendas: any[] = [];

  /*** NUEVA ACTA  */
  displayedColumnsAcuerdos: string[] = ['IdAcuerdos', 'Acuerdos', 'PuntosAgenda', 'AudioAcuerdo', 'acciones'];
  dataSourceActasAcuerdos = new MatTableDataSource(this.tb_Acuerdos);
  @ViewChild(MatPaginator) paginatorAcuerdos!: MatPaginator;
  @ViewChild(MatSort) sortAcuerdos!: MatSort;
  @ViewChild('selectSesion') select_Sesion!: ElementRef


  constructor(
    private dialoRef: MatDialogRef<Add_ActasComponent>,
    public dialog: MatDialog, private srcNuevaActa: Actas,
    private _builder: FormBuilder, private _snackbar: MatSnackBar
  ) {
    this.toast = new Toast(this._snackbar);
    this.tools = GlobalUtilities.getInstance();
    this.FormularioActa();
    this.loadModules();
  }

  ngOnInit(): void {
    this.data();
    this.getAgenda();
  }

  async data() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)

    this.new_ActaID = await this.srcNuevaActa.getNroActa().toPromise();
    this.newFrmActa.controls['CodActas'].setValue(0);
    this.newFrmActa.controls['IdSesion'].setValue(this.new_ActaID);
    this.newFrmActa.controls['TipoSesion'].setValue(11);

    const localTime: string = Date().toString().substring(16, 21).toString();
    this.newFrmActa.controls['Hora'].setValue(localTime);
    this.newFrmActa.controls['FechaSesion'].setValue(new Date());

    this.list_TipoSesion.push(
      { id: 11, nombre: 'Ordinaria' },
      { id: 12, nombre: 'Extra-Ordinaria' },
      { id: 50, nombre: 'Ordinaria-Virtual' },
      { id: 51, nombre: 'Extra-Ordinaria-Virtual' }
    )

    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);

  }

  async getAgenda() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)

    this.list_Agendas = await this.srcNuevaActa.getAgendaActa().toPromise();

    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
  }

  ngAfterViewInit() {
    this.dataSourceActasAcuerdos.paginator = this.paginatorAcuerdos;
    this.dataSourceActasAcuerdos.sort = this.sortAcuerdos;
  }


  async FormularioActa() {
    this.newFrmActa = this._builder.group({
      CodActas: [''],
      CodAgenda: ['', Validators.required],
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
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }

  }

  async get_DetalleAcuerdos() {
    this.Data_Acuerdos = await this.srcNuevaActa.getDetalleAcuerdos(this.new_ActaID.CodActas).toPromise();
    this.dataSourceActasAcuerdos.data = this.Data_Acuerdos;
  }


  getPaginatorData(event: any) {
  }

  setComboSesion(id: number) {
    this.newFrmActa.controls['TipoSesion'].setValue(id);
  }



  async openForm(type: number) {
    let dialogRef;
    switch (type) {
      case 1: {
        if (this.Cod_Agendas > 0) {
          this.Data_Acuerdos = [];
          this.dataSourceActasAcuerdos.data = this.Data_Acuerdos;
          this.toast.showToast("CAMBIO DE AGENDA - SE LIMPIA EL DETALLE DE ACUERDOS - ❌", "ACCION DE CAMBIO");
        }
        dialogRef = this.dialog.open(CarItemAddComponent,
          {
            height: '600px', width: '800px',
            data: { list_Agendas: this.list_Agendas }
          })
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res === undefined) {
            this.toast.showToast("ACCION CANCELADA CORRECTAMENTE  ✔️", "Aceptar");
          }
          else {

            this.newFrmActa.controls['CodAgenda'].setValue(res.CodAgenda);
            this.newFrmActa.controls['IdAgenda'].setValue(res.IdAgenda);
            this.newFrmActa.controls['localAgenda'].setValue(res.Local);
            this.newFrmActa.controls['Local'].setValue(res.Local);
            this.Cod_Agendas = res.CodAgenda;
          }
        });
      } break;
      case 2: {

        this.list_PuntosDeAgenda = await this.srcNuevaActa.postgetPuntosDeAgenda(this.Cod_Agendas).toPromise();
        this.Id_Acuerdo = await this.srcNuevaActa.getNroIdAcuerdo().toPromise();
        //console.log('valor this.Id_Acuerdo : '+JSON.stringify(this.Id_Acuerdo))

        let txtAcuerdos = this.Id_Acuerdo.substring(0, 8);
        let txtNumeros = this.Id_Acuerdo.substring(8, 11);
        let nVal = Number(txtNumeros) - 1;
        let nfilas = this.dataSourceActasAcuerdos.data.length;
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

        // console.log('txtAcuerdos : '+ txtAcuerdos);
        // console.log('txtNumeros : '+ txtNumeros);
        // console.log('nVal : '+ nVal);
        // console.log('strVal : '+ strVal);

        dialogRef = this.dialog.open(carAcuerdosAddComponent,
          {
            height: '600px', width: '1200px',
            data: { list_PuntosDeAgenda: this.list_PuntosDeAgenda, Id_Acuerdo: this.Id_Acuerdo }
          })
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res === undefined) {
            this.toast.showToast("ACCION CANCELADA CORRECTAMENTE  ✔️", "Aceptar");
          } else {
            this.Data_Acuerdos.push(res);
            this.dataSourceActasAcuerdos.data = this.Data_Acuerdos;
          }
        });
      } break;

    }
  }

  cerrar() {
    this.newFrmActa.reset();
    this.dialoRef.close();

  }


  /* Sumit: Nueva Acta */
  async Guardar(values: any, formDirective: FormGroupDirective) {
    let Dedicatoria: number = (this.newFrmActa.controls['ActaDedicatoria'].value).length;

    if (Dedicatoria <= 10) {
      this.toast.showToast("INCONSISTENCIA DE DATOS  - ❌", "ERROR DE ACCION");

    } else if (this.Data_Acuerdos.length === 0) {
      this.toast.showToast("ACUERDOS VACIOS O INCONSISTENCIA DE DATOS  - ❌", "ERROR DE ACCION");
    } else {
            
      const Acta_ful = {
        Acta_Maestro: this.newFrmActa.value,
        Acta_Detalle: this.Data_Acuerdos
      }
      //console.log(' Aqui Reg Acta_ful  : ' + JSON.stringify(Acta_ful));


      this.srcNuevaActa.Add_Json_Acta(Acta_ful).subscribe((res: any) => {

       // console.log('Respuesta  res : ' + JSON.stringify(res));
      });
      
      this.dialoRef.close();

    }

  }

  EditaSonido(op: any, CodAcuerdo: any) {
  }

  isAllowed() {
    return this.permission;
  }



  // calculos_totales() {
  //   if(this.idMoneda === 'USD'){
  //     const factura = this.list_factura_Item_DB_Grid;
  //     this.Sub_Total_USD = parseFloat(factura.map((t: any) => t.subTotal).reduce((acc, value) => acc + value, 0));
  //     this.IVA_USD = parseFloat(factura.map((t: any) => t.iva).reduce((acc, value) => acc + value, 0));
  //     this.TOTAL_USD = parseFloat(this.Sub_Total_USD) + parseFloat(this.IVA_USD);
  //     /// Cordobisar 
  //     this.Sub_Total_NIO = parseFloat(this.Sub_Total_USD) * this.tsCambio;
  //     this.IVA_NIO = parseFloat(this.IVA_USD) * this.tsCambio;
  //     this.TOTAL_NIO = parseFloat(this.Sub_Total_NIO) + parseFloat(this.IVA_NIO);

  //   }else // si la moneda es Cortdobas
  //   {
  //     const factura = this.list_factura_Item_DB_Grid;
  //     this.Sub_Total_NIO  = parseFloat(factura.map((t: any) => t.subTotal).reduce((acc, value) => acc + value, 0));
  //     this.IVA_NIO = parseFloat(factura.map((t: any) => t.iva).reduce((acc, value) => acc + value, 0));
  //     this.TOTAL_NIO = parseFloat(this.Sub_Total_NIO) + parseFloat(this.IVA_NIO);
  //     /// ...DOLARIZAR 
  //     this.Sub_Total_USD = parseFloat(this.Sub_Total_NIO) / this.tsCambio;
  //     this.IVA_USD = parseFloat(this.IVA_NIO) / this.tsCambio;
  //     this.TOTAL_USD = parseFloat(this.Sub_Total_USD) + parseFloat(this.IVA_USD);

  //   }

  // }



}


import { Component, Inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ItemService } from 'src/app/services/Item.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { PersonaService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit, OnDestroy {

  //-- Item - AGENDA 
  public Id_Agenda = 0;
  public index_fila = 0;
  tools: GlobalUtilities;
  toast: Toast;
  dialogItems: any;
  exit: boolean = false;
  base_list_asistencia: any[] = [];
  list_Item_Agenda_Ckeck: any[] = [];
  Data_AgendaAsistencia: any[] = [];
  list_asistencia: any[] = [];
  Data_PuntosAgenda: any[] = [];
  list_PuntosAgenda: any[] = [];

  displayedColumnsRepresentantes: string[] = ['Grado', 'Nombres', 'Apellidos', 'Correo', 'Tipo', 'Enviar'];
  dataSourceAgendaRepresentantes = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _builder: FormBuilder, private srvItem: ItemService, private src: PersonaService,
    private _snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRefItems: MatDialog, private dialogRef: MatDialogRef<AddItemComponent>) {
    this.Id_Agenda = data.Id_Agenda;
    this.base_list_asistencia = data.list_asistencia;

    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);

    this.getData();
  }

  async getData() {
    this.setListaAsistencia();
  }

  ngOnInit(): void {
    this.dataSourceAgendaRepresentantes.paginator = this.paginator;
    this.dataSourceAgendaRepresentantes.sort = this.sort;
  }
  ngAfterViewInit() {
    //this.dataSourceAgendaRepresentantes.paginator = this.paginator;
    //this.dataSourceAgendaRepresentantes.sort = this.sort;
  }

  ngOnDestroy() {
    this.exit = true;
  }

  async setListaAsistencia() {
    this.Data_AgendaAsistencia = await this.src.getPersonas().toPromise();
    this.list_asistencia = this.Data_AgendaAsistencia;

    // limpia antes de mostrar en mat-tabla       
    if (this.base_list_asistencia.length !== 0) {
      this.list_asistencia = this.removeItems_Existente(this.list_asistencia);
    }

    this.dataSourceAgendaRepresentantes.data = this.list_asistencia
  }


  setCheckedState($event: any, index: number) {
    if ($event.target.checked) {

      this.index_fila = this.index_fila + 1;
      let fila = { index: this.index_fila, ... this.list_asistencia.filter((e: any) => e.CodMiembro == $event.target.value)[0], NotaObservacion: 'Ninguna', CodAgenda: this.Id_Agenda };

      this.list_Item_Agenda_Ckeck.push(fila)
    }

    if (!$event.target.checked) {
      let index_Splice = this.list_Item_Agenda_Ckeck.filter((e: any) => e.CodMiembro == $event.target.value)[0].index

      let reg_resultante = this.list_Item_Agenda_Ckeck.filter((x: any) => x.index !== index_Splice);
      this.list_Item_Agenda_Ckeck = reg_resultante

    }

  }

  agregar_items() {  // para cargarlo al grid padre y cerrar el modal

    this.dialogRef.close(this.list_Item_Agenda_Ckeck);
    
  }


  removeItems_Existente(list_aFiltrar: any) {
    const list_resultante = Object.assign([], list_aFiltrar);
    for (let i = 0; i < this.base_list_asistencia.length; i++) {
      let index = list_resultante.findIndex((x: any) => x.CodMiembro == this.base_list_asistencia[i].CodMiembro);
      if (index > -1) {
        list_resultante.splice(index, 1);
      }
    }
    return list_resultante;
  }







  //**  ANTERIOR  **/
  // openFrmItems() {
  //   if (1) {
  //     this.toast.showToast("Debe digitar la Base, Altura y Descripcion de Proyecto  ❌", "Aceptar");
  //   }
  //   else {
  //     let datoCompuesto: any[] =[] //[1, this.lista_ArticulosDB];
  //     let dialogRef = this.dialogRefItems.open(AddItemSComponent,
  //       {
  //         height: '720px', width: '1080px',
  //         data: datoCompuesto
  //       });

  //     dialogRef.afterClosed().subscribe((obj: any) => {

  //       let regCantidad = obj.Cantidad;

  //     });
  //   }
  // }


  /////***********///////
  // add() {
  //   if (this.list_Producto_Item.length !== 0) {

  //     let frm_modeloItem = this.frmAddItem.value;
  //     console.log(this.list_Producto_Item);
  //     let iva = this.list_Producto_Item.map(t => parseFloat(t.iva) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0);
  //     this.frmAddItem.controls['Cantidad'].setValue(this.list_Producto_Item.map(t => parseInt(t.Cantidad)).reduce((acc, value) => acc + value, 0))
  //     console.log()

  //     this.list_Producto_Item.forEach(item => {
  //       item.Base = frm_modeloItem.Base,
  //         item.Altura = frm_modeloItem.Altura
  //     });
  //     let proyecto = {
  //       ARTICULO: '',
  //       DESCRIPCION: frm_modeloItem.DESCRIPCION,
  //       Cantidad: this.list_Producto_Item.map(t => parseInt(t.Cantidad)).reduce((acc, value) => acc + value, 0),
  //       Precio: this.list_Producto_Item.map(t => parseFloat(t.Precio) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0),
  //       DescripcionUso: "",
  //       iva: iva,
  //       TIPO: 'P',
  //       Base: frm_modeloItem.Base,
  //       Altura: frm_modeloItem.Altura,
  //       detalles_proyecto: this.list_Producto_Item
  //     };
  //     console.log(proyecto)
  //     this.dialogRef.close(proyecto);
  //   }

  // }




}
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actas } from 'src/app/services/Acta.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AgendaService } from 'src/app/services/agenda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup,FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';


@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-Acta.component.html',
  styleUrls: ['./detail-Acta.component.css']
})
export class DetailActaComponent implements OnInit {
  public tools: GlobalUtilities
  public firstLoad: boolean = true;
  
  frmActa!: FormGroup
  public edit_ActaDB:any;
  public list_Acuerdos: any[] = [];
  public Data_Acuerdos: any[] = [];
  public toast: Toast;



  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumnsAcuerdos: string[] = ['IdAcuerdos', 'Acuerdos','PuntosAgenda','AudioAcuerdo','acciones'];
  dataSourceAgendaAcuerdos = new MatTableDataSource(this.list_Acuerdos);
  @ViewChild(MatPaginator) paginatorAcuerdos!: MatPaginator; 
  @ViewChild(MatSort) sortAcuerdos!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcActaDetalle: Actas, 
    private _builder: FormBuilder,
    private dialoRef: MatDialogRef<DetailActaComponent>,
    private srcAgendas: AgendaService,  private _snackbar: MatSnackBar) 
  {  
  this.toast = new Toast(this._snackbar);
  this.tools = GlobalUtilities.getInstance();
  this.iniciar_FormActa();
  this.edit_ActaDB =  data.ActaMaestro;      
  this.loadModules();  
  }

   async iniciar_FormActa() {
    this.frmActa = this._builder.group({
      IdSesion: ['', Validators.required],
      TipoSesion: ['', Validators.required],
      IdAgenda: ['', Validators.required],      
      localAgenda: ['', Validators.required],            
      Hora: ['', Validators.required],
      FechaSesion:['',Validators.required],
      Local: ['', Validators.required],
      ActaDedicatoria:['',Validators.required],
    });
  }
  //Load Acta 
 async loadModules() {
  this.tools.setisLoadingDetails(true)    
  this.frmActa.controls['IdSesion'].setValue(this.edit_ActaDB.IdSesion);   
  this.frmActa.controls['TipoSesion'].setValue(this.edit_ActaDB.TipoSesion);    
  this.frmActa.controls['IdAgenda'].setValue(this.edit_ActaDB.IdAgenda);  
  this.frmActa.controls['localAgenda'].setValue(this.edit_ActaDB.localAgenda);    
  this.frmActa.controls['Hora'].setValue(this.edit_ActaDB.Hora);     
  const fecha_Splite  = (this.edit_ActaDB.FechaSesion.substring(0, 10)).split('-');  // yyyy-mm-dd
  const fecha_Sesion = fecha_Splite[0] + '-' + fecha_Splite[1] + '-' + fecha_Splite[2];  /// mm-dd-yyyy    
  this.frmActa.controls['FechaSesion'].setValue(new Date(fecha_Sesion));   
  this.frmActa.controls['Local'].setValue(this.edit_ActaDB.Local);   
  this.frmActa.controls['ActaDedicatoria'].setValue(this.edit_ActaDB.ActaDedicatoria);  

  this.get_DetalleAcuerdos();

  if (this.firstLoad) {
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
    this.firstLoad = false;
  }  
}

async get_DetalleAcuerdos(){
  this.Data_Acuerdos = await this.srcActaDetalle.getDetalleAcuerdos(this.edit_ActaDB.CodActas).toPromise();  
  console.log('this.Data_Acuerdos  '+ JSON.stringify(this.Data_Acuerdos)) //PuntosAgenda
  this.dataSourceAgendaAcuerdos.data = this.Data_Acuerdos;
}

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.dataSourceAgendaAcuerdos.paginator = this.paginatorAcuerdos;
    this.dataSourceAgendaAcuerdos.sort = this.sortAcuerdos;

  }

  getPaginatorData(event: any) {
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  cerrar() {
    this.frmActa.reset();
    this.dialoRef.close();         
  }

    
  /* Sumit Imprimir formulario en forma de Acta */
  frmDetalle(values: any, formDirective: FormGroupDirective) {

  }

  dowLoadDoc(){ // descargar files Acta Completa Word

  }

  printActaAcuerdos()  {          
    this.srcActaDetalle.getPrint(this.edit_ActaDB.CodActas).subscribe((res) => {

      let blob: Blob = res as Blob;
      if (res != undefined) {
        this.toast.showToast('Imprimiendo el Acta de Acuerdos Legales ✔️ ', 'Aceptar')

      } else {
        this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
      }

      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
        let url = window.URL.createObjectURL(blob);
        return window.open(url);
      }, 300);

    },
      (error: any) => {
        this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
        console.log('error: ' + error);
      });

  }
  

  EditaSonido(op:any,CodAcuerdo:any){
  }
  

}



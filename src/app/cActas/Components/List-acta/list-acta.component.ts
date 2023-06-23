
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DetailActaComponent } from '../Detail-acta/detail-Acta.component';
import { EditFacturaComponent } from '../Edit-acta/edit-factura.component';
import { Actas } from 'src/app/services/Acta.service';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { Add_ActasComponent } from '../Add-actas/add-actas.component';

@Component({
  selector: 'app-acta',
  templateUrl: './list-acta.component.html',
  styleUrls: ['./list-acta.component.css']
})
export class ListActaComponent implements OnInit {

  public tools: GlobalUtilities
  public permission: boolean = true;
  public firstLoad: boolean = true;
  public Estado_subCatalogo: any[] = [];
  sinFiltro: string = "0";

  displayedColumns: string[] = ['CodActas', 'ActaDedicatoria', 'FechaSesion', 'Hora', 'Local', 'acciones'];

  list_ActaDB: any[] = [];
  dataSourceActa = new MatTableDataSource(this.list_ActaDB);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private srcActas: Actas,
    public srvSubCatalogos: SubCatalogoService) {
    this.tools = GlobalUtilities.getInstance();
    this.loadModules();
  }

  ngOnInit(): void {
  }

  //Load list
  async loadModules() {
    this.tools.setisLoadingDetails(true)

    let data = await this.srcActas.getActaListado().toPromise();    
    this.list_ActaDB = data;
    this.dataSourceActa.data = this.list_ActaDB;    
    
    this.Estado_subCatalogo.push({ id: '0', descripcion: 'SIN FILTRO' })
    this.Estado_subCatalogo.push({ id: '1', descripcion: 'ORDINARIAS' })
    this.Estado_subCatalogo.push({ id: '2', descripcion: 'EXTRA - ORDINARIAS' })
    this.Estado_subCatalogo.push({ id: '3', descripcion: 'ORDINARIAS - VIRTUAL'})
    this.Estado_subCatalogo.push({ id: '4', descripcion: 'EXTRA - ORDINARIAS - VIRTUAL' })


    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }


  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: {
        dialogRef = this.dialog.open(DetailActaComponent, 
        { height: '780px', width: '1600px',
          data: { ActaMaestro: this.list_ActaDB.find((reg: any) => { return (reg.CodActas === id) }) }
        })
        
      } break;
      case 2: {
        dialogRef = this.dialog.open(EditFacturaComponent, 
        { height: '780px', width: '1600px', 
          data: { id: id } 
        })
        dialogRef.afterClosed().subscribe((result: any) => {
          //location.reload();
          this.firstLoad = true;
          this.loadModules();
        });
      } break;
      case 3: { dialogRef = this.dialog.open(Add_ActasComponent, 
        { height: '780px', width: '1600px'})
        dialogRef.afterClosed().subscribe((result: any) => {
          //location.reload();
          this.firstLoad = true;
          this.loadModules();
        }); 
      }break;
      
      default: { dialogRef = this.dialog.open(DetailActaComponent); } break;
    }
  }


  isAllowed() {
    return this.permission;
  }

  getPaginatorData(event: any) {
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceActa.filter = valor.trim().toLowerCase();
  }


  async filtrarPorAgenda(id: any) {       
    switch (id)     
    {      
      case '0': { //sin filtro
        this.dataSourceActa.data = this.list_ActaDB;
        break;
      }
      case '1': {  //por Ordinarias
        this.dataSourceActa.data = this.list_ActaDB.filter((f: any) => f.TipoSesion === 'Ordinaria');        
        break;
      }
      case '2': {  //por Extra-Ordinaria
        this.dataSourceActa.data =  this.list_ActaDB.filter((f: any) => f.TipoSesion === 'Extra-Ordinaria');        
        break;
      }
      case '3': {  //por Ordinaria - Virtual
        this.dataSourceActa.data =  this.list_ActaDB.filter((f: any) => f.TipoSesion === 'Ordinaria-Virtual');        
        break;
      }
      case '4': {  //por Extra-Ordinaria - Virtual
        this.dataSourceActa.data =  this.list_ActaDB.filter((f: any) => f.TipoSesion === 'Extra-Ordinaria-Virtual');        
        break;
      }
    }
  }

}

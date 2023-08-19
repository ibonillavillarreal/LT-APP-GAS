

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/services/agenda.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { EditAgendaComponent } from '../editar-agenda/edit-agenda.component';
import { EliminarAgenda } from '../Eliminar-Agenda/eliminar-agenda.component';
import { AddAgendaComponent } from '../add-agenda/add-agenda.component';


@Component({
  selector: 'app-detalle-agenda-component',
  templateUrl: './List-agenda.component.html',
  styleUrls: ['./List-agenda.component.css']
})
export class ListAgendaComponent implements OnInit {

  /***VARIABLES PARA TABLA */
  public list_agenda: any[] = [];
  public Estado_subCatalogo: any[] = [];
  sinFiltro: string = "0";
  tools: GlobalUtilities
  firstLoad: boolean = true;  
  private permission: boolean = true;
  /*****CAMPOS TABLA **/
  displayedColumns: string[] =
    ['IdAgenda',
      'DescripcionAgenda',
      'FechaRegristro',
      'acciones'
    ];

  dataSourceAgenda = new MatTableDataSource(this.list_agenda);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private src_Agenda: AgendaService, public dialog: MatDialog,
              public srvSubCatalogos: SubCatalogoService
  ) {
      this.tools = GlobalUtilities.getInstance();
  }

  ngOnInit(): void {
    this.cargando();
    this.loadModules();
  }
async cargando(){
   const res =  await this.src_Agenda.getAgenda().toPromise();
  }
  //Load list
  async loadModules() {
    this.tools.setisLoadingDetails(true)
    this.list_agenda = await this.src_Agenda.getAgenda().toPromise();

    this.dataSourceAgenda.data = this.list_agenda; 

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }

  }

  isAllowed() {
    return this.permission;
  }


  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: { dialogRef = this.dialog.open(AddAgendaComponent,  
        { height: '790px', width: '1300px', 
         disableClose: false, autoFocus: false 
      }) 
      dialogRef.afterClosed().subscribe((result: any) => {        
        this.firstLoad = true;
        this.loadModules();
      }); 
      } break;
      case 2: { dialogRef = this.dialog.open(EditAgendaComponent, 
        { height: '790px', width: '1300px', 
        data: { CodAgenda: id },
        disableClose: false, autoFocus: false 
      })
      } break;
      case 3: { 
        dialogRef = this.dialog.open(EliminarAgenda, 
        { data: { id: id } });
      } break;
      default: { dialogRef = this.dialog.open(EditAgendaComponent); } break;
    }

    dialogRef.afterClosed().subscribe(result => {
      this.firstLoad = true;
      this.loadModules();
    });

  }
  /**Inicializar paginator**/
  ngAfterViewInit() {
    this.dataSourceAgenda.paginator = this.paginator;
    this.dataSourceAgenda.sort = this.sort;
  }

  getPaginatorData(event: any) {
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceAgenda.filter = valor.trim().toLowerCase();
  }

  async filtrarEstado(id: any) {
    if (id === '0') {
      this.dataSourceAgenda.data = this.list_agenda;
    } else {      
      this.dataSourceAgenda.data = this.list_agenda.filter((f: any) => f.idsubestado === id);
    }
  }

}

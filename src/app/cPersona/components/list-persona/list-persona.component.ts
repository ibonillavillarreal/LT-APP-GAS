import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from 'src/app/services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { AddClienteComponent } from '../add-persona/add-persona.component';
import { EditPersonaComponent } from '../edit-cliente/edit-cliente.component';
import { AnularPersonaComponent } from '../anular-persona/anular-persona.component';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';


@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.css']
})
export class ListPersonaComponent implements OnInit {
  /***VARIABLES PARA TABLA */
  list_Representante!: any;
  tools: GlobalUtilities
  firstLoad: boolean = true;
  private permission: boolean = true;
  /*****CAMPOS TABLA **/
  displayedColumns: string[] =
    [
      'CodGradoAcademico',
      'Nombres',
      'Apellidos',
      'FechaRegistro',
      'acciones'
    ];


  dataSource = new MatTableDataSource(this.list_Representante);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private src: PersonaService, public dialog: MatDialog
  ) {
    this.tools = GlobalUtilities.getInstance();
  }
  ngOnInit(): void {
    this.CaragarDatos();
  }

  async CaragarDatos() {
    this.tools.setisLoadingDetails(true)
    let data = await this.src.getPersonas().toPromise();
    this.list_Representante = data;
    this.dataSource.data = this.list_Representante;

    setTimeout(() => {
      this.tools.setisLoadingDetails(false);
    }, 300)
  }

  Update() {
    console.log("UPDATE....")
  }
  isAllowed() {
    return this.permission;
  }

  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: { dialogRef = this.dialog.open(AddClienteComponent, { height: '730px', width: '720px' }) } break;
      case 2: { dialogRef = this.dialog.open(EditPersonaComponent, { height: '720px', width: '720px', data: { id: id } }) } break;
      case 3: { dialogRef = this.dialog.open(AnularPersonaComponent, { data: { id: id } }); } break;
      default: { dialogRef = this.dialog.open(AddClienteComponent); } break;
    }
    dialogRef.afterClosed().subscribe(result => {
      this.CaragarDatos();
    });
  }

  getPaginatorData(event: any) {
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  /**Inicializar paginator**/
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)

  }
  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}



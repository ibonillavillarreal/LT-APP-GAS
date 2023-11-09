import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AddPlanComponent } from './addPlan/add-plan.component';

@Component({
  selector: 'app-pestudios',
  templateUrl: './pestudios.component.html',
  styleUrls: ['./pestudios.component.css']
})
export class PEstudiosComponent implements OnInit {

  tools: GlobalUtilities;
  public timePinner: boolean = true;  
  displayedColumns: string[] = ['Codigo','Versionn','Numero_horas','Numero_semanas','Numero_asignaturas','Numero_creditos','Numero_periodos','acciones'];
  list_Carreras: any[] = [];
  tb_dataSource = new MatTableDataSource(this.list_Carreras);

  constructor(public dialog: MatDialog) { 
  
    this.isLoad(); 
    this.tools = GlobalUtilities.getInstance();

  }
  ngOnInit(): void { }

  istimePinner() { return this.timePinner }
  isLoad() {
    this.list_Carreras = [{}];
    this.tb_dataSource.data = this.list_Carreras;

    if (this.timePinner) {
      setTimeout(() => {
        this.timePinner = false;
      }, 1500);
    }
  }


  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: { dialogRef = this.dialog.open(AddPlanComponent, { height: '610px', width: '1000px' }) } break;
      //case 2: { dialogRef = this.dialog.open(EditPersonaComponent, { height: '720px', width: '720px', data: { id: id } }) } break;
      //case 3: { dialogRef = this.dialog.open(AnularPersonaComponent, { data: { id: id } }); } break;
      default: { dialogRef = this.dialog.open(AddPlanComponent); } break;
    }
    dialogRef.afterClosed().subscribe(result => {
      this.CaragarDatos();
    });
  }
  

  async CaragarDatos() {
    this.tools.setisLoadingDetails(true)
    //let data = await this.src.getPersonas().toPromise();
    //this.list_Representante = data;
    //this.dataSource.data = this.list_Representante;

    setTimeout(() => {
      this.tools.setisLoadingDetails(false);
    }, 300)
  }


}

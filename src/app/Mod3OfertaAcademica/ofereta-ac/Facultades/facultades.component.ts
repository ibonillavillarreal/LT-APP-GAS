import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AddFacultadComponent } from './add-facultad/add-facultad.component';

@Component({
  selector: 'app-facultades',
  templateUrl: './facultades.component.html',
  styleUrls: ['./facultades.component.css']
})
export class OferetaACComponent implements OnInit {

  tools: GlobalUtilities;
  public timePinner: boolean = true;
  displayedColumns: string[] = ['Codigo','Nombre','Siglas','Estado','acciones'];
  list_Carreras: any[] = [];
  tb_dataSource = new MatTableDataSource(this.list_Carreras);

  constructor(public dialog: MatDialog) { 
    this.tools = GlobalUtilities.getInstance(); 
    this.isLoad(); 
  }
  ngOnInit(): void { }

  istimePinner() { return this.timePinner }
  isLoad() {
    this.list_Carreras.push({});
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
      case 1: { dialogRef = this.dialog.open(AddFacultadComponent, { height: '500px', width: '1000px' }) } break;
      //case 2: { dialogRef = this.dialog.open(EditPersonaComponent, { height: '720px', width: '720px', data: { id: id } }) } break;
      //case 3: { dialogRef = this.dialog.open(AnularPersonaComponent, { data: { id: id } }); } break;
      default: { dialogRef = this.dialog.open(AddFacultadComponent); } break;
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

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Actas } from 'src/app/services/Acta.service';


@Component({
  selector: 'app-car-item-add',
  templateUrl: './car-item-add.component.html',
  styleUrls: ['./car-item-add.component.css'],
  
})
export class CarItemAddComponent implements OnInit {
  

  public load_AgendaActas: any[] = [];
  public Data_AgendaActas: any[] = [];

  dataSourceAgenda = new MatTableDataSource(this.Data_AgendaActas);
  displayedColumns: string[] = ['IdAgenda', 'Local', 'acciones'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcFactura: Actas, 
    public dialog: MatDialog, private dialoRef: MatDialogRef<CarItemAddComponent>) {     
     
      this.load_AgendaActas = data.list_Agendas;  
      this.dataSourceAgenda.data = data.list_Agendas;  
  }

  ngOnInit(): void {
  }



  add_click(CodAgenda: any) {    
    this.load_AgendaActas = this.load_AgendaActas.find((x:any)=>{return x.CodAgenda === CodAgenda});
    this.dialoRef.close(this.load_AgendaActas);    
  }

  Cancelar_click() {
    const id = {IdAgenda:'000',Local:'nula'}
    this.dialoRef.close(id);    
  }


    /***Filtrar en la tabla** */
    applyFilter(event: Event) {
      const valor = (event.target as HTMLInputElement).value;
      this.dataSourceAgenda.filter = valor.trim().toLowerCase();
    }
  
}

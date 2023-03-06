

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendaService } from 'src/app/services/agenda.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';


@Component({
  selector: 'app-eliminar-agenda',
  templateUrl: './eliminar-agenda.component.html',
  styleUrls: ['./eliminar-agenda.component.css']
})
export class EliminarAgenda implements OnInit {

  private CodAgenda: number
  private toast: Toast
  private tools: GlobalUtilities

  constructor(private src: AgendaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<EliminarAgenda>
  ) {
    this.CodAgenda = data.id;
    this.toast = new Toast(_snackBar);
    this.tools = GlobalUtilities.getInstance();

  }

  ngOnInit(): void {
  }

  confirmar(operacion: number) {

    let id_User: any = { CodAgenda: this.CodAgenda, idUser: 1, operacion: operacion }

    this.tools.setIsLoading(true);

    this.src.DelEditMiembroAgenda(id_User).subscribe(res => {
      if (res) {
        if (operacion === 0) {
          this.toast.showToast("Eliminado LOGICA correctamente ✔️", "Aceptar")
          this.cerrar();
        }

      } else {
        this.toast.showToast("Error inesperado en la acción ❌", "Aceptar")
        console.log(res);
      }
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

}



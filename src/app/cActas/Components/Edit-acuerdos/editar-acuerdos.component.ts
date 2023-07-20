
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


/////////////
@Component({
  selector: 'app-editar-cantidad',
  templateUrl:'./editar-acuerdos.component.html',
  styleUrls: ['./editar-acuerdos.component.css']
})
export class EditarAcuerdosComponent implements OnInit {


  public form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private frm_builder: FormBuilder,
    private dialogRef: MatDialogRef<EditarAcuerdosComponent>
  ) {
    this.form = this.frm_builder.group({
      IdAcuerdo: [data.IdAcuerdo],
      Acuerdo: [data.Descripcion]
    });

  }

  ngOnInit(): void {
  }

  edit(form: any) {
    let obj = { IdAcuerdo: this.data.IdAcuerdo, Acuerdo: form.Acuerdo }    
    this.dialogRef.close(obj);
  }

  Cerrarfrm() {    
    this.dialogRef.close();
  }

  //////
}

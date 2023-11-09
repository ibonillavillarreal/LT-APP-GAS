
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/srv_Mod1_siga/cliente.service';
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CargoService } from 'src/app/services/srv_Mod1_siga/Cargo.service';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-add-ies',
  templateUrl: './add-ies.component.html',
  styleUrls: ['./add-ies.component.css']
})
export class AddIesComponent implements OnInit {

  public frm_Ies_tb: FormGroup;
  public list_Clasificacion_IES:any [] =[];
  public toast: Toast;

  constructor(private _builder: FormBuilder, private src: PersonaService,
    private _snackBar: MatSnackBar, public ngZone: NgZone,
    public rt: Router, private src_Cargo: CargoService,
    private dialogRef: MatDialogRef<AddIesComponent>
  ) {
    this.toast = new Toast(_snackBar)

    this.frm_Ies_tb = this._builder.group({
      Id_Clasificacion_IES : [, Validators.required],
      Codigo : ['', Validators.required],
      RUC : ['', Validators.required],
      CodMigob : ['', Validators.required],
      Nombre : ['', Validators.required],
      Siglas : ['', Validators.required],
      Anio_fundacion : ['', Validators.required]
    });

    //this.loadCargos();
    //this.loadClaustro();
    //this.loadGrado();

  }

  ngOnInit(): void { }

  setComboFacultad(id: number){

  }
  
  // Gaurdar el Registro   
  enviar(values: any, formDirective: FormGroupDirective) {

    let IdUsuario: number = 1
    values.IdUsuario = IdUsuario

    this.toast.showToast('Registro Guardado correctamente ✔️ ', 'Aceptar')


    // this.src.addPersona(values).subscribe(res => {

    //   if (res) {
    //     this.toast.showToast('Registro Guardado correctamente ✔️ ', 'Aceptar')
    //   } else {
    //     this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
    //   }
    // })

    this.frm_Ies_tb.reset();
    formDirective.resetForm();
    this.dialogRef.close();
  }


}


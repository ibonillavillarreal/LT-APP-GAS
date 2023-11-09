import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CargoService } from 'src/app/services/srv_Mod1_siga/Cargo.service';
import { PersonaService } from 'src/app/services/srv_Mod1_siga/cliente.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  /***CAMPOS***/
  frm_oferta_tb: FormGroup  
  public toast: Toast
  public list_facultad: any[] = [];
  public list_Nivel_Formacion: any[] = [];
  public list_Claustro: any[] = [];
  public list_Grado: any[] = [];

  constructor(private _builder: FormBuilder, private src: PersonaService,
    private _snackBar: MatSnackBar, public ngZone: NgZone,
    public rt: Router, private src_Cargo: CargoService,
    private dialogRef: MatDialogRef<AddPlanComponent>
  ) {

    this.toast = new Toast(_snackBar)

    this.frm_oferta_tb = this._builder.group({
      Codigo: [],
      Versionn: ['', Validators.required],
      Numero_horas: ['', Validators.required],
      Numero_semanas: ['', Validators.required],
      Numero_asignaturas: ['', Validators.required],
      Numero_creditos: ['', Validators.required],
      Numero_periodos: ['', Validators.required]
    });

    //this.loadCargos();
    //this.loadClaustro();
    //this.loadGrado();

  }

  ngOnInit(): void {

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

    this.frm_oferta_tb.reset();
    formDirective.resetForm();
    this.dialogRef.close();
  }



}

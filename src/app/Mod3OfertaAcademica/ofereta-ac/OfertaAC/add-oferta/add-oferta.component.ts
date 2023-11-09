
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Component, Injectable, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast } from 'src/app/utils/Toast';
/******/
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';
/******/
import { OfrtAcademicaService } from 'src/app/services/srv_Mod3_OfrtAcademica/Ofrt-Academica.service';


export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};


@Injectable()
  export class PickDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
        return formatDate(date, 'dd/MM/yyyy', this.locale);
      } else {
        return date.toDateString();
      }
    }
  }


@Component({
  selector: 'app-add-oferta',
  templateUrl: './add-oferta.component.html',
  styleUrls: ['./add-oferta.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class AddOfertaComponent implements OnInit {
  /* Mensajeria */
  public toast: Toast
  /*** Formularios ***/
  frm_oferta_tb: FormGroup

  /**LISTAS COMBO BOX**/
  public list_facultad: any[] = [];
  public list_Nivel_Formacion: any[] = [];
  public list_area_conocimiento: any[] = [];
  public list_status: any[] = [];
  public list_vinculacion_convenio: any[] = [];
  public list_pais: any[] = [];
  public list_programa_especial: any[] = [];
  public list_ies: any[] = [];
  public list_Nombre_ec: any[] = [];
  public list_Nombre_mo: any[] = [];
  public list_Nombre_ra: any[] = [];
  public list_Nombre_tur: any[] = [];


  constructor(public rt: Router, private _builder: FormBuilder, 
    private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddOfertaComponent>,
    public srv_list_combos: OfrtAcademicaService, public srv_save_obj: OfrtAcademicaService 
    ) {

    this.toast = new Toast(_snackBar)

    this.frm_oferta_tb = this._builder.group({
      Id_facultad: [],
      Id_Nivel_Formacion: [],
      Id_area_conocimiento: [],
      Id_status: [],
      Id_vinculacion_convenio: [],
      Id_pais: [],
      Id_programa_especial: [],
      Id_ies: [],

      Codigo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Fecha_aprobacion_CU: ['', Validators.required],
      Numero_resolucion_CNU: ['', Validators.required],
      Nombre_titulo: ['', Validators.required],
      Cupos: ['', Validators.required],
      Duracion_anios: ['', Validators.required],
      Colaboracion_nacional: ['', Validators.required],
      Alcance_carrera: ['', Validators.required],
      Nombre_entidad: ['', Validators.required],

      Id_Nombre_ec: [],
      Id_Nombre_mo: [],
      Id_Nombre_ra: [],
      Id_Nombre_tur:[],
    });

    this.loadDataCombos();
  }

  ngOnInit(): void { }

  setCombo(type: number, id: number) {
    switch (type) {
      case 1: { this.frm_oferta_tb.controls['Id_facultad'].setValue(id); } break;
      case 2: { this.frm_oferta_tb.controls['Id_Nivel_Formacion'].setValue(id); } break;
      case 3: { this.frm_oferta_tb.controls['Id_area_conocimiento'].setValue(id); } break;
      case 4: { this.frm_oferta_tb.controls['Id_status'].setValue(id); } break;
      case 5: { this.frm_oferta_tb.controls['Id_vinculacion_convenio'].setValue(id); } break;
      case 6: { this.frm_oferta_tb.controls['Id_pais'].setValue(id); } break;
      case 7: { this.frm_oferta_tb.controls['Id_programa_especial'].setValue(id); } break;
      case 8: { this.frm_oferta_tb.controls['Id_ies'].setValue(id); } break;
      case 9: { this.frm_oferta_tb.controls['Nombre_tur'].setValue(id); } break;
      case 10: { this.frm_oferta_tb.controls['Nombre_ra'].setValue(id); } break;
      case 11: { this.frm_oferta_tb.controls['Nombre_mo'].setValue(id); } break;
      case 12: { this.frm_oferta_tb.controls['Nombre_ec'].setValue(id); } break;

    }
  }

  async loadDataCombos() {
    const plist_facultad = await this.srv_list_combos.get_Facultad(0).toPromise();
    const plist_Nivel_Formacion = await this.srv_list_combos.get_Nivel_Formacion(0).toPromise();
    const plist_area_conocimiento = await this.srv_list_combos.get_Area_Conocimiento(0).toPromise();
    const plist_status = await this.srv_list_combos.get_Statuss(0).toPromise();
    const plist_vinculacion_convenio = await this.srv_list_combos.get_Vinculacion_Convenio(0).toPromise();
    const plist_pais = await this.srv_list_combos.get_Pais(0).toPromise();
    const plist_programa_especial = await this.srv_list_combos.get_Programa_Especial(0).toPromise();
    const plist_ies = await this.srv_list_combos.get_IES(0).toPromise();
    const plist_Nombre_ec = await this.srv_list_combos.get_Enfoque_Curricular(0).toPromise();
    const plist_Nombre_mo = await this.srv_list_combos.get_Modalidad(0).toPromise();
    const plist_Nombre_ra = await this.srv_list_combos.get_Regimen_Academico(0).toPromise();
    const plist_Nombre_tur = await this.srv_list_combos.get_Turno(0).toPromise();
    /***/

     if(Array.isArray(plist_facultad)){
       plist_facultad.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_facultad.push({ 'id': element.Id, 'nombre': element.Nombre });         
       });
     }    
     if(Array.isArray(plist_Nivel_Formacion)){
       plist_Nivel_Formacion.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_Nivel_Formacion.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_area_conocimiento)){
       plist_area_conocimiento.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_area_conocimiento.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_status)){
       plist_status.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_status.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_vinculacion_convenio)){
       plist_vinculacion_convenio.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_vinculacion_convenio.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_pais)){
       plist_pais.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_pais.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_programa_especial)){
       plist_programa_especial.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_programa_especial.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_ies)){
       plist_ies.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_ies.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_Nombre_ec)){
       plist_Nombre_ec.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_Nombre_ec.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_Nombre_mo)){
       plist_Nombre_mo.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_Nombre_mo.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_Nombre_ra)){
       plist_Nombre_ra.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_Nombre_ra.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }
     if(Array.isArray(plist_Nombre_tur)){
       plist_Nombre_tur.forEach((element: { Id: any; Nombre: any; }) => {
         this.list_Nombre_tur.push({ 'id': element.Id, 'nombre': element.Nombre });
       });
     }

 }


  save_frm(formDirective: FormGroupDirective) { 
    //console.log(JSON.stringify(this.frm_oferta_tb.value));
    
    let IdUsuario: number = 1; this.frm_oferta_tb.value.IdUsuario = IdUsuario    
    let Id:number = 0; this.frm_oferta_tb.value.Id = Id;
    const obj_full=this.frm_oferta_tb.value;
    
    this.srv_save_obj.add_Facultad(obj_full).subscribe(res => {

      // if (res) {
      //   this.toast.showToast('Registro Guardado correctamente ✔️ ', 'Aceptar')
      // } else {
      //   this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
      // }
    })

    // this.frm_oferta_tb.reset();
    // formDirective.resetForm();
    // this.dialogRef.close();

  }


}

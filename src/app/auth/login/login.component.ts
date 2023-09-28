
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/srv_ini_Login/login.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, AfterViewInit {

  public tools: GlobalUtilities
  public login: FormGroup
  public firstFormGroup: FormGroup
  public secondFormGroup: FormGroup
  public isEditable = false;
  public Stepper_pasar = false;
  public user_pasar = false;
  public credenciales: any;
  public AuthModule: number[] = [];
  public ModuleRol:  any[] = [];
  public ModuloActivado!: number;
  @ViewChild('bodyContenedor') contenedor!: ElementRef;
  public elTexto!: string;
  

  constructor(private _formBuilder: FormBuilder,
    private _builder: FormBuilder, private src: LoginService, private render: Renderer2
  ) {
    this.tools = GlobalUtilities.getInstance();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.login = this._builder.group({
      user: ['', Validators.required],
      psw: ['', Validators.required]
    });
  }
  ngOnInit(): void { }

  ngAfterViewInit(): void {

    //let elements = document.querySelectorAll('mat-step-header');
    let elements = document.querySelectorAll('mat-horizontal-stepper');

    if (elements) {
      elements.forEach((e, i) => {
        //console.log('e', i, ': ', e);
        if (i === 0) {
          let click0 = e.addEventListener('click', () => this.lafunction(i));
        }
        else if (i === 1) {
          let click1 = e.addEventListener('click', () => this.lafunction(i));
        }
        else if (i === 2) {
          let click2 = e.addEventListener('click', () => this.lafunction(i));
        }
      })
    }
    //setTimeout(function () {}, 2000);
  }
  lafunction(elements: number) {
    switch (elements) {
      case (0):
        this.borrador_ModuloAcceso();
        //console.log('elements: ', elements);
        break;
    }
  }

  matStepClicked(stepper: MatStepper, step: number) {

    switch (step) {
      case (1):
        //{ "user": "ibonilla", "psw": "123" }
        this.credenciales = this.login.value
        const json_cls = { user: this.credenciales.user, psw: this.credenciales.psw };

        this.src.getVerifyLogin(json_cls).subscribe(res => {

          if (res.auth === true) {
            //console.log('la dataModulos: '+ JSON.stringify(res.losModulos));
            res.losModulos.forEach((x: any) => {
              this.AuthModule.push(x.CodModulo);
              this.ModuleRol.push(x);
              //{"CodRolMod":1,"CodUsuario":1,"CodRol":1,"CodModulo":1,
              //"Nombre":"GAS","NombreDescriptivoHTML":"Sistema para la Gestion de Actas",
              //"FechaRegistro":"2023-08-28T00:00:00.000Z","IdGrandUser":1,"Operacion":2}
              
            });
            this.user_pasar = true

            if (this.user_pasar) {

              this.Stepper_pasar = true;
              this.firstFormGroup.controls['firstCtrl'].setValue('validado');
              this.Stepper_pasar ? stepper.next() : stepper.previous();

              this.AuthModule.forEach(nModulo => {  //Pintar los Modulos en html HTMLINNER                 
                this.ModuloAcceso(nModulo);
              });

              this.login.controls['user'].setValue(null);
              this.login.controls['psw'].setValue(null);
              this.firstFormGroup.controls['firstCtrl'].setValue(null);

            } else {

              this.Stepper_pasar = false;
              this.login.controls['user'].setValue(null);
              this.login.controls['psw'].setValue(null);
              this.firstFormGroup.controls['firstCtrl'].setValue(null);
              this.AuthModule = [];
              this.tools.setAuthModule(this.AuthModule);
            }

          } else {

            this.user_pasar = false
            this.Stepper_pasar = false;
            this.tools.setAuthenticated(false);
            this.tools.setAuthModule(this.AuthModule);
            localStorage.removeItem('token')
            location.reload();
          }
        });
        break;

      case 2: {
        this.borrador_ModuloAcceso();
        stepper.reset();
        break;

      }
    }
  }
  borrador_ModuloAcceso() {
    const targetDiv = document.querySelectorAll(".divGenerado").forEach(element => {
      //element.setAttribute("color","red");
      element.remove();
      this.AuthModule = []; // limpia la variable de modulos
    });
   
  }

  ModuloAcceso(nModulo:number) {
    
    const elTextoSistema = ''+ (this.ModuleRol.find(o => o.CodModulo === nModulo).NombreDescriptivoHTML);
    const elTextoBoton = '' + (this.ModuleRol.find(o => o.CodModulo === nModulo).Nombre);
    const btnEstilo = '' +
      'border: 1px solid #2e518b;' +
      'padding: 10px;' +
      'background-color: #2e518b;' +
      'color: #ffffff;' +
      'text-decoration: none;' +
      'text-transform: uppercase;' +
      'font-family: ' + 'Helvetica' + ', sans-serif;' +
      'border-radius: 50px;'

    this.elTexto = '' +
      '<div style="margin: 1%;" #div2>' +
      '<h2 class="card-title"> Modulo - ' + nModulo + ' de 100 </h2>' +
      '<h3 class="card-title">' + elTextoSistema + '</h3>' +
      '<div class="col-lg-2" style="text-align: left;">' +
      '<button class="btn-element"; style="' + btnEstilo + ';"">' + elTextoBoton + '' +
      '</button>' +
      '</div>' +
      '</div>'

    const target = this.render.parentNode(this.contenedor.nativeElement);
    const createDiv = this.render.createElement("DIV");
    this.render.addClass(createDiv, "divGenerado");
    this.render.addClass(createDiv, "col-5");
    this.render.addClass(createDiv, "row");
    this.render.setStyle(createDiv, 'width', '100%');
    createDiv.innerHTML = this.elTexto;
    this.render.listen(createDiv, 'click', () => this.goModulo(nModulo));
    this.render.appendChild(target, createDiv);


    // let button: HTMLButtonElement = document.querySelector("btn-element");  


  }



  //
  // let stepper:MatStepper = this.renderStep.parentNode(this.stepperContent).nativeElement;
  goModulo(moduloSeleccionado: number) {

    // llama Credenciales: {"user":"ibonilla","psw":"123"}     
    this.ModuloActivado = moduloSeleccionado;
    this.tools.setModuloActivo(this.ModuloActivado);
    console.log('variable ModuloActivado : ' + this.ModuloActivado);
    console.log('funcion getModuloActivo : ' + this.tools.getModuloActivo());
    this.enviar(this.credenciales);
    this.credenciales = null
    this.login.controls['user'].setValue(null);
    this.login.controls['psw'].setValue(null);
  }



  enviar(values: any) {
    let cls = new User(values.user, values.psw);
    console.log(cls);

    //consulta el tkn     
    // this.src.getLogin(cls).subscribe(res => {
    //   console.log("LLEGA" + res)
    //   const tkn_auth = localStorage.getItem('token');
    //   console.log(' TKN-AUTH ' + res.token);
    //   if (res.auth) {
    //     localStorage.setItem('token', res.token);
    //     this.tools.setAuthenticated(true);
    //     location.reload()
    //   } else {
    //     this.tools.setAuthenticated(false);
    //     localStorage.removeItem('token')
    //   }
    // });


    //Datos Modulares       
    localStorage.setItem('AuthModule', '' + this.AuthModule);
    localStorage.setItem('ModuloActivado', '' + this.ModuloActivado);
    //Paso Directo al autorizado
    localStorage.setItem('token', '123');
    this.tools.setModuloActivo(this.ModuloActivado);
    this.tools.setAuthenticated(true);
    location.reload()

  }


}



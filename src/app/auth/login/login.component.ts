
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  public tools: GlobalUtilities
  public login: FormGroup
  public firstFormGroup: FormGroup
  public secondFormGroup: FormGroup
  public isEditable = false;
  public pasar = false;
  public credenciales:any;
  public AuthModule:Number[]=[];
  public ModuloActivado!:number;
   

  constructor(private _formBuilder: FormBuilder,
    private _builder: FormBuilder,
    private src: LoginService) {
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

  matStepClicked(stepper: MatStepper, step: number, moduloSeleccionado: number) {
    switch (step) {
      case (1):
        //{"user":"ibonilla","psw":"123"}
         this.credenciales = this.login.value
        if (this.credenciales.user === 'benito' && this.credenciales.psw === 'fiera') {
          this.pasar = true;
          this.firstFormGroup.controls['firstCtrl'].setValue('validado');
          this.AuthModule=[1,2,3,4,5];
          this.tools.setAuthModule(this.AuthModule);
        }
        this.pasar ? stepper.next() : stepper.previous();
        this.login.controls['user'].setValue(null);
        this.login.controls['psw'].setValue(null);
        this.firstFormGroup.controls['firstCtrl'].setValue(null);
        break;
      case (2):
        // llama Credenciales: {"user":"ibonilla","psw":"123"}     
        this.ModuloActivado =  moduloSeleccionado;
        this.tools.setModuloActivo(this.ModuloActivado);        
        console.log('variable ModuloActivado : '+this.ModuloActivado);
        console.log('funcion getModuloActivo : '+this.tools.getModuloActivo());
        this.enviar(this.credenciales);
        this.credenciales = null
        this.login.controls['user'].setValue(null);
        this.login.controls['psw'].setValue(null);

        break;
      default:
        // perform some other tasks
        break;
    }
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
     localStorage.setItem('AuthModule', ''+this.AuthModule);
     localStorage.setItem('ModuloActivado', ''+this.ModuloActivado);
    //Paso Directo al autorizado
    localStorage.setItem('token', '123');    
    this.tools.setModuloActivo(this.ModuloActivado);        
    this.tools.setAuthenticated(true);
    location.reload()

  }

}

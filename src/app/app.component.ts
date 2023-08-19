
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { GlobalUtilities } from './utils/GlobalUtilities'; 


@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  title = 'SIGA';
  reload:boolean = false;
  public ModuloActivado!:number;
  public AuthModule!:Number[];

  private tools:GlobalUtilities
  @ViewChild(MatSidenav) sidenav!:MatSidenav;

  constructor(private spinnerSevice: NgxSpinnerService,
              private obs:BreakpointObserver,
              private route:Router,
              private src:LoginService)
  {
    this.tools = GlobalUtilities.getInstance();
    this.tools.setIsLoading(false) //false  era el valor anterior
    this.route.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {

         if (event.id === 1 && event.url === event.urlAfterRedirects) {
             console.log('Donde debe de ir el TOKEN VALIDO ');
             //Datos Modulares       
             let _AuthModule =   localStorage.getItem('AuthModule');
             let _ModuloActivado =JSON.stringify(localStorage.getItem('ModuloActivado')).toString().replace(/['"]+/g, '').trim();             
             this.ModuloActivado = parseInt(_ModuloActivado);
             console.log('modulo activado numerico : '+this.ModuloActivado);

          //SIEMPRE QUE RECARGA SE REINICIA LA CLASE SINGELTON
            let tkn = localStorage.getItem('token')
          //  this.src.verify(tkn).subscribe( (data:boolean)=>{
          //  console.log('TOKEN VALIDO '+data);
          //  this.tools.setAuthenticated(true);
          //  this.reload = false;
          // })

               if(tkn==='123'){
                  this.tools.setAuthenticated(true);
                  this.reload = true;                                    
                  
               }else
               {
                this.tools.setAuthenticated(false);
                  this.reload = false;
               }
         }  
         
     })
       
  }   


  ngOnInit() {
    /** spinner starts on init */    
    this.spinnerSevice.show();    
    /** spinner ends after 5 seconds */
    setTimeout(() => { this.spinnerSevice.hide(); }, 1000);       
  }

  
  ngAfterViewInit(){ 
    this.obs.observe(['(max-width: 1300px)']).subscribe((res) =>{   //700px
          console.log('Etnra a la Resolucion: ' +JSON.stringify(res));

        if(res.matches ===false || res.matches === true){
            if(this.tools.IsAuthenticated()){
              this.sidenav.mode = 'over';
              this.sidenav.close();
              this.sidenav.mode = 'side';
              this.sidenav.open();

              let div_content = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
              div_content[0].style.marginLeft ="1%"
              div_content[0].style.marginRight ="1%"   
              div_content[0].style.margin = "10px"
              div_content[0].style.marginLeft ="30px"              
            }
        }else{
           if(this.tools.IsAuthenticated()){
           this.sidenav.mode = 'side';
           this.sidenav.open();
           let div_content = document.getElementsByClassName('content') as HTMLCollectionOf<HTMLElement>;
           div_content[0].style.margin ="10px"
           div_content[0].style.marginLeft ="30px"           
         }         
      }      
    }); 


  }


  logOut(){
    localStorage.removeItem('token')
    location.reload();
  }

  IsAuthenticated(){   
    return this.tools.IsAuthenticated();
  }
  isModuloActivado(){    
    return this.ModuloActivado;
  }

  Isreload(){    
    return this.reload;
  }
  IsLoading(){
    return this.tools.getIsLoading();

  }
}

export class SidenavAutosizeExample {
  showFiller = false;
}
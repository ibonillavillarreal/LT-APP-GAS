import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actas } from 'src/app/services/srv_Mod1_siga/Acta.service';

@Component({
  selector: 'app-addfiles',
  templateUrl: './addfiles.component.html',
  styleUrls: ['./addfiles.component.css']
})
export class addfilesComponent implements OnInit {
  Cod_Acta: any;      
  ofile:any; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcActa: Actas,
    private dialoRef: MatDialogRef<addfilesComponent>

  ) {
    this.Cod_Acta = data.id;    
  }

  ngOnInit(): void {
  }

  onFileChange(e:any) {        
    this.ofile = e.target.files[0];    
    //console.log('se carga el documento :', this.ofile);
  }

  onUpload() {        
    let frmData = new FormData();    
    frmData.append('docfile', this.ofile,`UpDocCodActa`+this.Cod_Acta+`.docx`); 
    
    this.srcActa.subir(frmData).subscribe((res) => {
        console.log(res);      
        this.dialoRef.close(res);
    });

  }

  Cerrar() {
    this.dialoRef.close();
  }

}

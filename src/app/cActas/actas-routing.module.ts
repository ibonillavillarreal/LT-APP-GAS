import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListActaComponent } from './Components/List-acta/list-acta.component';

const routes: Routes = [
  {
    path: '',
    component:ListActaComponent,
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    
  ],
  exports: [
    RouterModule
  ]
})
export class ActaRoutingModule { }

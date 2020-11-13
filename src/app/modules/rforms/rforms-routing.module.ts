import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RformsComponent } from './components/rforms/rforms.component';


const routes: Routes = [{ path: '', component: RformsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RformsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ChildComponent } from './components/child/child.component';

import { PagesComponent } from './components/main/pages.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserResolveService } from './service/user-resolve/user-resolve.service';

// CanActivate/CanActivateChild
// CanDeactivate/CanDeactivateChild
// canLoad
// Resolve

const routes: Routes = [
  { path: '', component: PagesComponent },
  {
    path: 'child/:id',
    canActivate:[AuthGuard],
    resolve:{
      user:UserResolveService
    },
    data: {
      title: "Title",
      description: "description"
    },
    component: ChildComponent },
  { path: 'child/:id', component: ChildComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

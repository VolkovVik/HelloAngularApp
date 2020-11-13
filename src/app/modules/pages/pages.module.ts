import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './components/main/pages.component';
import { ChildComponent } from './components/child/child.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserResolveService } from './service/user-resolve/user-resolve.service';


@NgModule({
  declarations: [PagesComponent, ChildComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  providers:[AuthGuard,UserResolveService]
})
export class PagesModule { }

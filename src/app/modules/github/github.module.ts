import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GithubRoutingModule } from './github-routing.module';
import { GithubComponent } from './components/main/github.component';


@NgModule({
  declarations: [GithubComponent],
  imports: [
    CommonModule,
    GithubRoutingModule,    
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GithubModule { }

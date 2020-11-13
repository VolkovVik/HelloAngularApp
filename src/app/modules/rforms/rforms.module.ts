import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RformsRoutingModule } from './rforms-routing.module';
import { RformsComponent } from './components/rforms/rforms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [RformsComponent],
  imports: [
    CommonModule,
    RformsRoutingModule,    
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RformsModule { }

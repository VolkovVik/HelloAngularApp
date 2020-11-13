import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type TLColor = 'red'|'yellow'|'green';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=> TrafficComponent),
    multi:true
  }]
})
export class TrafficComponent implements ControlValueAccessor {

  private _colors: TLColor[] = ['red', 'yellow','green'];
  private _currentColor:TLColor;
  propagateChange = ()=>{};
  propagateTouch = ()=>{};

  get currentColor(){
    return this._currentColor;
  }

  set currentColor(color:TLColor){
    this._currentColor = color;
    this.propagateChange();
    this.propagateTouch ();
  }

  constructor() { }

  writeValue(color: TLColor): void {
    this.currentColor = color;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  toggleDown(){
    this._currentColor = this._colors[(this._colors.indexOf(this._currentColor)+1) % 3];
  }

  toggleUp(){
    this._currentColor = this._colors[(this._colors.indexOf(this._currentColor)+2) % 3];
  }

  switchColor(color: TLColor){
    this._currentColor = color;
  }
}

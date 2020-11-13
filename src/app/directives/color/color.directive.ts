import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appColor]',
  exportAs:'colory'
})
export class ColorDirective implements OnInit {

  private counter: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.myColor = 'red';
    setTimeout(() => {
      this.myColor = 'blue';
    }, 3000);
  }

  // Обновление свойств
  @HostBinding('style.color') myColor: string;

  // Обработка событий
  @HostListener('click', ['$event']) changeColor(event) {
    this.setRandomColor();
  }

  setRandomColor(){
    this.myColor = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    this.counter++;
    console.log(this.counter + ' -> ' + this.myColor);
  }
}

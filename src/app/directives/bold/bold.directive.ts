import { Directive, ElementRef, Renderer2, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBold]',
  exportAs:'appMyBold',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '[style.fontSize]':'getFontSize',
    '[style.fontWeight]': 'getFontWeight',
    '[style.cursor]': 'getCursor'
  }
})
export class BoldDirective implements OnInit{

  @Input() selectedSize = "18px";
  @Input() defaultSize = "16px";

  private fontSize: string;
  private fontWeight = "normal";
  private counter:number = 0;

  ngOnInit() {
    this.fontSize = this.defaultSize;
  }

  @HostBinding("style.color") myColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

    //this.elementRef.nativeElement.style.fontWeight = "bold";
    //this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", "bold");
    this.renderer.setStyle(this.elementRef.nativeElement, "cursor", "pointer");

    this.myColor = 'red';
    setTimeout(() => {
        this.myColor = 'green';
      },
      3000);
  }

  @HostListener('click', ['$event'])
  changeColor(event) {
    this.setRandomColor();
    this.counter++;
    console.log(this.counter);
  }

  setRandomColor() {
    this.myColor = '#' + Math.floor(Math.random() * 16777214).toString(16);
  }

  //@HostListener("mouseenter")
  onMouseEnter() {
    console.log("mouseenter");
    this.setFontWeight("bold");
    this.fontSize = this.selectedSize;
  }

  //@HostListener("mouseleave")
  onMouseLeave() {
    console.log("mouseleave");
    this.setFontWeight("normal");
    this.fontSize = this.defaultSize;
  }

  private setFontWeight(val: string) {
    this.fontWeight = val;
    this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", val);
  }

  //@HostBinding("style.fontWeight")
  get getFontWeight() {
    console.log(`Font: ${this.fontWeight}`);
    return this.fontWeight;
  }

  //@HostBinding("style.fontSize")
  get getFontSize() {
    return this.fontSize;
  }

  //@HostBinding("style.cursor")
  get getCursor() {
    console.log(`Cursor: ${this.fontWeight}`);
    return "pointer";
  }
}

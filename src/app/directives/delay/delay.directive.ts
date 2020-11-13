import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDelay]'
})
export class DelayDirective implements OnInit {

  @Input() appDelay: number;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.template);
    }, this.appDelay * 1000);
  }
}

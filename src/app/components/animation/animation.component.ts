import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('expandedPanel', [
      state('initial', style({ height: 0, color: "red" })),
      state('expanded', style({ height: '*', color: '*' })),
      transition('initial <=> expanded', animate('1s'))
    ]),
    trigger('animationTriggerName', [
      //transition('void => *', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
      //transition('* => void', [
      transition(':leave', [
        //animate('1s', style({ opacity: 0 })),
        animate('2s', keyframes([
          style({fontSize: '1px', offset: 0}),
          style({fontSize: '9px', offset: 0.5}),
          style({fontSize: '18px', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AnimationComponent {

  isExpanded: boolean = false;
  isVisible: boolean = false;
  state: string = 'initial';

  expand() {
    this.isExpanded = !this.isExpanded;
    this.isVisible = !this.isVisible;
    this.state = this.isExpanded ? 'expanded' : 'initial';
  }

  whenAnimate(event:AnimationEvent){
    console.log(event);
  }
}

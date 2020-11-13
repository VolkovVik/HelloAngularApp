import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    //this.routeSubscription = activatedRoute.params.subscribe(params => this.id = params['id']);
    //this.routeSubscription = activatedRoute.params.subscribe(params => this.id = params['id']);
    //this.querySubscription = activatedRoute.queryParams.subscribe(
    //  (queryParam: any) => {
    //    this.product = queryParam['product'];
    //    this.price = queryParam['price'];
    //  }
    //);
    this.route.params.subscribe(params => console.log(params));
    this.route.queryParams.subscribe(params => console.log(params));
    this.route.data.subscribe(data => console.log(data));

    this.route.data.subscribe(data => console.log(data.user));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('router.events' + event.toString());
      }
    });

  }

  ngOnInit(): void { }
}

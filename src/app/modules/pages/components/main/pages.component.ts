import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void { }

  goToUser() {
    //this.router.navigate(['/pages/child', 1]);
    this.router.navigate(['child', 1], { relativeTo: this.route }).then(value => {
      console.log('goto');
      console.log(value);
    });
    //this.router.navigateByUrl('pages/child/'+ 1, {skipLocationChange:true});
  }
}

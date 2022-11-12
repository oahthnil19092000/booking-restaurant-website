import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-content',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.scss']
})
export class GridContentComponent implements OnInit {

  contents: any = [
    {
      title: "CATERING", content: "We will bring special dishes to you! From carefully handcrafted sides, to vegan and vegetarian options, to classics from all regions of France - it's all here.", label: "Order Now", routerLink: "/customer/menu",
    },
    {
      title: "MENU", content: "Everything we serve is house-made and prepared by a staff that cares. You could spend a lifetime sampling every flavor combination at Matuyd, and we hope you do.", label: "Order Now", routerLink: "/customer/menu",
    },
    {
      title: "Reservations", content: "Anton's is very much a neighborhood restaurant, and we always reserve seats for walk-in guests in our dining room. Reservations are available via Matuyd website.", label: "Reserve a Table", routerLink: "/customer/reserse-table",
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}


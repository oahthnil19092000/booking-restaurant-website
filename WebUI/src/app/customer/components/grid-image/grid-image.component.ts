import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.scss']
})
export class GridImageComponent implements OnInit {

  tiles: any[] = [
    { src: '/assets/images/panel3.png', cols: 3, rows: 1 },
    { src: '/assets/images/panel1.png', cols: 1, rows: 2 },
    { src: '/assets/images/panel4.png', cols: 1, rows: 1 },
    { src: '/assets/images/panel2.png', cols: 2, rows: 1 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

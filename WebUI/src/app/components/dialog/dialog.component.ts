import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMessage } from 'src/app/models/message';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: IMessage) { }

  ngOnInit(): void {
  }

}

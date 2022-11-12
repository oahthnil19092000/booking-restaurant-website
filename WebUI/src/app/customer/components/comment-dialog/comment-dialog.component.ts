import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { CommentService } from '../../../services/http/comment.service';
import { IMessage } from '../../../models/message';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { MatButton } from '@angular/material/button';
import { ICommentCreate } from 'src/app/models/comment-create';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  protected score: Number;
  private commentService: CommentService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(@Inject(MAT_DIALOG_DATA) public billId: Number, http: HttpClient, dialog: MatDialog) {
    this.loadingPanel = new LoadingPanel(dialog);
    this.commentService = new CommentService(http);
    this.dialogService = new DialogSevice(dialog);
    this.score = 0;
  }
  bill_id = new FormControl(0, [
    Validators.required,
    Validators.min(1),
  ]);
  content = new FormControl('', [
    Validators.required,
  ]);
  point = new FormControl(0, [
    Validators.required,
    Validators.min(1),
    Validators.max(5),
  ]);
  commentForm = new FormGroup({
    bill_id: this.bill_id,
    content: this.content,
    point: this.point,
  },);
  ngOnInit(): void {
    this.commentForm.patchValue({ bill_id: <number>this.billId });
  }
  changeScore(score: Number) {
    this.score = score;
    this.commentForm.patchValue({ point: <number>score });
  }
  getClassColor(score: Number) {
    if (score <= 1) {
      return 'color-red';
    } else if (score <= 4) {
      return 'color-orange';
    } else {
      return 'color-yellow';
    }
  }
  onSubmit(button: MatButton) {
    if (this.commentForm.value.content != null) {
      let content: String = this.commentForm.value.content;
      let contentArr = content.split('\n').join(". ").split(' ');
      contentArr = contentArr.filter(function (item) {
        return item !== '' && item !== '.'
      })
      content = contentArr.join(' ');
      content = content.split('..').join(".").split(',.').join(".");
      this.commentForm.patchValue({ content: <string>content });
      this.loadingPanel.show();
      this.commentService.createNewComment(<ICommentCreate>this.commentForm.value).subscribe((message: IMessage) => {
        this.loadingPanel.hide();
        this.dialogService.show(message);
        button._elementRef.nativeElement.click();
      });
    }

  }
}

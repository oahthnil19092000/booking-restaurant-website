import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IBill } from 'src/app/models/bill';
import { IComment } from 'src/app/models/comment';
import { ICommentList } from 'src/app/models/comment-list';
import { IFeedback } from 'src/app/models/feedback';
import { IMessage } from 'src/app/models/message';
import { ITicket } from 'src/app/models/ticket';
import { IUser } from 'src/app/models/user';
import { BillService } from 'src/app/services/http/bill.service';
import { CommentService } from 'src/app/services/http/comment.service';
import { FeedbackService } from 'src/app/services/http/feedback.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
  private commentService: CommentService;
  private feedbackService: FeedbackService;
  private userService: UserService;
  private billServise: BillService;
  private ticketService: TicketService;

  public commentList: ICommentList[] = [];
  public numberOfComment: number;
  public averageScore: number;

  constructor(http: HttpClient) {
    this.commentService = new CommentService(http);
    this.feedbackService = new FeedbackService(http);
    this.userService = new UserService(http);
    this.billServise = new BillService(http);
    this.ticketService = new TicketService(http);
    this.averageScore = 0;
    this.numberOfComment = 0;
  }
  ngOnInit(): void {
    this.getAllComment();
    // this.getScore();
  }
  getAllComment() {
    this.commentService.getAllComment().subscribe((commentList: IComment[]) => {
      commentList.forEach((comment: IComment) => {
        this.billServise.getById(comment.bill_id).subscribe((bill: IBill) => {
          this.ticketService
            .getByTicketId(bill.ticket_id)
            .subscribe((ticket: ITicket) => {
              this.userService
                .getInfo(ticket.customer_id)
                .subscribe((customer: IUser | any) => {
                  this.feedbackService
                    .getFeedbackWithCommentId(comment.id)
                    .subscribe((feedback: IFeedback | any) => {
                      if (feedback.message != null) {
                        let commentInfo: ICommentList = {
                          customer: customer,
                          comment: comment,
                          feedback: null,
                          admin: null,
                        };
                        this.commentList.push(commentInfo);
                      } else {
                        this.userService
                          .getInfo(feedback.admin_id)
                          .subscribe((admin: IUser | any) => {
                            let commentInfo: ICommentList = {
                              customer: customer,
                              comment: comment,
                              feedback: feedback,
                              admin: admin,
                            };
                            this.commentList.push(commentInfo);
                          });
                      }
                    });
                });
            });
        });
        this.averageScore = this.averageScore + <number>comment.point;
      });
      this.numberOfComment = commentList.length;
      this.averageScore /= this.numberOfComment;
      this.averageScore = parseInt(this.averageScore.toFixed());
    });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  renderTime(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleTimeString();
    } else return '';
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
}

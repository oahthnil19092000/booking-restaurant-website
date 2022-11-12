import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IFeedback } from 'src/app/models/feedback';
import { IFeedbackCreate } from 'src/app/models/feedback-create';
@Injectable()
export class FeedbackService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/feedback';

  getFeedbackWithCommentId(comment_id: Number): Observable<IFeedback | IMessage | any> {
    return this.http.get<IFeedback | IMessage>(this.url + '/get-with-comment-id/' + comment_id);
  }
  createNewFeedback(feedback: IFeedbackCreate): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create/', feedback);
  }

  updateFeedback(id: Number, feedback: IFeedbackCreate): Observable<IFeedback | IMessage | any> {
    return this.http.put<IFeedback | IMessage>(
      this.url + '/update/' + id,
      feedback
    );
  }
  deteleFeedback(comment_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(this.url + '/delete/' + comment_id);
  }
}

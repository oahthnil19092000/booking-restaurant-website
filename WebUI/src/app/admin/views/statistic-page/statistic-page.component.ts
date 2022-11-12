import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/http/bill.service';
import { CommentService } from 'src/app/services/http/comment.service';
import { FeedbackService } from 'src/app/services/http/feedback.service';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TableService } from 'src/app/services/http/table.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { TypePartyService } from 'src/app/services/http/type-of-party.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogApprovalDeliverSevice } from 'src/app/services/loading/dialog_approval_delivery';
import { DialogCommentSevice } from 'src/app/services/loading/dialog_comment';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { DialogFoodDetailSevice } from 'src/app/services/loading/dialog_detail_ticket';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IPagination } from '../../../models/pagination';
import { IUserList } from '../../../models/user-list';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {

  protected totolRevenue: Number = 0;
  protected numberOfCustomer: Number = 0;
  protected theBestSellingProduct: any = null;
  protected theMostBookedTableType: any = null;
  private userService: UserService;
  private foodService: FoodService;
  private commentService: CommentService;
  private typePartyService: TypePartyService;
  private orderService: OrderService;
  private tableService: TableService;
  private billService: BillService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  private feedbackService: FeedbackService;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  private foodDetailDialog: DialogFoodDetailSevice;
  private commentDialog: DialogCommentSevice;
  private approvalDeliverDialog: DialogApprovalDeliverSevice;
  private mainIngredientDetailService: MainIngredientDetailService;
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.dialogService = new DialogSevice(dialog);
    this.foodDetailDialog = new DialogFoodDetailSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.approvalDeliverDialog = new DialogApprovalDeliverSevice(dialog);
    this.commentDialog = new DialogCommentSevice(dialog);
    this.feedbackService = new FeedbackService(http);
    this.typePartyService = new TypePartyService(http);
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.foodService = new FoodService(http);
    this.commentService = new CommentService(http);
    this.orderService = new OrderService(http);
    this.tableService = new TableService(http);
    this.publicFileService = new PublicFileService(http);
    this.billService = new BillService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
  }

  ngOnInit(): void {
    this.getTotalRevenue();
    this.getNumberOfCustomer();
    this.getTheBestSellingProductInCurrentMonth();
    this.getTheMostBookedTableTypeInCurrentMonth();
  }
  getNumberOfCustomer() {
    let pagination: IPagination = {
      size: null,
      field: null,
      is_reverse_sort: null,
      page: null
    };
    this.userService.getCustomerList(pagination, null).subscribe((userList: IUserList | any) => {
      this.numberOfCustomer = userList.count;
    })
  }
  getTheBestSellingProductInCurrentMonth() {
    this.billService.getTheBestSellingProductInCurrentMonth().subscribe((theBestSellingProduct: any) => {
      if (theBestSellingProduct != null) {
        this.theBestSellingProduct = theBestSellingProduct;
      } else {
        this.theBestSellingProduct = null;
      }
    })
  }
  getTheMostBookedTableTypeInCurrentMonth() {
    this.billService.getTheMostBookedTableTypeInCurrentMonth().subscribe((theMostBookedTableType: any) => {
      if (theMostBookedTableType != null) {
        this.theMostBookedTableType = theMostBookedTableType;
      } else {
        this.theMostBookedTableType = null;
      }
    })
  }
  getTotalRevenue() {
    this.billService.getTotalRevenue().subscribe((totolRevenue: Number) => {
      this.totolRevenue = totolRevenue;
    })
  }

  formatNumber(price: Number) {
    let number = <number>price;
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(number);
  }
}

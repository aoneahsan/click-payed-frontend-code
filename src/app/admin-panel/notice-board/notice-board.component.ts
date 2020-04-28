import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';
import { Subscription } from 'rxjs';
import { SystemService } from '@src/app/services/system.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  newNotice = '';

  noticeMessages: { date_time, message }[] = [];
  // noticeMessagesSub: Subscription;
  constructor(
    private _adminpanelService: AdminPanelService,
    private _systemService: SystemService
  ) { }

  get newNoticeEntered() {
    return !!this.newNotice;
  }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );
    // send http to get messages from server 
    // this.noticeMessagesSub = this._adminpanelService.getNoticeBoardMessages().subscribe();
    this.noticeMessages = [
      { date_time: '21/03/20 | 2145', message: 'Currently we are accepting balance top-ups via easypaisa and jazzcash only. For any assistance, please reach us via our customer service WhatsApp' },
      { date_time: '21/03/20 | 2145', message: 'Currently we are accepting balance top-ups via easypaisa and jazzcash only. For any assistance, please reach us via our customer service WhatsApp' },
      { date_time: '21/03/20 | 2145', message: 'Currently we are accepting balance top-ups via easypaisa and jazzcash only. For any assistance, please reach us via our customer service WhatsApp' },
      { date_time: '21/03/20 | 2145', message: 'Currently we are accepting balance top-ups via easypaisa and jazzcash only. For any assistance, please reach us via our customer service WhatsApp' },
    ]
  }

  sendNewNotice() {
    if (!!this.newNotice) {
      //send http to post new notice
      alert("post new notice");
      this.newNotice = '';
    }
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}

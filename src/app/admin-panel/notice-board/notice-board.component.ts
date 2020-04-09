import { Component, OnInit } from '@angular/core';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit {

  newNotice = '';

  noticeMessages: { date_time, message }[] = [];
  // noticeMessagesSub: Subscription;
  constructor(private _adminpanelService: AdminPanelService) { }

  get newNoticeEntered() {
    return !!this.newNotice;
  }

  ngOnInit() {
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

}

import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';
import { ModalDialogService } from 'nativescript-angular/common';
import { ProcessWithdrawalsPopupComponent } from './process-withdrawals-popup/process-withdrawals-popup.component';
import { UIService } from '@src/app/shared/ui/ui.service';
import { SystemService } from '@src/app/services/system.service';

import { WithDrawalRequestsInterface } from './../../interface/admin/withdrawal-requests-interface';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

@Component({
  selector: 'app-process-withdrawals',
  templateUrl: './process-withdrawals.component.html',
  styleUrls: ['./process-withdrawals.component.scss']
})
export class ProcessWithdrawalsComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  public selectedIndex = 0;
  public items: any;

  loadingResult: boolean = false;

  requests: WithDrawalRequestsInterface[] = null;
  _fetchWithdrawalRequests_Sub: Subscription;
  _getWithdrawalRequests_Sub: Subscription;

  constructor(
    private _modalService: ModalDialogService,
    private _viewRe: ViewContainerRef,
    private _uiService: UIService,
    private _systemService: SystemService,
    private _adminpanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.items = new ValueList([
      { value: "all_withdrawal_requests", display: "VIEW | All Withdrawal Requests" },
      { value: "all_pending_requests", display: "VIEW | All Pending Requests" },
      { value: "all_approved_requests", display: "VIEW | All Approved Requests" },
      { value: "all_rejected_requests", display: "VIEW | All Rejected Requests" }
    ]);
    
    this.fetchWithdrawalRequestsAction();
  }

  fetchWithdrawalRequestsAction() {
    this._systemService.loadingPageDataTrue();
    this._fetchWithdrawalRequests_Sub = this._adminpanelService.fetchWithdrawalRequests().subscribe(
      res => {
        console.log('ProcessWithdrawalsComponent == fetchWithdrawalRequests == response = ',res);
        this._adminpanelService.setWithdrawalRequests(res.data);
        this.getWithdrawalRequestsAction();
        this._systemService.loadingPageDataFalse();
      },
      err => {
        this._systemService.loadingPageDataFalse();
        console.log('ProcessWithdrawalsComponent == fetchWithdrawalRequests == error = ',err);
        alert("Error Occured, Try Again!");
      }
    );
  }

  getWithdrawalRequestsAction() {
    this._systemService.loadingPageDataTrue();
    this._getWithdrawalRequests_Sub = this._adminpanelService.getWithdrawalRequests().subscribe(
      data => {
        this.requests = data;
        this._systemService.loadingPageDataFalse();
      }
    );
  }

  public onchange(args: SelectedIndexChangedEventData) {
    this.loadingResult = true;
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    console.log(this.items._array[args.newIndex]);
    setTimeout(() => {
      this.loadLocalData(args.newIndex);
    }, 700);
  }

  loadLocalData(dataSet: number) {
    // if (dataSet == 0) {
    //   this.requests = this.all_withdrawal_requests;
    // } else if (dataSet == 1) {
    //   this.requests = this.all_pending_requests;
    // } else if (dataSet == 2) {
    //   this.requests = this.all_approved_requests;
    // } else if (dataSet == 3) {
    //   this.requests = this.all_rejected_requests;
    // };
    this.loadingResult = false;
  }

  showRequestDetail(item_id) {
    const loadedItem: WithDrawalRequestsInterface = this.requests.find(el => el.id == item_id);
    // console.log(loadedItem);
    if (loadedItem.status == 'pending') {
      this.showModal(loadedItem);
    } else if (loadedItem.status == 'approved') {
      let options = {
        title: "Approved",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nAdditional Note: " + loadedItem.additional_note + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    } else if (loadedItem.status == 'rejected') {
      let options = {
        title: "Rejected",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nAdditional Note: " + loadedItem.additional_note + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    }

  }

  showModal(loadedItem: WithDrawalRequestsInterface) {
    this._modalService.showModal(
      ProcessWithdrawalsPopupComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRe,
        context: {
          item: loadedItem
        }
      }
    ).then(
      res => {
        if (res == 'approved') {
          console.log("Request Approved!");
        }
        else if (res == 'rejected') {
          console.log("Request Rejected!");
        }
        else if (res == undefined) {
          alert("Process Canceled");
        }
      }
    );
  }


  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._fetchWithdrawalRequests_Sub) {
      this._fetchWithdrawalRequests_Sub.unsubscribe();
    }
    if (this._getWithdrawalRequests_Sub) {
      this._getWithdrawalRequests_Sub.unsubscribe();
    }
  }

}

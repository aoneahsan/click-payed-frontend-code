import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalDialogService } from 'nativescript-angular/common';

import { ValueList, SelectedIndexChangedEventData } from 'nativescript-drop-down';

import { UIService } from '@src/app/shared/ui/ui.service';
import { SystemService } from '@src/app/services/system.service';
import { AdminPanelService } from '@src/app/services/adminpanel/adminpanel.service';

import { DepositRequestModel } from './../../../models/admin/deposit-request-model';

import { DepositPendingRequestsPopupComponent } from './deposit-pending-requests-popup/deposit-pending-requests-popup.component';

@Component({
  selector: 'app-deposit-pending-requests',
  templateUrl: './deposit-pending-requests.component.html',
  styleUrls: ['./deposit-pending-requests.component.scss']
})

export class DepositPendingRequestsComponent implements OnInit, OnDestroy {

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  public selectedIndex = 0;
  public items: any;
  @ViewChild('dropdow', { static: false }) dropdow: ElementRef;

  loadingResult: boolean = false;

  requests: DepositRequestModel[] = [];
  _getDepositRequests_Sub: Subscription;
  _fetchDepositRequests_Sub: Subscription;
  _showRequestsOfStatus: 'all' | 'approved' | 'rejected' | 'pending' = null;

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
      { value: "all_withdrawal_requests", display: "VIEW | All Deposit Requests" },
      { value: "all_pending_requests", display: "VIEW | All Pending Requests" },
      { value: "all_approved_requests", display: "VIEW | All Approved Requests" },
      { value: "all_rejected_requests", display: "VIEW | All Rejected Requests" }
    ]);

    // Fetch All Deposit Requests
    this.fetchDepositRequests();
  }

  fetchDepositRequests() {
    this._systemService.loadingPageDataTrue();
    this._getDepositRequests_Sub = this._adminpanelService.getDepositRequests().subscribe(
      data => {
        if (data) {
          this.requests = data;
          this._systemService.loadingPageDataFalse();
        }
        else {
          this._fetchDepositRequests_Sub = this._adminpanelService.fetchAllDepositRequests().subscribe(
            res => {
              this._systemService.loadingPageDataFalse();
              console.log('PendingDepositRequestsComponent == fetchAllDepositRequests == response = ', res);
              this._adminpanelService.setDepositRequests(res.data);
            },
            err => {
              this._systemService.loadingPageDataFalse();
              console.log('PendingDepositRequestsComponent == fetchAllDepositRequests == error = ', err);
              alert("Error Occured While Fetching Deposit Requests, Try Again!");
            }
          );
        }
      }
    );
  }

  loadLocalData(dataSet: number) {
    if (dataSet == 0) {
      this._showRequestsOfStatus = 'all';
    } else if (dataSet == 1) {
      this._showRequestsOfStatus = 'pending';
    } else if (dataSet == 2) {
      this._showRequestsOfStatus = 'approved';
    } else if (dataSet == 3) {
      this._showRequestsOfStatus = 'rejected';
    };
    this.loadingResult = false;
  }



  showRequestDetail(item_id) {
    const loadedItem: DepositRequestModel = this.requests.find(el => el.id == item_id);
    // console.log(loadedItem);
    if (loadedItem.status == 'pending') {
      this.showModal(loadedItem);
    } else if (loadedItem.status == 'approved') {
      let options = {
        title: "Approved",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    } else if (loadedItem.status == 'rejected') {
      let options = {
        title: "Rejected",
        message: 'TRX = ' + loadedItem.trx_id + "\n\nDate: " + loadedItem.date_time,
        okButtonText: 'Okay'
      };
      alert(options);
    }

  }

  showModal(loadedItem: DepositRequestModel) {
    this._modalService.showModal(
      DepositPendingRequestsPopupComponent,
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
          console.log("request approved");
          loadedItem.status = 'approved';
        }
        else if (res == 'rejected') {
          console.log("request rejected");
          loadedItem.status = 'rejected';
        }
        else if (res == undefined) {
          alert("Process Canceled");
        }
      }
    );
  }

  public onDropDownChange(args: SelectedIndexChangedEventData) {
    this.loadingResult = true;
    // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}, args are ${args}`);
    console.log(this.items._array[args.newIndex]);
    setTimeout(() => {
      this.loadLocalData(args.newIndex);
    }, 100);
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
    if (this._getDepositRequests_Sub) {
      this._getDepositRequests_Sub.unsubscribe();
    }
    if (this._fetchDepositRequests_Sub) {
      this._fetchDepositRequests_Sub.unsubscribe();
    }
  }

}

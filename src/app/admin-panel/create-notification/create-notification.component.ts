// Angular Important
import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// NativeScript Imports
import { ModalDialogService } from 'nativescript-angular/common';

// Services
import { UIService } from '@src/app/shared/ui/ui.service';
import { SystemService } from '@src/app/services/system.service';

// Components
import { NotificationContactsComponent } from './notification-contacts/notification-contacts.component';

// Model
import { UserContact } from './../../models/user-contact-model';

// Plugins
const ImagePicker = require('nativescript-imagepicker');
const imageSource = require("tns-core-modules/image-source");
const fsModule = require('tns-core-modules/file-system');

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss']
})

export class CreateNotificationComponent implements OnInit, OnDestroy {

  notification_title = null;
  notification_content = null;
  notification_img = null;
  img_uploaded: boolean = false;
  downloadLink = null;

  selectedContacts: UserContact[] = [];
  selectedContactsCount = 0;

  loadinPageData_s: boolean = true;
  loadinPageDataSub: Subscription;

  constructor(
    private _modalService: ModalDialogService,
    private _uiService: UIService,
    private _viewRef: ViewContainerRef,
    private _systemService: SystemService
  ) { }

  ngOnInit() {
    this.loadinPageDataSub = this._systemService.getLoadinPageDataStatus().subscribe(
      status => {
        this.loadinPageData_s = status;
      }
    );

    this.selectedContacts = [
      { id: 1, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 2, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 3, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 4, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 5, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 6, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 7, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 8, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 9, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 10, name: "Ahsan", email: "ahsan@demo.com", selected: false },
      { id: 11, name: "Ahsan", email: "ahsan@demo.com", selected: false }
    ];
  }

  uploadImage() {
    // console.log(new Date().getTime());
    var that = this;
    var context = ImagePicker.create({
      mode: "single"
    });

    context.authorize().then(function () {
      return context.present();
    }).then(function (selection) {
      selection.forEach(function (selected) {
        let file;
        if (selected.android) {
          file = fsModule.File.fromPath(selected.android);
          that.img_uploaded = true;
          that.notification_img = file._path;

        } else {
          imageSource.formAsset(selected).then(function (_imgae) {
            const folder = fsModule.knownFolders.currentApp().path;
            const fileName = new Date().getTime() + '.png';
            const imgPath = fsModule.path.join(folder, fileName);
            const saveImg = imageSource.saveToFile(imgPath, 'png');

            if (saveImg) {
              console.log("Image Saved Succefully");
              file = fsModule.File.fromPath(imgPath);

            } else {
              console.log("Error Occured - uploading - IOS!");
            }
          });
        }
      });
    }).catch(err => {
      console.log("Uploading Image Error - create noti.. component - Main", err);
    })

  }

  chooseContacts() {
    // alert("choose Contact");
    this._modalService.showModal(
      NotificationContactsComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
        context: {
          users: this.selectedContacts,
          modalType: false
        }
      }
    )
      .then(
        res => {
          if (res != undefined && res != 'okay') {
            this.selectedContacts = res;
            this.countSelectedContacts();
          }
          else if (res == 'okay') {
            console.log("OKAY");
          }
        },
        err => {
          console.log('Error', err);
        }
      );
  }

  countSelectedContacts() {
    let count = 0;
    setTimeout(() => {
      console.log(this.selectedContacts);
      this.selectedContacts.forEach(user => {
        if (user.selected) {
          count = count + 1;
        }
      });
      this.selectedContactsCount = count;
      console.log(this.selectedContactsCount);
    }, 200);
  }

  showSuccessMessage() {
    this._modalService.showModal(
      NotificationContactsComponent,
      {
        fullscreen: false,
        viewContainerRef: this._uiService.getAppVCRef() ? this._uiService.getAppVCRef() : this._viewRef,
        context: {
          users: [],
          modalType: true
        }
      }
    )
      .then(
        res => {
          if (res == 'okay') {
          }
          else {
          }
        },
        err => {
          console.log('Error', err);
        }
      );
  }

  ngOnDestroy() {
    if (this.loadinPageDataSub) {
      this.loadinPageDataSub.unsubscribe();
    }
  }

}

import { Component, OnInit } from '@angular/core';

import * as imageSourceModule from 'tns-core-modules/image-source';
import * as imagepicker from 'nativescript-imagepicker';
import * as fsModule from 'tns-core-modules/file-system';

import * as cameraModule from 'nativescript-camera';

@Component({
  selector: 'app-text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.scss']
})
export class TextComponentComponent implements OnInit {

  // pitchers: { path, filename, note }[] = [];

  // camera PLugin OK
  cameraImage = null;
  arrayPictures = [];

  constructor() { }

  ngOnInit() {
    cameraModule.requestPermissions().then( //request permissions for camera
      success => { //have permissions  
      },
      failure => {
        alert("Camera Permision Denied");
      }
    )
  }

  tapPicture(image) {
    let navContextObj = {
      image: image,
      arrayPictures: this.arrayPictures
    };
  }
  
  takePicture() {
    let that = this;
    cameraModule
      .takePicture({
        width: 300, //these are in device independent pixels
        height: 300, //only one will be respected depending on os/device if
        keepAspectRatio: true, //    keepAspectRatio is enabled.
        saveToGallery: false //Don't save a copy in local gallery, ignored by some Android devices
      })
      .then(imageAsset => {
        // imageAsset.note = ''
        // imageAsset.id = new Date().getTime()
        that.arrayPictures.unshift(imageAsset)
      })
  }

  // chooseImage() {
  //   let that = this;
  //   let context = imagepicker.create({
  //     mode: "single"
  //   });
  //   context.authorize().then(function () {
  //     return context.present();
  //   })
  //     .then(function (selection) {
  //       selection.forEach(function (imageAsset) {
  //         imageSourceModule.fromAsset(imageAsset).then(
  //           savedImage => {
  //             let filename = 'img' + "-" + new Date().getTime() + ".png";
  //             let folder = fsModule.knownFolders.documents();
  //             let imgPath = fsModule.path.join(folder.path, filename);
  //             savedImage.saveToFile(imgPath, 'png');
  //             let loadedImg: { path, filename, note } = {
  //               path: imageSourceModule.fromFile(imgPath),
  //               filename: filename,
  //               note: "Hello World"
  //             };
  //             that.pitchers.unshift(loadedImg);
  //             // 
  //             that.storeData();
  //             console.log("that.pitchers", that.pitchers);
  //             console.log("that.pitchers.android", that.pitchers[0].path.android);
  //           },
  //           err => {
  //             console.log("Failed to load from asset");
  //             console.log(err)
  //           }
  //         );
  //       })
  //     })
  //     .catch(
  //       err => {
  //         console.log(err);
  //       }
  //     );
  // }

  storeData() {
    console.log('storeData');
    // store images to server
  }

}

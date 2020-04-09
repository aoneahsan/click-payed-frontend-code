import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-notification',
  templateUrl: './new-notification.component.html',
  styleUrls: ['./new-notification.component.scss']
})
export class NewNotificationComponent implements OnInit {

  notification: {id, title, content, img, link, date_time} = null;
  constructor() { }

  ngOnInit() {
    this.notification = {
      id: 1,
      title: 'New Notification',
      content: 'Dear Users, Our mobile game development partners have developed a new game in which you can set your best scores or compete against each other. Hit the link and Download Now playstore.google.com/game',
      img: 'res://coin',
      link: 'playstore.google.com/game',
      date_time: 'NOTIFICATION BROADCASTED AT 2255 PST | MAY 20TH 2020'
    };
  }

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild("CB1", { static: false }) FirstCheckBox: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  
  public toggleCheck() {
    this.FirstCheckBox.nativeElement.toggle();
  }

  public getCheckProp() {
    console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
  }

}

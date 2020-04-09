import { Component, OnInit, Input } from '@angular/core';
import { openUrl } from 'tns-core-modules/utils/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() section_1 = true;
  @Input() section_2 = true;
  @Input() section_3 = true;
  @Input() section_4 = true;
  @Input() faq_section = false;

  constructor() { }

  ngOnInit() {
  }

  clickPayedLink() {
    // alert("ok");
    openUrl("https://www.clickpayed.com");

  }

}

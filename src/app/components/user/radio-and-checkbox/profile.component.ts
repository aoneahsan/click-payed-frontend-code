import { Component, OnInit } from '@angular/core';
import { RadioOption } from './radiooptions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  radioOptions?: Array<RadioOption>;
  selectedRadioOption: RadioOption = null;

  constructor(
  ) {}

  ngOnInit(): void {
    
    // Plain ol' inline Array definition coming up :)
    this.radioOptions = [
      new RadioOption("Radio option 1"),
      new RadioOption("Radio option 2"),
      new RadioOption("Radio option 3")
    ];
  }

  public checkedChange(modelRef) {
    console.log("checkedChange:", modelRef.checked);
  }

  changeCheckedRadio(radioOption: RadioOption): void {
    radioOption.selected = !radioOption.selected;

    if (!radioOption.selected) {
      return;
    }

    // uncheck all other options
    this.radioOptions.forEach(option => {
      if (option.text !== radioOption.text) {
        option.selected = false;
      }
    });

    this.selectedRadioOption = radioOption;

    console.log(this.selectedRadioOption);
  }

}

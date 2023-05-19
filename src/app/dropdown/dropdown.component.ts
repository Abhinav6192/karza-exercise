import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() name: string = '';
  @Input() options: any[] = [];
  @Output() optionSelected = new EventEmitter<any>();
  selectedValue: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  valueSelected() {
    console.log(this.selectedValue);
    for (let opt of this.options) {
      if (opt.key === this.selectedValue) {
        this.optionSelected.emit({
          dropdownName: opt?.value?.key,
          optionName: opt.value.value ? opt.value.value : opt.value,
          selectedDropName: this.name
        });
      }
    }
  }

}

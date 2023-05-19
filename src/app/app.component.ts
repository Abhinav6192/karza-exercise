import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  dropdownList: any[] = [];
  obj = {
    key: 'state',
    value: [
      {
        key: 'As',
        value:
        {
          key: 'district',
          value: [
            { key: 'ba', value: { key: 'area', value: ['ba'] } },
            {
              key: 'ca',
              value: { key: 'area', value: ['ha', 'ka', 'so'] },
            },
            { key: 'ma', value: { key: 'area', value: ['ma'] } },
          ],
        }
      },
      {
        key: 'Gu',
        value:
        {
          key: 'disctrict',
          value: [
            {
              key: 'ah',
              value: { key: 'area', value: ['ah', 'ba', 'da'] },
            },
            { key: 'da', value: { key: 'area', value: ['da'] } },
            { key: 'su', value: { key: 'area', value: ['su'] } },
          ],
        }
      },
      {
        key: 'Mh',
        value:
        {
          key: 'district',
          value: [
            {
              key: 'ak',
              value: { key: 'area', value: ['ak'] },
            },
            {
              key: 'mu',
              value: { key: 'area', value: ['mu city', 'mu sub', 'thane'] },
            },
            { key: 'na', value: { key: 'area', value: ['na'] } },
          ],
        }
      },
      {
        key: 'Up',
        value:
        {
          key: 'council',
          value: [
            {
              key: 'c1',
              value: { key: 'village', value: ['v1', 'v2', 'v3'] },
            },
            { key: 'c2', value: { key: 'village', value: ['v2_1'] } },
            { key: 'c3', value: { key: 'village', value: ['v3_1'] } },
          ],
        },
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.addDropdown(this.obj.key, this.obj.value);
  }

  addDropdown(key: any, value: any) {
    console.log("addDropdown called");
    const dropdown = this.container.createComponent(DropdownComponent);
    this.dropdownList.push({
      key: key,
      value: dropdown
    })
    dropdown.instance.name = key;
    dropdown.instance.options = value
    dropdown.instance.optionSelected.subscribe(res => {
      console.log("selected value data : ", res);
      const index = this.dropdownList.findIndex(item => item.key === res?.selectedDropName);
      if (index > -1) {
        for (let i = (index + 1); i<this.dropdownList.length; i++) {
          this.dropdownList[i].value?.destroy();
          console.log(this.dropdownList);
        }
        this.dropdownList.splice((index+1));
        this.addDropdown(res?.dropdownName, res?.optionName);
      } else {
        this.addDropdown(res?.dropdownName, res?.optionName);
      }
    });
  }
}

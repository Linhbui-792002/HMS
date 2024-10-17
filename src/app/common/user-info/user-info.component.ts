import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  activeMenuItem: string = 'information';

  visibility = {
    information: false,
    updateInformation: false,
    contractList: false,
    roomInfo: false,
    contactHistory: false,
    changePassword: false,
    logout: false,
  };

  onSelectMenuItem(item: string) {
    this.activeMenuItem = item;
    this.resetVisibility();
    this.visibility[item] = true;
  }

  private resetVisibility() {
    for (const key in this.visibility) {
      this.visibility[key] = false;
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent {
  isCollapsed = false;
  isShowTerm = true;
  isShowBuilding = false;
  isRead = true;
  status = true;

  // Show state
  visibility = {
    term: false,
    buildingService: false,
    contact: false,
    furniture: false,
    building: true,
  };

  onSelectMenuItem(item: 'term' | 'buildingService' | 'furniture' | 'contact'|'building') {
    this.resetVisibility();
    this.visibility[item] = true;
  }

  private resetVisibility() {
    for (const key in this.visibility) {
      this.visibility[key] = false;
    }
  }
}

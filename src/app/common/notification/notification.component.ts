import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() message: string = '';

  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.showNotification();
  }

  showNotification(): void {
    switch (this.type) {
      case 'success':
        this.notification.success('Success', this.message);
        break;
      case 'error':
        this.notification.error('Error', this.message);
        break;
      case 'info':
        this.notification.info('Notice', this.message);
        break;
      case 'warning':
        this.notification.warning('Warning', this.message);
        break;
      default:
        this.notification.info('Notice', this.message);
    }
  }
}

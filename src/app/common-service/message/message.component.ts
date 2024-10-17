import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  // Message text that will be displayed
  @Input() message: string = '';

  // Type of message (success, error, info, warning)
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';

  // Whether the message is currently visible
  isVisible: boolean = true;

  // Close the message
  closeMessage() {
    this.isVisible = false;
  }

  // Class mapping based on message type
  getClass() {
    switch (this.type) {
      case 'success':
        return 'alert alert-success';
      case 'error':
        return 'alert alert-danger';
      case 'warning':
        return 'alert alert-warning';
      case 'info':
      default:
        return 'alert alert-info';
    }
  }
}

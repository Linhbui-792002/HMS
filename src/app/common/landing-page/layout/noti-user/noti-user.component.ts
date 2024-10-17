import { Component } from '@angular/core';

@Component({
  selector: 'app-noti-user',
  templateUrl: './noti-user.component.html',
  styleUrls: ['./noti-user.component.css']
})
export class NotiUserComponent {
  isRead = false
  // status của thông báo đã đọc hay không
  status = true
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  DisblayLogin: boolean = true;
  loginForm: FormGroup = new FormBuilder().group({
    firstName: ['', Validators.required],
    lastName: ['' , Validators.required],
  });
  constructor(private chatService : ChatService) {
    this.chatService.isLogin.subscribe((data) => {
      this.DisblayLogin = !data;
    })
  }
  login() {
      this.chatService.login(this.loginForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  value = 5;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }
}

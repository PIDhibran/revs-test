import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  constructor(
    private authService: AuthService
  ){}

  signOut() {
    this.authService.signOut();
    this.authService.setEmailVerify(false);
    this.authService.setLogged(false);
  }
}

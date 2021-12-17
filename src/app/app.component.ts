import { Component } from '@angular/core';

import { TokenStorageService } from './token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private role: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  email?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;
      console.log(user.role);
      this.showAdminBoard = this.role.includes('ADMIN');

      this.email = user.email;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    
  }
}

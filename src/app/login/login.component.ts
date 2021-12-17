import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    console.log(password);
    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data.headers);
        var token = data.headers.get('authorization');
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(data);
        console.log('we here');
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = token.split(":")[1];

        console.log(this.role);
        // this.role = this.tokenStorage.getUser().role;
        if (this.role[0] === "ADMIN") {
          // showAdminBoard
        }
        console.log();
        this.reloadPage();
        console.log(this.tokenStorage.getUser());

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.isLoginFailed);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}

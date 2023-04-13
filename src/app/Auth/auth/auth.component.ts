import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObj: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObj = this.authService.login(email, password);
    } else {
      authObj = this.authService.signUp(email, password);
    }

    authObj.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/recipes'])
    }, error => {
      console.log(error)
    });

    form.reset();
  }
}

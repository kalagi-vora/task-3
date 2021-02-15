import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthDataResponse, AuthService } from '../services/auth.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit,OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private authSubscription: Subscription;

  constructor(private authService : AuthService,
      private router :Router,
      private notifyService : NotificationService) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthDataResponse>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.SignUp(email, password);
    }

    this.authSubscription = authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/products']);
        this.notifyService.showSuccess("Logged In Successfully", "");
      },
      errorMessage => {
        this.error = errorMessage;
        this.notifyService.showError(this.error, "");
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onCloseError(){
    this.error= null;
  }

  ngOnDestroy():void{
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

}

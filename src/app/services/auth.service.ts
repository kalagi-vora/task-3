import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../authentication/user.model';
import { Router } from '@angular/router';

export interface AuthDataResponse{
  id: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null);

  constructor(private http :HttpClient, private router: Router) {}

  public SignUp(email: string, password: string){
    return this.http.post<AuthDataResponse>('https://reqres.in/api/register',
    {
      email: email,
      password: password
    }).pipe(
      // catchError(this.errorHandler),
      tap(respData =>{
        this.authHandler(respData.id, respData.token);
     })
    );
  }

  public login(email: string, password: string){
    return this.http.post<AuthDataResponse>('https://reqres.in/api/login',
    {
      email: email,
      password: password
    }).pipe(
      // catchError(this.errorHandler),
    tap(respData =>{
      this.authHandler(respData.id, respData.token);
    })
   );
  }

  public autoLogin(){
    const userData:{
      id: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }
    const loadedUser = new User(userData.id, userData._token);

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  public logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }


  private authHandler(id:string, token: string){
    const user = new User(id, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}

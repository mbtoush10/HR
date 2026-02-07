import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private _authService: AuthService) { 

  }

  loginForm = new FormGroup({
    Username: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required])
  });

  login(){
    let loginObj ={
      username: this.loginForm.value.Username,
      password: this.loginForm.value.Password
    }

    this._authService.login(loginObj).subscribe({
      next: (res: any) => {
        // console.log(res); // token
        localStorage.setItem("token", res.token);
      },
      error: (err) => {
        alert(err.error.message ?? err.error() ?? "An error occurred while logging in.");
      }
    });
  }

}

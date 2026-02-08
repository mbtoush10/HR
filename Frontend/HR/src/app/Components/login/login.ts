import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  showErrorMessage: boolean = false;
  errorMessage: string = "";

  constructor(private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ){ 

  }
  
  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['authRequired']) {
        this.showErrorMessage = true;
        this.errorMessage = "You must be logged in to access this page.";
      }
    });
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
        localStorage.setItem("role", res.role);
        this.showErrorMessage = false;
        this._router.navigate(['/employees']);
      },
      error: (err) => {
        this.showErrorMessage = true;
        this.errorMessage = err.error.message ?? err.error ?? "An error occurred while logging in.";
      }
    });
  }

}

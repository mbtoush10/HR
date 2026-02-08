import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgIf, NgFor, NgClass, NgStyle, CommonModule } from '@angular/common';
import { RandomColor } from "./directives/random-color";
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ReversePipe} from './pipes/reverse-pipe';
import { Employees } from "./Components/employees/employees";
import { Departments } from "./Components/departments/departments";

@Component({ // decorator
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule, 
    ReversePipe, 
    Employees,
    Departments,
    RouterLink,
    RouterLinkActive
    ], // Component, dependencies
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private router: Router) {

  }

  showNavBar() : boolean
  {

    const currentRoute = this.router.url.split('?')[0];
    return currentRoute !== '/login';
  }

  signOut(){
    // Clear the token from local storage to sign out the user
    localStorage.removeItem("token");
    // Optionally, navigate to the login page after signing out
    this.router.navigate(['/login']);
  }

}

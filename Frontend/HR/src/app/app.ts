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

    return this.router.url !== "/login";
  }

}

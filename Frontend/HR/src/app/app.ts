import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{NgIf, NgFor, NgClass,NgStyle} from '@angular/common';

@Component({ // decorator
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, NgClass,NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

students = [
  {name : 'Stu01', mark: 89},
  {name : 'Stu02', mark: 45},
  {name : 'Stu03', mark: 78},
  {name : 'Stu04', mark: 32},
  {name : 'Stu05', mark: 90},
  {name : 'Stu06', mark: 55}
];
}

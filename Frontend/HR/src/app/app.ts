import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { RandomColor } from "./directives/random-color";
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({ // decorator
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, NgClass, NgStyle, RandomColor, FormsModule, ReactiveFormsModule], // Component, dependencies
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // students = [
  //   {name : 'Stu01', mark: 89},
  //   {name : 'Stu02', mark: 45},
  //   {name : 'Stu03', mark: 78},
  //   {name : 'Stu04', mark: 32},
  //   {name : 'Stu05', mark: 90},
  //   {name : 'Stu06', mark: 55}
  // ];

  // global variable (without var, let, const) 
  // use this to access
  //   images = [
  //     "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=2210&quality=70",
  //     "https://t3.ftcdn.net/jpg/02/70/35/00/360_F_270350073_WO6yQAdptEnAhYKM5GuA9035wbRnVJSr.jpg",
  //     "https://images.pexels.com/photos/26151151/pexels-photo-26151151/free-photo-of-night-sky-filled-with-stars-reflecting-in-the-lake.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   ];
  //   currentIndex = 0;


  //   name = "Emp";



  //   next() {
  //     // let temp = 5; local variable (with var, let, const)
  //     // dont use this to access
  //     if (this.currentIndex < this.images.length - 1) {
  //       this.currentIndex++;
  //     }
  //   }

  //   previous() {
  //     if (this.currentIndex > 0) {
  //       this.currentIndex--;
  //     }
  //   }



  form = new FormGroup({
    name:   new FormControl(null, Validators.required),
    email:  new FormControl(null, [Validators.required, Validators.email]),
    phone:  new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
    course: new FormControl(1, Validators.required),
  });

  courses = [
    {id: 1, name: 'Asp.net'},
    {id: 2, name: 'Angular'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'Python'},
  ];
  reset(){
    this.form.reset({
      course:1
    });
  }
}

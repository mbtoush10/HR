import { Routes } from '@angular/router';
import { Employees } from './Components/employees/employees';
import { Departments } from './Components/departments/departments';
import { Login } from './Components/login/login';

export const routes: Routes = [
    {path:"", redirectTo:"/employees", pathMatch:"full"},
    {path:"employees", component: Employees},
    {path:"departments", component: Departments},
    {path:"login", component: Login}
];

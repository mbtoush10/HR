import { Routes } from '@angular/router';
import { Employees } from './Components/employees/employees';
import { Departments } from './Components/departments/departments';
import { Login } from './Components/login/login';
import { authGuard } from './auth-guard/auth-guard';

export const routes: Routes = [
    {path:"", redirectTo:"/employees", pathMatch:"full"},
    {path:"employees", component: Employees, canActivate: [authGuard]},
    {path:"departments", component: Departments, canActivate: [authGuard]},
    {path:"login", component: Login}
];

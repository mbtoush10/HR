import { Routes } from '@angular/router';
import { Employees } from './Components/employees/employees';
import { Departments } from './Components/departments/departments';

export const routes: Routes = [
    {path:"", redirectTo:"/employees", pathMatch:"full"},
    {path:"employees", component: Employees},
    {path:"departments", component: Departments}
];

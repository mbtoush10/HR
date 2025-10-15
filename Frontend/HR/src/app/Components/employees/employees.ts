import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { NgxPaginationModule } from 'ngx-pagination';
import { Employee } from '../../interfaces/employee-interface'
import { ConfirmationDialog } from '../../shared-components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialog], // Module, Component, Directive, Pipe 
  providers: [DatePipe], // Dependency Injection
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  @ViewChild('closeButton') closeButton: ElementRef | undefined; // Get Element By Id
  
  employees: Employee[] = [
    {
      id: 1, name:'Emp01',isActive: true,  startDate: new Date(2025, 11, 21),
      phone: '+962796320434', positionId:1, positionName: 'Manager', birthDate: new Date(1995, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: null, managerName: null
    },
    {
      id: 2, name:'Emp02',isActive: true,  startDate: new Date(2025, 6, 21),
      phone: '+962764564757', positionId:1, positionName: 'Manager', birthDate: new Date(2001, 5, 1),
      departmentId:1, departmentName: 'IT', managerId: null, managerName: null
    },
    {
      id: 3, name:'Emp03',isActive: false,  startDate: new Date(2025, 5, 21),
      phone: '+962785466664', positionId:1, positionName: 'Develpoer', birthDate: new Date(1999, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 2, managerName: 'Emp02'
    },
    {
      id: 4, name:'Emp04',isActive: true,  startDate: new Date(2025, 1, 21),
      phone: '+962795464565', positionId:1, positionName: 'Develpoer', birthDate: new Date(2003, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 2, managerName: 'Emp02'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
    {
      id: 5, name:'Emp05',isActive: false,  startDate: new Date(2025, 2, 25),
      phone: '+962796896756', positionId:1, positionName: 'HR', birthDate: new Date(2000, 5, 1),
      departmentId:1, departmentName: 'HR', managerId: 1, managerName: 'Emp01'
    },
  ];

  employeeTableColumns: string[] = ['#', 'Name', 'Phone', 'Birthdate', 'Status', 'Start Date', 'Position', 'Department', 'Manager'];

  departments= [
    { id: null, name: 'Select Departments' },
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Marketing' },
    { id: 5, name: 'Sales' }
  ];

  positions= [
    { id: null, name: 'Select Manager' },
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Developer' },
    { id: 3, name: 'Designer' },
    { id: 4, name: 'HR' },
    { id: 5, name: 'Salesperson' }
  ];

  managers= [
    { id: null, name: 'Select Manager' },
    { id: 1, name: 'Emp01' },
    { id: 2, name: 'Emp02' }
  ];

  employeeForm : FormGroup = new FormGroup({
    Id:         new FormControl(null),
    Name:       new FormControl(null,[Validators.required]),
    Phone:      new FormControl(null,[Validators.required]),
    StartDate:  new FormControl(null, [Validators.required]),
    BirthDate:  new FormControl(null, [Validators.required]),
    Position:   new FormControl(null, [Validators.required]),
    Department: new FormControl(null, [Validators.required]),
    Manager:    new FormControl(null),
    IsActive:   new FormControl(true, [Validators.required])
  });

  paginationConfig = {
    itemsPerPage:5,
    currentPage:1,

  };
  
  deleteDialogTitle: string         = 'Delete Confirmation';
  deleteDialogBody: string          = 'Are you sure you want to delete this employee?';
  showConfirmationDialog: boolean   = false;
  employeeIdToDelete: number | null = null;

  constructor(private _datePipe: DatePipe) { // Dependency Injection
    
  }

  
  saveEmployee(){
    
    if(!this.employeeForm.value.Id){ // Add New Employee
      let newEmp: Employee = {
        id:             this.employees.length + 1,
        name:           this.employeeForm.value.Name,
        phone:          this.employeeForm.value.Phone,
        startDate:      this.employeeForm.value.StartDate,
        birthDate:      this.employeeForm.value.BirthDate,
        positionId:     this.employeeForm.value.Position,
        positionName:   this.positions.find(x => x.id == this.employeeForm.value.Position)?.name,
        departmentId:   this.employeeForm.value.Department,
        departmentName: this.departments.find(x => x.id == this.employeeForm.value.Department)?.name,
        managerId:      this.employeeForm.value.Manager,
        managerName:    this.employeeForm.value.Manager? this.managers.find(x=> x.id == this.employeeForm.value.Manager)?.name : null,
        isActive:       this.employeeForm.value.IsActive,
      }
      
      this.employees.push(newEmp);
    }
    else{ // Edit Employee
      let indix = this.employees.findIndex(x=> x.id == this.employeeForm.value.Id);
      
      this.employees[indix].name            = this.employeeForm.value.Name;
      this.employees[indix].phone           = this.employeeForm.value.Phone;
      this.employees[indix].birthDate       = this.employeeForm.value.BirthDate;
      this.employees[indix].isActive        = this.employeeForm.value.IsActive;
      this.employees[indix].startDate       = this.employeeForm.value.StartDate;
      this.employees[indix].departmentId    = this.employeeForm.value.Department;
      this.employees[indix].departmentName  = this.departments.find(x => x.id == this.employeeForm.value.Department)?.name;
      this.employees[indix].positionId      = this.employeeForm.value.Position;
      this.employees[indix].positionName    = this.positions.find(x => x.id == this.employeeForm.value.Position)?.name;
      this.employees[indix].managerId       = this.employeeForm.value.Manager;
      this.employees[indix].managerName     = this.employeeForm.value.Manager? this.managers.find(x=> x.id == this.employeeForm.value.Manager)?.name : null;
      
    }
    
    this.closeButton?.nativeElement.click(); // Close Modal
    this.clearEmployeeForm(); 
    
  }
  
  clearEmployeeForm()
  {
    this.employeeForm.reset({
      IsActive: true
    });
  }
  
  editEmployee(id: number){
    let employee = this.employees.find( x=> x.id == id);
    
    if(id != null){
      this.employeeForm.patchValue({
        Id:         employee?.id,
        Name:       employee?.name,
        Phone:      employee?.phone,
        StartDate:  this._datePipe.transform(employee?.startDate, 'yyyy-MM-dd'),// yyyy-MM-dd
        BirthDate:  this._datePipe.transform(employee?.birthDate, 'yyyy-MM-dd'),
        Position:   employee?.positionId,
        Department: employee?.departmentId,
        Manager:    employee?.managerId,
        IsActive:   employee?.isActive
      })
    }
  }
  
  removeEmployee(){
    this.employees = this.employees.filter( x=> x.id != this.employeeIdToDelete);
  }
  
  changePage(pageNumber: number){
  
    this.paginationConfig.currentPage = pageNumber;
  }

  showConfirmaDialog(empId: number){
    this.employeeIdToDelete     = empId; // Save Employee Id to be used later
    this.showConfirmationDialog = true;  // Show Confirmation Dialog
  }

  confirmEmployeeDelete(isConfirmed: boolean){
    if(isConfirmed){
      this.removeEmployee();
    }

    this.employeeIdToDelete     = null; // Clear Employee Id
    this.showConfirmationDialog = false; // Hide Confirmation Dialog
  }

}
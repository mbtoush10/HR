import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { NgxPaginationModule } from 'ngx-pagination';
import { Employee } from '../../interfaces/employee-interface'
import { ConfirmationDialog } from '../../shared-components/confirmation-dialog/confirmation-dialog';
import { EmployeesService } from '../../services/employees.service';
import { List } from '../../interfaces/list-interface';
import { DepartmentsService } from '../../services/departments.service';
import { LookupsService } from '../../services/lookups.service';
import { LookupsMajorCodes } from '../../enums/major-codes';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialog], // Module, Component, Directive, Pipe 
  providers: [DatePipe], // Dependency Injection
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit , OnDestroy {

  @ViewChild('closeButton') closeButton: ElementRef | undefined; // Get Element By Id

  employeeTableColumns: string[] = ['#', 'Image', 'Name', 'Phone', 'Birthdate', 'Status', 'Start Date', 'Position', 'Department', 'Manager'];
  
  employees: Employee[] = [];
  
  departments: List[]= [];
  positions:   List[]= [];
  managers:    List[]= [];

  employeeStatusesList: List[] = [
    {id: null, name: 'Select Status'},
    {id: true, name: 'Active'},
    {id: false,name: 'Inactive'},
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
    IsActive:   new FormControl(true, [Validators.required]),
    Image:      new FormControl(null),
  });

  searchFilterForm : FormGroup = new FormGroup({
    Name:       new FormControl(null),
    Status:     new FormControl(null),
    PositionId: new FormControl(null),
  });

  paginationConfig = {
    itemsPerPage:5,
    currentPage:1,
  };
  
  deleteDialogTitle: string         = 'Delete Confirmation';
  deleteDialogBody: string          = 'Are you sure you want to delete this employee?';
  showConfirmationDialog: boolean   = false;
  employeeIdToDelete: number | null = null;

  constructor(private _datePipe: DatePipe,
    private _employeesService: EmployeesService,
    private _departmentsService: DepartmentsService,
    private _lookupsService: LookupsService
  ) { // Dependency Injection
  }
  ngOnDestroy(): void {
    console.log("Employees Component Destroyed");
  }
  
  ngOnInit(): void {
    this.loadEmployees();
    this.loadPositionsList();
  }

  uploadImage(event: any){
    this.employeeForm.patchValue({
      Image: event.target.files[0]
    });
    
  }

  loadEmployees(){
    this.employees = []; // Clear Existing Employees

    let searchObj = {
      name:       this.searchFilterForm.value.Name,
      positionId: this.searchFilterForm.value.PositionId,
      status:     this.searchFilterForm.value.Status,
    };
    this._employeesService.getAll(searchObj).subscribe(
      {
        next: (res : any) => { //Succesful Request
          if(res?.length > 0){
            res.forEach((x : any)=>{
              let emp: Employee ={
                id:             x.id,
                name:           x.name,
                phone:          x.phone,
                startDate:      x.startDate,
                birthDate:      x.birthDate,
                positionId:     x.positionId,
                positionName:   x.positionName,
                departmentId:   x.departmentId,
                departmentName: x.departmentName,
                managerId:      x.managerId,
                managerName:    x.managerName,
                isActive:       x.isActive,
              }
              this.employees.push(emp);
            })
          }
        },
        error: err=>{ //Failed Request | 400, 500, etc
          alert(err.error.message ?? err.error ?? "An error occurred while loading employees."); // Show Error Message
        }
      }
    ); 
  }

  loadManegarsList(employeeId?: number){
    this.managers = [
      { id: null, name: 'Select Manager' }
    ];

    this._employeesService.getManegars(employeeId).subscribe(
      {
        next: (res : any) => {
          if(res?.length > 0){
            this.managers  = this.managers.concat(
              res.map((x : any) => ( {id: x.id, name: x.name} as List))
            )
          }
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while loading managers."); // Show Error Message
        }
      }
    );
  }

  loadDepartments(){
    this.departments = [
      { id: null, name: 'Select Department' }
    ];

    this._departmentsService.getDepartmentsList().subscribe(
      {
        next: (res : any) => {
          if(res?.length > 0){
              this.departments = this.departments.concat(
                res.map((x : any)=>({id: x.id, name: x.name} as List))
            )
          }
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while loading departments."); // Show Error Message

        }
      }
    );
  }

  loadPositionsList(){
    this.positions = [{ id: null, name: 'Select Positions' }];

    this._lookupsService.getByMajorCode(LookupsMajorCodes.Positions).subscribe(
      {
        next: (res : any) => {
          if(res?.length > 0){
              this.positions = this.positions.concat(
                res.map((x : any)=>({id: x.id, name: x.name} as List))
            )
          }
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while loading positions."); // Show Error Message

        }
      }
    );
  }
  
  saveEmployee(){
    let employeeId = this.employeeForm.value.Id ?? 0;

    let newEmp: Employee = {
        id:             employeeId, // Will be set by Backend
        name:           this.employeeForm.value.Name,
        phone:          this.employeeForm.value.Phone,
        startDate:      this.employeeForm.value.StartDate,
        birthDate:      this.employeeForm.value.BirthDate,
        positionId:     this.employeeForm.value.Position,
        departmentId:   this.employeeForm.value.Department,
        managerId:      this.employeeForm.value.Manager,
        isActive:       this.employeeForm.value.IsActive,
        image:          this.employeeForm.value.Image
    };

    if(!this.employeeForm.value.Id){ // Add New Employee
      this._employeesService.add(newEmp).subscribe({
        next: res =>{
          this.loadEmployees();
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while adding the employee."); // Show Error Message
        }
      });
    }
    else{ // Edit Employee
      this._employeesService.update(newEmp).subscribe({
        next: res =>{
          this.loadEmployees();
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while updating the employee."); // Show Error Message
        }
      }); 
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
    this.loadSaveDialog(id);
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
        IsActive:   employee?.isActive,
        Image:      employee?.image
      })
    }
  }
  
  removeEmployee(){
    if(this.employeeIdToDelete){
      this._employeesService.delete(this.employeeIdToDelete).subscribe({
        next: res =>{
          this.loadEmployees();
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while deleting the employee."); // Show Error Message
        }
      });
    }
  }
  
  changePage(pageNumber: number){
  
    this.paginationConfig.currentPage = pageNumber;
  }

  showConfirmDialog(empId: number){
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

  loadSaveDialog(employeeId?: number){
    this.clearEmployeeForm();
    this.loadManegarsList(employeeId);
    this.loadDepartments();
    this.loadPositionsList();
    }

}
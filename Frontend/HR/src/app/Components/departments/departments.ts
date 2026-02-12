import { CommonModule } from '@angular/common';
import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Department } from '../../interfaces/department-interface'
import { ConfirmationDialog } from '../../shared-components/confirmation-dialog/confirmation-dialog';
import { DepartmentsService } from '../../services/departments.service';
import { List } from '../../interfaces/list-interface';
import { LookupsService } from '../../services/lookups.service';
import { LookupsMajorCodes } from '../../enums/major-codes';

@Component({
  selector: 'app-departments',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialog],
  providers: [DatePipe],
  templateUrl: './departments.html',
  styleUrls: ['./departments.css']
})
export class Departments {

  @ViewChild('closeButton') closeButton: ElementRef | undefined;

  departments: Department[] = [];

  departmentTableColumns: string[] = ['#', 'Name', 'Floor Number','Description', 'Type'];

  addButtonDisabled: boolean = false;

  departmentTypes: List[] = [];
  
  searchFilterForm : FormGroup = new FormGroup({
    Name:        new FormControl(null),
    FloorNumber: new FormControl(null),
  });
  
  constructor(private _datePipe: DatePipe,
    private _depatmentsService: DepartmentsService,
    private _lookupsService: LookupsService
  ) {}

  ngOnInit(){
    this.loadDepartment();
    this.checkRole();
    this.addButtonDisabled = this.checkRole();
  }

  loadDepartment(){
    this.departments = [];
    let searchObj ={
      departmentName: this.searchFilterForm.value.Name,
      floorNumber: this.searchFilterForm.value.FloorNumber,
    }

    this._depatmentsService.getAll(searchObj).subscribe({
      next : (res : any) => {
        if(res?.length > 0){
          res.forEach((x : any) => {
            let department : Department ={
              id:          x.id,
              name:        x.name,
              floorNumber: x.floorNumber,
              typeId:      x.typeId,
              typeName:    x.typeName,
              description: x.description
            };
        this.departments.push(department);
            })
          }
      },
      error: err=> {
        alert(err.error.message ?? err.error ?? "Unexpected Error");
      }
    });
  }

  loadSaveDialog(){
    this.clearEmployeeForm();
    this.loadDepartmentType();
  }

  clearEmployeeForm(){
    this.departmentForm.reset();
  }

  departmentForm: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl(null, [Validators.required]),
    FloorNumber: new FormControl(null, [Validators.required]),
    Description: new FormControl(null),
    TypeId: new FormControl(null, [Validators.required]),
  });

  paginationConfig = {
    itemsPerPage: 5,
    currentPage: 1,
  };

    changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
  }

  deleteDialogTitle: string           = 'Delete Confirmation';
  deleteDialogBody: string            = 'Are you sure you want to delete this department?';
  showConfirmationDialog: boolean     = false;
  departmentIdToDelete: number | null = null;

  loadDepartmentType(){
    this.departmentTypes = [
      { id: null, name: 'Select Type' }
    ];

    this._lookupsService.getByMajorCode(LookupsMajorCodes.DepartmentsTypes).subscribe(
      {
        next: (res : any) => {
          if(res?.length > 0){
            this.departmentTypes  = this.departmentTypes.concat(
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


  saveDepartment() {
   let deparmentId = this.departmentForm.value.Id ?? 0;
   
       let newDept: Department = {
           id:          deparmentId, // Will be set by Backend
           name:        this.departmentForm.value.Name,
           floorNumber: this.departmentForm.value.FloorNumber,
           typeId:      this.departmentForm.value.TypeId,
           description: this.departmentForm.value.Description,
       };
   
       if(!this.departmentForm.value.Id){ // Add New Employee
         this._depatmentsService.add(newDept).subscribe({
           next: res =>{
             this.loadDepartment();
           },
           error: err=>{
             alert(err.error.message ?? err.error ?? "An error occurred while adding the employee."); // Show Error Message
           }
         });
       }
       else{ // Edit Employee
         this._depatmentsService.update(newDept).subscribe({
           next: res =>{
             this.loadDepartment();
           },
           error: err=>{
             alert(err.error.message ?? err.error ?? "An error occurred while updating the employee."); // Show Error Message
           }
         }); 
       }
       
       this.closeButton?.nativeElement.click(); // Close Modal
       this.clearEmployeeForm(); 
  }


  clearDepartmentForm() { this.departmentForm.reset({ }); }

  editDepartment(id: number) {
    this.loadSaveDialog();
    let department = this.departments.find( x=> x.id == id);
    
    if(id != null){
      this.departmentForm.patchValue({
        Id:          department?.id,
        Name:        department?.name,
        FloorNumber: department?.floorNumber,
        TypeId:      department?.typeId,
        Description: department?.description
      })
    }
  }

  removeDepartment() {
  if(this.departmentIdToDelete){
      this._depatmentsService.delete(this.departmentIdToDelete).subscribe({
        next: res =>{
          this.loadDepartment();
        },
        error: err=>{
          alert(err.error.message ?? err.error ?? "An error occurred while deleting the employee."); // Show Error Message
        }
      });
    }
  }

  showConfirmDialog(depId: number){
    this.departmentIdToDelete   = depId; // Save Department Id to be used later
    this.showConfirmationDialog = true;  // Show Confirmation Dialog
  }

  confirmDepartmentDelete(isConfirmed: boolean){
    if(isConfirmed){
      this.removeDepartment();
    }

    this.departmentIdToDelete   = null; // Clear Department Id
    this.showConfirmationDialog = false; // Hide Confirmation Dialog
  }

  checkRole(){
    let role = localStorage.getItem('role');

    return role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'hr';
  }

}
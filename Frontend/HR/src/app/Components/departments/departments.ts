import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Department } from '../../interfaces/department-interface'

@Component({
  selector: 'app-departments',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  providers: [DatePipe],
  templateUrl: './departments.html',
  styleUrls: ['./departments.css']
})
export class Departments {

  @ViewChild('closeButton') closeButton: ElementRef | undefined;

  departments: Department[] = [
    { id: 1, name: 'HR', floorNumber: 1, description: null, typeId: 1, typeName: 'Permanent' },
    { id: 2, name: 'IT', floorNumber: 3, description: null, typeId: 3, typeName: 'Department Types' },
    { id: 3, name: 'Finance', floorNumber: 1, description: null, typeId: 2, typeName: 'Finance' },
    { id: 4, name: 'Marketing', floorNumber: 1, description: null, typeId: 5, typeName: 'Administrative' },
    { id: 5, name: 'Sales', floorNumber: 1, description: null, typeId: 4, typeName: 'Technical' },
    { id: 6, name: 'HR', floorNumber: 1, description: null, typeId: 1, typeName: 'Permanent' },
    { id: 7, name: 'IT', floorNumber: 3, description: null, typeId: 3, typeName: 'Department Types' },
    { id: 8, name: 'Finance', floorNumber: 1, description: null, typeId: 2, typeName: 'Finance' },
    { id: 9, name: 'Marketing', floorNumber: 1, description: null, typeId: 5, typeName: 'Administrative' },
    { id: 10, name: 'Sales', floorNumber: 1, description: null, typeId: 4, typeName: 'Technical' },
  ];

  departmentTableColumns: string[] = ['#', 'Name', 'Floor Number','Description', 'Type'];

  types = [
    { id: null, name: 'Select Type' },
    { id: 1, name: 'Permanent' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Department Types' },
    { id: 4, name: 'Technical' },
    { id: 5, name: 'Administrative' }
  ];

  departmentForm: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl(null, [Validators.required]),
    FloorNumber: new FormControl(null, [Validators.required]),
    Description: new FormControl(null),
    Type: new FormControl(null, [Validators.required]),
  });

  paginationConfig = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(private _datePipe: DatePipe) {}

  changePage(pageNumber: number) {
    this.paginationConfig.currentPage = pageNumber;
  }

  saveDepartment() {
    if (!this.departmentForm.value.Id) {
      let newDep: Department = {
        id: this.departments.length + 1,
        name: this.departmentForm.value.Name,
        floorNumber: this.departmentForm.value.FloorNumber,
        description: this.departmentForm.value.Description,
        typeId: this.departmentForm.value.Type,
        typeName: this.types.find(x => x.id == this.departmentForm.value.Type)?.name ?? '',
      };
      this.departments.push(newDep);
    } else {
      const index = this.departments.findIndex(x => x.id == this.departmentForm.value.Id);
      if (index !== -1) {
        this.departments[index].name = this.departmentForm.value.Name;
        this.departments[index].description = this.departmentForm.value.Description;
        this.departments[index].floorNumber = this.departmentForm.value.FloorNumber;
        this.departments[index].typeId = this.departmentForm.value.Type;
        this.departments[index].typeName = this.types.find(x => x.id == this.departmentForm.value.Type)?.name ?? '';
      }
    }

this.closeButton?.nativeElement.click(); // Close Modal 
this.clearDepartmentForm();
  }
clearDepartmentForm() { this.departmentForm.reset({ }); }
  editDepartment(id: number) {
    const department = this.departments.find(x => x.id == id);
    if (department) {
      this.departmentForm.patchValue({
        Id: department.id,
        Name: department.name,
        Description: department.description,
        FloorNumber: department.floorNumber,
        Type: department.typeId,
      });
    }
  }

  removeDepartment(id: number) {
    this.departments = this.departments.filter(x => x.id != id);
  }
}
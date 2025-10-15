import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {

  @Input() title: string =''; // Get Value from parent component
  @Input() body:  string =''; // Get Value from parent component

  @Output() confim = new EventEmitter<boolean>();
  
  confirmDelete( isConfirmed: boolean){
    this.confim.emit(isConfirmed); // Activate confirm event and pass value to Parent Component
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-details',  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  @Input() showButton: Boolean;

  readForm = this.fb.group({
    employeeId: ['', [Validators.required, Validators.min(111), Validators.max(999)]]
  });
  
  detailsForm = this.fb.group({
    id: null,
    firstname: ['', Validators.required], //Delete button remains disabled until read function is success
    surname: [''],
    email: [''],
    dob: [''],
    gender: ['']
  }); 

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  get readformcontrol() { return this.readForm.controls; }

  onRead() {
    this.detailsForm.reset();
    this.employeeService.readEmployee(this.readForm.value.employeeId).subscribe(data=>{this.detailsForm.patchValue(data)});
  }
  
  onDelete() {
    this.employeeService.deleteEmployee(this.readForm.value.employeeId).subscribe();
    this.readForm.reset();
    this.detailsForm.reset();
  }
  
}

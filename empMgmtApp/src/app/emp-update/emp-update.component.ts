import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent implements OnInit {

  FunctionDescription = "Update Existing Employee";
  validateEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  readForm = this.fb.group({
    employeeId: ['', [Validators.required, Validators.min(111), Validators.max(999)]]
  });
  
  updateForm = this.fb.group({
    id: [''],
    firstname: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validateEmail)]],
    dob: ['', Validators.required],
    gender: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  get readformcontrol() { return this.readForm.controls; }
  get updateformcontrol() { return this.updateForm.controls; }

  onRead() {
    this.updateForm.reset();
    this.employeeService.readEmployee(this.readForm.value.employeeId).subscribe(data=>{this.updateForm.patchValue(data)});
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.updateForm.value).subscribe();
    this.readForm.reset();
    this.updateForm.reset();
  }
}

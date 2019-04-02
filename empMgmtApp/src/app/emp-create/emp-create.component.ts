import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-create',
  templateUrl: './emp-create.component.html',
  styleUrls: ['./emp-create.component.css']
})
export class EmpCreateComponent implements OnInit {

  FunctionDescription = "Create New Employee";
  
  validateEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  createForm = this.fb.group({
    id: [''],
    firstname: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validateEmail)]],
    dob: ['', [Validators.required]],
    gender: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  get createformcontrol() { return this.createForm.controls; }
  
  onSubmit() {
    this.employeeService.createEmployee(this.createForm.value).subscribe();
    this.createForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-delete',
  templateUrl: './emp-delete.component.html',
  styleUrls: ['./emp-delete.component.css']
})
export class EmpDeleteComponent implements OnInit {

  FunctionDescription = "Delete Existing Employee";

  deleteButton: Boolean = true;
  
  constructor() { }

  ngOnInit() {
  }

}

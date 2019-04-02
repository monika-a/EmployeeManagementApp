import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-read',
  templateUrl: './emp-read.component.html',
  styleUrls: ['./emp-read.component.css']
})
export class EmpReadComponent implements OnInit {

  FunctionDescription = "Read Existing Employee";

  hideButton: Boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}

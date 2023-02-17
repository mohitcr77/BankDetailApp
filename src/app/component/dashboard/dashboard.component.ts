import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,

  imports : [
    FormsModule,
    CommonModule
  ]
})
export class DashboardComponent implements OnInit {
    employeeList : Employee[] = [];
    employeeObj : Employee = {
    id: '',
    fname: '',
    lname: '',
    email:'',
    account: '',
    };
    id:string = '';
    fname: string = ''
    lname:string = ''
    email:string= ''
    account:string=''

  constructor(private auth : AuthService , private data:DataService ){}
  ngOnInit(): void {
    this.getRecord();
  }

  getRecord() {
   
    this.data.getAllRecord().subscribe((res: any) =>{
      this.employeeList = res.map((e: any)=>{
        const data = e.payload.doc.data();
        data.id=e.payload.doc.id;
        
        return data
      })
    }, ()=>
    alert("Error While fetching data")
    )
  }


  addRecord(){
      this.employeeObj.id='';
      this.employeeObj.fname=this.fname;
      this.employeeObj.lname=this.lname;
      this.employeeObj.email=this.email;
      this.employeeObj.account=this.account;

      this.data.addallRecord(this.employeeObj)
      this.resetform()
      
  }

  logout(){
    this.auth.logout();
  }

  resetform()
  {
    this.id= '';
    this.fname  = ''
    this.lname = ''
    this.email= ''
    this.account=''
  }

  updateRecord(employee : Employee)
  {
    this.addRecord();
    this.deleteRecord(employee);
    
  }

  deleteRecord(employee : Employee){
    this.data.deleteRecord(employee)
  }

}

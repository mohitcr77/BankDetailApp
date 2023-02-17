import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../model/employee';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) {}

  addallRecord(employee : Employee){
    employee.id=this.afs.createId()
    return this.afs.collection('/Employee').add(employee);
  }

  getAllRecord()
  {
   return this.afs.collection('/Employee').snapshotChanges();
  }

  deleteRecord(employee : Employee)
  {
    return this.afs.doc('/Employee/'+ employee.id).delete();
  }
  
  updateRecord(employee : Employee)
  {
    this.deleteRecord(employee);
    this.addallRecord(employee);
  }
}

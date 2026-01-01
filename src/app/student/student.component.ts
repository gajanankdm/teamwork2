import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IstudentArr } from './module/module';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar){}

  ngOnInit(): void {
  }

studentArr : Array<IstudentArr>= [
  {
    fname: 'Gajanan',
    lname: 'Kadam',
    email: 'gajanan@gmail.com',
    contact: '9876543210',
    id : '123'
  },
  {
    fname: 'Rahul',
    lname: 'Patil',
    email: 'rahul@gmail.com',
    contact: '9123456780',
    id : '124'
  }
];

editId !: string
isInEditMode : boolean  = false;
@ViewChild('fname')
fname !: ElementRef;

@ViewChild('lname')
lname !: ElementRef;

@ViewChild('email')
email !: ElementRef;

@ViewChild('contact')
contact !: ElementRef

onAdd() : void{
  let studentObj : IstudentArr ={
    fname : this.fname.nativeElement.value,
    lname : this.lname.nativeElement.value,
    email : this.email.nativeElement.value,
    contact : this.contact.nativeElement.value,
    id  : Date.now().toString()
  }
    this.fname.nativeElement.value = ''
    this.lname.nativeElement.value = ''
    this.email.nativeElement.value = ''
    this.contact.nativeElement.value = ''

    this.studentArr.push(studentObj);
    this._snackBar.open(`New Studend Data with id ${studentObj.id} is Created Successfully`,
    'Close',{
       horizontalPosition : 'left',
       verticalPosition : 'top',
       duration : 3000
     })
  }

  onRemove(id: string) : void{
     let getIndex = this.studentArr.findIndex(s => s.id === id);
      this.studentArr.splice(getIndex, 1)
    this._snackBar.open(`The Student with id${id} is Removed Successfully.`,
      'Close',{
        horizontalPosition : 'left',
        verticalPosition : 'top',
        duration : 3000
      })
  }

  onEdit(st : IstudentArr) : void{
    this.isInEditMode = true;
    this.fname.nativeElement.value = st.fname;
    this.lname.nativeElement.value = st.lname;
    this.email.nativeElement.value = st.email;
    this.contact.nativeElement.value = st.contact;
    this.editId = st.id;
  }

  onUpdate(): void{
    let UPDATED_OBJ : IstudentArr ={
      fname : this.fname.nativeElement.value,
      lname : this.lname.nativeElement.value,
      email : this.email.nativeElement.value,
      contact : this.contact.nativeElement.value,
      id : this.editId
    }
    this.fname.nativeElement.value = '';
    this.lname.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

    let getIndex = this.studentArr.findIndex(s => s.id === UPDATED_OBJ.id);
    this.studentArr[getIndex] = UPDATED_OBJ;
    this.isInEditMode = false;
    this._snackBar.open(`The Student Data with id${UPDATED_OBJ.id} is Updated Successfully.`,
      'Close',{
        horizontalPosition : 'left',
        verticalPosition : 'top',
        duration : 3000
      }
    )
  }
}

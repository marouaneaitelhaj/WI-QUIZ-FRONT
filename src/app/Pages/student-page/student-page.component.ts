import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { StudentService } from 'src/app/Services/student.service';
import Student from 'src/app/Models/Student';
import AlertProps from 'src/app/Components/alert/alertProps';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
})
export class StudentPageComponent {
  showPopup: boolean = false;
  
  students: Student[] = [];
  alertprops: AlertProps = new AlertProps();
  student: Student = new Student();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: StudentService) {
  }
  togglePopUp(student?: Student) {
    if (student) {
      this.functionType = FunctionType.update;
      this.student = student;
    } else {
      this.functionType = FunctionType.save;
      this.student = new Student();
    }
    this.showPopup = !this.showPopup;
  }
  submit(student: Student) {
    if (this.functionType == FunctionType.save) {
      this.service.save(student)
    } else {
      this.service.update(student)
    }
  }
  delete(student: Student, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(student.id)
    } else if (confirmed == null) {
      this.student = student;
      this.alertprops.showAlert = true;
      this.alertprops.needConfirm = true;
    } else {
      this.student = student;
      this.alertprops.showAlert = false;
      this.alertprops.needConfirm = false;
    }
  }
  ngAfterContentInit() {
    this.service.students.subscribe(
      (students) => {
        this.students = students;
      }
    );
  }
}

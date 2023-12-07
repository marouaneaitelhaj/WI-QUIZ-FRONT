import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { StudentService } from 'src/app/Services/student.service';
import Student from 'src/app/Models/Student';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
})
export class StudentPageComponent {
  showPopup: boolean = false;
  
  students: Student[] = [];
  
  student: Student = new Student();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: StudentService, private alertService: AlertService) {
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
      this.alertService.showConfirm("Are you sure you want to delete this student?");
    } else {
      this.student = student;
      this.alertService.hide()
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

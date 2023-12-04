import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { StudentService } from 'src/app/Services/student.service';
import Student from 'src/app/Models/Student';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
  providers: [StudentService]
})
export class StudentPageComponent {
  service: StudentService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  students: Student[] = [];
  message: string = "";
  student: Student = new Student();
  functionType: FunctionType = FunctionType.save;
  constructor(service: StudentService) {
    this.service = service;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Student>) => {
      this.students = data.content;
    });
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
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Student>) => {
      this.students = data.content;
    });
  }
  submit(student: Student) {
    if (this.functionType == FunctionType.save) {
      this.service.save(student).subscribe((data: MyResponse<Student>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    } else {
      this.service.update(student).subscribe((data: MyResponse<Student>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
      });
    }
  }
  delete(student: Student, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(student.id).subscribe((data: MyResponse<Student>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
        this.needConfirm = false;
      }, (error) => {
        this.findAll();
        this.message = error.error.error;
        this.showAlert = true;
        this.needConfirm = false;
      });
    } else if (confirmed == null) {
      this.student = student;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.student = student;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}

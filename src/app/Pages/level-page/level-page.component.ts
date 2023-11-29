import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Level } from 'src/app/Models/Models';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css'],
  providers: [LevelService]
})
export class LevelPageComponent {
  service: LevelService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  levels: Level[] = [];
  message: string = "";
  level: Level = new Level();
  functionType: FunctionType = FunctionType.save;
  constructor(service: LevelService) {
    this.service = service;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Level>) => {
      this.levels = data.content;
    });
  }
  togglePopUp(level?: Level) {
    if (level) {
      this.functionType = FunctionType.update;
      this.level = level;
    } else {
      this.functionType = FunctionType.save;
      this.level = new Level();
    }
    this.showPopup = !this.showPopup;
  }
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Level>) => {
      this.levels = data.content;
    });
  }
  submit(level: Level) {
    if (this.functionType == FunctionType.save) {
      this.service.save(level).subscribe((data: MyResponse<Level>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error;
        this.showAlert = true;
      });
    } else {
      this.service.update(level).subscribe((data: MyResponse<Level>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
      }, (error) => {
        this.findAll();
        this.message = error;
        this.showAlert = true;
      });
    }
  }
  delete(level: Level, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(level.id).subscribe((data: MyResponse<Level>) => {
        this.findAll();
        this.message = data.message;
        this.showAlert = true;
        this.needConfirm = false;
      }, (error) => {
        this.findAll();
        this.message = error;
        this.showAlert = true;
        this.needConfirm = false;
      });
    } else if (confirmed == null) {
      this.level = level;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.level = level;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}

import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import Level from 'src/app/Models/Level';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css'],
})
export class LevelPageComponent {
  
  
  showPopup: boolean = false;
  levels: Level[] = [];
  level: Level = new Level();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: LevelService, private alertService: AlertService) {
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
  submit(level: Level) {
    if (this.functionType == FunctionType.save) {
      this.service.save(level)
    } else {
      this.service.update(level)
    }
  }
  delete(level: Level, confirmed?: boolean) {
    if (confirmed) {
      this.service.delete(level.id)
    } else if (confirmed == null) {
      this.level = level;
      this.alertService.showConfirm("Are you sure you want to delete this level?");
    } else {
      this.level = level;
      this.alertService.hide()
    }
  }
  ngAfterContentInit() {
    this.service.levels.subscribe(
      (levels) => {
        this.levels = levels;
      }
    );
  }
}

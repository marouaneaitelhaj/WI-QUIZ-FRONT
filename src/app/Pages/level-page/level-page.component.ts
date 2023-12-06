import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { LevelService } from 'src/app/Services/level.service';
import Level from 'src/app/Models/Level';
import AlertProps from 'src/app/Components/alert/alertProps';
import { AlertService } from 'src/app/Components/alert/alert.service';

@Component({
  selector: 'app-level-page',
  templateUrl: './level-page.component.html',
  styleUrls: ['./level-page.component.css'],
})
export class LevelPageComponent {
  alertprops: AlertProps = new AlertProps();
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
      this.alertprops.message = "Are you sure you want to delete this level?";
      this.alertprops.showAlert = true;
      this.alertprops.needConfirm = true;
      this.alertService.alertprops.next(this.alertprops);
    } else {
      this.level = level;
      this.alertprops.showAlert = false;
      this.alertprops.needConfirm = false;
      this.alertService.alertprops.next(this.alertprops);
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

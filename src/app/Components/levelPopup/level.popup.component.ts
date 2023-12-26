import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionType } from 'src/app/Enums/FunctionType';
import Level from 'src/app/Models/Level';
import { LevelService } from 'src/app/Services/level.service';
@Component({
  selector: 'app-level-popup',
  templateUrl: './level.popup.component.html',
  styleUrls: ['./level.popup.component.css']
})
export class LevelPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  @Input() level: Level = new Level();
  levelPopupForm: FormGroup = new FormBuilder().group({
    id: [this.level.id || 0],
    description: [this.level.description || '', Validators.required],
    maxPoints: [this.level.maxPoints, Validators.required],
    minPoints: [this.level.minPoints, Validators.required],
  }, {
    validators: [this.maxPointsValidator]
  });
  // validator for maxPoints and minPoints
  maxPointsValidator(form: FormGroup) {
    const maxPoints = form.get('maxPoints')?.value;
    const minPoints = form.get('minPoints')?.value;
    if (maxPoints < minPoints) {
      form.get('maxPoints')?.setErrors({ maxPointsLessThanMinPoints: true });
    } else {
      form.get('maxPoints')?.setErrors(null);
    }
    return null;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.levelPopupForm = new FormBuilder().group({
      id: [this.level.id || 0],
      description: [this.level.description || '', Validators.required],
      maxPoints: [this.level.maxPoints, Validators.required],
      minPoints: [this.level.minPoints, Validators.required],
    }, {
      validators: [this.maxPointsValidator]
    });
  }
  constructor(private levelService: LevelService) { }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if (this.levelPopupForm.value.id == 0) {
      this.levelService.save(this.levelPopupForm.value);
    } else {
      this.levelService.update(this.levelPopupForm.value);
    }
    this.togglePopUp();
  }
}

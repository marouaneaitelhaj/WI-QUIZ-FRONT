import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MediaType } from 'src/app/Enums/MediaType';
import Media from 'src/app/Models/Media';
import Question from 'src/app/Models/Question';
import { MediaService } from 'src/app/Services/media.service';
import { QuestionService } from 'src/app/Services/question.service';
@Component({
  selector: 'app-media-popup',
  templateUrl: './media.popup.component.html',
  styleUrls: ['./media.popup.component.css']
})
export class MediaPopupComponent implements OnChanges {
  @Output() show = new EventEmitter<boolean>();
  questions: Observable<Question[]> = this.questionService.questions;
  mediasType = MediaType;
  mediasTypeKeys = Object.keys(this.mediasType);
  @Input() media: Media = new Media();
  setfile(event: any) {
    this.media.src = event.target.files[0];
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    this.mediaService.upload(this.media.src).subscribe((data: any) => {
      this.media.src = data.url;
      this.mediaPopUpForm.value.src = data.url;
      if (this.mediaPopUpForm.value.id == 0) {
        this.mediaService.save(this.mediaPopUpForm.value)
      } else {
        this.mediaService.update(this.mediaPopUpForm.value)
      }
    }, (error) => { });
    this.togglePopUp();
  }
  constructor(private questionService: QuestionService, private mediaService: MediaService) { }
  mediaPopUpForm: FormGroup = new FormBuilder().group({
    question_id: [this.media.question.id || '', Validators.required],
    type: [this.media.type || '', Validators.required],
    id: [this.media.id || 0],
    src: [this.media.src || ''],
  });
  ngOnChanges(changes: SimpleChanges): void {
    this.mediaPopUpForm = new FormBuilder().group({
      question_id: [this.media?.question?.id || '', Validators.required],
      type: [this.media?.type || '', Validators.required],
      id: [this.media?.id || 0],
      src: [this.media.src || ''],
    });
  }
}

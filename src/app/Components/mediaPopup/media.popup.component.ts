import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MediaType } from 'src/app/Enums/MediaType';
import { Media, Question } from 'src/app/Models/Models';
@Component({
  selector: 'app-media-popup',
  templateUrl: './media.popup.component.html',
  styleUrls: ['./media.popup.component.css']
})
export class MediaPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Media>();
  @Input() questions: Question[] = [];
  @Input() question: Question = new Question();
  mediasType = MediaType;
  mediasTypeKeys = Object.keys(this.mediasType);
  @Input() media: Media = new Media();
  setfile(event : any){
    this.media.src = event.target.files[0];
  }
  togglePopUp() {
    this.show.emit(false);
  }
  submit() {
    if(this.question){
      this.media.question = this.question;
    }
    console.log(this.media.src);
    this.submitEvent.emit(this.media);
    this.togglePopUp();
  }
}

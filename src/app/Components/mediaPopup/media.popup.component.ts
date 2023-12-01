import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MediaType } from 'src/app/Enums/MediaType';
import Media from 'src/app/Models/Media';
import Question from 'src/app/Models/Question';
@Component({
  selector: 'app-media-popup',
  templateUrl: './media.popup.component.html',
  styleUrls: ['./media.popup.component.css']
})
export class MediaPopupComponent {
  @Output() show = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<Media>();
  @Input() questions: Question[] = [];
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
    this.submitEvent.emit(this.media);
    this.togglePopUp();
  }
}

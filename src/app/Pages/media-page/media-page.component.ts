import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { MediaService } from 'src/app/Services/media.service';
import { QuestionService } from 'src/app/Services/question.service';
import Media from 'src/app/Models/Media';
import Question from 'src/app/Models/Question';
import AlertProps from 'src/app/Components/alert/alertProps';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css'],
  providers: [MediaService,QuestionService ]
})
export class MediaPageComponent {
  showPopup: boolean = false;
  
  medias: Media[] = [];
  alertprops: AlertProps = new AlertProps();
  media: Media = new Media();
  functionType: FunctionType = FunctionType.save;
  constructor(private service: MediaService) {
  }
  togglePopUp(media?: Media) {
    if (media) {
      this.functionType = FunctionType.update;
      this.media = media;
    } else {
      this.functionType = FunctionType.save;
      this.media = new Media();
    }
    this.showPopup = !this.showPopup;
  }
  submit(media: Media) {
    this.alertprops.message = "Please wait...";
    this.alertprops.showAlert = true;
    this.service.upload(media.src).subscribe((data: any) => {
      this.media.src = data.url;
      if (this.functionType == FunctionType.save) {
        this.service.save(media)
      } else {
        this.service.update(media)
      }
    }, (error) => {});
  }
  delete(media: Media, confirmed?: boolean) {
    if (confirmed ) {
      this.service.delete(media.id)
    } else if (confirmed == null) {
      this.media = media;
      this.alertprops.showAlert = true;
      this.alertprops.needConfirm = true;
    } else {
      this.media = media;
      this.alertprops.showAlert = false;
      this.alertprops.needConfirm = false;
    }
  }
  ngAfterContentInit() {
    this.service.medias.subscribe(
      (medias) => {
        this.medias = medias;
      }
    );
  }
}

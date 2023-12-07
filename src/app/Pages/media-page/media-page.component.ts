import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { MyResponse } from 'src/app/Response/Response';
import { MediaService } from 'src/app/Services/media.service';
import { QuestionService } from 'src/app/Services/question.service';
import Media from 'src/app/Models/Media';
import Question from 'src/app/Models/Question';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css'],
  providers: [MediaService,QuestionService ]
})
export class MediaPageComponent {
  showPopup: boolean = false;
  
  medias: Media[] = [];
  
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
      
      
    } else {
      this.media = media;
      
      
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

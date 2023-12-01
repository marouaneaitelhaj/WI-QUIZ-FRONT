import { Component } from '@angular/core';
import { FunctionType } from 'src/app/Enums/FunctionType';
import { Media, Question } from 'src/app/Models/Models';
import { MyResponse } from 'src/app/Response/Response';
import { MediaService } from 'src/app/Services/media.service';
import { QuestionService } from 'src/app/Services/question.service';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css'],
  providers: [MediaService,QuestionService ]
})
export class MediaPageComponent {
  service: MediaService;
  questionService: QuestionService;
  showPopup: boolean = false;
  needConfirm: boolean = false;
  showAlert: boolean = false;
  medias: Media[] = [];
  questions: Question[] = [];
  message: string = "";
  media: Media = new Media();
  functionType: FunctionType = FunctionType.save;
  constructor(service: MediaService, questionService:QuestionService) {
    this.service = service;
    this.questionService = questionService;
  }
  ngOnInit(): void {
    this.service.findAll().subscribe((data: MyResponse<Media>) => {
      this.medias = data.content;
    });
    this.questionService.findAll().subscribe((data: MyResponse<Question>) => {
      this.questions = data.content;
    });
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
  findAll() {
    this.service.findAll().subscribe((data: MyResponse<Media>) => {
      this.medias = data.content;
    });
  }
  submit(media: Media) {
    this.message = "Please wait...";
    this.showAlert = true;
    this.service.upload(media.src).subscribe((data: any) => {
      this.media.src = data.url;
      if (this.functionType == FunctionType.save) {
        this.service.save(media).subscribe((data: MyResponse<Media>) => {
          this.findAll();
          this.message = data.message;
          this.showAlert = true;
        }, (error) => {
          this.findAll();
          this.message = error;
          this.showAlert = true;
        });
      } else {
        this.service.update(media).subscribe((data: MyResponse<Media>) => {
          this.findAll();
          this.message = data.message;
          this.showAlert = true;
        }, (error) => {
          this.findAll();
          this.message = error;
          this.showAlert = true;
        });
      }
    }, (error) => {});
  }
  delete(media: Media, confirmed?: boolean) {
    if (confirmed ) {
      this.service.delete(media.id).subscribe((data: MyResponse<Media>) => {
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
      this.media = media;
      this.showAlert = true;
      this.needConfirm = true;
    } else {
      this.media = media;
      this.showAlert = false;
      this.needConfirm = false;
    }
  }
}

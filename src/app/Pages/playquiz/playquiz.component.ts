import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Components/alert/alert.service';
import AlertProps from 'src/app/Components/alert/alertProps';
import Answer from 'src/app/Models/Answer';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import Response from 'src/app/Models/Response';
import Validation from 'src/app/Models/Validation';
import { MyResponse } from 'src/app/Response/Response';
import { AnswerService } from 'src/app/Services/answer.service';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-playquiz',
  templateUrl: './playquiz.component.html',
  styleUrls: ['./playquiz.component.css'],
})
export class PlayquizComponent {
  quiz: Quiz = new Quiz();
  questionNumber: number = 0;
  selectedImage: number = 0;
  question: Question = new Question();
  answers: Answer[] = [];
  lefTime: number = 0;
  interval: any;
  constructor(private route: ActivatedRoute, private quizService: QuizService, private answerService: AnswerService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.findById(params['id']).subscribe((data: Quiz) => {
        this.quiz = data;
        this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
        this.chrono(this.question.time);
      });
    });
  }
  nextquestion() {
    // if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
    //   var result = 0;
    //   this.answers.forEach((answer: Answer) => {
    //         console.log(answer);
    //   });
    // } else {
    this.alertService.showMsg("saving .....!")
    this.answerService.save(this.answers[this.questionNumber]).subscribe(
      (response: MyResponse<Answer>) => {
        this.alertService.hide();
        this.answers[this.questionNumber] = response.data;
        if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
          var result = 0;
          this.answers.forEach((answer: Answer) => {
            console.log(answer.validation.points);
            result += answer.validation.points
          });
          this.alertService.showMsg("your score is " + result);
        } else {
          this.questionNumber++;
          this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
          this.chrono(this.question.time);
        }
      }
    )
    // }
  }
  setResponse(response: Validation) {
    this.answers[this.questionNumber] = new Answer();
    this.answers[this.questionNumber].validation = response;
    console.log(this.answers[this.questionNumber].validation.response.response);
  }
  resest(event: boolean) {
    this.questionNumber = 0;
    this.answers = [];
    this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
  }
  chrono(time: number) {
    clearInterval(this.interval);
    this.lefTime = time;
    this.interval = setInterval(() => {
      this.lefTime--;

      if (this.lefTime == 0) {
        this.nextquestion();
        clearInterval(this.interval);
      }
    }, 1000);
  }
  nextImage() {
    if (this.selectedImage == this.question.media.length - 1) {
      this.selectedImage = 0;
    } else {
      this.selectedImage++;
    }
  }
}
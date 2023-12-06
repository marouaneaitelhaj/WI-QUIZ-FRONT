import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AlertProps from 'src/app/Components/alert/alertProps';
import Answer from 'src/app/Models/Answer';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import Response from 'src/app/Models/Response';
import Validation from 'src/app/Models/Validation';
import { MyResponse } from 'src/app/Response/Response';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-playquiz',
  templateUrl: './playquiz.component.html',
  styleUrls: ['./playquiz.component.css'],
})
export class PlayquizComponent {
  alertprops: AlertProps = new AlertProps();
  id: number = 0;
  questionNumber: number = 0;
  quiz: Quiz = new Quiz();
  selectedImage: number = 0;
  question: Question = new Question();
  answers: Answer[] = [];
  lefTime: number = 0;
  interval: any;
  constructor(private route: ActivatedRoute, private quizService: QuizService) { }
  playAudio(): void {
    const audio = new Audio();
    audio.src = "http://res.cloudinary.com/dvr7oyo77/video/upload/v1701783476/uhpikguqvmlfwtey5pyt.mp3";
    audio.play();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.quizService.findById(this.id).subscribe((data: Quiz) => {
      this.quiz = data;
      this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
      this.chrono(this.question.time);
    });
  }
  nextquestion() {
    clearInterval(this.interval);
    if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
      this.alertprops.showAlert = true;
      var result = 0;
      this.answers.forEach((answer: Answer) => {
        if (answer.validation.correct == true) {
          result = result + answer.validation.points;
          this.alertprops.message = "You have " + result + " points";
        }
      });
    } else {
      this.questionNumber++;
      this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
      this.chrono(this.question.time);
    }
  }
  setResponse(response: Validation) {
    this.answers[this.questionNumber] = new Answer();
    this.answers[this.questionNumber].validation = response;
    this.chrono(this.question.time);
  }
  resest(event: boolean) {
    this.alertprops.showAlert = event;
    this.questionNumber = 0;
    this.answers = [];
    this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
  }
  chrono(time: number) {
    this.lefTime = time;
    this.interval = setInterval(() => {
      this.lefTime--;
      if (this.lefTime == 0) {
        this.nextquestion();
        clearInterval(this.interval);
      }
    }, 1000);
  }
}

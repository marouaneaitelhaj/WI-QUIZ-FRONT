import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  providers: [QuizService]
})
export class PlayquizComponent implements OnChanges {
  showAlert: boolean = false;
  needConfirm: boolean = false;
  message: string = "rak nadi";
  id: number = 0;
  questionNumber: number = 0;
  quiz: Quiz = new Quiz();
  selectedImage: number = 0;
  question: Question = new Question();
  answers: Answer[] = [];
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
      console.log(this.question);
    });
  }
  nextquestion() {
    if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
      this.showAlert = true;
      var result = 0;
      this.answers.forEach((answer: Answer) => {
        if (answer.validation.correct == true) {
          result = result + answer.validation.points;
          this.message = "You have " + result + " points";
        }
      });
      console.log(result);
    } else {
      this.questionNumber++;
      this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
    }
  }
  setResponse(response: Validation) {
    this.answers[this.questionNumber] = new Answer();
    this.answers[this.questionNumber].validation = response;
  }
  resest(event: boolean) {
    this.showAlert = event;
    this.questionNumber = 0;
    this.answers = [];
    this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

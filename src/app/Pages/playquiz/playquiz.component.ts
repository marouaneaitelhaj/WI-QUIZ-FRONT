import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Components/alert/alert.service';
import AlertProps from 'src/app/Components/alert/alertProps';
import { QuestionType } from 'src/app/Enums/QuestionType';
import Answer from 'src/app/Models/Answer';
import AssignQuiz from 'src/app/Models/AssignQuiz';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import Response from 'src/app/Models/Response';
import Validation from 'src/app/Models/Validation';
import { MyResponse } from 'src/app/Response/Response';
import { AnswerService } from 'src/app/Services/answer.service';
import { AssignQuizService } from 'src/app/Services/assignQuiz.service';
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
  answers: Answer[][] = [];
  lefTime: number = 0;
  assignedQuiz: AssignQuiz = new AssignQuiz();
  interval: any;
  constructor(private route: ActivatedRoute, private assignQuizService: AssignQuizService, private quizService: QuizService, private answerService: AnswerService, private alertService: AlertService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assignQuizService.findById(params['id']).subscribe((assignQuiz: AssignQuiz) => {
        this.assignedQuiz = assignQuiz;
        this.quiz = assignQuiz.quiz;
        this.quizService.findById(this.quiz.id).subscribe((quiz: Quiz) => {
          this.quiz = quiz;
          console.log(this.quiz.numberOfChances, assignQuiz.chance, this.quiz.numberOfChances <= assignQuiz.chance);
          if (this.quiz.numberOfChances <= assignQuiz.chance) {
            this.alertService.showWarning("you have no more chances", "/assignquiz")
          } else {
            this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
            this.chrono(this.question.time);
          }
        });
      });
    });
  }
  nextquestion() {
    this.alertService.showMsg("saving .....!")
    this.answers[this.questionNumber].forEach((answer: Answer, index: number) => {
      this.answerService.save(this.answers[this.questionNumber][index]).subscribe(
        (response: MyResponse<Answer>) => {
          this.alertService.hide();
          this.answers[this.questionNumber][index] = response.data;
          if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
            var result = 0;
            this.answers.forEach((answers: Answer[]) => {
              // console.log(answer.validation.points);
              // result += answer.validation.points
              answers.forEach((answer: Answer) => {
                result += answer.validation.points
              });
            });
            this.alertService.showMsg("your score is " + result);
          } else {
            this.questionNumber++;
            this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
            this.chrono(this.question.time);
          }
        }
      )
    });
  }
  setResponse(response: Validation) {
    if (this.question.questionType == QuestionType.SINGLE_CHOICE) {
      if (!this.answers[this.questionNumber]) {
        this.answers[this.questionNumber] = [];
      }
      this.answers[this.questionNumber].push(new Answer());
      this.answers[this.questionNumber][0].validation = response;
      this.answers[this.questionNumber][0].assignQuiz = this.assignedQuiz;
    } else if (this.question.questionType == QuestionType.MULTIPLE_CHOICE) {
      if (this.answers[this.questionNumber].length == 0) {
        this.answers[this.questionNumber] = [];
        this.answers[this.questionNumber][0] = new Answer();
        this.answers[this.questionNumber][0].validation = response;
        this.answers[this.questionNumber][0].assignQuiz = this.assignedQuiz;
      } else {
        if (this.answers[this.questionNumber].find((answer: Answer) => answer.validation.id == response.id)) {
          this.answers[this.questionNumber] = this.answers[this.questionNumber].filter((answer: Answer) => answer.validation.id != response.id);
        } else {
          this.answers[this.questionNumber][this.answers[this.questionNumber].length] = new Answer();
          this.answers[this.questionNumber][this.answers[this.questionNumber].length - 1].validation = response;
          this.answers[this.questionNumber][this.answers[this.questionNumber].length - 1].assignQuiz = this.assignedQuiz;
        }
      }
    }
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
  isResponseSelected(response: Validation): boolean {
    this.answers[this.questionNumber]?.forEach((answer: Answer) => {
      console.log(answer.validation.id, response.id);
    });
    return false;
  }
}
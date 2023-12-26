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
  question: Question = {} as Question;
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
          if (this.quiz.numberOfChances <= assignQuiz.chance || this.assignedQuiz.played) {
            this.assignQuizService.getScore(this.assignedQuiz.id).subscribe((response: any) => {
              if (this.assignedQuiz.score <= response.data) {
                this.alertService.showWarning("Congratulation you have passed this quiz with score " + response.data, "/assignquiz")
              } else {
                this.alertService.showWarning("Sorry you have failed this quiz with score " + response.data, "/assignquiz")
              }
            });
          } else {
            this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
            this.chrono(this.question.time);
          }
        });
      });
    });
  }
  nextquestion() {
    // this.alertService.showMsg("saving .....!")
    this.answerService.save(this.answers[this.questionNumber]).subscribe(
      (response: MyResponse<Answer[]>) => {
        this.alertService.hide();
        this.answers[this.questionNumber] = response.data;
        if (this.questionNumber == this.quiz.questionOfQuizs.length - 1) {
          this.assignQuizService.getScore(this.assignedQuiz.id).subscribe((response: any) => {
            if (this.assignedQuiz.score <= response.data) {
              this.alertService.showWarning("Congratulation you have passed this quiz with score " + response.data, "/assignquiz")
            } else {
              this.alertService.showWarning("Sorry you have failed this quiz with score " + response.data, "/assignquiz")
            }
          });
        } else {
          this.questionNumber++;
          this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
          this.chrono(this.question.time);
        }
      }
    )
  }
  setValidation(validation: Validation) {
    this.isEnough();

    if (!this.answers[this.questionNumber]) {
      this.answers[this.questionNumber] = [];
    }

    const isDuplicate = this.answers[this.questionNumber].some((existingAnswer: Answer) => {
      return existingAnswer.validation_id === validation.id;
    });

    if (isDuplicate) {
      this.answers[this.questionNumber].map((existingAnswer: Answer, index: number) => {
        if (existingAnswer.validation_id === validation.id) {
          this.answers[this.questionNumber].splice(index, 1);
        }
      });
    }

    if (!isDuplicate) {
      const answer: Answer = {} as Answer;
      answer.validation_id = validation.id;
      answer.assignQuiz_id = this.assignedQuiz.id;
      this.answers[this.questionNumber].push(answer);
    }
  }

  resest(event: boolean) {
    this.questionNumber = 0;
    this.answers = [];
    this.question = this.quiz.questionOfQuizs[this.questionNumber].question;
  }
  chrono(time: number) {
    // clearInterval(this.interval);
    // this.lefTime = time;
    // this.interval = setInterval(() => {
    //   this.lefTime--;

    //   if (this.lefTime == 0) {
    //     this.nextquestion();
    //     clearInterval(this.interval);
    //   }
    // }, 1000);
  }
  isEnough() {
    if (this.question.questionType == QuestionType.MULTIPLE_CHOICE) {
      if (this.question.numberOfCorrectAnswers == this.answers[this.questionNumber]?.length) {
        this.answers[this.questionNumber].splice(0, 1)
      }
    } else {
      if (this.answers[this.questionNumber]?.length >= 1) {
        this.answers[this.questionNumber].pop();
      }
    }
  }
  nextImage() {
    if (this.selectedImage == this.question.media.length - 1) {
      this.selectedImage = 0;
    } else {
      this.selectedImage++;
    }
  }
  isResponseSelected(validation: Validation): boolean {
    return this.answers[this.questionNumber]?.some((answer: Answer) => {
      return answer.validation_id === validation.id;
    }) || false;
  }
}
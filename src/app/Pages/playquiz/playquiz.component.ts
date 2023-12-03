import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Question from 'src/app/Models/Question';
import Quiz from 'src/app/Models/Quiz';
import Response from 'src/app/Models/Response';
import { MyResponse } from 'src/app/Response/Response';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-playquiz',
  templateUrl: './playquiz.component.html',
  styleUrls: ['./playquiz.component.css'],
  providers: [QuizService]
})
export class PlayquizComponent {
  id: number = 0;
  quiz: Quiz = new Quiz();
  selectedImage : number = 0;
  question: Question = new Question();
  constructor(private route: ActivatedRoute, private quizService: QuizService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.quizService.findById(this.id).subscribe((data: Quiz) => {
      this.quiz = data;
      this.question = this.quiz.questionOfQuizs[0].question;
      console.log(this.question);
    });
  }
}

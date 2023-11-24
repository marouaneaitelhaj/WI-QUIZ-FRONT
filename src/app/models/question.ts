import { QuestionType } from "../enums/question-type";
import { Level } from "./level";
import { Media } from "./media";
import { Subject } from "./subject";

export class Question {
    id: number;
    question: string;
    numAnswers: number;
    numCorrect: number;
    questionType: QuestionType;
    points: number;
    time : number;
    level : Level;
    subject : Subject;
    media: Media[];
    constructor(id: number, question: string, numAnswers: number, numCorrect: number, questionType: QuestionType, points: number, time: number , level : Level, subject : Subject, media: Media[]) {
        this.id = id;
        this.question = question;
        this.numAnswers = numAnswers;
        this.numCorrect = numCorrect;
        this.questionType = questionType;
        this.points = points;
        this.time = time;
        this.level = level;
        this.subject = subject;
        this.media = media;

    }
}

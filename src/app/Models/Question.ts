import Subject from "./Subject";
import { QuestionType } from "../Enums/QuestionType";
import Level from "./Level";
import Media from "./Media";
import Validation from "./Validation";

export default class Question {
    id: number = 0;
    question: string = "";
    numberOfAnswers: number = 0;
    numberOfCorrectAnswers: number = 0;
    questionType: QuestionType = QuestionType.SINGLE_CHOICE;
    points: number = 0;
    time: number = 0;
    level: Level = new Level();
    subject: Subject = new Subject();
    media: Media[] = [];
    validations: Validation[] = [];
}
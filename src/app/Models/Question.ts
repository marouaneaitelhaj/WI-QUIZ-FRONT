import Subject from "./Subject";
import { QuestionType } from "../Enums/QuestionType";
import Level from "./Level";
import Media from "./Media";
import Validation from "./Validation";

export default interface Question {
    id: number;
    question: string;
    numberOfAnswers: number;
    numberOfCorrectAnswers: number;
    questionType: QuestionType;
    points: number;
    time: number;
    level: Level;
    subject: Subject;
    media: Media[];
    validations: Validation[];
}
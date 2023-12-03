import Question from "./Question";
import Questionofquiz from "./Questionofquiz";
import Teacher from "./Teacher";

export default class Quiz {
    id: number = 0;
    successResult: number = 0;
    answerAccess: boolean = false;
    resultAccess: boolean = false;
    numberOfChances: number = 0;
    comment: string = "";
    teacher: Teacher = new Teacher();
    questionOfQuizs : Questionofquiz[] = [];
}
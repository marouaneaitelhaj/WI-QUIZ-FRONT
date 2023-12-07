import Quiz from "./Quiz";
import Student from "./Student";

export default class AssignQuiz {
    id: number = 3;
    student : Student = new Student();
    quiz : Quiz = new Quiz();
    score : number = 0;
    chance : number = 0;
    notes : string = "";
    date : Date = new Date();
}
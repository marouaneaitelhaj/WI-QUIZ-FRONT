import Question from "./Question";
import Quiz from "./Quiz";

export default class Questionofquiz {
    id : number = 0;
    timed : boolean = false;
    question : Question = new Question();
    quiz : Quiz = new Quiz();
}
import AssignQuiz from "./AssignQuiz";
import Validation from "./Validation";

export default class Answer {
    id: number = 0;
    validation: Validation = new Validation();
    assignQuiz : AssignQuiz = new AssignQuiz();
}
import AssignQuiz from "./AssignQuiz";
import Validation from "./Validation";

export default interface Answer {
    id: number;
    validation_id: number;
    assignQuiz_id: number;
}
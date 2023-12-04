import Question from "./Question";
import Response from "./Response";

export default class Validation {
    id : number = 0;
    // ques
    response : Response = new Response();
    points : number = 0;
    question : Question = new Question();
    correct : boolean = false;
}
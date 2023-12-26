import Question from "./Question";
import Response from "./Response";

export default class Validation {
    id : number = 0;
    response : Response = new Response();
    points : number = 0;
    question : Question = {} as Question;
    correct : boolean = false;
}
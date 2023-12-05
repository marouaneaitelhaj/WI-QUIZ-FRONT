import Question from "./Question";
import TopSubject from "./TopSubject";

export default class Subject {
    id: number = 0 ;
    name: string = "";
    top?: TopSubject;
    subs: Subject[] = [];
    questions: Question[] = [];
}
import Question from "./Question";
import Subject from "./Subject";

export default class TopSubject {
    id: number = 0;
    name: string = "";
    subs: Subject[] = [];
    questions: Question[] = [];
}
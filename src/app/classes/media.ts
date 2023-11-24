import { Question } from "./question";

export class Media {
    id: number;
    src: string;
    type: string;
    question: Question;
    constructor(id: number, src: string, type: string, question: Question) {
        this.id = id;
        this.src = src;
        this.type = type;
        this.question = question;
    }
}

import { Question } from "./question";

export class Level {
    id : number;
    description : string;
    maxPoints : number;
    minPoints : number;
    questions : Question[];
    constructor(id: number, description: string, maxPoints: number, minPoints: number, questions: Question[]) {
        this.id = id;
        this.description = description;
        this.maxPoints = maxPoints;
        this.minPoints = minPoints;
        this.questions = questions;
    }
}

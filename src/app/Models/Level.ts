import Question from "./Question";

export default class Level {
    id: number  = 0;
    description: string = "";
    maxPoints: number = 0;
    minPoints: number = 0;
    questions: Question[] = [];
}
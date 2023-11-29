import { QuestionType } from "../Enums/QuestionType";
import { MediaType } from "../Enums/MediaType";
class Level {
    id!: number;
    description!: string;
    maxPoints!: number;
    minPoints!: number;
    questions!: Question[];
    constructor(id?: number) {
        this.id = id || 0;
    }
}
class Response {
    id!: number;
    response!: string;
}



class Media {
    id!: number;
    src!: File;
    mediaType!: MediaType;
    question!: Question;
    constructor(id?: number) {
        this.question = new Question();
        this.question.id = id || 0;
    }
}

class Question {
    id!: number;
    question!: string;
    numberOfAnswers!: number;
    numberOfCorrectAnswers!: number;
    questionType!: QuestionType;
    points!: number;
    time!: number;
    level!: Level;
    subject!: Subject;
    media!: Media[];
    constructor(id?: number) {
        this.subject = new Subject(id);
        this.level = new Level(id);
    }
}
class Subject {
    id!: number;
    name!: string;
    top!: Subject;
    subs!: Subject[];
    questions!: Question[];
    constructor(id?: number) {
        this.id = id || 0;
    }
}
export { Subject, Question, Media, Level, Response };
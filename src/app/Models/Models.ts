import { QuestionType } from "../Enums/QuestionType";
import { MediaType } from "../Enums/MediaType";
class Level {
    id: number = 0;
    description: string = "";
    maxPoints: number = 0;
    minPoints: number = 0;
    questions: Question[] = [];
}
class Response {
    id: number = 0;
    response: string = "";
}

class Media {
    id: number = 0;
    src: File = new File([], "");
    type: MediaType = MediaType.JPG;
    question: Question = new Question();
}

class Question {
    id: number = 0;
    question: string = "";
    numberOfAnswers: number = 0;
    numberOfCorrectAnswers: number = 0;
    questionType: QuestionType = QuestionType.SINGLE_CHOICE;
    points: number = 0;
    time: number = 0;
    level: Level = new Level();
    subject: Subject = new Subject();
    media: Media[] = [];
}
class TopSubject {
    id: number = 0;
    name: string = "";
    subs: Subject[] = [];
    questions: Question[] = [];

}
class Subject {
    id: number = 0;
    name: string = "";
    top: TopSubject = new TopSubject();
    subs: Subject[] = [];
    questions: Question[] = [];
}
export { Subject, TopSubject, Question, Media, Level, Response };
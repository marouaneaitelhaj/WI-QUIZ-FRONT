import { MediaType } from "../Enums/MediaType";
import Question from "./Question";

export default class Media {
    id: number = 0;
    src: File = new File([], "");
    type: MediaType = MediaType.JPG;
    question: Question = {} as Question;
}
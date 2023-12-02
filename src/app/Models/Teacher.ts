import Person from "./Person";
import Quiz from "./Quiz";

export default class Teacher extends Person {
    speciality: string = "";
    quizs: Quiz[] = [];
}
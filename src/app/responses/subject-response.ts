import { Subject } from '../models/subject';
export class SubjectResponse {
    content: Subject[];
    constructor(content: Subject[]) {
        this.content = content;
    }
}
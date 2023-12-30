import Person from "./Person";

export default interface Message {
    id: number;
    content: string;
    room_id : number;
    sender : Person;
    time : string;
    sender_id : number;
}
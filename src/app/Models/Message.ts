export default interface Message {
    id: number;
    content: string;
    room_id : number;
    sender_id : number;
    time : string;
}
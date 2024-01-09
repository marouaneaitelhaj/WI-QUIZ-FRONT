import { createAction, props } from "@ngrx/store";
import Message from "src/app/Models/Message";

export const sendMessage = createAction(
    "[Chat] Send Message",
    props<{ message: Message }>()
);
export const loadMessages = createAction(
    "[Chat] Load Messages",
    props<{ roomID: number }>()
);
export const loadMessagesSuccess = createAction(
    "[Chat] Load Messages Success",
    props<{ messages: Message[] }>()
);
export const receiveMessage = createAction(
    "[Chat] Receive Message",
    props<{ message: Message }>()
);
export const updateRoomID = createAction(
    "[Chat] Update Room ID",
    props<{ roomID: number }>()
);
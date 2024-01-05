import { createAction, props } from "@ngrx/store";

export const sendMessage = createAction(
    "[Chat] Send Message",
    props<{ message: string }>()
);
export const loadMessages = createAction(
    "[Chat] Load Messages",
    props<{ roomID: number }>()
);
export const loadMessagesSuccess = createAction(
    "[Chat] Load Messages Success",
    props<{ messages: string[] }>()
);
export const receiveMessage = createAction(
    "[Chat] Receive Message",
    props<{ message: string }>()
);
export const login = createAction(
    "[Chat] Login",
    props<{ id: string }>()
);
export const updateRoomID = createAction(
    "[Chat] Update Room ID",
    props<{ roomID: number }>()
);
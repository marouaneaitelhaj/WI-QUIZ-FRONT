import { createAction, props } from "@ngrx/store";

export const messagesAction = createAction('[Messages] Messages Action',
    props<{ roomID: number }>()
);
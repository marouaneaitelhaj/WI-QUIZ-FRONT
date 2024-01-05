import { createReducer, on } from '@ngrx/store';
import * as ChatActions from '../Actions/messages.action';

export interface ChatState {
    messages: string[];
}

export const initialState: ChatState = {
    messages: [],
};

export const chatReducer = createReducer(
    initialState,
    on(ChatActions.sendMessage, (state, { message }) => {
        return {
            ...state,
            messages: [...state.messages, message],
        };
    }),
    on(ChatActions.receiveMessage, (state, { message }) => {
        return {
            ...state,
            messages: [...state.messages, message],
        };
    }),
    on(ChatActions.loadMessagesSuccess, (state, { messages }) => {
        return {
            ...state,
            messages: messages,
        };
    })
);

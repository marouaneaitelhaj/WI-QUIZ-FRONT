import { createReducer, on } from '@ngrx/store';
import * as ChatActions from '../Actions/messages.action';
import Message from 'src/app/Models/Message';

export interface ChatState {
    messages: Message[];
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
    }),
);

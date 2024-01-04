import { createReducer, on } from "@ngrx/store";
import { login } from "../Actions/messages.action";

export interface LoginState {
    id: string;
}
export const initialState: LoginState = {
    id: '',
};
export const loginReducer = createReducer(initialState, on(login, (state, { id }) => {
    return {
        ...state,
        id: id,
    };
}));
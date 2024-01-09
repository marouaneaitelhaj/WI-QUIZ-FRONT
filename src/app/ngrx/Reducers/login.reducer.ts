import { createReducer, on } from "@ngrx/store";
import Person from "src/app/Models/Person";
import { login } from "../Actions/login.action";

export interface LoginState {
    user: Person;
}
export const initialState: LoginState = {
    user: {} as Person
};
export const loginReducer = createReducer(
    initialState,
    on(login, (state, action) => ({ ...state, user: action.user }))
);
export const logoutReducer = createReducer(
    initialState,
    on(login, (state, action) => ({ ...state, user: action.user }))
);
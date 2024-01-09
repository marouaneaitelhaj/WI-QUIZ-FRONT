import { createAction, props } from "@ngrx/store";
import Person from "src/app/Models/Person";

export const login = createAction(
    "[Chat] Login",
    props<{ user: Person }>()
);
export const logout = createAction(
    "[Chat] Logout"
);
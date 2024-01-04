import { createAction, props } from "@ngrx/store";

export const login = createAction(
    "[Chat] Login",
    props<{ id: string }>()
);
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { MessageService } from "src/app/Services/message.service";

@Injectable()
export class MessageEffects {
    constructor(private messageService: MessageService, private actions$: Actions) {}
    loadMessages$ = createEffect(() => this.actions$.pipe(
        ofType('[Chat] Load Messages'),
        mergeMap((action : any) => this.messageService.findAll(action.roomID).pipe(
            map(messages => ({type: '[Chat] Load Messages Success', messages}))
        ))
    ));
}
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export abstract class MyService {
    public abstract save(): void;
    public abstract get(): void;
    public abstract delete(): void;
    public abstract update(): void;
}

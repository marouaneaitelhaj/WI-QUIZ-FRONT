export interface MyResponse<T> {
    content: T[];
    t: T;
    message: string;
}
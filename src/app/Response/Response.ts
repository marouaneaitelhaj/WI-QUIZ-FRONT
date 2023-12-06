export interface MyResponse<T> {
    content: T[];
    data: T;
    message: string;
}
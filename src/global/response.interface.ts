export interface Response<T> {
    data: T | T[];
    status: number;
    message: string;
}

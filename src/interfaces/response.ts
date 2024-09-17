export interface Response<T> {

    status: number
    message: string,
    body: T
}

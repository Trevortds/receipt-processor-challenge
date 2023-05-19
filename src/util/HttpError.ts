export class HttpError extends Error {
    public statusCode: number;
    constructor(reason: string, status: number) {
        super(reason);
        this.statusCode = status;
        this.message = reason;
    }
}
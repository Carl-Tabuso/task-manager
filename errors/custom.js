class CustomApiError extends Error
{    
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;        
    }
}

const createCustomError = (msg, statusCode) => new CustomApiError(msg, statusCode);

export { createCustomError, CustomApiError };
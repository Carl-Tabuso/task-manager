import { CustomApiError } from "../errors/custom.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: "Something went wrong." });
}

export default errorHandlerMiddleware;
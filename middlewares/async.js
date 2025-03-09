const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn (req, res, next);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

export { asyncWrapper };
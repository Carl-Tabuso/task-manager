const notFound = (req, res, next) => res.status(404).send('Not Found').end();

export default notFound;
const notfound = (req, res, next) => {
    const error = new error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    let message = err.message;
//check for mongoose bad objectId
if(err === 'CastError' && err.kind === 'ObjectId'){
    message = 'Resource not Found';
    statusCode = 404;
}
res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
});
};
export { notfound, errorHandler };
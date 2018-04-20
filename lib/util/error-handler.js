module.exports = function createErrorHandler(log = console.log) { //eslint-disable-line
    return (err, req, res, next) => { //eslint-disable-line
        let showLog = process.env.NODE_ENV !== 'production';
        let code = 500;
        let error = 'Internal Server Error';

        if(err.status) {
            code = err.status;
            error = err.error;
        }
        else if(err.name === 'ValidationError') {
            code = 400;
            error = Object.values(err.errors).map(e => e.message);
        }
        else {
            showLog = true;
        }

        if(showLog) log(code, error);

        res.status(code).json({ error });
    };
};
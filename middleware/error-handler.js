const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        // Set Defaults
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    // if (err instanceof CustomAPIError) {
    //   return res.status(err.statusCode).json({ msg: err.message })
    // }

    // Handle Validation Errors
    if (err.name === "ValidationError") {
        customError.msg = Object
            .values(err.errors)
            .map(item => item.message)
            .join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Handle Cast Errors
    if (err.name === "CastError") {
        customError.msg = `No Item Found with ID : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    // Handle Duplicate (Email) Errors
    if (err.code && err.code == 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please try another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware

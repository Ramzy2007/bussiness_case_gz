const { ERRORS, SUCCESS } = require('./errors');

function sendErrorResponse(res, errorType, additionalData = {}) {
    const error = ERRORS[errorType];
    if (error) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
            description: error.description,
            ...additionalData
        });
    }
    // Default to a server error if error type not found
    return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        description: "ER00000000",
    });
}

function sendSuccessResponse(res, successType, data = {}, customStatus = 200) {
    const success = SUCCESS[successType];
    const status = customStatus || (success ? success.status : 200);
    const message = success ? success.message : "Success";

    return res.status(status).json({
        status: status,
        message: message,
        data: data,
    });
}

module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, req, res) {
    console.log({
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
    });
    return res.status(error.status || 500).send({
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
    });
}
exports.default = errorHandler;

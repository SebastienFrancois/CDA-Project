"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = exports.PORT = void 0;
exports.PORT = process.env.SERVER_PORT;
exports.environment = {
    dev: {
        serverURL: `http://localhost:${exports.PORT}/`,
        dbString: `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/test?retryWrites=true&w=majority`,
    },
    prod: {
        serverURL: `http://localhost:${exports.PORT}/`,
        dbString: `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/simpleplan?retryWrites=true&w=majority`,
    },
    test: {
        serverURL: '',
        dbString: 'mongodb://mongodb:27017/localTest',
    }
};

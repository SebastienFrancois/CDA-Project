"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const api_config_1 = require("../api-config");
const env = process.env.ENV || 'dev';
const url = `mongodb+srv://avengers:${process.env.DB_PASS}@simpleplan.ye9gc.mongodb.net/simpleplan?retryWrites=true&w=majority`;
async function connect() {
    try {
        await mongoose_1.default.connect(api_config_1.environment[env].dbString, {
            autoIndex: true,
        });
        console.log('Connected to database');
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = connect;

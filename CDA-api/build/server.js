"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./utils/connect"));
// import errorHandler from './utils/errorHandler'
const router_1 = __importDefault(require("./src/router"));
const appolo_server_1 = require("./appolo-server");
const app = (0, express_1.default)();
// Database connection
(0, connect_1.default)();
// Start 
(0, appolo_server_1.appoloLaunch)(app);
const log = (req, res, next) => {
    console.log("You've just logged in !");
    next();
};
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(log);
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api', router_1.default);
// Error handler
// app.use(errorHandler)
app.listen(process.env.SERVER_PORT, () => console.log('Server started on localhost:' + process.env.SERVER_PORT));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NOTUSE_controller_1 = __importDefault(require("./controllers/NOTUSE.controller"));
const asyncHandler = require('express-async-handler');
const router = (0, express_1.Router)();
// /api/
router
    .route('/')
    .get(asyncHandler(NOTUSE_controller_1.default.getMany))
    .post(asyncHandler(NOTUSE_controller_1.default.createOne));
// /api/:id
router
    .route('/:id')
    .get(asyncHandler(NOTUSE_controller_1.default.getOne))
    .put(asyncHandler(NOTUSE_controller_1.default.updateOne))
    .delete(asyncHandler(NOTUSE_controller_1.default.removeOne));
exports.default = router;

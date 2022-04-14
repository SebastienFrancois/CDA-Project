"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WilderModel = void 0;
const mongoose_1 = require("mongoose");
const WilderSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    city: String,
    skills: [{ title: String, votes: Number }],
    completed: {
        type: String,
        enum: ['in progress', 'complete', 'not started'],
        default: 'in progress',
    },
    description: String,
});
exports.WilderModel = (0, mongoose_1.model)('Wilder', WilderSchema);

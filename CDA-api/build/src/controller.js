"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMany = async (req, res, next) => {
    res.status(200).json('Hello world');
};
const getOne = async (req, res, next) => {
    res.status(200).json('Hello world');
};
const createOne = async (req, res, next) => { };
const updateOne = async (req, res, next) => { };
const removeOne = async (req, res, next) => { };
exports.default = {
    getMany,
    getOne,
    createOne,
    updateOne,
    removeOne,
};

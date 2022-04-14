"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = '';
async function connect() {
    try {
        // await mongoose.connect(url, {
        //   autoIndex: true,
        // })
        console.log('Connected to database');
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = connect;

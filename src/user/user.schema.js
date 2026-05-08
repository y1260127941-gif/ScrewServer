"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    id: String,
    data: String
}).index({ id: 1 });

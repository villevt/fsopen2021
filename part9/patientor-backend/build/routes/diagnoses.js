"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const router = express_1.Router();
router.get("/", (_req, res) => {
    res.json(diagnoseService_1.default.getAll());
});
exports.default = router;
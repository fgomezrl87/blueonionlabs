"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = exports.getStarlink = exports.getData = void 0;
const starlink_1 = __importDefault(require("../models/starlink"));
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const starlinks = yield starlink_1.default.findAll();
    res.json({ starlinks });
});
exports.getData = getData;
const getStarlink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const starlink = yield starlink_1.default.findByPk(id);
    if (starlink) {
        res.json({ starlink });
    }
    else {
        res.status(404).json({
            msg: `Satelite with id ${id} does not exist`
        });
    }
});
exports.getStarlink = getStarlink;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const starlink = new starlink_1.default();
        starlink.save(body);
        res.json(starlink);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Contact support'
        });
    }
});
exports.postData = postData;
//# sourceMappingURL=import.js.map
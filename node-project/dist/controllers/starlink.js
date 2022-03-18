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
const fs_1 = __importDefault(require("fs"));
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const starlinks = yield starlink_1.default.findAll();
    res.json({ starlinks });
});
exports.getData = getData;
const getStarlink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const starlink = await Starlink.findByPk( id );
    const starlink = yield starlink_1.default.findAll({
        where: {
            idsat: id
        }
    });
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
    let rawdata = fs_1.default.readFileSync('data/starlink_historical_data.json');
    let data = JSON.parse(rawdata.toString());
    let i = 0;
    for (let satelite of data) {
        if (i == 0) {
            try {
                yield starlink_1.default.sync({ force: true }).then(function () {
                    return starlink_1.default.create({
                        creation_date: satelite.spaceTrack.CREATION_DATE,
                        longitude: satelite.longitude,
                        latitude: satelite.latitude,
                        idsat: satelite.id
                    });
                });
                i++;
            }
            catch (error) {
                res.status(404).json({
                    msg: `Error: ${error}`
                });
            }
        }
        else {
            starlink_1.default.create({
                creation_date: satelite.spaceTrack.CREATION_DATE,
                longitude: satelite.longitude,
                latitude: satelite.latitude,
                idsat: satelite.id
            });
        }
    }
    res.json({
        msg: 'Data Sucessfully Imported'
    });
});
exports.postData = postData;
//# sourceMappingURL=starlink.js.map
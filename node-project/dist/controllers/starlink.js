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
exports.postData = exports.getClosest = exports.getStarlink = exports.getData = void 0;
const starlink_1 = __importDefault(require("../models/starlink"));
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = __importDefault(require("sequelize"));
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const starlinks = yield starlink_1.default.findAll();
    res.json({ starlinks });
});
exports.getData = getData;
const getStarlink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Op } = require('sequelize');
    const { startDate, endDate } = req.body;
    const starlink = yield starlink_1.default.findOne({
        where: {
            idsat: id,
            creation_date: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['creation_date', 'DESC']]
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
const getClosest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Op } = require('sequelize');
    const { lat, lon, startDate, endDate } = req.body;
    try {
        const starlink = yield starlink_1.default.findOne({
            attributes: {
                include: [
                    [
                        sequelize_1.default.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lon}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`),
                        'distance'
                    ]
                ]
            },
            where: {
                creation_date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: sequelize_1.default.literal('distance ASC')
        });
        if (starlink) {
            res.json({ starlink });
        }
        else {
            res.status(404).json({
                msg: `No Satelites on those dates`
            });
        }
    }
    catch (error) {
        console.log('The error is: ' + error);
        res.status(404).json({
            msg: `Error: contact support`
        });
    }
});
exports.getClosest = getClosest;
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
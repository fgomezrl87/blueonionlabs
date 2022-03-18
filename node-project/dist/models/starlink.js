"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Starlink = connection_1.default.define('starlink', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creation_date: {
        type: 'TIMESTAMP'
    },
    longitude: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    latitude: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    idsat: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: false
});
exports.default = Starlink;
//# sourceMappingURL=starlink.js.map
import { DataTypes } from "sequelize";
import db from '../db/connection';

const Starlink = db.define('starlink', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creation_date: {
        type: 'TIMESTAMP'
    },
    longitude: {
        type: DataTypes.DOUBLE
    },
    latitude: {
        type: DataTypes.DOUBLE
    },
    idsat: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    indexes:[
        {
          unique: false,
          fields:['idsat']
        }
    ]
});

export default Starlink; 
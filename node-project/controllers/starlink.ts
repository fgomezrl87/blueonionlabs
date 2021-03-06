import { Request, Response } from 'express';
import Starlink from '../models/starlink';
import fs from 'fs';
import sequelize from "sequelize";

export const getData = async ( req: Request, res: Response ) => {

    const starlinks = await Starlink.findAll();

    res.json( {starlinks} );

}

export const getStarlink = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { Op } = require('sequelize');
    const { startDate, endDate } = req.body;

    const starlink = await Starlink.findOne({
        where: {
            idsat: id,
            creation_date: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [ [ 'creation_date', 'DESC' ]]
    });

    if(starlink) {
        res.json( {starlink} );
    } else {
        res.status(404).json({
            msg: `Satelite with id ${ id } does not exist`
        })
    }

}

export const getClosest = async ( req: Request, res: Response ) => {

    const { Op } = require('sequelize');
    const { lat, lon, startDate, endDate } = req.body;
    
    try {
        const starlink = await Starlink.findOne({
            attributes: {
                include: [
                    [
                    sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lon}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`),
                    'distance'
                    ]
                ]
            },
            where: {
                creation_date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: sequelize.literal('distance ASC')
        });
        if(starlink) {
            res.json( {starlink} );
        } else {
            res.status(404).json({
                msg: `No Satelites on those dates`
            });
        }
    } catch (error) {
        console.log('The error is: ' + error);
        res.status(404).json({
            msg: `Error: contact support`
        });
    }

    

}

export const postData = async ( req: Request, res: Response ) => {

    let rawdata = fs.readFileSync('data/starlink_historical_data.json');
    let data = JSON.parse(rawdata.toString());
    let i = 0;
    
    for(let satelite of data) {
        if (i == 0) {
            try {
                await Starlink.sync({force: true}).then(function () {
                    return Starlink.create({
                        creation_date: satelite.spaceTrack.CREATION_DATE,
                        longitude: satelite.longitude,
                        latitude: satelite.latitude,
                        idsat: satelite.id
                    });
                });
                i++;
            } catch(error) {
                res.status(404).json({
                    msg: `Error: ${ error }`
                })
            }
        } else {
            Starlink.create({
                creation_date: satelite.spaceTrack.CREATION_DATE,
                longitude: satelite.longitude,
                latitude: satelite.latitude,
                idsat: satelite.id
            });
        }
    }

    res.json( {
        msg: 'Data Sucessfully Imported'
    } );

}
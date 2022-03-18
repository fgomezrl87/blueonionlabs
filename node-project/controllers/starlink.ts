import { Request, Response } from 'express';
import Starlink from '../models/starlink';
import fs from 'fs';

export const getData = async ( req: Request, res: Response ) => {

    const starlinks = await Starlink.findAll();

    res.json( {starlinks} );

}

export const getStarlink = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    // const starlink = await Starlink.findByPk( id );

    const starlink = await Starlink.findAll({
        where: {
            idsat: id
        }
    });

    if(starlink) {
        res.json( {starlink} );
    } else {
        res.status(404).json({
            msg: `Satelite with id ${ id } does not exist`
        })
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
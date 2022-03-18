import express, { Application } from 'express';
import importRoutes from '../routes/starlink';
import cors from 'cors';

import db from '../db/connection'

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        import: '/api/starlink'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        this.middlewares();

        // Define routes
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database Online');
        } catch(error: any) {
            throw new Error ( error );
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body reading
        this.app.use ( express.json() );
    }

    routes() {
        this.app.use( this.apiPaths.import, importRoutes )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port: ' + this.port);
        })
    }
}

export default Server;
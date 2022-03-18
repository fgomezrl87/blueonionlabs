# Blue Onion Labs Assesment Felipe Gómez

Please, clone this repo and follow next steps to have this working.

## Create Postgresql Database with Docker Compose
Please run docker compose file called docker-compose.yml by executing 
```
$ docker-compose up -d
```

## Import Postman Collections
Open postman and then file-->import. Upload postman_collection.json file

## Install NPM dependencies
Open a terminal and navigate to node-project folder. Execute next command within node-project folder:
```
$ npm install
```

## Run Project
After having node_modules folder created, execute next command within node-project folder:
```
$ node dist/app.js
```

## Import data from JSON and load it to postgres database
In postman, locate and open the "Import Data" POST request and execute it. You will get a message at the end of the process. JSON file is already added to project.

## Query postgres database to fetch one satelite information by id
In postman, locate and open the "Get One Satelite by ID" GET request and execute it. You will get a response with information for a specific satelite. Notice that this request is expecting not only the satelite id but the startDate and endDate you want to look at. This information has to be sent at the body in json format. There is an example in postman request.

## Query postres database to find closest satelite to your location
In postman, locate and open the "Get Closest Satelite" PUT request and execute it. You will get a response with information of the closest satelite. Notice that this request is expecting startDate, EndDate and your location (lat, lon). This information has to be sent at the body in json format. There is an example in postman request.
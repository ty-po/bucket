```
██████╗ ██╗   ██╗ ██████╗██╗  ██╗███████╗████████╗
██╔══██╗██║   ██║██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
██████╔╝██║   ██║██║     █████╔╝ █████╗     ██║   
██╔══██╗██║   ██║██║     ██╔═██╗ ██╔══╝     ██║   
██████╔╝╚██████╔╝╚██████╗██║  ██╗███████╗   ██║   
╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝ 

by  ___      __   __  
     |  \ / |__) /  \ 
     |   |  |    \__/ 
```                    



API - Work in Progress
----------------------

REST for users and POIs

accounts for FB relationships
and geospatial data

Users are matched with events based on 
```
Algorithmical Criteria
(friends, time , type)
```
and are given a queue/agenda from the "bucket"

Setup
-----
install node.js and mongoose 

`git clone` this shit

`npm install` for all packages

$MONGO and $HTTPPORT/$HTTPSPORT hold mongodb server ip and
output ports respectively. Defaults to 8080 and 443.
Root permissions are required to open ports below 1024.

place ssl credentials in ./sslcert/; program expects server.key and server.crt

start server in dev mode with: 
`sudo nodemon ~/bucket/server.js --watch bucket --watch bucket/app/\*`


todo:
-----
- Matching Algorithm
- Rework/Abstraction of CRUD methods
- user model updates
- bucket list model and controller


******************************

- ~~create models~~
- ~~facebook integration~~
- ~~implement auth~~
- ~~locational methods~~
- ~~pin getters and setters~~
- ~~/me route~~
- ~~https security (requires real domain)~~
- ~~fix pin ttl: expires way early; debug by removing ttl validation~~
- hide user location (with reselect for finding events)
- user scope requests
- pin invite logic/permissions

******************************

- oauth2orize provider?
- Rate limiting
- load test 
- write mocha unit tests (test ttl)
- integrate Travis Ci for building/testing 

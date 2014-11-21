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


Setup
-----
install node.js and mongoose 

git clone this shit

npm install for all packages

$MONGO and $HTTPPORT/$HTTPSPORT hold mongodb server ip and
output ports respectively. Defaults to 8080 and 443.
Root permissions are required to open ports below 1024.

place ssl credentials in ./sslcert/; program expects server.key and server.crt

start server in dev mode with: 
`sudo nodemon ~/pin-it/server.js --watch pin-it --watch pin-it/app/\*`


todo:
-----

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

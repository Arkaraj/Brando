# BRANDO

A Movie searching web application build with REACT and TMDB API

### TMDB API

https://www.themoviedb.org/

### NOTE

This is deprecated, .env file is being picked from root directory

For .env file: add
REACT_APP_SECRET_KEY = secret key

_Save in root file where package.json is present_

To Use .env in App.js

```javascript
process.env.REACT_APP_SECRET_KEY;
```

Server runs on port 5000
goto: http://localhost:5000/movies to view the database

### Server with Node Js

To run real REST API Server

Nodemon should be installed for development

```sh
$ npm run server
```

Runs in port 8080

In package.json file add proxy, to remove cors error:

```json
"proxy": "http://localhost:8080"
```

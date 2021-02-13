# BRANDO

A Movie searching web application build with REACT and TMDB API

### TMDB API

https://www.themoviedb.org/

### NOTE

For .env file: add 
REACT_APP_SECRET_KEY = secret key

*Save in root file where package.json is present*

To Use .env in App.js

```javascript
process.env.REACT_APP_SECRET_KEY
```

### To run dummy REST API Server

```sh
npm run server
```

Server runs on port 5000
goto: http://localhost:5000/movies to view the database
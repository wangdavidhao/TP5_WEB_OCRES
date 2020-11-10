var express = require('express');
var router = express.Router();

const axios = require('axios');
const { response } = require('express');

const API_KEY = 'f907bc08';
const API_URL = 'http://www.omdbapi.com/';


//Array d'objet movies => mini bdd
movies = [
     {
        id: 'tt4154796',
        movie: 'Avengers : Endgame',
        yearOfRelease: 2019,
        duration: 181,
        actors: ["Robert Downey Jr", "Chris Evans"],
        poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
        boxOffice: "N/A",
        rottenTomatoesScore: 94,
    }
]

//Function that return a movie object according to an id as a an argument
const getMovieById = async (id) => {

    const response = await axios.get(API_URL, {
        params:{
            apikey:API_KEY,
            i:id
        }
    });

    const data = await response.data;

    const movie = {
        id: id,
        movie: data.Title,
        yearOfRelease: parseInt(data.Year),
        duration: parseInt(data.Runtime),
        actors: data.Actors.split(','),
        poster: data.Poster,
        boxOffice: data.BoxOffice,
        rottenTomatoesScore: parseInt(data.Ratings[1].Value)
    }


    return movie;
}

//Function that return a movie by its name
const getMovieByName = async (name) => {

    const response = await axios.get(API_URL, {
        params:{
            apikey:API_KEY,
            t:name
        }
    });

    const data = await response.data;

    const movie = {
        id: data.imdbID,
        movie: data.Title,
        yearOfRelease: parseInt(data.Year),
        duration: parseInt(data.Runtime),
        actors: data.Actors.split(','),
        poster: data.Poster,
        boxOffice: data.BoxOffice,
        rottenTomatoesScore: parseInt(data.Ratings[1].Value)
    }

    return movie;
}

//GET MOVIE BY ID
router.get('/:id', async (req, res) => {

    const {id} = req.params;
    const result = await getMovieById(id);

    res.status(200).json(result);
    
});

//GET ALL MOVIES
router.get('/', (req, res) => {

    res.status(200).json({movies});
});

//POST
router.post('/', async (req, res) => {

    const {movie} = req.body;
    const result = await getMovieByName(movie);
    
    movies.push(result);
    res.status(200).json({
        msg:"Succesfully added !",
        movies:movies
    });

});

//PUT
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {movie} = req.body;
    //const movieToUpdate = movies.find(movie => movie.id === parseInt(id)); //string to int
    const movieToUpdate = movies.find(movie => movie.id === id); //string to int
    movieToUpdate.movie = movie; //Update the name

    res.status(200).json({
        msg:`Update the ${id} user`,
        movies:movies
    })
});

//DELETE
router.delete('/:id', (req, res) => {

    const {id} = req.params;
    //const movieToRemove = movies.find(movie => movie.id !== parseInt(id));
    const movieToRemove = movies.find(movie => movie.id !== id);
    movies = movieToRemove;
    res.status(200).json({
        msg:`Remove the ${id} user`,
        movie:movies
    });
});

module.exports = router;
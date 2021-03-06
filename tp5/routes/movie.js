var express = require('express');
var router = express.Router();

const axios = require('axios');
const { response } = require('express');

//API Constants
const API_KEY = 'f907bc08';
const API_URL = 'http://www.omdbapi.com/';


//Database with initial value
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

    try{
        const response = await axios.get(API_URL, {
        params:{
            apikey:API_KEY,
            i:id
        }
        });

        const data = await response.data; //Get the data

        //Create a movie object with the data fetched => convert all string
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
    }catch(error){
        if(error.response){
            console.log('Erreur fetching ' + error.response.status);
        }else if(error.request){
            console.log('Erreur fetching  ' + error.request);
        }else{
            console.log('Erreur fetching  ' + error.message);
        }
    }     
}

//Function that return a movie by its name
const getMovieByName = async (name) => {

    try{
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

    }catch(error){
        if(error.response){
            console.log('Erreur fetching ' + error.response.status);
        }else if(error.request){
            console.log('Erreur fetching  ' + error.request);
        }else{
            console.log('Erreur fetching  ' + error.message);
        }
    }     

    
}

//GET MOVIE BY ID
router.get('/:id', async (req, res) => {

    const {id} = req.params; //Id from params
    const result = await getMovieById(id); //Find Movie by its ID

    if(result){
        res.status(200).json(result);
    }else{
        res.status(400).json('Erreur id introuvable');
    }
    
});

//GET ALL MOVIES
router.get('/', (req, res) => {
    if({movies}){
        res.status(200).json({movies});
    }else{
        res.status(400).json('Erreur');
    }
    
});

//POST
router.post('/', async (req, res) => {

    const {movie} = req.body; //Movie name from body
    const result = await getMovieByName(movie);
    
    movies.push(result); //We push in the array of movies
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
    const movieToUpdate = movies.find(movie => movie.id === id); 

    if(movieToUpdate){
        movieToUpdate.movie = movie; //Update the name

        res.status(200).json({
            msg:`Update the ${id} movie`,
            movies:movies
        })
    }else{
        res.status(400).json('Erreur put id introuvable');
    }
    
});

//DELETE
router.delete('/:id', (req, res) => {

    const {id} = req.params;
    //const movieToRemove = movies.find(movie => movie.id !== parseInt(id));
    const movieToRemove = movies.find(movie => movie.id !== id);

    if(!movieToRemove){
        movies = movieToRemove; //We replace the initial array of movies with new array excluding the removes one
        res.status(200).json({
            msg:`Remove the ${id} movie`,
            movie:movies
        });
    }else{
        res.status(400).json('Erreur id introuvable');
    }
    
});

module.exports = router;
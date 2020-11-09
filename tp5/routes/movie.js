var express = require('express');
var router = express.Router();

const axios = require('axios');

const API_KEY = 'f907bc08';
const API_URL = 'http://www.omdbapi.com/?apikey=';


//Array d'objet movies => mini bdd
movies = [
    {
        id:0,
        name:"Avengers",
        annee:2012
    },
    {
        id:1,
        name:"Star Wars",
        annee:2008
    }
]


//GET
router.get('/', (req, res) => {
    //res.status(200).json({movies});
    axios.get(API_URL+API_KEY+'&s=avengers')
       .then(response => res.json(response.data))
       .catch(err => res.secn(err));
});

//POST
router.post('/', (req, res) => {

    const {name} = req.body;
    const id = 2;
    movies.push({id,name});
    res.status(200).json({
        msg:"Succesfully added !",
        movies:movies
    });

});

//PUT
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name}= req.body;
    const movieToUpdate = movies.find(movie => movie.id === parseInt(id)); //string to int
    movieToUpdate.name = name; //Update the name

    res.status(200).json({
        msg:`Update the ${id} user`,
        movies:movies
    })
});

//DELETE
router.delete('/:id', (req, res) => {

    const {id} = req.params;
    const movieToRemove = movies.find(movie => movie.id !== parseInt(id));
    movies = movieToRemove;
    res.status(200).json({
        msg:`Remove the ${id} user`,
        movie:movies
    });
});

module.exports = router;
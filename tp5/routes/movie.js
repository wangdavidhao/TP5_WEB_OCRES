var express = require('express');
var router = express.Router();

movies = [
    {
        id:0,
        name:"Avengers"
    },
    {
        id:1,
        name:"Star Wars"
    }
]

router.get('/', (req, res) => {
    res.status(200).json({movies});
});

router.post('/', (req, res) => {

    const {name} = req.body;
    const id = 2;
    movies.push({id,name});
    res.json({
        msg:"Succesfully added !",
        movies:movies
    });

});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {name}= req.body;
    const movieToUpdate = movies.find(movie => movie.id === parseInt(id));
    movieToUpdate.name = name;

    res.status(200).json({
        msg:`Update the ${id} user`,
        movies:movies
    })
});

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
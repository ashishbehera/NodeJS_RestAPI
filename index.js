const express = require('express');
const uuid = require("uuid");
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let movies = [
    {
        id: 1,
        title: 'Matrix 1',
        director: 'Trill Dan',
        release_date: 2004-09
    },
    {
        id: 2,
        title: 'Titanic',
        director: 'James Kaio',
        release_date: 1997-09
    }
]

//get the movie list in th form of json
app.get('/movie', (req, res) => {
    res.json(movies);
});

//add the movie into the list
app.post('/movie', (req, res) => {
    const movie = {
        id: uuid.v4(),
        title: req.body.title,
        director: req.body.director,
        release_date: req.body.release_date
    }

    if (!movie.title || !movie.director || !movie.release_date) {
        return res.status(400).json({ msg: 'Please provide all input parameters' });
    }
    movies.push(movie);
    res.send("Movie is added to the List");
});

//Search for a movie in the list

app.get('/movie/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    for (let movie of movies) {
        if (movie.id === parseInt(id)) {
            res.json(movie);
            console.log(movie);
            return;
        }
    }
    res.status(404).send('movie not found');
});

//removing a movie from the list
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id;
    const found = movies.some(movie => movie.id === parseInt(id));

    console.log(found);
    if (found) {
        movies = movies.filter(movie => movie.id !== parseInt(id));
        res.json({
            msg: 'User deleted',
            movies
        });
    } else {
        res.status(404).send({ msg: 'Movie ID not found'});
    }


});


//set the server to listen at the port
app.listen(port, () => console.log(`Server listening at the port ${port}`))



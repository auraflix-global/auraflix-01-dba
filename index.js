import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

app.get('/api/v1/movies', async (req, res) => {
   fs.readFile('./movies.json', (err, data) => {
        if (err) {
            console.log(err);
            res.json({message: "No movies found", error: err});
        } else {
            res.json(JSON.parse(data.toString()));
        }
    })
})

app.post('/api/v1/posts-movies', async (req, res) => {
    const movie = req.body.newMovie;

    if(!movie || movie=='undefined') return res.json({message: "No movie found", error: err});

    fs.readFile('./movies.json', (err, data) => {
        if (err) {
            console.log(err);
            res.json({message:'could not add movie', error: err});
        } else {
            const movies = JSON.parse(data);
            movies.push({id: parseInt(movies.length + 1), ...movie});
            fs.writeFile('./movies.json', JSON.stringify(movies), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: "Movie added successfully",newAddedMovie: movie});
                }
            })
        }
    })
})

app.delete('/api/v1/delete-movies/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./movies.json', (err, data) => {
        if (err) {
            console.log(err);
            res.json({message:'could not delete movie', error: err});
        } else {
            const movies = JSON.parse(data);
            const newMovies = movies.filter((movie) => movie.id !== parseInt(id));
            fs.writeFile('./movies.json', JSON.stringify(newMovies), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: "Movie deleted successfully"});   
                }
            })
        }
    })
})

app.put('/api/v1/update-movies/:id', (req, res) => {
    const id = req.params.id;
    const updatedMovie = req.body.updatedMovie;

    console.log(updatedMovie);

    fs.readFile('./movies.json', (err, data) => {
        if (err) {
            console.log(err);
            res.json({message:'could not update movie', error: err});
        } else {
            const movies = JSON.parse(data);
            const newMovies = movies.map((movie) => {
                if (movie.id === parseInt(id)) {
                    return {
                        ...movie,
                        ...updatedMovie,
                        id: parseInt(id)
                    };
                } else {
                    return movie;
                }
            });
            fs.writeFile('./movies.json', JSON.stringify(newMovies), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({message: "Movie updated successfully",updatedMovie});
                }
            })            
        }
    })
})



app.listen(3000, () => console.log("Server running on port 3000"));
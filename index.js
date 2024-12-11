const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'walled_db',
  password: '123',
  port: 5432,
});

const getMovies = (req, res) => {
  pool.query("SELECT * FROM movies", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
}

// arrow function
const schema = Joi.object({
  a: Joi.string()
});

const registerSchema = Joi.object({
  email: Joi.string().email()
});

const routeHandler = (req, res) => {
  const {error, value} = schema.validate(req.body)
  if  (error.message) {
    console.log(error)
    return res.status(400).json({message: error.message})
  }
  res.status(200).json("heloo")
};

app.get('/', routeHandler);
app.get('/movies', getMovies);


const createMovies = (req, res) => {
  const { movie_title, movie_genre, duration } = req.body
  pool.query("INSERT INTO movies (movie_title, movie_genre, duration) VALUES ($1, $2, $3) RETURNING *",
    [movie_title, movie_genre, duration],
    (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows[0]);
  })
}

app.post('/movies', createMovies)

// users walled

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
}

app.get('/users', getUsers);

const createUsers = (req, res) => {
  const { username, email, fullname, password, balance } = req.body
  const {error, value} = registerSchema.validate(req.body)
  if  (error) {
    console.log(error)
    return res.status(400).json({message: error.message})
  }
  pool.query("INSERT INTO users (username, email, fullname, password, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, fullname, password, balance],
    (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(results.rows[0]);
  })
}

app.post('/users', createUsers)


// movies, tickets: resources
app.get('/movies', routeHandler);
app.post('/movies', routeHandler); //membuat movies
app.put('/movies/:id', routeHandler); // mengubah movies berdasar id
app.delete('/movies/:id', routeHandler); // mengubah movies berdasar id
app.patch('/movies/:id', routeHandler); // bisa edit mau ngubah yang mana
// app.get('/tickets', routeHandler);


app.post('/', (req, res) => {
  res.send('halo diko')
});

app.put('/', (req, res) => {
  res.send('halo diko')
});

app.delete('/', (req, res) => {
  res.send('halo diko')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
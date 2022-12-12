const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
        client: 'dpg-ceblh66n6mphc8o9nhq0-a',
        connection: {
          host : 'postgres://face_detector_database_user:KeJjLU6YgpQ7AJ7HTvUiCjeRlEbQnFvT@dpg-ceblh66n6mphc8o9nhq0-a/face_detector_database', //localhost
          user : 'face_detector_database_user', //add your user name for the database here
          port: 5432, // add your port number here
          password : 'KeJjLU6YgpQ7AJ7HTvUiCjeRlEbQnFvT', //add your correct password in here
          database : 'face_detector_database' //add your database name you created here
        }
});


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> { res.send('Server Active!') })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})